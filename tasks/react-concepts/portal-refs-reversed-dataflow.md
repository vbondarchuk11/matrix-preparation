# Portal Use Cases, Refs, And Reversed Dataflow

## 1. Portal Use Cases

### What A Portal Is

A portal renders UI outside the normal parent DOM tree while keeping React logic connected.

### Use Cases In This Project

This project uses portals for overlay UI that must appear above the rest of the page:

- dialogs
- drawers
- dropdown menus

### Dialog Portal Example

[src/components/ui/dialog.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/dialog.tsx)

```tsx
return (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" />
    <DialogPrimitive.Content
      className={cn(
        "fixed left-1/2 top-1/2 z-50 ...",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
```

Why a portal is useful here:

- the modal should escape parent layout constraints
- it should appear above all page content
- overlay positioning is easier when rendered at the top layer

### Other Portal Examples

- [src/components/ui/dropdown-menu.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/dropdown-menu.tsx)
- [src/components/ui/drawer.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/drawer.tsx)

These components also use Radix `Portal` to render floating UI correctly.

## 2. Refs

### What Refs Are

Refs provide direct access to a DOM element or component instance when needed.

### Example In This Project

[src/components/ui/input.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/input.tsx) uses `React.forwardRef`:

```tsx
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn("flex h-11 w-full rounded-2xl border ...", className)}
    {...props}
  />
));
```

Why this matters:

- parent components can access the real input element
- form libraries can attach refs for validation and focus management
- reusable UI components stay compatible with React forms

### Practical Meaning In This Project

Even when a page does not call `useRef()` manually, ref support is still important because UI primitives such as `Input` are designed to work with higher-level form systems like React Hook Form.

## 3. Reversed Dataflow

### What Reversed Dataflow Means

Normal React dataflow goes from parent to child through props.

Reversed dataflow happens when a child sends information back to the parent through a callback like:

- `onChange`
- `onOpenChange`
- `onDelete`
- `onEdit`

### Search Input Example

[src/components/ui/search-input.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/search-input.tsx)

```tsx
type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

<Input
  value={value}
  onChange={(event) => onChange(event.target.value)}
/>
```

Here:

- parent passes `value`
- child sends new input text back through `onChange`

That is reversed dataflow.

### Dialog State Example

[src/pages/customers-page.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/pages/customers-page.tsx)

```tsx
<CustomerFormDialog
  open={open}
  onOpenChange={setOpen}
  customer={selectedCustomer}
/>
```

Inside the dialog component:

```tsx
<Dialog open={open} onOpenChange={onOpenChange}>
```

This means:

- the parent owns the `open` state
- the child requests updates through `onOpenChange`

That is a classic React reversed-dataflow pattern.

### Sidebar Toggle Example

[src/layouts/app-layout.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/layouts/app-layout.tsx)

```tsx
<Sidebar
  open={sidebarOpen}
  onToggle={() => setSidebarOpen((value) => !value)}
/>
```

The `Sidebar` receives state from the parent and notifies the parent through `onToggle`, which is another reversed-dataflow example.

## Short Conclusion

This project shows all three concepts:

- `Portal`: dialogs, drawers, and dropdown menus render through portals
- `Refs`: reusable inputs support refs with `forwardRef`
- `Reversed dataflow`: children update parent state through callbacks like `onChange`, `onOpenChange`, and `onToggle`
