import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileClock,
  LayoutDashboard,
  Settings,
  Target,
  UserCircle2,
  Users,
  Users2,
} from "lucide-react";

export const navigationItems = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Deals", href: "/deals", icon: Target },
  { label: "Tasks", href: "/tasks", icon: ClipboardList },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Info", href: "/info", icon: BookOpen },
  { label: "Team", href: "/team", icon: Users2 },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Audit Logs", href: "/audit-logs", icon: FileClock },
  { label: "Profile", href: "/profile", icon: UserCircle2 },
  { label: "Settings", href: "/settings", icon: Settings },
] as const;
