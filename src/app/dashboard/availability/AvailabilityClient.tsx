"use client";

import { useState } from "react";
import { updateAvailability } from "@/app/actions";
import { Globe, Check } from "lucide-react";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIME_OPTIONS = Array.from({ length: 48 }).map((_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? "00" : "30";
  const label = `${h === 0 ? 12 : h > 12 ? h - 12 : h}:${m} ${h < 12 ? "AM" : "PM"}`;
  return { value: `${h.toString().padStart(2, "0")}:${m}`, label };
});

type Availability = { dayOfWeek: number; startTime: string; endTime: string };

export default function AvailabilityClient({
  initialAvailability,
  initialTimezone,
}: {
  initialAvailability: Availability[];
  initialTimezone: string;
}) {
  const [availabilities, setAvailabilities] = useState<Availability[]>(initialAvailability);
  const [timezone, setTimezone] = useState(initialTimezone || "UTC");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleDay = (dayIndex: number) => {
    const exists = availabilities.find(a => a.dayOfWeek === dayIndex);
    if (exists) {
      setAvailabilities(availabilities.filter(a => a.dayOfWeek !== dayIndex));
    } else {
      setAvailabilities([...availabilities, { dayOfWeek: dayIndex, startTime: "09:00", endTime: "17:00" }]);
    }
  };

  const updateTime = (dayIndex: number, field: "startTime" | "endTime", value: string) => {
    setAvailabilities(
      availabilities.map(a => (a.dayOfWeek === dayIndex ? { ...a, [field]: value } : a))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await updateAvailability(availabilities, timezone);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const selectClass = "block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white transition-all";

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Availability</h1>
          <p className="text-gray-500 mt-1 text-sm">Configure the times when you can accept bookings.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm disabled:opacity-50 ${
            saved ? "bg-green-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-500"
          }`}
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Timezone */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Globe className="w-4 h-4 text-indigo-500" /> Timezone
        </label>
        <select
          value={timezone}
          onChange={e => setTimezone(e.target.value)}
          className={selectClass + " max-w-sm"}
        >
          {Intl.supportedValuesOf("timeZone").map(tz => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-sm font-semibold text-gray-700">Weekly Hours</h2>
          <p className="text-xs text-gray-400 mt-0.5">Toggle days on/off and set working hours for each day.</p>
        </div>
        <div className="divide-y divide-gray-100">
          {DAYS.map((day, index) => {
            const avail = availabilities.find(a => a.dayOfWeek === index);
            const isEnabled = !!avail;
            const isWeekend = index === 0 || index === 6;

            return (
              <div
                key={day}
                className={`px-5 py-4 flex items-center gap-4 transition-colors ${
                  isEnabled ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                {/* Toggle + Day Name */}
                <div className="flex items-center gap-3 w-36 flex-shrink-0">
                  <button
                    onClick={() => toggleDay(index)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
                      isEnabled ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                        isEnabled ? "translate-x-4.5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-medium ${isEnabled ? "text-gray-900" : "text-gray-400"}`}>
                    {day}
                  </span>
                </div>

                {/* Time range */}
                {isEnabled && avail ? (
                  <div className="flex items-center gap-2 flex-1 max-w-sm">
                    <select
                      value={avail.startTime}
                      onChange={e => updateTime(index, "startTime", e.target.value)}
                      className={selectClass}
                    >
                      {TIME_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <span className="text-gray-400 font-medium text-sm flex-shrink-0">→</span>
                    <select
                      value={avail.endTime}
                      onChange={e => updateTime(index, "endTime", e.target.value)}
                      className={selectClass}
                    >
                      {TIME_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm italic">
                    {isWeekend ? "Weekend — typically unavailable" : "Unavailable"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
