import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Tabs", () => {
  it("shows the default tab content", () => {
    renderWithProviders(
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="activity">Activity panel</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("Overview panel")).toBeInTheDocument();
    expect(screen.queryByText("Activity panel")).not.toBeInTheDocument();
  });

  it("switches content when a trigger is clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="activity">Activity panel</TabsContent>
      </Tabs>,
    );

    await user.click(screen.getByRole("tab", { name: /activity/i }));

    expect(screen.getByText("Activity panel")).toBeInTheDocument();
    expect(screen.queryByText("Overview panel")).not.toBeInTheDocument();
  });
});
