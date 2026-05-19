import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/ui/chart-card";
import { ErrorState } from "@/components/ui/error-state";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { Stepper } from "@/components/ui/stepper";
import { OPEN_DEAL_STAGE_OPTIONS, ROOT_BREADCRUMB } from "@/constants/crm";
import { formatCurrency, formatDate, getStatusVariant } from "@/lib/utils";
import { crmService } from "@/services/crm-service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function DealDetailsPage() {
  const { dealId = "" } = useParams();
  const dealQuery = useQuery({
    queryKey: ["deal", dealId],
    queryFn: () => crmService.getDeal(dealId),
    enabled: Boolean(dealId),
  });

  if (dealQuery.isLoading) {
    return <Skeleton className="h-[32.5rem]" />;
  }

  if (dealQuery.isError || !dealQuery.data) {
    return (
      <ErrorState
        title="Deal not found"
        description="This opportunity could not be loaded."
        onRetry={() => void dealQuery.refetch()}
      />
    );
  }

  const deal = dealQuery.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={deal.name}
        description={`${deal.customerName} · Owned by ${deal.owner}`}
        breadcrumbs={[
          ROOT_BREADCRUMB,
          { label: "Deals", href: "/deals" },
          { label: deal.name },
        ]}
        actions={
          <Badge variant={getStatusVariant(deal.stage)}>{deal.stage}</Badge>
        }
      />

      {deal.probability < 50 ? (
        <Alert
          variant="warning"
          title="Forecast confidence is below target"
          description="This opportunity needs additional validation before executive forecast lock."
        />
      ) : null}

      <Stepper steps={OPEN_DEAL_STAGE_OPTIONS} currentStep={deal.stage} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Deal value" value={formatCurrency(deal.value)} />
        <StatCard label="Probability" value={`${deal.probability}%`} />
        <StatCard label="Close date" value={formatDate(deal.expectedClose)} />
        <StatCard label="Source" value={deal.source} />
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <ChartCard
          title="Next step"
          description="Operator guidance for progressing the deal."
        >
          <p className="text-sm text-muted-foreground">{deal.nextStep}</p>
        </ChartCard>
        <ChartCard
          title="Update cadence"
          description="Latest commercial update on the opportunity."
        >
          <p className="text-sm text-muted-foreground">
            Last updated{" "}
            {formatDate(deal.updatedAt, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </ChartCard>
      </div>
    </div>
  );
}
