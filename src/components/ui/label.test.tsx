import { Label } from "@/components/ui/label";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";

describe("Label", () => {
  it("associates with a control", () => {
    renderWithProviders(
      <div>
        <Label htmlFor="crm-name">Customer name</Label>
        <input id="crm-name" />
      </div>,
    );

    expect(screen.getByLabelText("Customer name")).toHaveAttribute(
      "id",
      "crm-name",
    );
  });
});
