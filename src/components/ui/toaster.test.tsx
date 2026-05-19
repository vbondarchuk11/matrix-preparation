import { Toaster } from "@/components/ui/toaster";
import { useToastStore } from "@/hooks/use-toast";
import { renderWithProviders } from "@/test/test-utils";
import { act, screen } from "@testing-library/react";

describe("Toaster", () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it("renders pushed toasts", () => {
    useToastStore.getState().push({
      title: "Saved",
      description: "Customer updated successfully.",
      variant: "success",
    });

    renderWithProviders(<Toaster />);

    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(
      screen.getByText("Customer updated successfully."),
    ).toBeInTheDocument();
  });

  it("dismisses a toast after its timeout", async () => {
    vi.useFakeTimers();
    useToastStore.getState().push({
      title: "Queued",
      description: "Background sync started.",
      variant: "default",
    });

    renderWithProviders(<Toaster />);

    expect(screen.getByText("Queued")).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3500);
    });

    expect(useToastStore.getState().toasts).toHaveLength(0);
    expect(screen.queryByText("Queued")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
