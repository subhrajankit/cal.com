type Testimonial = {
  quote: string;
  author: string;
  title: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Cal.com has transformed how our sales team handles scheduling. We've reduced no-shows by 40%.",
    author: "Sarah Chen",
    title: "Head of Sales at TechCorp",
  },
  {
    quote:
      "The best scheduling tool we've used. Open source means we can self-host and customize.",
    author: "Marcus Rodriguez",
    title: "CTO at StartupXYZ",
  },
  {
    quote:
      "Switching from Calendly was seamless. The team features and integrations are unmatched.",
    author: "Emily Park",
    title: "Operations Lead at GrowthCo",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
          Loved by teams worldwide
        </h2>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.06] rounded-2xl p-8"
            >
              {/* Quote Mark */}
              <span className="text-4xl text-indigo-500/50 block mb-4" aria-hidden="true">
                &ldquo;
              </span>

              {/* Quote Text */}
              <blockquote className="text-white text-lg leading-relaxed">
                {testimonial.quote}
              </blockquote>

              {/* Author */}
              <figcaption className="mt-6">
                <cite className="text-white font-semibold not-italic block">{testimonial.author}</cite>
                <span className="text-white/50 text-sm">{testimonial.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
