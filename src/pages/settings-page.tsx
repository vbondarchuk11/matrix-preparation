import { Alert } from "@/components/ui/alert";
import { ChartCard } from "@/components/ui/chart-card";
import { ErrorState } from "@/components/ui/error-state";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SearchInput } from "@/components/ui/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DEAL_APPROVAL_MODE_OPTIONS,
  ROOT_BREADCRUMB,
  SETTINGS_SECTION_OPTIONS,
} from "@/constants/crm";
import { crmService } from "@/services/crm-service";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export function SettingsPage() {
  const settingsQuery = useQuery({
    queryKey: ["settings"],
    queryFn: crmService.getSettings,
  });
  const [search, setSearch] = useState("");

  const filteredSections = useMemo(
    () =>
      SETTINGS_SECTION_OPTIONS.filter((section) =>
        section.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  if (settingsQuery.isLoading) {
    return <Skeleton className="h-[35rem]" />;
  }

  if (settingsQuery.isError || !settingsQuery.data) {
    return (
      <ErrorState
        title="Settings unavailable"
        description="Workspace settings could not be loaded."
        onRetry={() => void settingsQuery.refetch()}
      />
    );
  }

  const settings = settingsQuery.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage workspace behavior, security defaults, approvals, and internal branding."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Settings" }]}
      />
      <Alert
        variant="info"
        title="Change management"
        description="Configuration changes in this area are tracked in audit logs for compliance review."
      />
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search settings sections"
      />
      <Tabs
        defaultValue={filteredSections[0]?.id ?? "workspace"}
        className="space-y-4"
      >
        <TabsList>
          {filteredSections.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="workspace">
          <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
            <ChartCard
              title="Workspace configuration"
              description="Core operational defaults for your CRM."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company name" value={settings.companyName} />
                <Field label="Workspace ID" value={settings.workspaceId} />
              </div>
              <div className="mt-6 space-y-4">
                <Toggle label="Weekly digest" checked={settings.weeklyDigest} />
                <Toggle
                  label="Auto assign owners"
                  checked={settings.autoAssignOwners}
                />
              </div>
            </ChartCard>
            <ChartCard
              title="Approval model"
              description="Define who approves commercial changes."
            >
              <RadioGroup
                defaultValue={settings.dealApprovalMode}
                className="space-y-3"
              >
                {DEAL_APPROVAL_MODE_OPTIONS.map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-3 rounded-2xl border p-4"
                  >
                    <RadioGroupItem value={value} aria-label={value} />
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </RadioGroup>
            </ChartCard>
          </div>
        </TabsContent>
        <TabsContent value="security">
          <ChartCard
            title="Security defaults"
            description="Protect revenue and customer operations with proactive controls."
          >
            <div className="space-y-4">
              <Toggle
                label="Security alerts"
                checked={settings.securityAlerts}
              />
              <Toggle label="Weekly digest" checked={settings.weeklyDigest} />
              <Alert
                variant="warning"
                title="SSO enforcement recommended"
                description="Strategic account operators should require SSO for all privileged roles."
              />
            </div>
          </ChartCard>
        </TabsContent>
        <TabsContent value="branding">
          <ChartCard
            title="Workspace assets"
            description="Upload brand files for internal templates and exports."
          >
            <FileUpload />
          </ChartCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} readOnly />
    </div>
  );
}

function Toggle({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-card/60 p-4">
      <span className="font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={() => {}} aria-label={label} />
    </div>
  );
}
