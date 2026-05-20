# S: Single Responsibility Principle

## Short Description

A module should have one clear responsibility and one main reason to change.

## Example In This Project

This principle is visible in the login flow:

- [src/services/auth-service.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/auth-service.ts) is responsible only for the API request.
- [src/features/auth/hooks/use-login.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/features/auth/hooks/use-login.ts) is responsible for the login workflow in the UI.
- [src/store/auth-store.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/store/auth-store.ts) is responsible for session state.

Because these responsibilities are split, changing the API call does not require rewriting the UI hook, and changing state storage does not require rewriting the service.

## Small Example

```ts
export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    return data;
  },
};

export function useLogin() {
  return useMutation({
    mutationFn: authService.login,
  });
}
```

Here the service fetches data, and the hook handles application behavior. Each piece does one job.
