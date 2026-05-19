import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
  CALENDAR_EVENT_TYPE_OPTIONS,
  FILTER_ALL,
  ROOT_BREADCRUMB,
} from "@/constants/crm";
import { useListState } from "@/hooks/use-list-state";
import { formatDate, getStatusVariant } from "@/lib/utils";
import { crmService } from "@/services/crm-service";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function CalendarPage() {
  const eventsQuery = useQuery({
    queryKey: ["calendar-events"],
    queryFn: crmService.getCalendarEvents,
  });
  const { search, setSearch, filters, setFilter, resetFilters } = useListState({
    type: FILTER_ALL,
  });

  const events = eventsQuery.data ?? [];
  const filtered = useMemo(
    () =>
      events.filter((event) => {
        const queryMatch = [
          event.title,
          event.owner,
          event.customer ?? "",
          event.location,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
        const typeMatch =
          filters.type === FILTER_ALL || event.type === filters.type;
        return queryMatch && typeMatch;
      }),
    [events, search, filters],
  );

  if (eventsQuery.isLoading) {
    return <Skeleton className="h-[32.5rem]" />;
  }

  if (eventsQuery.isError) {
    return (
      <ErrorState
        title="Calendar unavailable"
        description="The event schedule could not be loaded."
        onRetry={() => void eventsQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendar"
        description="Track customer meetings, forecast milestones, demos, and internal operating cadence in one timeline."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Calendar" }]}
      />
      <Alert
        title="Upcoming executive review"
        description="Board forecast prep starts in 72 hours. Confirm all owner updates before the meeting."
      />
      <FilterBar onReset={resetFilters}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search calendar events"
        />
        <Select
          value={filters.type}
          onValueChange={(value) => setFilter("type", value)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All event types</SelectItem>
            {CALENDAR_EVENT_TYPE_OPTIONS.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterBar>
      <div className="grid gap-4 xl:grid-cols-2">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="rounded-3xl border bg-card/70 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">{event.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {event.customer ? `${event.customer} · ` : ""}
                  {event.owner} · {event.location}
                </p>
              </div>
              <Badge variant={getStatusVariant(event.type)}>{event.type}</Badge>
            </div>
            <p className="mt-4 text-sm">
              {formatDate(event.start, {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
              {" - "}
              {formatDate(event.end, { hour: "numeric", minute: "2-digit" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
