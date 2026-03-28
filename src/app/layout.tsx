import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cal.com | Open Scheduling Infrastructure",
  description:
    "Cal.com is the open-source scheduling platform. Focus on meeting, not making meetings. Self-host for free or let us handle the infrastructure.",
  keywords: [
    "scheduling",
    "calendar",
    "meetings",
    "open source",
    "booking",
    "appointments",
  ],
  authors: [{ name: "Cal.com" }],
  openGraph: {
    title: "Cal.com | Open Scheduling Infrastructure",
    description:
      "Cal.com is the open-source scheduling platform. Focus on meeting, not making meetings.",
    type: "website",
    locale: "en_US",
    siteName: "Cal.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cal.com | Open Scheduling Infrastructure",
    description:
      "Cal.com is the open-source scheduling platform. Focus on meeting, not making meetings.",
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
