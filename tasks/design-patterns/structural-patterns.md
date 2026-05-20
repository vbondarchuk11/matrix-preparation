# Structural Patterns

## 1. Decorator

### Pattern Idea

Decorator adds behavior to an existing object without changing all consumers.

### Example In This Project

[src/services/api.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/api.ts) uses Axios interceptors to extend request and response behavior:

```ts
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Content-Type"] = "application/json";
  return config;
});
```

```ts
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearSession();
    }

    return Promise.reject(error);
  },
);
```

Why it fits:

- the original API client stays the same
- extra behavior is layered onto requests and responses
- consumers keep calling `api.get`, `api.post`, and so on

This is a strong practical Decorator example.

## 2. Adapter

### Pattern Idea

Adapter converts one interface into another interface the application expects.

### Example In This Project

Again in [src/services/api.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/api.ts), the custom Axios `adapter` translates Axios request config into browser `fetch` calls and then returns data in Axios response shape:

```ts
adapter: async (config) => {
  const response = await fetch(`${config.baseURL}${config.url}`, {
    method: config.method?.toUpperCase(),
    body: config.data ? JSON.stringify(config.data) : undefined,
    headers: config.headers as HeadersInit,
  });

  const data = response.status === 204 ? null : await response.json();
  return {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    config,
    request: null,
  };
},
```

Why it fits:

- the app wants an Axios-style client
- the browser provides `fetch`
- the adapter bridges those two interfaces

This is a textbook-style Adapter example.

## 3. Composite

### Pattern Idea

Composite builds a larger structure from smaller parts and lets the whole be used as one unit.

### Example In This Project

[src/components/ui/card.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/card.tsx) and [src/components/ui/chart-card.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/chart-card.tsx) show UI composition:

```tsx
<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
  <CardContent>{children}</CardContent>
</Card>
```

Why it fits:

- the final card is built from smaller UI parts
- each part can be reused independently
- together they behave like one higher-level component

This is a frontend Composite-style pattern through component composition.
