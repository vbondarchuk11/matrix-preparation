import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/ui/chart-card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CUSTOMER_HEALTH, ROOT_BREADCRUMB } from "@/constants/crm";
import { formatCurrency, formatDate, getStatusVariant } from "@/lib/utils";
import { crmService } from "@/services/crm-service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function CustomerDetailsPage() {
  const { customerId = "" } = useParams();
  const customerQuery = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => crmService.getCustomer(customerId),
    enabled: Boolean(customerId),
  });
  const dealsQuery = useQuery({
    queryKey: ["deals"],
    queryFn: crmService.getDeals,
  });
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: crmService.getTasks,
  });

  if (customerQuery.isLoading) {
    return <Skeleton className="h-[38.75rem]" />;
  }

  if (customerQuery.isError || !customerQuery.data) {
    return (
      <ErrorState
        title="Customer not found"
        description="The requested account could not be loaded."
        onRetry={() => void customerQuery.refetch()}
      />
    );
  }

  const customer = customerQuery.data;
  const deals = (dealsQuery.data ?? []).filter(
    (deal) => deal.customerId === customer.id,
  );
  const tasks = (tasksQuery.data ?? []).filter(
    (task) => task.account === customer.company,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={customer.company}
        description={`${customer.industry} · ${customer.region} · Owned by ${customer.owner}`}
        breadcrumbs={[
          ROOT_BREADCRUMB,
          { label: "Customers", href: "/customers" },
          { label: customer.company },
        ]}
        actions={
          <Badge variant={getStatusVariant(customer.health)}>
            {customer.health}
          </Badge>
        }
      />

      {customer.health !== CUSTOMER_HEALTH.HEALTHY ? (
        <Alert
          variant="warning"
          title="Account risk requires leadership attention"
          description={customer.notes}
        />
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="MRR"
          value={formatCurrency(customer.mrr)}
          description="Current monthly recurring revenue"
        />
        <StatCard
          label="ARR"
          value={formatCurrency(customer.arr)}
          description="Annualized run rate"
        />
        <StatCard
          label="Open deals"
          value={String(customer.openDeals)}
          description="Expansion opportunities in play"
        />
        <StatCard
          label="Renewal"
          value={formatDate(customer.renewalDate)}
          description="Next contractual milestone"
        />
      </section>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <ChartCard
              title="Account summary"
              description="Commercial context and lifecycle details."
            >
              <dl className="grid gap-4 sm:grid-cols-2">
                <Info label="Status" value={customer.status} />
                <Info label="Segment" value={customer.segment} />
                <Info label="Plan" value={customer.plan} />
                <Info label="Contacts" value={String(customer.contacts)} />
              </dl>
            </ChartCard>
            <ChartCard
              title="Account notes"
              description="Latest account context from the customer team."
            >
              <p className="text-sm text-muted-foreground">{customer.notes}</p>
            </ChartCard>
          </div>
        </TabsContent>
        <TabsContent value="pipeline">
          <ChartCard
            title="Related deals"
            description="Open and recent opportunities tied to this account."
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Close date</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>{deal.name}</TableCell>
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
          </ChartCard>
        </TabsContent>
        <TabsContent value="tasks">
          <ChartCard
            title="Open tasks"
            description="Operational work attached to this account."
          >
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-2xl border bg-card/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{task.title}</p>
                    <Badge variant={getStatusVariant(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {task.assignee} · Due {formatDate(task.dueDate)}
                  </p>
                </div>
              ))}
            </div>
          </ChartCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/40 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}
