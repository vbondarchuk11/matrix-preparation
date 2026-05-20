# Encapsulation

## Short Description

Encapsulation means keeping internal implementation details inside a module and exposing only the behavior other parts of the app need.

## Example In This Project

[src/store/auth-store.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/store/auth-store.ts) encapsulates session persistence details. Components do not need to know how `localStorage` is read or written. They only use actions such as `setSession`, `clearSession`, and `hydrate`.

That keeps storage behavior centralized and prevents low-level session logic from being repeated across the app.

## Small Example

```ts
type AuthState = {
  token: string | null;
  user: User | null;
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
  hydrate: () => void;
};
```

The store exposes a small public API while hiding the storage implementation inside the module.
