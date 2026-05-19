import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

function SelectHarness() {
  const [value, setValue] = useState("growth");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger aria-label="Plan">
        <SelectValue placeholder="Select plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="starter">Starter</SelectItem>
        <SelectItem value="growth">Growth</SelectItem>
        <SelectItem value="enterprise">Enterprise</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("shows the selected value and updates it", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SelectHarness />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Growth");

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /enterprise/i }));

    expect(screen.getByRole("combobox")).toHaveTextContent("Enterprise");
  });
});
