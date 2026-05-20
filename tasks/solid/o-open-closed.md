# O: Open/Closed Principle

## Short Description

Software entities should be open for extension but closed for modification. We should be able to add new behavior without constantly rewriting the core component.

## Example In This Project

[src/components/ui/data-table.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/data-table.tsx) is a good example. The component does not need to be changed every time the app shows a new table. Instead, each page passes different column definitions and row data.

That means the table is extended by configuration, not by editing its internal logic for every new screen.

## Small Example

```ts
type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // generic rendering logic
}
```

If you later add a deals table, tasks table, or audit log table, you extend behavior by passing new columns instead of modifying the shared table component.
