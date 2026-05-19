import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
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
import { Switch } from "@/components/ui/switch";
import {
  FILTER_ALL,
  ROOT_BREADCRUMB,
  TASK_PRIORITY,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS,
  TASK_STATUS_OPTIONS,
} from "@/constants/crm";
import { useListState } from "@/hooks/use-list-state";
import { formatDate, getStatusVariant } from "@/lib/utils";
import { crmService } from "@/services/crm-service";
import type { Task } from "@/types";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export function TasksPage() {
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: crmService.getTasks,
  });
  const { search, setSearch, filters, setFilter, resetFilters } = useListState({
    status: FILTER_ALL,
    priority: FILTER_ALL,
  });
  const [hideDone, setHideDone] = useState(false);
  const tasks = tasksQuery.data ?? [];

  const filtered = useMemo(
    () =>
      tasks.filter((task) => {
        const queryMatch = [task.title, task.account, task.assignee]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
        const statusMatch =
          filters.status === FILTER_ALL || task.status === filters.status;
        const priorityMatch =
          filters.priority === FILTER_ALL || task.priority === filters.priority;
        const doneMatch = hideDone ? task.status !== TASK_STATUS.DONE : true;
        return queryMatch && statusMatch && priorityMatch && doneMatch;
      }),
    [tasks, search, filters, hideDone],
  );

  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        header: "Task",
        cell: ({ row }) => (
          <div>
            <p className="font-semibold">{row.original.title}</p>
            <p className="text-sm text-muted-foreground">
              {row.original.account}
            </p>
          </div>
        ),
      },
      { header: "Assignee", accessorKey: "assignee" },
      {
        header: "Priority",
        cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.priority)}>
            {row.original.priority}
          </Badge>
        ),
      },
      {
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        header: "Due",
        cell: ({ row }) => formatDate(row.original.dueDate),
      },
    ],
    [],
  );

  if (tasksQuery.isLoading) {
    return <Skeleton className="h-[36.25rem]" />;
  }

  if (tasksQuery.isError) {
    return (
      <ErrorState
        title="Tasks unavailable"
        description="Work management data could not be loaded."
        onRetry={() => void tasksQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Coordinate follow-ups, renewals, and internal actions that keep revenue execution on track."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Tasks" }]}
        actions={
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Mobile filters</Button>
            </DrawerTrigger>
            <DrawerContent>
              <h2 className="text-lg font-semibold">Task filters</h2>
              <div className="mt-6 space-y-4">
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilter("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={FILTER_ALL}>All statuses</SelectItem>
                    {TASK_STATUS_OPTIONS.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={filters.priority}
                  onValueChange={(value) => setFilter("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={FILTER_ALL}>All priorities</SelectItem>
                    {TASK_PRIORITY_OPTIONS.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </DrawerContent>
          </Drawer>
        }
      />

      <Alert
        variant="warning"
        title="Critical tasks due in the next 48 hours"
        description="Review blocked renewal and security tasks before the weekly forecast review."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Open tasks"
          value={String(
            filtered.filter((task) => task.status !== TASK_STATUS.DONE).length,
          )}
        />
        <StatCard
          label="Blocked tasks"
          value={String(
            filtered.filter((task) => task.status === TASK_STATUS.BLOCKED)
              .length,
          )}
        />
        <StatCard
          label="Critical tasks"
          value={String(
            filtered.filter((task) => task.priority === TASK_PRIORITY.CRITICAL)
              .length,
          )}
        />
        <StatCard
          label="Assignees"
          value={String(new Set(filtered.map((task) => task.assignee)).size)}
        />
      </section>

      <FilterBar onReset={resetFilters}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search tasks"
        />
        <Select
          value={filters.status}
          onValueChange={(value) => setFilter("status", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All statuses</SelectItem>
            {TASK_STATUS_OPTIONS.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.priority}
          onValueChange={(value) => setFilter("priority", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>All priorities</SelectItem>
            {TASK_PRIORITY_OPTIONS.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-3 text-sm">
          <Switch
            checked={hideDone}
            onCheckedChange={setHideDone}
            aria-label="Hide completed tasks"
          />
          Hide completed
        </div>
      </FilterBar>

      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
