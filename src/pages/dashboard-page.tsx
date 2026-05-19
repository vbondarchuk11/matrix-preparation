import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/ui/chart-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { PageHeader } from "@/components/ui/page-header";
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
import { Tooltip } from "@/components/ui/tooltip";
import { ROOT_BREADCRUMB } from "@/constants/crm";
import { RevenueChart } from "@/features/dashboard/components/revenue-chart";
import { formatCurrency, formatDate, getStatusVariant } from "@/lib/utils";
import { crmService } from "@/services/crm-service";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: crmService.getDashboard,
  });

  if (dashboardQuery.isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28" />
        <div className="grid gap-4 xl:grid-cols-4">
          {["a", "b", "c", "d"].map((item) => (
            <Skeleton key={item} className="h-36" />
          ))}
        </div>
        <Skeleton className="h-[26.25rem]" />
      </div>
    );
  }

  if (dashboardQuery.isError || !dashboardQuery.data) {
    return (
      <ErrorState
        title="Dashboard unavailable"
        description="We couldn't load executive metrics for this workspace."
        onRetry={() => void dashboardQuery.refetch()}
      />
    );
  }

  const data = dashboardQuery.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue command center"
        description="Track growth, forecast health, expansion opportunities, and operational focus areas across your CRM."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Dashboard" }]}
        actions={data.quickActions.map((action) => (
          <Tooltip key={action.id} content={action.description}>
            <Button asChild variant="outline">
              <Link to={action.href}>{action.title}</Link>
            </Button>
          </Tooltip>
        ))}
      />

      <Alert
        variant="warning"
        title="Executive risk to review"
        description="Two strategic accounts have unresolved security blockers before renewal review on May 23."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.delta}
            trend={metric.trend}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
        <ChartCard
          title="Revenue and pipeline trend"
          description="Monthly booked revenue versus weighted pipeline."
          action={<Badge variant="success">Updated 4 minutes ago</Badge>}
        >
          <RevenueChart data={data.salesSeries} />
        </ChartCard>

        <div className="grid gap-4">
          <ChartCard
            title="Recent activity"
            description="Critical actions and operating changes across the workspace."
          >
            <div className="space-y-4">
              {data.recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border bg-card/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{item.title}</p>
                    <Badge variant={getStatusVariant(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {item.actor} ·{" "}
                    {formatDate(item.timestamp, {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard
            title="Upcoming tasks"
            description="Near-term work driving renewals and forecast confidence."
          >
            <div className="space-y-3">
              {data.upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-2xl bg-muted/40 p-4"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {task.assignee} · {task.account}
                    </p>
                  </div>
                  <Badge variant={getStatusVariant(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard
          title="Active deals"
          description="Highest-impact opportunities currently shaping forecast."
        >
          {data.activeDeals.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Close</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.activeDeals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <Link
                        to={`/deals/${deal.id}`}
                        className="font-semibold transition hover:text-primary"
                      >
                        {deal.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {deal.customerName}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(deal.stage)}>
                        {deal.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(deal.expectedClose)}</TableCell>
                    <TableCell>{formatCurrency(deal.value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              title="No active deals"
              description="Create opportunities to start forecasting revenue."
            />
          )}
        </ChartCard>

        <ChartCard
          title="Quick actions"
          description="Operational shortcuts for revenue leadership."
        >
          <div className="grid gap-3">
            {data.quickActions.map((action) => (
              <Link
                key={action.id}
                to={action.href}
                className="rounded-2xl border bg-card/60 p-4 transition hover:border-primary/40 hover:bg-card"
              >
                <p className="font-semibold">{action.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </ChartCard>
      </section>
    </div>
  );
}
