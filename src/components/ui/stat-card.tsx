import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  description?: string;
};

export function StatCard({
  label,
  value,
  change,
  trend = "up",
  description,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {description ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {change ? (
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                trend === "up"
                  ? "bg-success/10 text-success"
                  : "bg-warning/20 text-warning-foreground",
              )}
            >
              {trend === "up" ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {change}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
