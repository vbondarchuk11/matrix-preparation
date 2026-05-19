import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChartCard } from "@/components/ui/chart-card";
import { ErrorState } from "@/components/ui/error-state";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { SearchInput } from "@/components/ui/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ROOT_BREADCRUMB } from "@/constants/crm";
import { crmService } from "@/services/crm-service";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const responsibilities = [
  "Executive forecast cadence",
  "Revenue systems governance",
  "Board reporting package",
  "Commercial operating reviews",
];

export function ProfilePage() {
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: crmService.getProfile,
  });
  const [search, setSearch] = useState("");

  const filteredResponsibilities = useMemo(
    () =>
      responsibilities.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  if (profileQuery.isLoading) {
    return <Skeleton className="h-[32.5rem]" />;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <ErrorState
        title="Profile unavailable"
        description="Personal workspace details could not be loaded."
        onRetry={() => void profileQuery.refetch()}
      />
    );
  }

  const profile = profileQuery.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Manage personal contact details, workspace identity, and operational ownership areas."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Profile" }]}
      />
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search responsibilities"
      />
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <ChartCard
          title="Identity"
          description="Your workspace identity and profile image."
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>{profile.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-semibold">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.title}</p>
            </div>
          </div>
          <div className="mt-6">
            <FileUpload />
          </div>
        </ChartCard>
        <ChartCard
          title="Contact details"
          description="Editable reference data for workspace collaborators."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" value={profile.name} />
            <Field label="Email" value={profile.email} />
            <Field label="Phone" value={profile.phone} />
            <Field label="Timezone" value={profile.timezone} />
          </div>
          <div className="mt-4 space-y-2">
            <Label>Bio</Label>
            <Textarea value={profile.bio} readOnly />
          </div>
        </ChartCard>
      </div>
      <ChartCard
        title="Responsibilities"
        description="Searchable scope areas for this operating role."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {filteredResponsibilities.map((item) => (
            <div
              key={item}
              className="rounded-2xl border bg-card/60 p-4 font-medium"
            >
              {item}
            </div>
          ))}
        </div>
      </ChartCard>
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
