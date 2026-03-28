import Link from "next/link";
import { logoutAction } from "@/app/actions";
import { Calendar, Clock, Link as LinkIcon, LogOut, LayoutDashboard } from "lucide-react";
import { getUser } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-500" />
            <span className="font-bold text-lg text-gray-900 tracking-tight">Cal.com</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="p-3 flex-grow">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-2">Scheduling</p>
          <NavLink href="/dashboard/event-types" icon={<LinkIcon className="w-4 h-4" />} label="Event Types" />
          <NavLink href="/dashboard/bookings" icon={<Calendar className="w-4 h-4" />} label="Bookings" />
          <NavLink href="/dashboard/availability" icon={<Clock className="w-4 h-4" />} label="Availability" />
        </nav>

        {/* User profile + logout */}
        <div className="p-3 border-t border-gray-200">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          )}
          <form action={logoutAction}>
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 font-medium text-sm transition-colors group">
              <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              <span>Log out</span>
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="max-w-5xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors group"
    >
      <span className="text-gray-400 group-hover:text-indigo-600 transition-colors">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
