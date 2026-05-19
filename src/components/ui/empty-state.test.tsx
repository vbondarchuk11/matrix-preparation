import { EmptyState } from "@/components/ui/empty-state";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("EmptyState", () => {
  it("renders title and description", () => {
    renderWithProviders(
      <EmptyState
        title="No pipeline yet"
        description="Create your first account to get started."
      />,
    );

    expect(screen.getByText("No pipeline yet")).toBeInTheDocument();
    expect(
      screen.getByText("Create your first account to get started."),
    ).toBeInTheDocument();
  });

  it("triggers action when action button is shown", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    renderWithProviders(
      <EmptyState
        title="No pipeline yet"
        description="Create your first account to get started."
        actionLabel="Add account"
        onAction={onAction}
      />,
    );

    await user.click(screen.getByRole("button", { name: /add account/i }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
