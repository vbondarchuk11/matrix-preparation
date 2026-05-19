# Matrix CRM Frontend

Production-style CRM/admin dashboard frontend built with React, TypeScript, Tailwind CSS, shadcn/ui-style component patterns, React Query, React Hook Form, Zod, Zustand, and React Router.

This project is designed to demonstrate senior-level frontend engineering practices:

- feature-based architecture
- reusable design system components
- responsive enterprise UI patterns
- strict TypeScript and code quality automation
- realistic mock API integration
- CI/CD with GitHub Actions
- unit testing and coverage reporting

## Stack

- React 18
- TypeScript with `strict: true`
- Vite
- Tailwind CSS
- Radix UI primitives
- React Hook Form
- Zod
- TanStack React Query
- Zustand
- React Router
- Vitest
- React Testing Library
- Biome

## CRM Modules

The app includes realistic pages and reusable patterns for:

- authentication
- executive dashboard
- customers list and customer details
- create/edit customer flow
- deals list and deal details
- tasks workspace
- calendar
- reports
- team members
- notifications
- audit logs
- profile
- settings

The dashboard includes:

- revenue KPIs
- pipeline and activity widgets
- upcoming tasks
- active deals
- quick actions
- chart and table compositions

## UI System

Reusable UI primitives live in [src/components/ui](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/components/ui).

Highlights include:

- buttons, inputs, selects, textarea, checkbox, radio group, switch
- dialog, confirm dialog, drawer, dropdown menu, tabs, tooltip, toast
- alert, empty state, error state, skeleton, spinner
- breadcrumbs, page header, pagination, search input, filter bar
- stat card, chart card, data table, stepper, file upload

The component layer follows a design-system approach with:

- consistent spacing and typography
- shared CRM constants in [src/constants/crm.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/constants/crm.ts)
- accessible labels and keyboard-friendly interactions
- responsive patterns for desktop, tablet, and mobile

## Architecture

Top-level structure:

```text
src/
  components/ui/
  constants/
  features/
  hooks/
  layouts/
  lib/
  pages/
  services/
  store/
  test/
  tests/
  types/
```

Key areas:

- [src/pages/router.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/pages/router.tsx): route setup and protected application flow
- [src/layouts/app-layout.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/layouts/app-layout.tsx): authenticated shell with responsive navigation
- [src/services/api.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/api.ts): API client, auth header injection, and 401 handling
- [src/services/mockServer.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/mockServer.ts): mock backend adapter
- [src/services/mock-data.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/services/mock-data.ts): realistic CRM dataset
- [src/store/auth-store.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/store/auth-store.ts): session state persistence

## Local Development

Requirements:

- Node.js 22
- npm

Install and run:

```bash
npm ci
npm run dev
```

Open the Vite development server shown in the terminal.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:watch
npm run coverage
npm run build
npm run format
```

What they do:

- `lint`: runs Biome checks
- `typecheck`: runs `tsc -b`
- `test`: runs the Vitest suite once
- `test:watch`: watch mode for local test development
- `coverage`: runs tests with V8 coverage output
- `build`: validates the production bundle

## Testing

Test setup uses:

- Vitest
- React Testing Library
- jsdom
- reusable render utilities in [src/test/test-utils.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/test/test-utils.tsx)
- shared environment setup in [src/test/setup.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/test/setup.ts)

Coverage includes:

- reusable UI components
- authentication logic
- dialog behavior
- pagination/table interaction
- Zod validation
- custom hooks
- utility helpers

Additional focused tests live in:

- [src/tests/components](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/tests/components)
- [src/tests/hooks](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/tests/hooks)
- [src/tests/utils](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/tests/utils)

## CI/CD

GitHub Actions workflows live in [.github/workflows](/Users/valeriiabondarchuk/WorkProjects/matrix-3/.github/workflows).

### CI

[ci.yml](/Users/valeriiabondarchuk/WorkProjects/matrix-3/.github/workflows/ci.yml) runs on:

- pull requests targeting `main` and `dev`
- pushes to `main`
- pushes to `dev`

The CI pipeline performs:

1. dependency installation with `npm ci`
2. lint and formatting checks
3. TypeScript type checking
4. unit tests
5. coverage reporting
6. production build validation
7. artifact upload for coverage and build output

### Deploy

[deploy.yml](/Users/valeriiabondarchuk/WorkProjects/matrix-3/.github/workflows/deploy.yml) provides:

- staging artifact packaging on `dev`
- production Pages deployment on `main`

### Lighthouse

[lighthouse.yml](/Users/valeriiabondarchuk/WorkProjects/matrix-3/.github/workflows/lighthouse.yml) is an optional workflow for performance and accessibility auditing.

## Pre-commit Hooks

Husky hooks are configured in [.husky](/Users/valeriiabondarchuk/WorkProjects/matrix-3/.husky):

- `pre-commit`: lint + typecheck
- `pre-push`: test suite

If the repo is initialized as a Git repository locally, hooks are installed via:

```bash
npm run prepare
```

## Design Notes

- sizing uses rem-based values with fluid body font sizing in [src/styles.css](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/styles.css)
- dialogs and drawers support internal scrolling for long content
- shared domain values are centralized in [src/constants/crm.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/constants/crm.ts) instead of being repeated as raw strings

## Diagrams

Mermaid diagrams are available in [diagrams](/Users/valeriiabondarchuk/WorkProjects/matrix-3/diagrams):

- frontend architecture
- auth flow
- customer lifecycle
- data model overview

## Verification

Current validation commands:

```bash
npm run check
npm run typecheck
npm test
npm run coverage
npm run build
```

## Notes

- The app currently uses a mock API layer for realistic frontend behavior without requiring a live backend.
- GitHub Actions workflows are ready for required status checks, but merge blocking still depends on enabling branch protection rules in GitHub repository settings.
