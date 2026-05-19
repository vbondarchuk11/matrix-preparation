import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, getStatusVariant } from "@/lib/utils";
import type { Customer } from "@/types";
import { MoreHorizontal, Pencil, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const pageSize = 5;

type CustomersTableProps = {
  customers: Customer[];
  onCreate: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
};

export function CustomersTable({
  customers,
  onCreate,
  onEdit,
  onDelete,
}: CustomersTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      customers.filter((customer) =>
        [
          customer.company,
          customer.owner,
          customer.email,
          customer.plan,
          customer.industry,
          customer.region,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [customers, search],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (customers.length === 0) {
    return (
      <EmptyState
        title="No customers yet"
        description="Start building your pipeline with a reusable CRUD workflow."
        actionLabel="Create customer"
        onAction={onCreate}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Customer directory</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Search, filter, and manage customer accounts across segments.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => {
                setPage(1);
                setSearch(event.target.value);
              }}
              placeholder="Search accounts"
              className="pl-10"
            />
          </div>
          <Button onClick={onCreate}>Add customer</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>MRR</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div>
                    <Link
                      to={`/customers/${customer.id}`}
                      className="font-semibold transition hover:text-primary"
                    >
                      {customer.company}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {customer.email} · {customer.industry}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{customer.owner}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(customer.health)}>
                    {customer.health}
                  </Badge>
                </TableCell>
                <TableCell>{customer.plan}</TableCell>
                <TableCell>{formatCurrency(customer.mrr)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(customer)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(customer.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrevious={() => setPage((value) => Math.max(1, value - 1))}
          onNext={() => setPage((value) => Math.min(totalPages, value + 1))}
        />
      </CardContent>
    </Card>
  );
}
