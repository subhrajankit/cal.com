const categories = [
  { label: "All", active: true },
  { label: "Calendars", active: false },
  { label: "Video", active: false },
  { label: "Payment", active: false },
  { label: "CRM", active: false },
  { label: "Automation", active: false },
];

const integrations = [
  { name: "Google Calendar", letter: "G", color: "text-red-400" },
  { name: "Outlook", letter: "O", color: "text-blue-400" },
  { name: "Apple", letter: "A", color: "text-white/60" },
  { name: "Zoom", letter: "Z", color: "text-blue-500" },
  { name: "Meet", letter: "M", color: "text-green-400" },
  { name: "Teams", letter: "T", color: "text-purple-400" },
  { name: "Stripe", letter: "S", color: "text-indigo-400" },
  { name: "HubSpot", letter: "H", color: "text-orange-400" },
  { name: "Zapier", letter: "Z", color: "text-orange-500" },
  { name: "Slack", letter: "S", color: "text-green-500" },
  { name: "GitHub", letter: "G", color: "text-white/80" },
  { name: "Salesforce", letter: "S", color: "text-blue-300" },
  { name: "PayPal", letter: "P", color: "text-blue-400" },
  { name: "Webex", letter: "W", color: "text-green-300" },
  { name: "Daily", letter: "D", color: "text-yellow-400" },
  { name: "Make", letter: "M", color: "text-purple-300" },
];

export function IntegrationShowcase() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
          Connects with your favorite tools
        </h2>
        <p className="text-white/60 text-center mt-4 max-w-2xl mx-auto">
          Seamlessly integrate with the tools you already use
        </p>

        {/* Category Pills */}
        <div
          role="tablist"
          aria-label="Integration categories"
          className="flex flex-wrap justify-center gap-2 mt-8"
        >
          {categories.map((category) => (
            <button
              key={category.label}
              type="button"
              role="tab"
              aria-selected={category.active}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                category.active
                  ? "bg-white/10 text-white"
                  : "bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-10 max-w-4xl mx-auto">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              role="img"
              aria-label={integration.name}
              className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.08] transition-colors group"
            >
              <span
                className={`text-xl font-bold ${integration.color} group-hover:scale-110 transition-transform`}
                aria-hidden="true"
              >
                {integration.letter}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-sm text-white/40 text-center mt-6">
          And 100+ more integrations
        </p>
      </div>
    </section>
  );
}
