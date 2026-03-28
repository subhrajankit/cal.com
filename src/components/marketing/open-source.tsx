import { Github } from "lucide-react";

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "40k+", label: "GitHub Stars" },
  { value: "700+", label: "Contributors" },
  { value: "100%", label: "Open Source" },
];

export function OpenSource() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Open Source First
        </h2>
        <p className="text-white/60 mt-4 max-w-2xl mx-auto">
          Cal.com is the #1 open source scheduling platform. Self-host for free
          or let us handle the infrastructure.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-12 mt-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* GitHub Button */}
        <a
          href="https://github.com/calcom/cal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#24292e] text-white px-5 py-3 rounded-lg mt-8 hover:bg-[#2f363d] transition-colors"
        >
          <Github className="w-5 h-5" />
          <span>Star on GitHub</span>
          <span className="bg-white/10 rounded px-2 py-0.5 text-xs">40.2k</span>
        </a>
      </div>
    </section>
  );
}
