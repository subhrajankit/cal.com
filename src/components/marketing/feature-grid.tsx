import {
  CalendarPlus,
  Clock,
  Users,
  Puzzle,
  Workflow,
  Code,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    Icon: CalendarPlus,
    title: "Event Types",
    description:
      "Create multiple event types for different meeting durations and purposes.",
  },
  {
    Icon: Clock,
    title: "Smart Availability",
    description:
      "Set your working hours and let Cal.com find the perfect time.",
  },
  {
    Icon: Users,
    title: "Team Scheduling",
    description:
      "Round-robin, collective, and managed event types for teams.",
  },
  {
    Icon: Puzzle,
    title: "100+ Integrations",
    description:
      "Connect your calendars, video conferencing, and payment tools.",
  },
  {
    Icon: Workflow,
    title: "Workflows",
    description: "Automate reminders, follow-ups, and custom actions.",
  },
  {
    Icon: Code,
    title: "Embed Anywhere",
    description: "Add scheduling to your website with a simple embed code.",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
          Everything you need to schedule
        </h2>
        <p className="text-white/60 text-center mt-4 max-w-2xl mx-auto">
          Powerful features to help you manage your calendar and meetings
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {features.map((feature) => {
            const IconComponent = feature.Icon;
            return (
              <div
                key={feature.title}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300"
              >
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/60 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
