import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6">
      {/* Gradient Background Effect */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Announcement Badge */}
        <a
          href="#cal-ai"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors mb-8"
        >
          <span className="text-primary">New:</span>
          <span>Cal.ai is here</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto">
          Scheduling infrastructure for everyone
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-white/60 max-w-2xl mx-auto mt-6 leading-relaxed">
          Cal.com is the open source scheduling platform. Focus on meeting, not
          making meetings.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
          <Button variant="secondary" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
