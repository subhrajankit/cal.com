"use client";

import { useState } from "react";
import { cancelBooking } from "@/app/actions";
import { Calendar, Clock, User, Mail, XCircle, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

type Booking = {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  bookerName: string;
  bookerEmail: string;
  status: string;
  eventType: { title: string; duration: number };
};

const tabs = ["upcoming", "past", "cancelled"] as const;

export default function BookingsClient({ initialBookings }: { initialBookings: Booking[] }) {
  const [tab, setTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");

  const handleCancel = async (id: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      await cancelBooking(id);
      window.location.reload();
    }
  };

  const now = new Date();
  const categorize = (b: Booking) => {
    if (b.status === "CANCELLED") return "cancelled";
    const date = new Date(b.date);
    if (date > now || date.toDateString() === now.toDateString()) return "upcoming";
    return "past";
  };

  const display = initialBookings.filter(b => categorize(b) === tab);
  const counts = {
    upcoming: initialBookings.filter(b => categorize(b) === "upcoming").length,
    past: initialBookings.filter(b => categorize(b) === "past").length,
    cancelled: initialBookings.filter(b => categorize(b) === "cancelled").length,
  };

  const statusConfig = {
    CONFIRMED: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", dot: "bg-green-500" },
    CANCELLED: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bookings</h1>
        <p className="text-gray-500 mt-1 text-sm">See upcoming and past events booked through your links.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit mb-6">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize flex items-center gap-2 ${
              tab === t ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
            {counts[t] > 0 && (
              <span className={`min-w-[20px] h-5 flex items-center justify-center rounded-full text-xs font-bold px-1.5 ${
                tab === t ? "bg-indigo-100 text-indigo-700" : "bg-gray-200 text-gray-600"
              }`}>
                {counts[t]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {display.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
            <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No {tab} bookings</p>
            <p className="text-gray-400 text-sm mt-1">
              {tab === "upcoming" ? "Share your booking links to receive new meetings." : "Your completed sessions will appear here."}
            </p>
          </div>
        ) : (
          display.map((b) => {
            const dateObj = new Date(b.date);
            const cfg = statusConfig[b.status as keyof typeof statusConfig] || statusConfig.CONFIRMED;
            const StatusIcon = cfg.icon;

            return (
              <div key={b.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-indigo-600 uppercase leading-none">
                        {dateObj.toLocaleString("en", { month: "short" })}
                      </span>
                      <span className="text-lg font-bold text-indigo-700 leading-none">
                        {dateObj.getDate()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{b.eventType.title}</h3>
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {b.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {b.startTime} – {b.endTime}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" /> {b.bookerName}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" /> {b.bookerEmail}
                        </span>
                      </div>
                    </div>
                  </div>

                  {b.status === "CONFIRMED" && tab === "upcoming" && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="flex-shrink-0 flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium px-3 py-2 rounded-lg hover:bg-red-50 border border-red-100 transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
