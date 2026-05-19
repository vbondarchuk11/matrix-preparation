import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative hidden overflow-hidden bg-slate-950 px-10 py-12 text-white lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.25),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(8,145,178,0.28),transparent_30%)]" />
        <div className="relative flex-1">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">
            Matrix CRM
          </p>
          <h1 className="mt-6 max-w-lg text-5xl font-bold leading-tight">
            Revenue intelligence for modern customer teams.
          </h1>
          <p className="mt-6 max-w-xl text-base text-slate-300">
            Bring pipeline visibility, lifecycle automation, and account
            expansion workflows into one refined operating system.
          </p>
        </div>
        <div className="relative grid gap-4 md:grid-cols-3">
          {[
            ["92%", "forecast accuracy"],
            ["18 days", "faster sales cycle"],
            ["4.8/5", "operator satisfaction"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <p className="text-3xl font-bold">{value}</p>
              <p className="mt-2 text-sm text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
