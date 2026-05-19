import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

type DatePickerProps = {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
};

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  return (
    <div className={cn("relative", className)}>
      <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="date"
        className="pl-11"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
