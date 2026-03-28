"use client";

import { useState, useEffect } from "react";
import { getAvailableSlots, createBooking } from "@/app/actions";
import { CheckCircle, Clock, Calendar, User, Mail, ChevronLeft } from "lucide-react";

const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 text-sm";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

export default function PublicBookingClient({ eventType }: { eventType: any }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const m = selectedDate.getMonth() + 1;
    const d = selectedDate.getDate();
    const y = selectedDate.getFullYear();
    const dateStr = `${y}-${m.toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`;

    setLoading(true);
    setSelectedSlot(null);
    getAvailableSlots(eventType.id, dateStr).then((res) => {
      setSlots(res);
      setLoading(false);
    });
  }, [selectedDate, eventType.id]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setBookingLoading(true);
    try {
      const [h, min] = selectedSlot.split(":").map(Number);
      const start = new Date(selectedDate);
      start.setHours(h, min, 0, 0);
      const end = new Date(start.getTime() + eventType.duration * 60000);
      const endTime = `${end.getHours().toString().padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")}`;
      await createBooking({
        eventTypeId: eventType.id,
        date: selectedDate,
        startTime: selectedSlot,
        endTime,
        bookerName: name,
        bookerEmail: email,
      });
      setSuccess(true);
    } catch (err: any) {
      alert(err.message || "Failed to book");
    } finally {
      setBookingLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-5 py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed! 🎉</h2>
        <p className="text-gray-600 max-w-xs">
          You&apos;re scheduled for <strong>{eventType.title}</strong> with{" "}
          <strong>{eventType.user.name}</strong> on{" "}
          <strong>{selectedDate.toDateString()}</strong> at <strong>{selectedSlot}</strong>.
        </p>
        <p className="text-sm text-gray-400">A confirmation has been noted.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-full">
      {/* Calendar / Slots Panel */}
      <div className={`flex-1 ${selectedSlot ? "lg:pr-8 lg:border-r border-gray-100" : ""}`}>
        <h3 className="font-bold text-lg mb-4 text-gray-800">
          <Calendar className="inline w-5 h-5 mr-2 text-indigo-500 -mt-0.5" />
          Select a Date
        </h3>
        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value + "T00:00:00"))}
          className="w-full p-3 border border-gray-200 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 text-sm"
        />

        <h3 className="font-bold text-base mb-3 text-gray-800">
          <Clock className="inline w-4 h-4 mr-2 text-indigo-500 -mt-0.5" />
          Available Times
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-52 overflow-y-auto pr-1 pb-1">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-8 gap-2 text-gray-400 text-sm">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading slots...
            </div>
          ) : slots.length === 0 ? (
            <p className="col-span-full text-center text-gray-400 text-sm py-8">
              No available times for this day.
            </p>
          ) : (
            slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSlot(s)}
                className={`py-2.5 px-3 rounded-lg font-medium text-sm transition-all border ${
                  selectedSlot === s
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                    : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                {s}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Booking Form */}
      {selectedSlot && (
        <div className="flex-1 lg:pl-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-100">
          <button
            onClick={() => setSelectedSlot(null)}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors lg:hidden"
          >
            <ChevronLeft className="w-4 h-4" /> Back to times
          </button>

          <h3 className="font-bold text-lg mb-1 text-gray-800">Your Details</h3>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-5 bg-indigo-50 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4" />
            {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedSlot}
          </div>

          <form onSubmit={handleBook} className="space-y-4">
            <div>
              <label className={labelClass}>
                <User className="inline w-3.5 h-3.5 mr-1 -mt-0.5" /> Your Name
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className={labelClass}>
                <Mail className="inline w-3.5 h-3.5 mr-1 -mt-0.5" /> Email Address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="john@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={bookingLoading}
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-500 disabled:opacity-50 mt-2 transition-colors shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
            >
              {bookingLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Confirming...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
