import { ErrorState } from "@/components/ui/error-state";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ErrorState", () => {
  it("renders retry action when provided", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    renderWithProviders(
      <ErrorState
        title="Data failed to load"
        description="Something went wrong."
        onRetry={onRetry}
      />,
    );

    expect(screen.getByText("Data failed to load")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /retry/i }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("omits retry button when no handler is provided", () => {
    renderWithProviders(
      <ErrorState
        title="Data failed to load"
        description="Something went wrong."
      />,
    );

    expect(
      screen.queryByRole("button", { name: /retry/i }),
    ).not.toBeInTheDocument();
  });
});
