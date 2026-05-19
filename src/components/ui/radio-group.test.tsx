import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

function RadioHarness() {
  const [value, setValue] = useState("monthly");

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div>
        <RadioGroupItem value="monthly" aria-label="Monthly" /> Monthly
      </div>
      <div>
        <RadioGroupItem value="annual" aria-label="Annual" /> Annual
      </div>
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("changes selected option", async () => {
    const user = userEvent.setup();
    renderWithProviders(<RadioHarness />);

    const annual = screen.getByRole("radio", { name: /annual/i });
    await user.click(annual);

    expect(annual).toHaveAttribute("data-state", "checked");
  });
});
