import { useToastStore } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { useEffect } from "react";

const variantMap = {
  default: {
    icon: Info,
    className: "border-border bg-card",
  },
  success: {
    icon: CheckCircle2,
    className: "border-success/20 bg-success/10",
  },
  danger: {
    icon: XCircle,
    className: "border-danger/20 bg-danger/10",
  },
} as const;

export function Toaster() {
  const { toasts, dismiss } = useToastStore();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      window.setTimeout(() => dismiss(toast.id), 3500),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [toasts, dismiss]);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const variant = variantMap[toast.variant ?? "default"];
        const Icon = variant.icon;
        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto rounded-3xl border p-4 shadow-panel backdrop-blur-sm",
              variant.className,
            )}
          >
            <div className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">{toast.title}</p>
                {toast.description ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {toast.description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
