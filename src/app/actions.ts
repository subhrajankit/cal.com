"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getAdminUser() {
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized. Please log in.");
  }
  return user;
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return { error: "Invalid credentials" };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  const token = await signToken({ id: user.id, email: user.email });
  
  const cookieStore = await cookies();
  cookieStore.set("calcom_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect("/dashboard");
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "User with this email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      availabilities: {
        create: [
          { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 5, startTime: "09:00", endTime: "17:00" },
        ],
      },
      eventTypes: {
        create: [
          { title: "15 Min Meeting", duration: 15, urlSlug: "15min-" + Math.random().toString(36).substr(2, 5), description: "Quick 15-minute sync." },
          { title: "30 Min Meeting", duration: 30, urlSlug: "30min-" + Math.random().toString(36).substr(2, 5), description: "Standard 30-minute sync." },
        ],
      },
    },
  });

  const token = await signToken({ id: user.id, email: user.email });
  const cookieStore = await cookies();
  cookieStore.set("calcom_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("calcom_token");
  redirect("/login");
}

export async function createEventType(data: { title: string; description: string; duration: number; urlSlug: string }) {
  const user = await getAdminUser();
  await prisma.eventType.create({
    data: {
      ...data,
      userId: user.id,
    },
  });
  revalidatePath("/dashboard/event-types");
}

export async function deleteEventType(id: string) {
  await prisma.eventType.delete({ where: { id } });
  revalidatePath("/dashboard/event-types");
}

export async function updateAvailability(availabilities: { dayOfWeek: number; startTime: string; endTime: string }[], timezone: string) {
  const user = await getAdminUser();
  
  // Update timezone
  await prisma.user.update({
    where: { id: user.id },
    data: { timezone },
  });

  // Delete old availabilities and insert new ones
  await prisma.$transaction([
    prisma.availability.deleteMany({ where: { userId: user.id } }),
    prisma.availability.createMany({
      data: availabilities.map(a => ({ ...a, userId: user.id })),
    }),
  ]);
  revalidatePath("/dashboard/availability");
}

export async function cancelBooking(id: string) {
  await prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
  revalidatePath("/dashboard/bookings");
}

export async function createBooking(data: { eventTypeId: string; date: Date; startTime: string; endTime: string; bookerName: string; bookerEmail: string }) {
  const eventType = await prisma.eventType.findUnique({ where: { id: data.eventTypeId } });
  if (!eventType) throw new Error("Event type not found");

  // Check for duplicate booking
  const existingBooking = await prisma.booking.findFirst({
    where: {
      eventTypeId: data.eventTypeId,
      date: data.date,
      startTime: data.startTime,
      status: "CONFIRMED",
    },
  });

  if (existingBooking) {
    throw new Error("This time slot is already booked.");
  }

  await prisma.booking.create({
    data: {
      ...data,
      userId: eventType.userId,
    },
  });
  revalidatePath("/dashboard/bookings");
  // Don't strictly need to revalidate public page unless we statically cache it
}

export async function getAvailableSlots(eventTypeId: string, dateStr: string) {
  // force local time parsing to keep dayOfWeek accurate
  const dateParts = dateStr.split('-');
  const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
  const dayOfWeek = date.getDay(); // 0 = Sunday
  
  const eventType = await prisma.eventType.findUnique({ where: { id: eventTypeId } });
  if (!eventType) return [];

  const avail = await prisma.availability.findFirst({
    where: { userId: eventType.userId, dayOfWeek },
  });

  if (!avail) return [];

  // Very simple slots generation
  const slots: string[] = [];
  const start = new Date(`${dateStr}T${avail.startTime}:00`);
  const end = new Date(`${dateStr}T${avail.endTime}:00`);
  
  let current = start;
  while (current < end) {
    const slotStr = current.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    slots.push(slotStr);
    current = new Date(current.getTime() + eventType.duration * 60000);
  }

  // filter out past times if it's today
  const now = new Date();
  const validSlots = slots.filter(slot => {
    if (date.toDateString() === now.toDateString()) {
      return slot >= `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    }
    return date > now;
  });

  // check existing bookings
  const bookings = await prisma.booking.findMany({
    where: {
      eventTypeId,
      date,
      status: "CONFIRMED",
    },
  });

  const bookedTimes = bookings.map((b: any) => b.startTime);

  return validSlots.filter(s => !bookedTimes.includes(s));
}
