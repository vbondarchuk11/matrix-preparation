import { ChartCard } from "@/components/ui/chart-card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FILTER_ALL,
  REPORT_CATEGORY_OPTIONS,
  ROOT_BREADCRUMB,
} from "@/constants/crm";
import { useListState } from "@/hooks/use-list-state";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { crmService } from "@/services/crm-service";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const savedReports = [
  {
    id: "r1",
    name: "Executive forecast package",
    owner: "Alicia Morgan",
    category: "Executive",
  },
  {
    id: "r2",
    name: "CS renewal watchlist",
    owner: "Jacob Lee",
    category: "Retention",
  },
  {
    id: "r3",
    name: "APAC expansion scorecard",
    owner: "Oliver Chen",
    category: "Growth",
  },
];

export function ReportsPage() {
  const reportsQuery = useQuery({
    queryKey: ["reports"],
    queryFn: crmService.getReports,
  });
  const { search, setSearch, filters, setFilter, resetFilters } = useListState({
    category: FILTER_ALL,
  });

  const filteredReports = useMemo(
    () =>
      savedReports.filter((report) => {
        const queryMatch = [report.name, report.owner]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
        const categoryMatch =
          filters.category === FILTER_ALL ||
          report.category === filters.category;
        return queryMatch && categoryMatch;
      }),
    [search, filters],
  );

  if (reportsQuery.isLoading) {
    return <Skeleton className="h-[38.75rem]" />;
  }

  if (reportsQuery.isError || !reportsQuery.data) {
    return (
      <ErrorState
        title="Reports unavailable"
        description="Analytics data could not be loaded."
        onRetry={() => void reportsQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Share executive KPIs, segment performance, and expansion trends with reusable reporting views."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Reports" }]}
      />
      <section className="grid gap-4 md:grid-cols-3">
        {reportsQuery.data.cards.map((card) => (
          <StatCard
            key={card.id}
            label={card.title}
            value={card.value}
            change={card.change}
            trend={card.trend}
          />
        ))}
      </section>
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <ChartCard
          title="Segment performance"
          description="Retention, expansion, and pipeline by segment."
        >
          <div className="h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportsQuery.data.segments}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="segment" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="pipeline"
                  fill="#2563eb"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard
          title="Segment detail"
          description="Commercial performance by portfolio segment."
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Segment</TableHead>
                <TableHead>Retention</TableHead>
                <TableHead>Expansion</TableHead>
                <TableHead>Pipeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportsQuery.data.segments.map((segment) => (
                <TableRow key={segment.segment}>
                  <TableCell>{segment.segment}</TableCell>
                  <TableCell>{formatPercent(segment.retention)}</TableCell>
                  <TableCell>{formatPercent(segment.expansion)}</TableCell>
                  <TableCell>{formatCurrency(segment.pipeline)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>
      </div>
      <ChartCard
        title="Saved reports"
        description="Searchable examples of reusable reporting assets."
      >
        <FilterBar onReset={resetFilters}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search reports"
          />
          <Select
            value={filters.category}
            onValueChange={(value) => setFilter("category", value)}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={FILTER_ALL}>All categories</SelectItem>
              {REPORT_CATEGORY_OPTIONS.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterBar>
        <div className="mt-4 space-y-3">
          {filteredReports.map((report) => (
            <div key={report.id} className="rounded-2xl border bg-card/60 p-4">
              <p className="font-semibold">{report.name}</p>
              <p className="text-sm text-muted-foreground">
                {report.owner} · {report.category}
              </p>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
