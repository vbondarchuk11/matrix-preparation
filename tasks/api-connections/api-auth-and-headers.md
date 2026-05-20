# API Connections With Auth And Custom Headers

## Overview

This project uses a shared API client in [src/services/api.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/api.ts) to manage all HTTP connections.

It demonstrates:

- centralized API configuration
- authentication token handling
- automatic custom header injection
- shared request logic across services

## 1. Shared API Client

The application creates one reusable Axios client:

```ts
export const api = axios.create({
  baseURL: "/api",
  timeout: 10_000,
  adapter: async (config) => {
    // custom fetch bridge
  },
});
```

Why this matters:

- all services use the same connection setup
- request behavior stays consistent
- headers and auth logic are configured in one place

## 2. Authentication Request

The login request is handled in [src/services/auth-service.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/auth-service.ts):

```ts
export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    return data;
  },
};
```

This sends credentials to the API and returns a token with user data.

## 3. Storing The Auth Token

After login, the token is stored in [src/store/auth-store.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/store/auth-store.ts):

```ts
setSession: (token, user) => {
  localStorage.setItem(storageKey, JSON.stringify({ token, user }));
  set({ token, user });
},
```

Why this matters:

- the user session persists across page reloads
- the API layer can read the token from one shared source

## 4. Automatic Authorization Header

The most important auth integration is in the API request interceptor:

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

This shows both:

- auth header usage with `Authorization: Bearer <token>`
- custom header usage with `Content-Type: application/json`

Because this logic is centralized, every request made through `api` automatically gets the correct headers.

## 5. Handling Unauthorized Responses

The response interceptor handles invalid or expired sessions:

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

This means:

- if the API returns `401 Unauthorized`
- the stored session is cleared automatically
- the app can redirect the user back to login flow

## 6. Example Of Shared API Usage

Feature services reuse the same client. For example, [src/services/customer-service.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/customer-service.ts):

```ts
export const customerService = {
  async list() {
    const { data } = await api.get<Customer[]>("/customers");
    return data;
  },
};
```

This request does not manually attach headers. It relies on the shared client, which keeps feature code clean.

## Request Flow Summary

1. User logs in through `authService.login(...)`
2. The token is saved in `auth-store`
3. Future requests use the shared `api` client
4. The request interceptor adds `Authorization` and `Content-Type` headers
5. If the server returns `401`, the response interceptor clears the session

## Short Conclusion

This project demonstrates API connections with both authentication and custom headers through a centralized client design. The main implementation is in [src/services/api.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/api.ts), where request and response interceptors handle token-based auth and shared header configuration for the whole application.
