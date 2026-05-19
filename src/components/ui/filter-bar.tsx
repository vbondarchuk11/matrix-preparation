import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

type FilterBarProps = {
  children: React.ReactNode;
  onReset?: () => void;
};

export function FilterBar({ children, onReset }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border bg-card/70 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </div>
        {children}
      </div>
      {onReset ? (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}
