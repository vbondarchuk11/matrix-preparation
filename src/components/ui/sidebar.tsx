import { Button } from "@/components/ui/button";
import { navigationItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  open: boolean;
  onToggle: () => void;
};

export function Sidebar({ open, onToggle }: SidebarProps) {
  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-4 left-4 z-40 hidden w-72 flex-col rounded-[2rem] border bg-slate-950 px-5 py-6 text-slate-100 shadow-panel lg:flex",
          open && "lg:flex",
        )}
      >
        <SidebarContent />
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-50 transition lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="Close navigation"
          className="absolute inset-0 z-0 bg-slate-950/40 backdrop-blur-sm"
          onClick={onToggle}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 z-10 w-[82%] max-w-80 bg-slate-950 px-5 py-6 text-slate-100 transition-transform",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <SidebarContent onNavigate={onToggle} />
        </aside>
      </div>
    </>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-2">
        <div className="rounded-2xl bg-primary/20 p-3 text-primary">
          <Menu className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-400">Enterprise CRM</p>
          <h1 className="text-xl font-bold tracking-tight">Matrix Cloud</h1>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white",
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Quarterly goal
        </p>
        <p className="mt-2 text-2xl font-bold">$2.4M</p>
        <p className="mt-1 text-sm text-slate-300">
          83% of target closed across strategic accounts.
        </p>
        <Button className="mt-4 w-full bg-white text-slate-950 hover:bg-white/90">
          Review pipeline
        </Button>
      </div>
    </div>
  );
}
