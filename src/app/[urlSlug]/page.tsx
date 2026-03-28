import { prisma } from "@/lib/prisma";
import PublicBookingClient from "./PublicBookingClient";
import { notFound } from "next/navigation";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default async function PublicBookingPage({ params }: { params: { urlSlug: string } }) {
  const slug = await Promise.resolve(params.urlSlug);

  const eventType = await prisma.eventType.findUnique({
    where: { urlSlug: slug },
    include: { user: true },
  });

  if (!eventType) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Minimal nav */}
      <header className="border-b border-gray-100 bg-white px-6 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Calendar className="w-5 h-5 text-indigo-500" />
          <span className="font-bold text-gray-900">Cal.com</span>
        </Link>
      </header>

      <div className="flex items-start justify-center p-6 pt-12 min-h-[calc(100vh-65px)]">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* Left: Event Info */}
          <div className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-gray-100 p-8 bg-gray-50/50 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>

            <p className="text-sm font-semibold text-indigo-600 mb-1">{eventType.user.name}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{eventType.title}</h1>

            <div className="flex items-center text-gray-500 text-sm mb-4 font-medium">
              <Clock className="w-4 h-4 mr-2 text-indigo-400" />
              {eventType.duration} min
            </div>

            {eventType.description && (
              <p className="text-gray-600 text-sm leading-relaxed mt-2">{eventType.description}</p>
            )}

            <div className="mt-auto pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                Powered by Cal.com Clone
              </p>
            </div>
          </div>

          {/* Right: Booking UI */}
          <div className="flex-1 p-8 bg-white">
            <PublicBookingClient eventType={eventType as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
