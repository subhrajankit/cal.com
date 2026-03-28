import { Calendar, Video, DollarSign, GitBranch } from "lucide-react";

export function BentoGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
          The scheduling platform
        </h2>
        <p className="text-white/60 text-center mt-4">
          Everything you need, beautifully designed
        </p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {/* Large Card - Booking Page (spans 2 cols and 2 rows on lg) */}
          <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-white/[0.08] rounded-3xl overflow-hidden p-8">
            <h3 className="text-xl font-semibold text-white mb-2">
              Booking Page
            </h3>
            <p className="text-sm text-white/50 mb-6">
              Beautiful, customizable booking pages for your meetings
            </p>

            {/* Mockup of booking UI */}
            <div className="bg-black/40 rounded-xl p-6 border border-white/[0.06]">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                <div>
                  <div className="text-sm font-medium text-white">
                    30 Minute Meeting
                  </div>
                  <div className="text-xs text-white/50">with Cal.com Team</div>
                </div>
              </div>

              {/* Time slots mockup */}
              <div className="space-y-2">
                <div className="text-xs text-white/40 mb-3">
                  Available times
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"].map(
                    (time) => (
                      <div
                        key={time}
                        className="py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-center text-sm text-white/70"
                        aria-hidden="true"
                      >
                        {time}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Medium Card - Calendar Sync */}
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-white/[0.08] rounded-3xl overflow-hidden p-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Calendar Sync
            </h3>
            <p className="text-sm text-white/50 mb-4">
              Connect all your calendars in one place
            </p>

            {/* Calendar icons mockup */}
            <div className="flex gap-3 mt-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-red-400">
                G
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-blue-400">
                O
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                A
              </div>
            </div>
          </div>

          {/* Medium Card - Video Conferencing */}
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-white/[0.08] rounded-3xl overflow-hidden p-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
              <Video className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Video Conferencing
            </h3>
            <p className="text-sm text-white/50">
              Automatic meeting links with Zoom, Meet, and Teams
            </p>
          </div>

          {/* Small Card - Payments */}
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-white/[0.08] rounded-3xl overflow-hidden p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Payments</h3>
            </div>
            <div className="bg-black/40 rounded-lg p-3 border border-white/[0.06]">
              <div className="text-xs text-white/40 mb-1">Consultation Fee</div>
              <div className="text-2xl font-bold text-white">$150</div>
              <div className="text-xs text-green-400 mt-1">
                Powered by Stripe
              </div>
            </div>
          </div>

          {/* Small Card - Routing */}
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-white/[0.08] rounded-3xl overflow-hidden p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Routing</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white/5 border border-white/10" />
              <div className="flex-1 h-px bg-white/20" />
              <div className="w-8 h-8 rounded bg-white/5 border border-white/10" />
              <div className="flex-1 h-px bg-white/20" />
              <div className="w-8 h-8 rounded bg-primary/20 border border-primary/50" />
            </div>
            <p className="text-xs text-white/40 mt-3">
              Route to the right person automatically
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
