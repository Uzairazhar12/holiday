import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  MapPinned,
  CalendarDays,
  Newspaper,
  Users,
  Settings,
  LogOut,
  PanelLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

const nav = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/tours', label: 'Tours', icon: MapPinned },
  { to: '/dashboard/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/dashboard/blogs', label: 'Blogs', icon: Newspaper },
  { to: '/dashboard/users', label: 'Users', icon: Users },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function AdminLayout() {
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="relative hidden min-h-screen w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 px-6 font-display text-lg">
          <PanelLeft className="h-5 w-5 text-primary" />
          Admin
        </div>
        <Separator />
        <nav className="flex flex-col gap-1 p-4">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-background hover:text-foreground',
                  isActive && 'bg-background text-foreground shadow-sm',
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <Button variant="outline" className="w-full gap-2" onClick={() => logout()}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
          <span className="font-display text-lg">Dashboard</span>
          <Button variant="outline" size="sm" onClick={() => logout()}>
            Sign out
          </Button>
        </header>
        <div className="border-b border-border bg-card px-4 py-3 lg:hidden">
          <nav className="flex flex-wrap gap-2">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  cn(
                    'rounded-full border px-3 py-1 text-xs font-medium text-muted',
                    isActive && 'border-primary bg-primary/10 text-foreground',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
