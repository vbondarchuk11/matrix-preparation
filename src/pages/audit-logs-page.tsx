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
  AUDIT_SEVERITY_OPTIONS,
  FILTER_ALL,
  ROOT_BREADCRUMB,
} from "@/constants/crm";
import { useListState } from "@/hooks/use-list-state";
import { formatDate, getStatusVariant } from "@/lib/utils";
import { crmService } from "@/services/crm-service";
import type { AuditLog } from "@/types";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function AuditLogsPage() {
  const logsQuery = useQuery({
    queryKey: ["audit-logs"],
    queryFn: crmService.getAuditLogs,
  });
  const { search, setSearch, filters, setFilter, resetFilters } = useListState({
    severity: FILTER_ALL,
  });
  const logs = logsQuery.data ?? [];
  const filtered = useMemo(
    () =>
      logs.filter((log) => {
        const queryMatch = [log.actor, log.action, log.target, log.ipAddress]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
        const severityMatch =
          filters.severity === FILTER_ALL || log.severity === filters.severity;
        return queryMatch && severityMatch;
      }),
    [logs, search, filters],
  );

  const columns = useMemo<ColumnDef<AuditLog>[]>(
    () => [
      { header: "Actor", accessorKey: "actor" },
      { header: "Action", accessorKey: "action" },
      { header: "Target", accessorKey: "target" },
      {
        header: "Severity",
        cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.severity)}>
            {row.original.severity}
          </Badge>
        ),
      },
      {
        header: "Timestamp",
        cell: ({ row }) => formatDate(row.original.timestamp),
      },
    ],
    [],
  );

  if (logsQuery.isLoading) {
    return <Skeleton className="h-[32.5rem]" />;
  }

  if (logsQuery.isError) {
    return (
      <ErrorState
        title="Audit logs unavailable"
        description="Operational trace data could not be loaded."
        onRetry={() => void logsQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit logs"
        description="Inspect sensitive configuration changes, exports, and security-related actions."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Audit logs" }]}
      />
      <FilterBar onReset={resetFilters}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search logs"
        />
        <Select
          value={filters.severity}
          onValueChange={(value) => setFilter("severity", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All severities</SelectItem>
            {AUDIT_SEVERITY_OPTIONS.map((value) => (
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
