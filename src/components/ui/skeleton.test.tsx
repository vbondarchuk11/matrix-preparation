import { Skeleton } from "@/components/ui/skeleton";
import { renderWithProviders } from "@/test/test-utils";

describe("Skeleton", () => {
  it("renders loading styles", () => {
    const { container } = renderWithProviders(
      <Skeleton className="h-10 w-10" />,
    );

    expect(container.firstChild).toHaveClass("animate-pulse");
    expect(container.firstChild).toHaveClass("bg-muted");
  });
});
