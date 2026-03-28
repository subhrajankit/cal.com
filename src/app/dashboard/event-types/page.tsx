import { getUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventTypesClient from "./EventTypesClient";

export default async function EventTypesPage() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const eventTypes = await prisma.eventType.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return <EventTypesClient initialEventTypes={eventTypes} />;
}
