import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-background via-[#1a1a2e] to-[#16162a]">
      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Start scheduling in minutes
        </h2>

        {/* Subtitle */}
        <p className="text-white/60 mt-6 max-w-xl mx-auto">
          Join thousands of professionals who trust Cal.com for their scheduling
          needs.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button variant="primary" size="lg">
              Get Started Free
            </Button>
          </Link>
          <Button variant="secondary" size="lg">
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
