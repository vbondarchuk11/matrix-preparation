import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { StatCard } from "@/components/ui/stat-card";
import { FILTER_ALL, ROOT_BREADCRUMB } from "@/constants/crm";
import { useListState } from "@/hooks/use-list-state";
import { formatCurrency, getStatusVariant } from "@/lib/utils";
import { crmService } from "@/services/crm-service";
import type { TeamMember } from "@/types";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function TeamMembersPage() {
  const teamQuery = useQuery({
    queryKey: ["team"],
    queryFn: crmService.getTeamMembers,
  });
  const { search, setSearch, filters, setFilter, resetFilters } = useListState({
    region: FILTER_ALL,
    role: FILTER_ALL,
  });

  const members = teamQuery.data ?? [];
  const filtered = useMemo(
    () =>
      members.filter((member) => {
        const queryMatch = [member.name, member.email, member.role]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
        const regionMatch =
          filters.region === FILTER_ALL || member.region === filters.region;
        const roleMatch =
          filters.role === FILTER_ALL || member.role === filters.role;
        return queryMatch && regionMatch && roleMatch;
      }),
    [members, search, filters],
  );

  const columns = useMemo<ColumnDef<TeamMember>[]>(
    () => [
      {
        header: "Member",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{row.original.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{row.original.name}</p>
              <p className="text-sm text-muted-foreground">
                {row.original.email}
              </p>
            </div>
          </div>
        ),
      },
      { header: "Role", accessorKey: "role" },
      { header: "Region", accessorKey: "region" },
      {
        header: "Quota",
        cell: ({ row }) => formatCurrency(row.original.quota),
      },
      {
        header: "Attainment",
        cell: ({ row }) => `${row.original.attainment}%`,
      },
      {
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
      },
    ],
    [],
  );

  if (teamQuery.isLoading) {
    return <Skeleton className="h-[33.75rem]" />;
  }

  if (teamQuery.isError) {
    return (
      <ErrorState
        title="Team data unavailable"
        description="The workspace roster could not be loaded."
        onRetry={() => void teamQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team members"
        description="Monitor quota coverage, attainment, and operating availability across the commercial organization."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Team members" }]}
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Team size" value={String(filtered.length)} />
        <StatCard
          label="Avg attainment"
          value={`${Math.round(filtered.reduce((sum, member) => sum + member.attainment, 0) / Math.max(filtered.length, 1))}%`}
        />
        <StatCard
          label="Covered quota"
          value={formatCurrency(
            filtered.reduce((sum, member) => sum + member.quota, 0),
          )}
        />
        <StatCard
          label="Available now"
          value={String(
            filtered.filter((member) => member.status === "Available").length,
          )}
        />
      </section>
      <FilterBar onReset={resetFilters}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search team"
        />
        <Select
          value={filters.region}
          onValueChange={(value) => setFilter("region", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All regions</SelectItem>
            {Array.from(new Set(members.map((member) => member.region))).map(
              (region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
        <Select
          value={filters.role}
          onValueChange={(value) => setFilter("role", value)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All roles</SelectItem>
            {Array.from(new Set(members.map((member) => member.role))).map(
              (role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </FilterBar>
      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
