import { CustomersTable } from "@/features/customers/components/customers-table";
import { renderWithProviders } from "@/test/test-utils";
import type { Customer } from "@/types";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const customers: Customer[] = [
  {
    id: "cus_001",
    company: "Northstar Labs",
    industry: "Biotech",
    owner: "Mia Turner",
    email: "ops@northstarlabs.com",
    status: "Active",
    health: "Healthy",
    plan: "Enterprise",
    region: "North America",
    segment: "Strategic",
    mrr: 28000,
    arr: 336000,
    createdAt: "2026-01-12",
    renewalDate: "2026-11-20",
    contacts: 8,
    openDeals: 2,
    notes: "Strong account",
  },
  {
    id: "cus_002",
    company: "Silverline Health",
    industry: "Healthcare",
    owner: "Jacob Lee",
    email: "finance@silverline.health",
    status: "At risk",
    health: "Needs attention",
    plan: "Growth",
    region: "Europe",
    segment: "Commercial",
    mrr: 9200,
    arr: 110400,
    createdAt: "2026-02-04",
    renewalDate: "2026-08-16",
    contacts: 4,
    openDeals: 1,
    notes: "Renewal risk",
  },
  {
    id: "cus_003",
    company: "Futura Mobility",
    industry: "Mobility",
    owner: "Nina Patel",
    email: "hello@futuramobility.com",
    status: "Lead",
    health: "Healthy",
    plan: "Starter",
    region: "North America",
    segment: "SMB",
    mrr: 1800,
    arr: 21600,
    createdAt: "2026-04-20",
    renewalDate: "2027-04-20",
    contacts: 2,
    openDeals: 1,
    notes: "Early lead",
  },
  {
    id: "cus_004",
    company: "Atlas Commerce",
    industry: "Retail",
    owner: "Oliver Chen",
    email: "growth@atlascommerce.com",
    status: "Active",
    health: "Healthy",
    plan: "Growth",
    region: "APAC",
    segment: "Commercial",
    mrr: 14600,
    arr: 175200,
    createdAt: "2026-03-11",
    renewalDate: "2027-03-11",
    contacts: 6,
    openDeals: 3,
    notes: "Expansion motion",
  },
  {
    id: "cus_005",
    company: "Bluepeak Energy",
    industry: "Energy",
    owner: "Lila Grant",
    email: "team@bluepeak.energy",
    status: "Lead",
    health: "Healthy",
    plan: "Starter",
    region: "Europe",
    segment: "SMB",
    mrr: 2400,
    arr: 28800,
    createdAt: "2026-03-28",
    renewalDate: "2027-03-28",
    contacts: 3,
    openDeals: 1,
    notes: "Pilot account",
  },
  {
    id: "cus_006",
    company: "Summit AI",
    industry: "Software",
    owner: "Ethan Wells",
    email: "contact@summitai.io",
    status: "Active",
    health: "Critical",
    plan: "Enterprise",
    region: "North America",
    segment: "Strategic",
    mrr: 32000,
    arr: 384000,
    createdAt: "2026-05-03",
    renewalDate: "2026-09-12",
    contacts: 9,
    openDeals: 2,
    notes: "Escalated account",
  },
];

describe("CustomersTable", () => {
  it("filters customers by search input", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CustomersTable
        customers={customers}
        onCreate={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    await user.type(screen.getByPlaceholderText(/search accounts/i), "Summit");

    expect(screen.getByText("Summit AI")).toBeInTheDocument();
    expect(screen.queryByText("Northstar Labs")).not.toBeInTheDocument();
  });

  it("paginates long customer lists", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CustomersTable
        customers={customers}
        onCreate={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("Northstar Labs")).toBeInTheDocument();
    expect(screen.queryByText("Summit AI")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText("Summit AI")).toBeInTheDocument();
    expect(screen.queryByText("Northstar Labs")).not.toBeInTheDocument();
  });

  it("calls edit and delete handlers from row actions", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    renderWithProviders(
      <CustomersTable
        customers={customers}
        onCreate={vi.fn()}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    const row = screen.getByText("Northstar Labs").closest("tr");
    expect(row).not.toBeNull();

    const actionButton = within(row as HTMLElement).getByRole("button");
    await user.click(actionButton);
    await user.click(screen.getByRole("menuitem", { name: /edit/i }));

    expect(onEdit).toHaveBeenCalledWith(
      expect.objectContaining({ id: "cus_001" }),
    );

    await user.click(within(row as HTMLElement).getByRole("button"));
    await user.click(screen.getByRole("menuitem", { name: /delete/i }));

    expect(onDelete).toHaveBeenCalledWith("cus_001");
  });
});
