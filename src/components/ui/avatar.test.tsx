import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";

describe("Avatar", () => {
  it("renders fallback content", () => {
    renderWithProviders(
      <Avatar>
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>,
    );

    expect(screen.getByText("AM")).toBeInTheDocument();
  });
});
