# Interface / Contract Design

## Short Description

Interface or contract design means defining clear shapes for data and component props so different parts of the system can work together safely and predictably.

## Example In This Project

[src/types/index.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/types/index.ts) defines contracts like `User`, `Customer`, `Task`, and `Deal`.

Component and hook APIs also use explicit contracts. For example, [src/components/ui/data-table.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/data-table.tsx) defines a generic prop contract for columns and rows.

## Small Example

```ts
type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
};
```

This contract makes the component predictable and type-safe for any table data shape.
