import { Input } from "@/components/ui/input";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  it("accepts typed values", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Input aria-label="Search" />);

    const input = screen.getByRole("textbox", { name: /search/i });
    await user.type(input, "Northstar");

    expect(input).toHaveValue("Northstar");
  });
});
