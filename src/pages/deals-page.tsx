import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/ui/chart-card";
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
import { StatCard } from "@/components/ui/stat-card";
import {
  DEAL_STAGE_OPTIONS,
  FILTER_ALL,
  ROOT_BREADCRUMB,
} from "@/constants/crm";
import { useListState } from "@/hooks/use-list-state";
import { formatCurrency, formatDate, getStatusVariant } from "@/lib/utils";
import { crmService } from "@/services/crm-service";
import type { Deal } from "@/types";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function DealsPage() {
  const dealsQuery = useQuery({
    queryKey: ["deals"],
    queryFn: crmService.getDeals,
  });
  const { search, setSearch, filters, setFilter, resetFilters } = useListState({
    stage: FILTER_ALL,
    owner: FILTER_ALL,
  });

  const deals = dealsQuery.data ?? [];
  const filtered = useMemo(
    () =>
      deals.filter((deal) => {
        const queryMatch = [
          deal.name,
          deal.customerName,
          deal.owner,
          deal.source,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
        const stageMatch =
          filters.stage === FILTER_ALL || deal.stage === filters.stage;
        const ownerMatch =
          filters.owner === FILTER_ALL || deal.owner === filters.owner;
        return queryMatch && stageMatch && ownerMatch;
      }),
    [deals, search, filters],
  );

  const pipelineByStage = useMemo(() => {
    const groups = new Map<string, number>();
    for (const deal of filtered) {
      groups.set(deal.stage, (groups.get(deal.stage) ?? 0) + deal.value);
    }
    return Array.from(groups, ([stage, value]) => ({ stage, value }));
  }, [filtered]);

  const columns = useMemo<ColumnDef<Deal>[]>(
    () => [
      {
        header: "Deal",
        cell: ({ row }) => (
          <div>
            <Link
              to={`/deals/${row.original.id}`}
              className="font-semibold transition hover:text-primary"
            >
              {row.original.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {row.original.customerName}
            </p>
          </div>
        ),
      },
      { header: "Owner", accessorKey: "owner" },
      {
        header: "Stage",
        cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.stage)}>
            {row.original.stage}
          </Badge>
        ),
      },
      {
        header: "Close",
        cell: ({ row }) => formatDate(row.original.expectedClose),
      },
      {
        header: "Value",
        cell: ({ row }) => formatCurrency(row.original.value),
      },
    ],
    [],
  );

  if (dealsQuery.isLoading) {
    return <Skeleton className="h-[40rem]" />;
  }

  if (dealsQuery.isError) {
    return (
      <ErrorState
        title="Deals failed to load"
        description="The pipeline workspace is currently unavailable."
        onRetry={() => void dealsQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deals"
        description="Review pipeline quality, stage movement, and close timing across the commercial portfolio."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Deals" }]}
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pipeline value"
          value={formatCurrency(
            filtered.reduce((sum, item) => sum + item.value, 0),
          )}
        />
        <StatCard
          label="Weighted forecast"
          value={formatCurrency(
            filtered.reduce(
              (sum, item) => sum + item.value * (item.probability / 100),
              0,
            ),
          )}
        />
        <StatCard label="Open deals" value={String(filtered.length)} />
        <StatCard
          label="Avg probability"
          value={`${Math.round(filtered.reduce((sum, item) => sum + item.probability, 0) / Math.max(filtered.length, 1))}%`}
        />
      </section>
      <FilterBar onReset={resetFilters}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search deals"
        />
        <Select
          value={filters.stage}
          onValueChange={(value) => setFilter("stage", value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All stages</SelectItem>
            {DEAL_STAGE_OPTIONS.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.owner}
          onValueChange={(value) => setFilter("owner", value)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Owner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All owners</SelectItem>
            {Array.from(new Set(deals.map((deal) => deal.owner))).map(
              (owner) => (
                <SelectItem key={owner} value={owner}>
                  {owner}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </FilterBar>
      <div className="grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <ChartCard
          title="Pipeline by stage"
          description="Commercial weight by deal stage."
        >
          <div className="h-[18.75rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineByStage}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="stage" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard
          title="Deal register"
          description="Searchable pipeline table with reusable data table patterns."
        >
          <DataTable columns={columns} data={filtered} />
        </ChartCard>
      </div>
    </div>
  );
}
