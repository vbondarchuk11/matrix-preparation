# L: Liskov Substitution Principle

## Short Description

Objects of a derived or alternative implementation should be usable wherever the base type is expected without breaking behavior.

## Example In This Project

[src/components/ui/button.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/button.tsx) follows this idea well. The `Button` component supports standard button behavior and can also render through `asChild` when another element should act like a button in the UI.

The important part is that consumers can still treat it like a normal interactive button component. Replacing one styled button usage with another variant should not break the screen.

## Small Example

```tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

<Button variant="default">Save</Button>
<Button variant="danger">Delete</Button>
```

Both button variants can be substituted in the same places because they preserve the expected button contract: click handling, disabled state, and button attributes.
