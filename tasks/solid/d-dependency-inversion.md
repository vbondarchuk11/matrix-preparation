# D: Dependency Inversion Principle

## Short Description

High-level modules should not depend directly on low-level implementation details. Both should depend on an abstraction.

## Example In This Project

The service layer depends on the shared API client abstraction in [src/services/api.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/api.ts) instead of each feature calling `fetch` directly.

For example, [src/services/customer-service.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/customer-service.ts) depends on `api`, not on low-level network details. This keeps features cleaner and makes it easier to change headers, interceptors, or transport logic in one place.

## Small Example

```ts
export const customerService = {
  async list() {
    const { data } = await api.get<Customer[]>("/customers");
    return data;
  },
};
```

If request behavior changes later, we mostly update `api.ts` rather than every page and component in the app.
