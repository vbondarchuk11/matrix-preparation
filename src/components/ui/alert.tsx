import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

type AlertProps = {
  title: string;
  description: string;
  variant?: "info" | "success" | "warning";
};

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
} as const;

export function Alert({ title, description, variant = "info" }: AlertProps) {
  const Icon = iconMap[variant];

  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border p-4",
        variant === "success" && "border-success/20 bg-success/5",
        variant === "warning" && "border-warning/30 bg-warning/10",
        variant === "info" && "border-border bg-card/80",
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
