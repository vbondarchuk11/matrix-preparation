import { Badge } from "@/components/ui/badge";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";

describe("Badge", () => {
  it("renders success variant styles", () => {
    renderWithProviders(<Badge variant="success">Active</Badge>);

    const badge = screen.getByText("Active");
    expect(badge).toHaveClass("bg-success/10");
    expect(badge).toHaveClass("text-success");
  });
});
