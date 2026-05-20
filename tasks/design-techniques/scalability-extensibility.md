# Scalability & Extensibility

## Short Description

Scalability and extensibility mean designing code so the project can grow with more features, routes, and screens without needing major rewrites.

## Example In This Project

[src/pages/router.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/pages/router.tsx) is structured to scale well:

- routes are split by feature area
- pages are lazy-loaded
- shared wrappers like `ProtectedRoute` and `PublicOnly` can be reused for future routes

This makes it easier to add new sections such as billing, integrations, or admin pages.

## Small Example

```tsx
{
  path: "customers",
  element: (
    <Suspense fallback={<RouteFallback />}>
      <CustomersPage />
    </Suspense>
  ),
}
```

A new route can be added with the same pattern, which makes the app easier to extend as it grows.
