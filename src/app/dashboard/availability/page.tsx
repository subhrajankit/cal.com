import { getUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AvailabilityClient from "./AvailabilityClient";

export default async function AvailabilityPage() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  // Reload user to get availabilities
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { availabilities: true },
  });

  if (!dbUser) return notFound();

  return (
    <AvailabilityClient
      initialAvailability={dbUser.availabilities}
      initialTimezone={dbUser.timezone}
    />
  );
}
