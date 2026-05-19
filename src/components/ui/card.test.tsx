import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";

describe("Card", () => {
  it("renders composed card sections", () => {
    renderWithProviders(
      <Card>
        <CardHeader>
          <CardTitle>Pipeline</CardTitle>
          <CardDescription>Executive summary</CardDescription>
        </CardHeader>
        <CardContent>Revenue details</CardContent>
      </Card>,
    );

    expect(screen.getByText("Pipeline")).toBeInTheDocument();
    expect(screen.getByText("Executive summary")).toBeInTheDocument();
    expect(screen.getByText("Revenue details")).toBeInTheDocument();
  });
});
