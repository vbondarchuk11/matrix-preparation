# Reusability

## Short Description

Reusability means creating code once and using it in many places instead of duplicating the same logic or UI.

## Example In This Project

[src/components/ui/card.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/card.tsx) is a reusable UI primitive. The same card building blocks can be used across dashboard widgets, forms, and detail pages.

[src/components/ui/data-table.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/data-table.tsx) is also reusable because different pages can pass different columns and data without rewriting table logic.

## Small Example

```tsx
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("crm-panel", className)} {...props} />;
}
```

This component can be reused anywhere a panel-style container is needed.
