const companies = [
  "Vercel",
  "GitHub",
  "Stripe",
  "Linear",
  "Notion",
  "Supabase",
  "Resend",
  "Dub",
];

export function LogoCloud() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <p className="text-sm uppercase tracking-widest text-white/40 text-center mb-10">
          Trusted by teams at
        </p>

        {/* Logo Row */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {companies.map((company) => (
            <span
              key={company}
              className="text-white/30 hover:text-white/50 transition-colors text-lg font-semibold"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
