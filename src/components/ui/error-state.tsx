import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

type ErrorStateProps = {
  title: string;
  description: string;
  onRetry?: () => void;
};

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border bg-danger/5 px-6 py-14 text-center">
      <div className="mb-4 rounded-2xl bg-danger/10 p-4 text-danger">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {onRetry ? (
        <Button variant="danger" className="mt-6" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
