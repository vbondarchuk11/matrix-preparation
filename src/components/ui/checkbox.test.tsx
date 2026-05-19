import { Checkbox } from "@/components/ui/checkbox";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

function CheckboxHarness() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(value) => setChecked(value === true)}
    />
  );
}

describe("Checkbox", () => {
  it("toggles checked state", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CheckboxHarness />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "false");

    await user.click(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });
});
