import { Pagination } from "@/components/ui/pagination";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Pagination", () => {
  it("disables previous button on the first page", () => {
    renderWithProviders(
      <Pagination
        page={1}
        totalPages={3}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
  });

  it("calls navigation handlers", async () => {
    const user = userEvent.setup();
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    renderWithProviders(
      <Pagination
        page={2}
        totalPages={3}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    await user.click(screen.getByRole("button", { name: /previous/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
