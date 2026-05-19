import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("DropdownMenu", () => {
  it("opens the menu and triggers item actions", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    renderWithProviders(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button">Actions</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onSelect}>Edit account</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByRole("button", { name: /actions/i }));
    await user.click(screen.getByRole("menuitem", { name: /edit account/i }));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("supports checkbox menu items", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    renderWithProviders(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button">Filters</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Active only
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByRole("button", { name: /filters/i }));
    await user.click(
      screen.getByRole("menuitemcheckbox", { name: /active only/i }),
    );

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
