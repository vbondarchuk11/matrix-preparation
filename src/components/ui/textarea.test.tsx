import { Textarea } from "@/components/ui/textarea";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Textarea", () => {
  it("accepts multiline values", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Textarea aria-label="Notes" />);

    const textarea = screen.getByRole("textbox", { name: /notes/i });
    await user.type(textarea, "Customer requested pricing update");

    expect(textarea).toHaveValue("Customer requested pricing update");
  });
});
