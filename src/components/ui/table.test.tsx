import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";

describe("Table", () => {
  it("renders headers and rows", () => {
    renderWithProviders(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Northstar Labs</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(
      screen.getByRole("columnheader", { name: /company/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: /northstar labs/i }),
    ).toBeInTheDocument();
  });
});
