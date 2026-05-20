# Separation Of Concerns

## Short Description

Separation of concerns means splitting different kinds of logic into different layers so each layer focuses on one concern.

## Example In This Project

The customer feature shows this clearly:

- [src/services/customer-service.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/customer-service.ts) handles API communication
- [src/features/customers/hooks/use-customers.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/features/customers/hooks/use-customers.ts) handles query and mutation behavior
- page and component files handle rendering and user interaction

This separation makes the code easier to test and easier to change.

## Small Example

```ts
export function useCustomers() {
  return useQuery({
    queryKey,
    queryFn: customerService.list,
  });
}
```

The hook coordinates data loading, while the service owns the request logic and the UI owns presentation.
