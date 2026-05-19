import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { ErrorState } from "@/components/ui/error-state";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { SearchInput } from "@/components/ui/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FILTER_ALL,
  NOTIFICATION_TYPE_OPTIONS,
  ROOT_BREADCRUMB,
} from "@/constants/crm";
import { useListState } from "@/hooks/use-list-state";
import { formatDate, getStatusVariant } from "@/lib/utils";
import { crmService } from "@/services/crm-service";
import type { NotificationItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function NotificationsPage() {
  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: crmService.getNotifications,
  });
  const { search, setSearch, filters, setFilter, resetFilters } = useListState({
    state: FILTER_ALL,
    type: FILTER_ALL,
  });
  const notifications = notificationsQuery.data ?? [];

  const filtered = useMemo(
    () =>
      notifications.filter((item) => {
        const queryMatch = [item.title, item.description]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
        const stateMatch =
          filters.state === FILTER_ALL ||
          (filters.state === "Unread" ? !item.read : item.read);
        const typeMatch =
          filters.type === FILTER_ALL || item.type === filters.type;
        return queryMatch && stateMatch && typeMatch;
      }),
    [notifications, search, filters],
  );

  const columns = useMemo<ColumnDef<NotificationItem>[]>(
    () => [
      {
        header: "Notification",
        cell: ({ row }) => (
          <div>
            <p className="font-semibold">{row.original.title}</p>
            <p className="text-sm text-muted-foreground">
              {row.original.description}
            </p>
          </div>
        ),
      },
      {
        header: "Type",
        cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.type)}>
            {row.original.type}
          </Badge>
        ),
      },
      {
        header: "State",
        cell: ({ row }) => (row.original.read ? "Read" : "Unread"),
      },
      {
        header: "Time",
        cell: ({ row }) => formatDate(row.original.timestamp),
      },
    ],
    [],
  );

  if (notificationsQuery.isLoading) {
    return <Skeleton className="h-[32.5rem]" />;
  }

  if (notificationsQuery.isError) {
    return (
      <ErrorState
        title="Notifications unavailable"
        description="Workspace alerts could not be loaded."
        onRetry={() => void notificationsQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Review alerts for revenue execution, customer health, and workspace security."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Notifications" }]}
      />
      <FilterBar onReset={resetFilters}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search notifications"
        />
        <Select
          value={filters.state}
          onValueChange={(value) => setFilter("state", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All notifications</SelectItem>
            <SelectItem value="Unread">Unread</SelectItem>
            <SelectItem value="Read">Read</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.type}
          onValueChange={(value) => setFilter("type", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All types</SelectItem>
            {NOTIFICATION_TYPE_OPTIONS.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterBar>
      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
