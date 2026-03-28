import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BookingsClient from "./BookingsClient";

export default async function BookingsPage() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: { eventType: true },
    orderBy: { date: "desc" },
  });

  return <BookingsClient initialBookings={bookings as any} />;
}
