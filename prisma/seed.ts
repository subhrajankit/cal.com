import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@cal.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@cal.com",
      timezone: "America/New_York",
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
          { title: "15 Min Meeting", duration: 15, urlSlug: "15min", description: "Quick 15-minute sync." },
          { title: "30 Min Meeting", duration: 30, urlSlug: "30min", description: "Standard 30-minute sync." },
        ],
      },
    },
  });

  const eventType = await prisma.eventType.findUnique({
    where: { urlSlug: "30min" },
  });

  if (eventType) {
    const today = new Date();
    today.setHours(today.getHours() + 24); // Book for tomorrow

    await prisma.booking.create({
      data: {
        eventTypeId: eventType.id,
        userId: admin.id,
        date: today,
        startTime: "10:00",
        endTime: "10:30",
        bookerName: "John Doe",
        bookerEmail: "john@example.com",
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
