import { Button } from "@/components/ui/button";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";

describe("Button", () => {
  it("renders default button styles", () => {
    renderWithProviders(<Button>Save changes</Button>);

    const button = screen.getByRole("button", { name: /save changes/i });
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("h-11");
  });

  it("supports variants and sizes", () => {
    renderWithProviders(
      <Button variant="danger" size="sm">
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-danger");
    expect(button).toHaveClass("h-9");
  });

  it("renders as child when requested", () => {
    renderWithProviders(
      <Button asChild>
        <a href="/customers">Open customers</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: /open customers/i });
    expect(link).toHaveAttribute("href", "/customers");
    expect(link).toHaveClass("inline-flex");
  });
});
