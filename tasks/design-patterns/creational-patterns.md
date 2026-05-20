# Creational Patterns

## 1. Singleton

### Pattern Idea

Singleton means one shared instance is created and reused across the application.

### Example In This Project

[src/services/api.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/api.ts) exports one shared `api` client:

```ts
export const api = axios.create({
  baseURL: "/api",
  timeout: 10_000,
  adapter: async (config) => {
    // ...
  },
});
```

Why it fits:

- the app uses one shared HTTP client
- interceptors are registered once
- services reuse the same instance everywhere

This is a practical Singleton-style shared object.

## 2. Factory

### Pattern Idea

Factory creates objects through a dedicated creation function instead of building them manually everywhere.

### Example In This Project

[src/services/mockServer.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/mockServer.ts) has a `jsonResponse` helper that creates configured `Response` objects:

```ts
function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
```

Why it fits:

- response creation logic is centralized
- callers do not repeat `new Response(...)` everywhere
- all API-like mock responses are created in a consistent way

This is a simple factory function.
