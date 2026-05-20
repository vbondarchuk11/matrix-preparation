# ReturnType And `.d.ts` Use Cases

## 1. `ReturnType` Use Case

### What `ReturnType` Does

`ReturnType<T>` is a TypeScript utility type that extracts the return type of a function.

### Example In This Project

In [src/features/customers/hooks/use-customers.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/features/customers/hooks/use-customers.ts), the project now defines:

```ts
export type CustomerFormDefaults = ReturnType<
  typeof getCustomerDefaultValues
>;
```

This derives the type from:

```ts
export function getCustomerDefaultValues(customer?: Customer) {
  return {
    company: customer?.company ?? "",
    // ...
  } as const;
}
```

### Why This Is Useful

- the type is generated automatically from the function
- if `getCustomerDefaultValues(...)` changes, the type updates too
- this avoids duplicating the same shape in two places

### Where It Is Used

In [src/features/customers/components/customer-form-dialog.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/features/customers/components/customer-form-dialog.tsx):

```ts
const defaultValues: CustomerFormDefaults = getCustomerDefaultValues(
  customer ?? undefined,
);
```

This is a practical use case for `ReturnType`: keeping form default-value types synchronized with the function that creates them.

## 2. `.d.ts` File Use Case

### What A `.d.ts` File Is

A `.d.ts` file is a TypeScript declaration file. It describes types for values that exist elsewhere, such as:

- environment variables
- third-party libraries
- global browser objects
- modules without built-in TypeScript types

### Example In This Project

The project now includes [src/vite-env.d.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/vite-env.d.ts):

```ts
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_APP_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### Why This Is Useful

This gives TypeScript knowledge about custom Vite environment variables.

Without a declaration file, `import.meta.env.VITE_API_BASE_URL` may be unknown or loosely typed in project code.

### Where It Is Used

In [src/services/api.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/api.ts):

```ts
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10_000,
});
```

This is a practical `.d.ts` use case because:

- the API base URL can be configured by environment
- TypeScript knows that `VITE_API_BASE_URL` is a valid env variable
- the code stays type-safe and editor-friendly

## Short Conclusion

This project now demonstrates both concepts in real code:

- `ReturnType` is used to derive `CustomerFormDefaults` from `getCustomerDefaultValues(...)`
- a `.d.ts` file is used to declare custom Vite environment variables for the API client
