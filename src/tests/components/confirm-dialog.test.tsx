import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ConfirmDialog", () => {
  it("calls confirm and closes the modal from the shared dialog pattern", async () => {
    // Arrange
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();

    renderWithProviders(
      <ConfirmDialog
        open
        onOpenChange={onOpenChange}
        title="Delete customer"
        description="This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={onConfirm}
      />,
    );

    // Act
    await user.click(screen.getByRole("button", { name: /delete/i }));

    // Assert
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
