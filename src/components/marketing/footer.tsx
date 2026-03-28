import Link from "next/link";
import { Calendar, Twitter, Github, MessageCircle, Linkedin } from "lucide-react";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "Self-hosted", href: "#" },
      { label: "SaaS Hosting", href: "#" },
      { label: "Enterprise", href: "#" },
      { label: "Platform", href: "#" },
      { label: "Atoms", href: "#" },
      { label: "Cal.ai", href: "#" },
    ],
  },
  {
    title: "Use Cases",
    links: [
      { label: "Sales Teams", href: "#" },
      { label: "Marketing", href: "#" },
      { label: "Recruiting", href: "#" },
      { label: "Support", href: "#" },
      { label: "Education", href: "#" },
      { label: "Consulting", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Status", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Open Startup", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "DPA", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/calcom", label: "Twitter" },
  { icon: Github, href: "https://github.com/calcom/cal.com", label: "GitHub" },
  { icon: MessageCircle, href: "https://discord.gg/calcom", label: "Discord" },
  { icon: Linkedin, href: "https://linkedin.com/company/calcom", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {column.title}
              </h4>
              <ul className="space-y-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white/80 transition-colors py-1.5 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-white/50" />
              <span className="text-white/50 font-semibold text-sm">
                Cal.com
              </span>
            </Link>
            <span className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} Cal.com, Inc.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
