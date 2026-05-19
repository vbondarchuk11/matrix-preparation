import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ErrorState } from "@/components/ui/error-state";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import {
  CUSTOMER_HEALTH,
  CUSTOMER_SEGMENT_OPTIONS,
  CUSTOMER_STATUS_OPTIONS,
  FILTER_ALL,
  ROOT_BREADCRUMB,
} from "@/constants/crm";
import { CustomerFormDialog } from "@/features/customers/components/customer-form-dialog";
import { CustomersTable } from "@/features/customers/components/customers-table";
import { useDeleteCustomer } from "@/features/customers/hooks/use-customers";
import { useListState } from "@/hooks/use-list-state";
import { crmService } from "@/services/crm-service";
import type { Customer } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export function CustomersPage() {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleteCustomer = useDeleteCustomer();
  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: crmService.getCustomers,
  });
  const { filters, setFilter, resetFilters } = useListState({
    status: FILTER_ALL,
    segment: FILTER_ALL,
  });

  const customers = customersQuery.data ?? [];

  const filtered = useMemo(
    () =>
      customers.filter((customer) => {
        const statusMatch =
          filters.status === FILTER_ALL || customer.status === filters.status;
        const segmentMatch =
          filters.segment === FILTER_ALL ||
          customer.segment === filters.segment;
        return statusMatch && segmentMatch;
      }),
    [customers, filters],
  );

  const metrics = useMemo(() => {
    const totalMrr = filtered.reduce((sum, customer) => sum + customer.mrr, 0);
    return {
      accounts: filtered.length,
      healthy: filtered.filter(
        (item) => item.health === CUSTOMER_HEALTH.HEALTHY,
      ).length,
      expansion: filtered.reduce((sum, item) => sum + item.openDeals, 0),
      totalMrr,
    };
  }, [filtered]);

  if (customersQuery.isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28" />
        <div className="grid gap-4 xl:grid-cols-4">
          {["1", "2", "3", "4"].map((item) => (
            <Skeleton key={item} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[32.5rem]" />
      </div>
    );
  }

  if (customersQuery.isError) {
    return (
      <ErrorState
        title="Customers unavailable"
        description="The CRM could not load account data."
        onRetry={() => void customersQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Monitor account health, commercial potential, and renewal readiness across your customer portfolio."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Customers" }]}
        actions={
          <Button
            onClick={() => {
              setSelectedCustomer(null);
              setOpen(true);
            }}
          >
            Create customer
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Accounts"
          value={String(metrics.accounts)}
          description="Filtered portfolio accounts"
        />
        <StatCard
          label="Healthy accounts"
          value={String(metrics.healthy)}
          description="Accounts in good standing"
        />
        <StatCard
          label="Open expansions"
          value={String(metrics.expansion)}
          description="Expansion motions in flight"
        />
        <StatCard
          label="Portfolio MRR"
          value={`$${metrics.totalMrr.toLocaleString()}`}
          description="Monthly recurring revenue"
        />
      </section>

      <FilterBar onReset={resetFilters}>
        <Select
          value={filters.status}
          onValueChange={(value) => setFilter("status", value)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All statuses</SelectItem>
            {CUSTOMER_STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.segment}
          onValueChange={(value) => setFilter("segment", value)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Segment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All segments</SelectItem>
            {CUSTOMER_SEGMENT_OPTIONS.map((segment) => (
              <SelectItem key={segment} value={segment}>
                {segment}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterBar>

      <CustomersTable
        customers={filtered}
        onCreate={() => {
          setSelectedCustomer(null);
          setOpen(true);
        }}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setOpen(true);
        }}
        onDelete={(id) => setDeleteId(id)}
      />

      <CustomerFormDialog
        open={open}
        onOpenChange={setOpen}
        customer={selectedCustomer}
      />
      <ConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(value) => !value && setDeleteId(null)}
        title="Delete customer record"
        description="This action removes the account from the workspace and cannot be undone."
        confirmLabel="Delete customer"
        onConfirm={() => {
          if (deleteId) {
            void deleteCustomer.mutateAsync(deleteId);
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
