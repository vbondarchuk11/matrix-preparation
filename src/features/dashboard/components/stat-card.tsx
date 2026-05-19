import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardMetric } from "@/types";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StatCard({ label, value, delta, trend }: DashboardMetric) {
  const isUp = trend === "up";
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
              isUp
                ? "bg-success/10 text-success"
                : "bg-warning/20 text-warning-foreground",
            )}
          >
            {isUp ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {delta}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
