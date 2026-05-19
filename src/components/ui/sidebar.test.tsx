import { Sidebar } from "@/components/ui/sidebar";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Sidebar", () => {
  it("calls toggle when overlay close button is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    renderWithProviders(<Sidebar open onToggle={onToggle} />);

    await user.click(screen.getByRole("button", { name: /close navigation/i }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("renders navigation links", () => {
    renderWithProviders(<Sidebar open={false} onToggle={vi.fn()} />);

    expect(
      screen.getAllByRole("link", { name: /customers/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("Matrix Cloud").length).toBeGreaterThan(0);
  });
});
