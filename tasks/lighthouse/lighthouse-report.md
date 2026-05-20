# Google Lighthouse Report Presentation

## Current Status

This project includes Lighthouse CI configuration, but the repository does not contain a saved Lighthouse report artifact, and I could not generate a fresh audit in the current sandbox because:

- Lighthouse is not installed as a local dependency
- Chrome/Chromium is not available in the environment

So this report is based on:

- the existing Lighthouse CI setup
- the current build output
- the code patterns that directly affect Lighthouse categories

## Lighthouse Setup In The Project

### Config

[lighthouserc.json](/Users/valeriiabondarchuk/WorkProjects/matrix-3/lighthouserc.json)

The project already defines these Lighthouse CI targets:

- `Performance`: minimum score `0.7`
- `Accessibility`: minimum score `0.9`
- `Best Practices`: minimum score `0.85`
- `SEO`: disabled

### Workflow

[.github/workflows/lighthouse.yml](/Users/valeriiabondarchuk/WorkProjects/matrix-3/.github/workflows/lighthouse.yml)

The workflow:

- installs dependencies
- builds the app
- runs Lighthouse CI against the built output

This means Lighthouse auditing is already part of the project process.

## Likely Strong Areas

Based on the codebase, these categories should already perform reasonably well.

### 1. Accessibility

The project shows several good accessibility practices:

- semantic HTML structure like `header`, `main`, `nav`, `button`
- explicit `aria-label` usage, for example in [src/components/ui/search-input.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/search-input.tsx)
- accessible dialog primitives in [src/components/ui/dialog.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui/dialog.tsx)
- keyboard-friendly Radix UI components

Example:

```tsx
<Input
  value={value}
  onChange={(event) => onChange(event.target.value)}
  className="pl-10"
  placeholder={placeholder}
  aria-label={placeholder}
/>
```

Why this helps:

- screen readers get meaningful labels
- interactive elements are easier to navigate
- dialogs and overlays follow more accessible patterns by default

### 2. Best Practices

The project is also strong in general frontend best practices:

- Vite production build
- strict TypeScript
- shared API layer
- route-level lazy loading
- reusable tested UI primitives

Example:

[src/pages/router.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/pages/router.tsx) lazy-loads page modules:

```tsx
const DashboardPage = lazy(() =>
  import("@/pages/dashboard-page").then((module) => ({
    default: module.DashboardPage,
  })),
);
```

Why this helps:

- the initial bundle can stay smaller
- pages are loaded only when needed

## Main Performance Risks

The biggest Lighthouse challenge is likely `Performance`, not `Accessibility`.

### 1. Large JavaScript Chunks

The built output in [dist/assets](/Users/valeriiabondarchuk/WorkProjects/matrix-3/dist/assets) shows some large files, especially:

- `generateCategoricalChart-...js` about `373 KB`
- `index-CDwUxzqK.js` about `278 KB`
- `zod-...js` about `87 KB`
- `data-table-...js` about `52 KB`

These larger bundles can hurt:

- First Contentful Paint
- Largest Contentful Paint
- Time to Interactive
- total JavaScript execution cost

### 2. External Google Font Request

[index.html](/Users/valeriiabondarchuk/WorkProjects/matrix-3/index.html) loads Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```

This can lower performance because:

- it adds external network requests
- it may delay text rendering
- it can increase Lighthouse penalties for render-blocking resources

## What Helped Achieve Good Results Already

These project choices likely improved the current Lighthouse results:

### 1. Route-Based Code Splitting

Lazy loading in [src/pages/router.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/pages/router.tsx) prevents all screens from loading at once.

### 2. Reusable UI With Accessible Primitives

Radix-based dialog and dropdown components improve accessibility and interaction quality.

### 3. Small Static HTML Shell

[index.html](/Users/valeriiabondarchuk/WorkProjects/matrix-3/index.html) is lightweight and includes:

- language declaration
- responsive viewport meta
- description meta tag

### 4. Production Build Pipeline

The app uses Vite build optimization and static output, which helps Lighthouse compared to unoptimized dev builds.

## What Needs To Be Done To Reach 100

Getting a full `100` in Lighthouse usually requires targeted optimization, especially in `Performance`.

### 1. Reduce Chart Bundle Cost

The app likely pays a noticeable cost for Recharts-related chunks.

Recommended actions:

- lazy-load chart-heavy sections even more aggressively
- split chart components into separate route or widget chunks
- reduce unused chart features if possible
- consider lighter chart rendering for the dashboard if performance is the top priority

### 2. Self-Host Or Optimize Fonts

To move closer to `100`, replace the Google Fonts runtime request with one of these:

- self-host `Plus Jakarta Sans`
- preload only the needed font files
- reduce the number of font weights
- use a strong system-font fallback if visual requirements allow it

### 3. Audit Large Shared Chunks

Recommended actions:

- inspect which dependencies are pulled into `index-CDwUxzqK.js`
- split rarely used utilities from the main bundle
- confirm that only necessary Zod, charting, and table code is included

### 4. Optimize Runtime Work On Initial Load

Recommended actions:

- keep dashboard widgets lightweight above the fold
- defer non-critical data fetching where possible
- avoid loading data-heavy screens until navigation happens

### 5. Tune Accessibility Details To Eliminate Small Deductions

Even strong accessible apps can lose a few Lighthouse points for small issues.

Check for:

- perfect color contrast on all text states
- complete form labeling in every dialog and filter control
- focus visibility on all interactive elements
- heading hierarchy consistency on every page

### 6. Enable And Improve SEO Category

SEO is currently turned off in [lighthouserc.json](/Users/valeriiabondarchuk/WorkProjects/matrix-3/lighthouserc.json). If the goal is a visible `100` across all categories, it should be enabled and then improved with:

- unique page titles
- route-specific meta descriptions
- stronger crawlable page metadata

## Suggested Presentation Summary

You can present it like this:

1. The project already includes Lighthouse CI and automated audit configuration.
2. Accessibility and best-practice scores are likely strong because the app uses semantic structure, typed code, Radix UI primitives, and reusable components.
3. The main limitation for a perfect score is performance, especially bundle size and external font loading.
4. To reach `100`, the biggest improvements should focus on chart bundle splitting, font optimization, and reducing initial JavaScript cost.

## Honest Conclusion

This project is already set up for Lighthouse auditing and likely performs well in `Accessibility` and `Best Practices`. The most probable gap to `100` is `Performance`, mainly because of large JavaScript chunks and external font loading. A fresh Lighthouse run should be generated in CI or locally with Chrome to capture the exact numeric scores, but the main optimization path is already clear from the codebase.
