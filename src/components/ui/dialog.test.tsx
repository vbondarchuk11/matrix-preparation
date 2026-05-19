import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { renderWithProviders } from "@/test/test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Dialog", () => {
  it("opens and closes dialog content", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <Dialog>
        <DialogTrigger>Open modal</DialogTrigger>
        <DialogContent>
          <DialogTitle>Customer details</DialogTitle>
          <DialogDescription>Review the account record.</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: /open modal/i }));
    expect(screen.getByText("Customer details")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close dialog/i }));

    await waitFor(() => {
      expect(screen.queryByText("Customer details")).not.toBeInTheDocument();
    });
  });
});
