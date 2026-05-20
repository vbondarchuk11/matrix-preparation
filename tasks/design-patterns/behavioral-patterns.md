# Behavioral Patterns

## 1. Observer

### Pattern Idea

Observer means one part of the system reacts automatically when shared state changes.

### Example In This Project

[src/hooks/use-toast.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/hooks/use-toast.ts) defines a shared toast store, and [src/components/ui/toaster.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/toaster.tsx) reacts to changes in that store:

```ts
export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
}));
```

```tsx
export function Toaster() {
  const { toasts, dismiss } = useToastStore();
  // renders automatically when toasts change
}
```

Why it fits:

- the store publishes state changes
- `Toaster` subscribes through the hook
- UI updates automatically when new toasts are pushed

This is a strong Observer-style example in React state management.

## 2. Strategy

### Pattern Idea

Strategy selects one behavior from several alternatives depending on context.

### Example In This Project

[src/lib/utils.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/lib/utils.ts) contains `getStatusVariant`, which chooses different visual behavior depending on the input value:

```ts
export function getStatusVariant(
  value: string | undefined,
): "default" | "success" | "warning" | "danger" | "outline" {
  const normalized = value?.toLowerCase() ?? "";

  if (normalized.includes("active")) {
    return "success";
  }

  if (normalized.includes("risk")) {
    return "warning";
  }

  return "default";
}
```

Why it fits:

- behavior is selected based on input state
- callers do not need to know the internal decision rules
- the strategy for choosing a variant is centralized

This is a lightweight Strategy-style example.

## 3. Command

### Pattern Idea

Command encapsulates an action so it can be triggered, reused, or handled consistently.

### Example In This Project

[src/features/customers/hooks/use-customers.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/features/customers/hooks/use-customers.ts) wraps actions like create, update, and delete into mutation handlers:

```ts
export function useDeleteCustomer() {
  return useMutation({
    mutationFn: (id: string) => customerService.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      push({
        title: "Customer removed",
        description: "The record has been deleted.",
        variant: "success",
      });
    },
  });
}
```

Why it fits:

- the action is wrapped as an executable operation
- the caller triggers the command without managing low-level request flow
- success side effects are attached in one place

This is a practical frontend Command-style pattern rather than a classic class-based Command object.

## Short Conclusion

The project does not implement every pattern in a heavy textbook form, but it uses many of their ideas in modern frontend style:

- shared service instances
- factory helpers
- adapters around browser APIs
- composition-based UI
- store subscriptions
- strategy selection logic
- mutation actions as commands
