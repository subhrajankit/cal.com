"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Calendar, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions";

const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Enterprise", href: "#enterprise" },
  { label: "Templates", href: "#templates" },
  { label: "Developer", href: "#developer" },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#pricing" },
];

type HeaderProps = {
  user?: { name: string | null; email: string } | null;
};

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMobileMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
      scrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/10" : "bg-black/60 backdrop-blur-md border-b border-white/5"
    )}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-400" />
          <span className="text-white font-bold text-lg">Cal.com</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 group"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white group-hover:bg-indigo-500 transition-colors ring-2 ring-white/10 group-hover:ring-white/20">
                  {initials}
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors hidden xl:block">
                  {user.name || user.email}
                </span>
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-white/40 truncate">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <form action={logoutAction}>
                        <button className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-white/70 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                Log in
              </Link>
              <Link href="/register">
                <Button variant="primary" size="md">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={cn(
          "fixed inset-0 z-50 bg-[#0a0a0a] lg:hidden transition-all duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <Calendar className="w-6 h-6 text-indigo-400" />
              <span className="text-white font-bold text-lg">Cal.com</span>
            </Link>
            <button
              type="button"
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex flex-col px-6 py-8 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-lg text-white/70 hover:text-white transition-colors py-3 border-b border-white/5 last:border-0"
                onClick={closeMobileMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu CTA */}
          <div className="mt-auto px-6 pb-8 flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-white/40">{user.email}</p>
                  </div>
                </div>
                <Link href="/dashboard" onClick={closeMobileMenu} className="flex items-center justify-center gap-2 py-3 text-white bg-white/10 hover:bg-white/15 rounded-xl font-medium transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <form action={logoutAction}>
                  <button className="flex w-full items-center justify-center gap-2 py-3 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl font-medium transition-colors">
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-center text-white/70 hover:text-white transition-colors py-3"
                  onClick={closeMobileMenu}
                >
                  Log in
                </Link>
                <Link href="/register" onClick={closeMobileMenu}>
                  <Button variant="primary" size="lg" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
