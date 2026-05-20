# How Responsive Design Is Implemented In This Project

## Overview

Responsive design means the interface adapts to different screen sizes such as:

- mobile phones
- tablets
- laptops
- large desktop screens

This project implements responsive design through:

- Tailwind breakpoints
- adaptive layouts
- mobile-specific navigation behavior
- fluid spacing and typography
- reusable responsive UI patterns

## 1. Tailwind Breakpoints

The main responsive system is based on Tailwind CSS utilities such as:

- `sm:`
- `md:`
- `lg:`
- `xl:`

These breakpoints are used directly in components to change layout depending on screen width.

Example from [src/pages/dashboard-page.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/pages/dashboard-page.tsx):

```tsx
<section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
```

What this does:

- on small screens: cards stack in one column
- on medium screens: cards use 2 columns
- on extra-large screens: cards use 4 columns

This is one of the clearest responsive patterns in the project.

## 2. Responsive App Shell

The main layout in [src/layouts/app-layout.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/layouts/app-layout.tsx) changes depending on screen size.

Example:

```tsx
<div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
```

This means padding grows with screen size:

- compact on mobile
- more spacious on tablet
- larger on desktop

Another example:

```tsx
<div className="relative hidden max-w-md flex-1 md:block">
```

This means:

- the search bar is hidden on small screens
- it becomes visible on medium screens and above

That keeps the header usable on narrow devices.

## 3. Mobile And Desktop Navigation Variants

[src/components/ui/sidebar.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/sidebar.tsx) has separate behavior for desktop and mobile.

### Desktop Sidebar

```tsx
"fixed inset-y-4 left-4 z-40 hidden w-72 ... lg:flex"
```

This means:

- sidebar is hidden below `lg`
- sidebar is shown on large screens

### Mobile Navigation Drawer

```tsx
"fixed inset-0 z-50 transition lg:hidden"
```

This means:

- mobile overlay navigation is active below `lg`
- it disappears on desktop where the permanent sidebar is used

This is a strong responsive design pattern because the navigation model changes to match device constraints.

## 4. Responsive State Logic With `useMobile`

The project also uses JavaScript-based responsive behavior in [src/hooks/use-mobile.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/hooks/use-mobile.ts):

```ts
export function useMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint,
  );
```

This hook lets components respond to screen size in logic, not just CSS.

Example from [src/layouts/app-layout.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/layouts/app-layout.tsx):

```tsx
{!isMobile ? (
  <div className="text-left">
    <p className="text-sm font-semibold">{user?.name ?? "Guest User"}</p>
    <p className="text-xs text-muted-foreground">
      {user?.role ?? "Visitor"}
    </p>
  </div>
) : null}
```

This means extra profile details are hidden on smaller screens to save space.

## 5. Fluid Typography

The project uses fluid font sizing in [src/styles.css](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/styles.css):

```css
body {
  @apply min-h-screen bg-background text-foreground;
  font-size: calc(0.9375rem + 0.125vw);
}
```

Why this matters:

- text scales more smoothly between screen sizes
- the UI feels more balanced on both small and large displays

## 6. Reusable Responsive Utility Classes

The global stylesheet defines reusable layout helpers.

Example from [src/styles.css](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/styles.css):

```css
.crm-grid {
  @apply grid gap-4 md:gap-6;
}
```

This makes spacing responsive by default:

- smaller gap on smaller screens
- larger gap on medium screens and above

Reusable utility classes help maintain consistency across pages.

## 7. Container And Width Control

The Tailwind container configuration in [tailwind.config.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/tailwind.config.ts) helps control layout width:

```ts
container: {
  center: true,
  padding: "1rem",
  screens: {
    "2xl": "90rem",
  },
},
```

Why this matters:

- content stays centered
- pages do not become too wide on large monitors
- padding remains consistent

## 8. Adaptive Content Composition

The dashboard uses responsive grid composition instead of fixed positioning.

Examples from [src/pages/dashboard-page.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/pages/dashboard-page.tsx):

```tsx
<section className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
```

```tsx
<section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
```

This means:

- sections stack naturally on smaller screens
- multi-column dashboard layouts appear on larger screens

This is important because dashboards can become unusable if they do not adapt well to narrow widths.

## 9. Responsive Loading States

Loading placeholders also follow responsive layouts.

Example from [src/pages/dashboard-page.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/pages/dashboard-page.tsx):

```tsx
<div className="grid gap-4 xl:grid-cols-4">
  {["a", "b", "c", "d"].map((item) => (
    <Skeleton key={item} className="h-36" />
  ))}
</div>
```

This keeps loading screens visually aligned with the final layout across breakpoints.

## Short Conclusion

This project implements responsive design through Tailwind breakpoints, adaptive grid layouts, separate mobile and desktop navigation patterns, fluid typography, responsive spacing, and screen-size-aware component logic. As a result, the interface remains usable and visually organized across mobile, tablet, and desktop devices.
