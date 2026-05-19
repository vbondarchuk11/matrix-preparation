import { cn } from "@/lib/utils";

type StepperProps = {
  steps: readonly string[];
  currentStep: string;
};

export function Stepper({ steps, currentStep }: StepperProps) {
  const activeIndex = Math.max(steps.indexOf(currentStep), 0);

  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                index <= activeIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                index <= activeIndex
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {step}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
