import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/ui/chart-card";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROOT_BREADCRUMB } from "@/constants/crm";

type StudySection = {
  title: string;
  body: string;
};

type StudyTheme = {
  id: string;
  label: string;
  description: string;
  sections: StudySection[];
};

const studyThemes: StudyTheme[] = [
  {
    id: "test-process",
    label: "Test Process",
    description:
      "Testing process basics, STLC, bug reporting, and test documentation.",
    sections: [
      {
        title: "Test policy, test plan, test strategy",
        body: `A test policy is the highest-level document related to testing in a company. It describes the company's general attitude toward quality and testing. It explains what quality standards are important, who is responsible for quality, how critical defects are handled, and what the company expects from the testing process. Usually, it does not describe specific features or detailed test cases. Instead, it defines principles.

For example, a company can have a policy that says every critical business feature must be tested before release, all pull requests must pass automated tests, and no production release is allowed if there are critical bugs. This document helps create common standards for all teams.

A test strategy is more practical and project-oriented. It describes how the project will actually be tested. It explains what types of testing will be used, what tools the team uses, what environments exist, how automation works, what risks are important, and which functionality is the highest priority.

For a React project, the strategy may say that:
- Unit and component tests are written with Vitest and React Testing Library
- End-to-end tests are implemented with Playwright
- API requests are mocked with MSW
- Regression testing is required before each release
- Critical flows like login and checkout have automated coverage

The strategy helps the team understand how quality will be achieved technically.

A test plan is even more detailed. It is usually prepared for a specific sprint, release, or feature. It explains exactly what will be tested, when it will be tested, who is responsible, what is included in scope, what is not included, what risks exist, and what conditions are required before release.

For example, if the team develops a registration page, the test plan may include:
- Validation testing
- API error handling
- Loading states
- Successful registration flow
- Mobile responsiveness
- Accessibility checks
- Browser compatibility
- Retesting after fixes

The test plan can also describe deadlines, test environments, and required devices or browsers.

These three documents are important because they make testing organized. Without them, testing can become chaotic, some functionality may be ignored, and risks may not be understood correctly.

As a frontend developer, understanding these documents is useful because frontend developers also participate in quality assurance. When implementing features, you should already think about edge cases, validation, responsive design, loading states, accessibility, and possible failures.

Interview answer:
A test policy defines the company's overall approach to quality and testing. A test strategy describes how testing will be organized for a specific project, including tools, test types, and automation. A test plan is more detailed and explains exactly what functionality will be tested for a particular release or feature. Together, they help make testing systematic and predictable.`,
      },
      {
        title: "STLC",
        body: `STLC means Software Testing Life Cycle. It describes the full testing process from requirement analysis until testing completion.

The first stage is requirement analysis. At this stage, the team studies requirements and tries to understand what should be tested. QA engineers and developers check whether requirements are clear and complete. They try to identify missing scenarios, contradictions, or unclear business logic.

For example, imagine you are implementing a login form. During requirement analysis, the team may ask:
- What happens if the password is wrong?
- Should the button be disabled during loading?
- What happens after successful login?
- Should the form remember the user?
- What errors can the API return?
- Should validation happen on blur or on submit?
- What should happen on mobile devices?

This stage is extremely important because unclear requirements often become bugs later.

The second stage is test planning. Here the team defines:
- What should be tested
- What tools will be used
- What environments exist
- How long testing will take
- What risks are important

For example, the team may decide:
- Unit tests for validation logic
- Component tests for forms
- E2E tests for authentication flow
- Manual responsive testing

The third stage is test case design. At this step, test cases or checklists are created.

For a login form, test cases may include:
- User logs in successfully with valid credentials
- Error is shown for wrong password
- Email field is required
- Password field is required
- Loading spinner appears during request
- Login button becomes disabled during loading
- Error disappears after successful retry

The fourth stage is test environment setup. The team prepares the environment where tests will run.

For frontend projects, this may include:
- Development or staging server
- Mock API
- Test database
- Browser setup
- Mobile devices
- Feature flags
- Environment variables

The fifth stage is test execution. This is where actual testing happens.

Frontend developers and QA engineers can:
- Run unit tests
- Run E2E tests
- Test manually in browser
- Check responsiveness
- Test accessibility
- Test different browsers
- Simulate API failures
- Check console errors

The sixth stage is defect reporting. If a problem is found, it is reported in a bug tracking system like Jira or Linear.

The seventh stage is retesting and regression testing. After developers fix bugs, QA checks whether the issue is fixed. Then regression testing ensures the fix did not break other functionality.

For example, after fixing login validation, QA may additionally check:
- Registration
- Forgot password
- Redirect logic
- Protected routes

The final stage is test closure. The team summarizes results:
- How many bugs were found
- What was tested
- What risks remain
- Whether the release is ready

As a frontend developer, understanding STLC helps you think about quality during the whole development process instead of only after coding.

Interview answer:
STLC describes the full testing lifecycle. It includes requirement analysis, test planning, test case creation, environment setup, test execution, bug reporting, retesting, regression testing, and test closure. In frontend development, it helps systematically test UI behavior, validation, responsiveness, API integration, and user flows.`,
      },
      {
        title: "Bug report",
        body: `A bug report is a structured description of a defect. The main goal of a bug report is to help another person reproduce and understand the issue quickly.

A good bug report starts with a clear title. The title should briefly describe the problem.

Bad example:
Login broken

Good example:
Login redirects user to dashboard after API returns 401 Unauthorized

The description explains the problem in more detail.

Example:
When the user enters an incorrect password, the frontend redirects to the dashboard instead of displaying an error message.

Then the report includes steps to reproduce. These steps must be very clear because developers should be able to reproduce the issue exactly.

Example:
1. Open login page
2. Enter valid email
3. Enter incorrect password
4. Click login button

After that, the report contains actual result and expected result.

Actual result:
User is redirected to dashboard.

Expected result:
User should stay on login page and see error message.

A good bug report also includes environment information:
- Browser version
- Operating system
- Device type
- Environment (development, staging, production)

Frontend bugs often depend on browser or device, so this information is important.

Attachments are also very useful:
- Screenshot
- Video recording
- Network request
- Console error
- Stack trace

The report may also contain severity and priority.

Severity describes how serious the issue is technically:
- Critical - application unusable
- High - major functionality broken
- Medium - important but workaround exists
- Low - cosmetic issue

Priority describes how quickly the issue should be fixed.

For example:
A typo on the main landing page before release may have low severity but high priority.

The bug lifecycle describes the states a bug goes through.

Usually it starts as:
- New
- Assigned
- In progress
- Fixed
- Ready for retest
- Verified
- Closed

Sometimes a bug can be:
- Reopened
- Duplicate
- Cannot reproduce
- Won't fix

Frontend example:
A modal cannot be closed on Safari browser. The developer fixes Safari-specific CSS behavior. QA retests and closes the issue.

Interview answer:
A bug report should clearly explain the issue so developers can reproduce it quickly. It usually contains title, description, steps to reproduce, expected result, actual result, environment, severity, priority, and attachments. The bug lifecycle describes how a bug moves from creation to fixing, retesting, verification, and closure.`,
      },
      {
        title: "Test documentation",
        body: `Test documentation includes all documents related to testing activities.

The goal of documentation is to make testing organized, repeatable, understandable, and transparent.

Examples of test documentation:
- Test plan
- Test strategy
- Test cases
- Checklists
- Bug reports
- Test summary reports
- Automation reports

Test documentation is important because software projects are complex. Without documentation, teams can forget important scenarios, misunderstand requirements, or repeat the same mistakes.

For frontend projects, documentation is especially useful because modern UIs contain many states and edge cases:
- Loading states
- Error states
- Empty states
- Responsive layouts
- Browser compatibility
- Accessibility behavior

For example, a checklist for a registration form may include:
- Required field validation
- Invalid email validation
- Password strength
- Disabled submit button during loading
- Error handling
- Mobile responsiveness
- Keyboard navigation
- Screen reader labels

Test cases are more detailed than checklists because they include:
- Preconditions
- Steps
- Expected result

Automation reports are generated after automated test execution and show:
- Passed tests
- Failed tests
- Coverage
- Execution time

Good documentation improves communication between developers, QA engineers, managers, and stakeholders.

Interview answer:
Test documentation helps organize and standardize testing. It includes test plans, test cases, checklists, bug reports, and automation reports. In frontend development, documentation is useful because UI applications contain many states and edge cases that should be tested consistently across browsers and devices.`,
      },
    ],
  },
  {
    id: "vcs-collaboration",
    label: "VCS and Collaboration",
    description:
      "Version control, cross-team communication, CI/CD, tools, and code quality.",
    sections: [
      {
        title: "VCS",
        body: `VCS means Version Control System. The most common VCS today is Git. It helps developers track changes in code, work together safely, switch between versions, restore old versions, and manage releases.

In frontend development, Git is used every day. Usually, developers work with branches and pull requests.

A branch is an isolated version of the codebase. Instead of working directly on the main branch, developers create separate branches for features, fixes, or experiments. This helps avoid breaking stable code.

For example, if you need to implement a new login page, you can create a branch:
git checkout -b feature/login-page

After implementing changes, you commit them:
git add .
git commit -m "feat: implemented login page"

Then you push the branch:
git push origin feature/login-page

After pushing, you create a Pull Request or Merge Request. A PR is a request to merge your changes into another branch, usually develop or main.

A PR is important because:
- Other developers review code
- QA can test changes
- CI/CD pipelines run automatically
- Team discusses architecture or improvements

Code review is not only about finding mistakes. It is also about sharing knowledge and maintaining code quality.

Introducing new changes means continuously updating your branch while other developers also change the project. Usually, before merging, you update your branch with the latest changes from the target branch.

Example:
git pull origin develop

or:
git fetch
git rebase origin/develop

Switching between code versions is another important Git feature. Sometimes you need to check older versions of the project or investigate a bug introduced in the past.

You can switch to another commit:
git checkout commit_hash

or another branch:
git checkout develop

Conflict resolution happens when Git cannot automatically combine changes from different branches.

For example:
- You changed a button component
- Another developer also changed the same lines
- Git does not know which version is correct

Git shows conflict markers:
<<<<<<< HEAD
<Button color="red" />
=======
<Button color="blue" />
>>>>>>> develop

The developer manually decides which code should remain.

Rolling back changes locally means undoing changes before or after commit.

If you want to discard uncommitted changes:
git restore .

If you want to undo the last commit locally:
git reset --soft HEAD~1

or completely remove it:
git reset --hard HEAD~1

Rolling back remotely means undoing changes already pushed to the remote repository.

Usually safer approach:
git revert commit_hash

This creates a new commit that reverses previous changes.

Force pushing with reset is dangerous because it rewrites history:
git push --force

In teams, force pushing to shared branches is usually restricted.

Release versioning is the process of assigning versions to releases.

A common format is semantic versioning:
MAJOR.MINOR.PATCH

Example:
2.4.1

Where:
- MAJOR - breaking changes
- MINOR - new backward-compatible features
- PATCH - bug fixes

Frontend projects often use tags for releases:
git tag v2.4.1
git push origin v2.4.1

Cherry-pick means copying a specific commit from another branch.

Example:
git cherry-pick commit_hash

This is useful when:
- You need only one fix from another branch
- You want to hotfix production quickly
- You do not want to merge the whole branch

Merge and rebase are two ways to combine changes.

Merge creates a merge commit and preserves full branch history.
Example: git merge develop

Rebase rewrites commit history and places your commits on top of another branch.
Example: git rebase develop

Merge is safer and preserves real history. Rebase creates cleaner linear history but rewrites commits.

Many teams use:
- Rebase for local cleanup
- Merge for shared branches

Sharing changes without pushing to remote can be done in several ways.

One option is git format-patch:
git format-patch HEAD~1

Another option is creating a patch:
git diff > changes.patch

Another developer can apply it:
git apply changes.patch

As a frontend developer, Git knowledge is critical because almost all teamwork depends on version control, collaboration, release management, and code review workflows.

Interview answer:
Git helps teams collaborate safely by tracking code changes and managing versions. I usually create feature branches, push changes, and create pull requests for review. I understand conflict resolution, merge vs rebase, cherry-picking commits, reverting changes, and semantic versioning. In frontend projects, Git workflows are extremely important because many developers work on the same components and features simultaneously.`,
      },
      {
        title: "Cross-team collaboration",
        body: `Cross-team collaboration is very important in frontend development because frontend developers rarely work alone. Usually they communicate with:
- Backend developers
- QA engineers
- Designers
- Product managers
- DevOps engineers
- Business stakeholders

Good collaboration directly affects product quality and team speed.

Collaboration with other developers means not only writing your own code but also understanding the shared architecture, discussing solutions, reviewing code, helping teammates, and keeping consistency across the project.

For example, if frontend and backend teams work on authentication, they need agreement on:
- API contracts
- Error responses
- Token handling
- Validation rules
- Authorization behavior

Without communication, frontend and backend implementations may not match.

Handling disagreement in code reviews is a very common situation. Good developers understand that code review is about improving the product, not attacking people personally.

For example, one developer may prefer custom hooks while another prefers moving logic to Zustand store. In such situations, it is important to:
- Explain reasoning calmly
- Focus on maintainability and scalability
- Use project conventions
- Discuss trade-offs
- Avoid emotional arguments

A strong developer can accept feedback and also explain their decisions professionally.

Good phrases during disagreements:
I understand your point, but I think this approach may create tighter coupling between UI and business logic.

I agree this works, but I'm worried about scalability if the component becomes larger later.

Sharing knowledge and best practices is another important part of teamwork.

Examples:
- Explaining architecture decisions
- Writing documentation
- Sharing reusable components
- Mentoring junior developers
- Presenting new tools or patterns
- Creating examples or guidelines

For example, a frontend developer may create:
- Shared ESLint configuration
- Shared form components
- Shared API layer
- Documentation for React Query usage

This improves consistency across the whole project.

Building communication across time zones is especially important in remote international teams.

Challenges include:
- Delayed responses
- Different work schedules
- Async communication
- Different cultural communication styles

Good practices:
- Write clear messages
- Document decisions
- Record meeting notes
- Use tickets with enough details
- Avoid blocking others unnecessarily

For example, instead of writing:
API broken

better write:
The /login endpoint returns 500 on staging after submitting valid credentials. I attached request payload and response.

Async communication becomes extremely important when teammates are unavailable for several hours because of timezone differences.

As a frontend developer, communication skills are often as important as technical skills because frontend developers work closely with many other roles.

Interview answer:
Cross-team collaboration is important because frontend developers constantly communicate with backend developers, QA, designers, and product managers. I try to keep communication clear and professional, especially during code reviews or architecture discussions. When disagreements happen, I focus on technical reasoning and trade-offs instead of personal opinions. In distributed teams, async communication and documentation are especially important because teammates may work in different time zones.`,
      },
      {
        title: "CI/CD",
        body: `CI/CD means Continuous Integration and Continuous Delivery or Deployment.

CI/CD automates building, testing, and deploying applications. Modern frontend projects heavily depend on CI/CD because it improves reliability and reduces manual work.

A CI/CD pipeline usually contains several jobs and steps.

Typical frontend pipeline:
1. Install dependencies
2. Run linting
3. Run type checking
4. Run unit tests
5. Build application
6. Run E2E tests
7. Upload artifacts
8. Deploy application

For example:
npm ci
npm run lint
npm run typecheck
npm run test
npm run build

Install dependencies downloads packages required for the project.
Linting checks code quality and style consistency using tools like ESLint or Biome.
Type checking verifies TypeScript correctness.
Testing validates functionality automatically.
Build step creates production-ready frontend files.

Deployment uploads build artifacts to hosting platforms such as:
- Firebase Hosting
- Vercel
- Netlify
- AWS
- Kubernetes
- Docker containers

Environment variables are extremely important in CI/CD.

Frontend applications usually have different environments:
- Development
- Staging
- Production

Each environment may have different:
- API URLs
- Tokens
- Feature flags
- Analytics keys

Example:
VITE_API_URL=https://api-staging.example.com

Secrets should never be stored directly in code or Git repositories.

Instead, CI/CD platforms provide secure secret storage.

Examples:
- GitHub Secrets
- GitLab CI Variables
- CircleCI Environment Variables

Pipeline triggers define when pipelines start.

Common triggers:
- Push to branch
- Pull request creation
- Merge to main
- Scheduled nightly runs
- Manual deployment

Custom scripts can generate reports, run visual regression tests, upload source maps, invalidate CDN cache, or deploy Storybook.

Artifact management means storing build outputs like production bundles, static assets, source maps, and test reports.

Integrating automated tests into pipelines is one of the most important CI/CD practices.

Frontend projects often include:
- Unit tests
- Component tests
- Integration tests
- E2E tests

Notifications are useful because developers should quickly know if something failed.
Teams often use Slack notifications, email alerts, and GitHub status checks.

Caching is important for performance optimization.

Common caches:
- node_modules
- npm cache
- Playwright browsers
- build cache

Debugging failed builds is a very common task.

Frontend developers often analyze:
- CI logs
- Build errors
- Test failures
- Environment variable problems
- Dependency conflicts
- Browser issues

Pipeline security is extremely important.

Good practices:
- Never expose secrets in logs
- Use least privilege access
- Rotate tokens regularly
- Avoid hardcoding credentials
- Protect production deployment permissions

Dynamic workflows mean pipelines behave differently depending on conditions.

Example:
- Run E2E tests only for main branch
- Deploy preview environments only for PRs
- Skip deployment for documentation changes

Common platforms:
- GitHub Actions
- GitLab CI/CD
- CircleCI
- Jenkins

Interview answer:
CI/CD automates testing, building, and deployment processes. In frontend projects, pipelines usually run dependency installation, linting, type checking, tests, builds, and deployments automatically. I also understand environment variables, secret management, caching, artifact storage, and debugging failed builds. CI/CD is important because it helps deliver stable code faster and reduces manual deployment risks.`,
      },
      {
        title: "Environment and tools",
        body: `Frontend developers work with many different tools daily.

Build tools transform source code into optimized production bundles.

Popular build tools:
- Vite
- Webpack
- Parcel

Modern React projects often use Vite because it is very fast and simpler than older Webpack configurations.

CLI tools are command-line tools used during development.

Examples:
- npm
- yarn
- pnpm
- vite
- eslint
- tsc
- docker

Frontend developers use CLI constantly for:
- Starting projects
- Installing packages
- Running tests
- Building applications
- Linting
- Running scripts

IDEs help developers write and debug code.

Popular IDEs:
- Visual Studio Code
- WebStorm

Useful IDE features:
- Autocomplete
- TypeScript support
- Integrated terminal
- Git integration
- Debugging tools
- Extensions
- Refactoring support

GUI tools help visualize and monitor applications.

Examples:
- React DevTools
- Redux DevTools
- Chrome DevTools
- Lighthouse
- Postman
- Docker Desktop

Package management tools manage dependencies.

Common tools:
- npm
- yarn
- pnpm

Frontend developers should evaluate packages carefully:
- Popularity
- Maintenance activity
- Security
- Bundle size
- Documentation
- Community support
- TypeScript support

Before installing a package, developers often check:
- GitHub stars
- Recent commits
- Open issues
- npm downloads
- Bundlephobia size

Multi-environment setup is very common.

Usually projects have:
- Dev
- Stage
- Production

Each environment may have:
- Different APIs
- Different feature flags
- Different databases
- Different analytics

Example:
VITE_API_URL=https://dev-api.example.com
VITE_API_URL=https://api.example.com

Interview answer:
Frontend development depends on many tools including build systems, package managers, IDEs, debugging tools, and CI/CD integrations. I commonly work with Vite, npm or Yarn, VS Code, Chrome DevTools, React DevTools, ESLint, and TypeScript. I also understand how to configure multi-environment projects using environment variables for development, staging, and production.`,
      },
      {
        title: "Code quality",
        body: `Code quality means how readable, maintainable, scalable, and reliable the code is.

Good frontend code should:
- Be understandable
- Be easy to modify
- Avoid duplication
- Be scalable
- Be testable
- Follow consistent standards

In React and TypeScript projects, code quality is extremely important because frontend applications can become very large and complex.

Best practices in JavaScript and TypeScript include:
- Using meaningful naming
- Avoiding duplicated logic
- Splitting large components
- Using strong typing
- Keeping components focused
- Avoiding unnecessary complexity
- Using reusable abstractions carefully

Readable code is easier for teams to maintain.

Bad example:
const a = users.filter(x => x.a).map(y => y.b);

Better example:
const activeUserEmails = users
  .filter(user => user.isActive)
  .map(user => user.email);

Scalable frontend code usually separates:
- UI
- Business logic
- API communication
- State management

For example:
- Components render UI
- Hooks manage logic
- Services handle API requests
- Zustand or Context manage global state

Common frontend code smells:
- Very large components
- Deep prop drilling
- Duplicated validation logic
- Tight coupling
- Too many responsibilities in one file
- Repeated API requests
- Complex nested conditions

Refactoring means improving internal code structure without changing functionality.

Frontend refactoring examples:
- Splitting components
- Extracting hooks
- Reusing shared logic
- Improving folder structure
- Optimizing rendering
- Improving typings

Tooling strongly affects code quality.

Common tools:
- ESLint
- Prettier
- TypeScript
- Biome
- React DevTools

Style guides help teams maintain consistency.

Tracking code quality can include:
- PR reviews
- SonarQube reports
- Coverage reports
- Bundle analysis
- Lint warnings
- Performance metrics

Interview answer:
Code quality is about writing readable, maintainable, scalable, and reliable code. In React projects, I focus on proper component structure, reusable logic, strong TypeScript typing, and avoiding code duplication. I use tools like ESLint, Prettier, TypeScript, and React DevTools to maintain quality and consistency. Refactoring is also important because frontend applications grow quickly and need clean architecture to remain maintainable.`,
      },
    ],
  },
  {
    id: "architecture-design",
    label: "Architecture and Design",
    description:
      "Architecture styles, diagrams, design techniques, refactoring, and design patterns.",
    sections: [
      {
        title: "API and Application Security: architecture styles",
        body: `Architecture style means the general way we organize an application. It defines how different parts of the system communicate and how responsibilities are separated.

In frontend development, architecture is important because React applications can quickly become difficult to maintain if components, API logic, state, and business rules are mixed together.

Monolithic architecture means the application is built as one single unit. For example, one React app contains all pages, features, routing, API logic, state management, and UI components in one project. It is simple at the beginning, but with growth it can become harder to scale and maintain.

Modular architecture means the app is divided into independent modules. Each module has its own responsibility. In React, examples are features/auth, features/users, features/dashboard, and features/settings. Each module may contain its own components, hooks, API calls, types, and helpers.

Component-based architecture is the main idea behind React. The UI is built from small reusable components. Good components are reusable, readable, focused, easy to test, and not too large.

Microfrontend architecture means splitting frontend into smaller independently developed and deployed applications. It is useful for large teams, but it adds complexity around shared dependencies, routing, global state, design system consistency, deployment coordination, and performance.

Flux is an architecture pattern for managing data flow in frontend applications. The main idea is one-directional data flow. The UI triggers an action, the state changes in a predictable way, and the UI re-renders.

Hybrid architecture means combining several architecture styles. A React app can be one deployed application, feature-based internally, component-based for UI, and use Flux-like state management.

Architecture patterns are reusable solutions for organizing code. In frontend, common patterns include layered architecture, feature-based architecture, MVC-like separation, container/presentational components, state management patterns, and component composition.

Architecture models are simplified representations of the system structure. They can show components, modules, data flow, dependencies, deployment structure, and communication between frontend and backend.

OOD means Object-Oriented Design. In React, we do not always use classical OOP, but OOD ideas are still useful through TypeScript interfaces, encapsulated services, reusable modules, and clear separation of responsibilities.

SOLID principles help write maintainable code:
- Single Responsibility Principle: keep components focused
- Open/Closed Principle: prefer extension over modification
- Liskov Substitution Principle: replace similar components safely
- Interface Segregation Principle: avoid unnecessary props
- Dependency Inversion Principle: depend on abstractions like services

OOP means Object-Oriented Programming. Main concepts are encapsulation, inheritance, polymorphism, and abstraction. In modern React, OOP ideas still help when designing services, models, and clear interfaces.`,
      },
      {
        title: "Dependency and Vulnerability Management: diagrams and modeling",
        body: `The C4 model is a way to describe software architecture using four levels:
- Context
- Container
- Component
- Code

Context diagram shows the whole system and external users or systems.
Example:
User -> React App -> Backend API -> Database

Container diagram shows main applications or services such as React Web App, Backend API, PostgreSQL Database, S3 Storage, and Authentication Provider.

Component diagram shows internal parts of one container. For frontend this can include pages, feature modules, shared components, API client, state management, and router.

Code diagram shows detailed classes or code structure. It is used less often because it becomes outdated quickly.

UML means Unified Modeling Language. It is a standard way to visualize software design.

Useful diagrams:
- Use Case Diagram: what users can do in the system
- Class Diagram: classes, properties, methods, and relationships
- Entity Relationship Diagram: database entities and relationships
- Data Flow Diagram: how data moves through the system
- Component Diagram: main system components and dependencies
- Deployment Diagram: where the application is deployed
- Activity Diagram: flow of actions
- State Diagram: possible UI or object states
- Sequence Diagram: interactions between parts over time
- BPMN: business process modeling

For a frontend project, strong examples are:
1. System Context Diagram
2. Frontend Component Diagram
3. Sequence Diagram for login
4. State Diagram for form states

Interview phrase:
For my project, I would prepare a C4 context diagram, a frontend component diagram, a sequence diagram for one important flow like login or creating an item, and a state diagram for UI states such as idle, loading, success, and error.`,
      },
      {
        title: "Fundamental design techniques",
        body: `Modularity means splitting the application into independent parts such as features, components, hooks, services, and utilities.

Reusability means writing code that can be used in many places. Reusable code can be UI components, hooks, helper functions, validation schemas, or API services.

Encapsulation means hiding internal logic and exposing only a simple interface. For example, a component can call useUsers() without knowing how fetching and caching work internally.

Interface or contract design means defining clear rules for communication between parts of the system. In TypeScript, interfaces are useful for component props, API requests, API responses, and domain models.

Separation of Concerns means different parts of code should handle different responsibilities. UI components focus on rendering, hooks contain logic, services handle API calls, and utilities handle formatting or validation.

Scalability means the project can grow without becoming messy. Extensibility means new functionality can be added without rewriting everything.

Example feature structure:
features/users/
  api/userApi.ts
  hooks/useUsers.ts
  components/UserTable.tsx
  components/UserFilters.tsx
  types.ts

This structure shows modularity, separation of concerns, reusability, and encapsulation.`,
      },
      {
        title: "Data Protection and Privacy Basics: refactoring",
        body: `Refactoring means improving code structure without changing external behavior.

Code-level refactoring includes:
- Renaming variables
- Extracting functions
- Removing duplication
- Simplifying conditions
- Replacing magic numbers with constants
- Improving types

Object-oriented refactoring is more related to classes and objects, such as extracting classes, moving methods, extracting interfaces, and reducing class responsibilities.

Frontend-specific refactoring often means:
- Splitting large components
- Extracting custom hooks
- Improving component composition
- Removing prop drilling
- Moving API calls to services
- Improving form handling
- Improving accessibility
- Replacing duplicated UI with reusable components

Restructuring techniques change the organization of files, modules, or architecture. For example, moving from a flat components folder to a feature-based structure.

Useful tools:
- TypeScript
- ESLint
- Prettier
- Biome
- SonarQube
- React DevTools
- Chrome Performance tab
- Bundle analyzers
- IDE refactoring tools

Common frontend code smells:
- Huge components
- Duplicated logic
- Deeply nested JSX
- Too many props
- Prop drilling
- Mixed UI and business logic
- Unclear naming
- Hardcoded values
- Repeated API calls
- Complex conditions
- Missing types

Generalization means extracting common behavior from several similar parts, for example replacing SaveButton, DeleteButton, and CancelButton with a reusable Button component.`,
      },
      {
        title: "Design and design patterns",
        body: `Conceptual design describes what the system should do from a high level and focuses on business needs and user flows.

Technical design describes how the system will be implemented, for example React + TypeScript, React Query for API data, Zustand for global state, Vite for build, and Playwright for E2E tests.

Component-Driven Development means building UI from isolated reusable components. Storybook is often used for this.

Feature-Sliced Design organizes frontend code by layers and features such as app, pages, widgets, features, entities, and shared.

Atomic Design organizes UI from small to large parts:
Atoms -> Molecules -> Organisms -> Templates -> Pages

Responsive design means the UI works well on different screen sizes using media queries, flexible layouts, grid, flexbox, responsive typography, and mobile-first approach.

Progressive enhancement means starting with basic functionality and improving experience when more browser features are available.

Control hierarchy in React means parent components manage state and pass data to child components through props. Children communicate changes through callbacks.

Useful design patterns in React projects:
- Singleton for API clients
- Factory for creating notifications, fields, or config-based objects
- Adapter for mapping backend responses to frontend models
- Decorator for HOCs and added behavior
- Composite for menus and component composition
- Observer for event listeners, subscriptions, and store updates
- Strategy for validation, sorting, and filtering
- Command for actions like save, delete, copy, undo, or redo

Final interview phrase:
In my React projects, I use design patterns even if I do not always name them explicitly. For example, I use Singleton for API clients, Adapter for mapping backend responses to frontend models, Strategy for validation or sorting logic, Observer through subscriptions and state updates, and Composite through component composition. These patterns help make the code more reusable, maintainable, and easier to extend.`,
      },
    ],
  },
  {
    id: "api-react-foundations",
    label: "API and React",
    description:
      "API design, HTTP, GraphQL, React concepts, TypeScript, HTML, and CSS fundamentals.",
    sections: [
      {
        title: "API design and use",
        body: `API resource modeling means deciding what main objects exist in the system and how the frontend communicates with them.

For example, in a lead-generation app, resources can be:
- users
- leads
- companies
- cards
- auth

A REST API usually represents resources with URLs like:
GET /leads
GET /leads/:id
POST /leads
PUT /leads/:id
DELETE /leads/:id

In frontend, API layers often mirror these resources through service objects such as leadsApi, usersApi, or authApi.

HTTP API design includes methods, status codes, headers, and URLs.

HTTP methods:
- GET: read data
- POST: create data
- PUT: replace or update data
- PATCH: partially update data
- DELETE: delete data

Common status codes:
- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 422 Validation Error
- 500 Server Error

Headers provide metadata. Common headers include Authorization, Content-Type, Accept, and X-Request-ID.

API response representation is usually JSON. Good APIs return predictable and consistent formats for lists, details, pagination, and errors.

URI handling in frontend includes path params, query params, encoding, filters, pagination, and sorting. URLSearchParams is safer than manual string concatenation.

GraphQL allows frontend to request exactly the needed fields. It supports queries, mutations, and subscriptions.

Same Origin Policy is a browser security rule that prevents scripts from one origin from freely accessing resources from another origin.

JSONP is an old workaround for cross-origin requests using script tags. It is mostly outdated and replaced by CORS.

A proxy is often used in frontend development to forward API requests to the backend and avoid CORS issues locally.

Custom headers are useful for authentication, tenant identification, app versioning, or tracking. If they are used in cross-origin requests, backend CORS configuration must explicitly allow them.

CORS means Cross-Origin Resource Sharing. Backend must allow the frontend origin, methods, and headers.

Interview answer:
From HTTP perspective, API design includes correct methods, status codes, headers, and URI structure. As a frontend developer, I use status codes to handle UI states, authorization errors, validation errors, and server errors correctly.`,
      },
      {
        title: "React framework usage and extensions",
        body: `Fiber is React's internal rendering architecture. It helps React split rendering work into smaller units and prioritize updates.

React uses one-way data flow. Data usually goes from parent to child through props.

Reversed dataflow means child components send data back to parent through callback props.

React has several state levels:
- Local state for component-specific data
- Context for app-wide simple values like theme or auth
- Global state tools like Redux, Zustand, MobX, Jotai, or Recoil
- Server state tools like React Query, Apollo Client, or SWR

Props drilling happens when props are passed through many intermediate components that do not use them.

Component lifecycle phases are mounting, updating, and unmounting. In functional components, lifecycle behavior is usually handled with useEffect.

React uses synthetic events such as onClick, onChange, onSubmit, and onKeyDown.

Keys help React efficiently update lists. The best key is a stable unique ID.

Conditional rendering means showing different UI for loading, error, empty, success, permissions, or other states.

Refs are useful for focus management, scrolling, measuring elements, working with third-party libraries, and storing mutable values that should not trigger re-render.

Controlled components store input values in React state. Uncontrolled components keep values in the DOM and are usually accessed through refs.

Hooks allow functional components to use state, effects, refs, context, memoization, and custom reusable logic.

Portals render components outside their parent DOM hierarchy. They are commonly used for modals, tooltips, dropdowns, notifications, and drawers.

React Strict Mode helps find unsafe side effects and deprecated patterns in development.

Memoization tools include React.memo, useMemo, and useCallback. They should be used carefully and only when there is a real performance reason.`,
      },
      {
        title: "Primary language and coding",
        body: `JavaScript uses prototype-based inheritance.

Destructuring makes it easier to extract values from objects, arrays, and props.

Template strings make interpolation and multiline strings easier to read.

Modules help organize code into reusable files through import and export.

Proxy can intercept operations on objects and is used internally by some libraries for reactivity and state tracking.

Async and await make asynchronous code easier to read and are commonly used for API requests and other async operations.

WeakMap and WeakSet store weak references to objects and are useful for metadata or object-related caching.

Regular expressions are used for pattern matching, validation, search, and formatting.

Web Workers run JavaScript in a background thread for heavy calculations.

Service Workers sit between browser and network and are used for PWA features like caching, offline support, push notifications, and background sync.

LocalStorage persists data between sessions. SessionStorage exists only during one browser tab session. Sensitive data should be handled carefully because both are accessible from JavaScript.

To send events from one tab to another, you can use the storage event or the BroadcastChannel API.`,
      },
      {
        title: "Supportive language and coding",
        body: `.d.ts files are TypeScript declaration files. They describe types for JavaScript modules, global variables, assets, or libraries without TypeScript types.

Important TypeScript keywords:
- any disables type checking
- unknown is safer because it requires type checking before use
- never represents impossible states or functions that never return
- void means a function does not return a meaningful value

Useful utility types:
- Pick
- Omit
- Partial
- Exclude

keyof typeof helps create types from runtime constant objects.

ReturnType creates a type from a function return value and helps avoid duplication.

Interview phrase:
I use ReturnType when I want to derive a type from a function instead of writing it manually. I use .d.ts files for global types, custom module declarations, and assets like SVG or CSS modules.`,
      },
      {
        title: "HTML, accessibility, security and SEO",
        body: `An iframe embeds another HTML page inside the current page. It is useful for maps, payment widgets, embedded dashboards, video players, and third-party forms. Security matters, so sandboxing and permissions should be considered.

Web components are browser-native reusable components built with Custom Elements, Shadow DOM, and HTML templates.

Semantic HTML means using elements according to their meaning, such as header, nav, main, section, article, footer, button, and form.

Good form implementation includes labels, validation, clear error messages, keyboard navigation, disabled or loading states, autocomplete, and accessibility.

For multimedia and graphics, frontend apps use images, video, audio, canvas, and SVG. Performance and accessibility matter, so assets should be optimized and images should have meaningful alt text.

Attributes and metadata help control element behavior, accessibility, SEO, and social sharing previews.

Links should be used for navigation. Buttons should be used for actions.

Accessibility means making the application usable for people with disabilities through semantic HTML, labels, keyboard navigation, focus states, alt text, color contrast, and proper headings.

Frontend security includes avoiding XSS, avoiding dangerous innerHTML, validating inputs, protecting tokens, using HTTPS, and avoiding exposed secrets.

SEO includes title, description, semantic HTML, Open Graph tags, canonical URLs, performance, accessibility, and structured content.`,
      },
      {
        title: "CSS concepts",
        body: `Important CSS concepts include:
- Box model
- Specificity
- Cascade
- Inheritance
- Positioning
- Display
- Flexbox
- Grid
- Media queries
- Pseudo-classes
- Pseudo-elements

Transitions animate changes between two states. Animations use keyframes for more complex movement.

Responsive design means the UI adapts to different screen sizes. Common tools are flexbox, grid, media queries, responsive units, and Tailwind breakpoints.

TailwindCSS is a utility-first CSS framework that speeds up development and keeps spacing and styling consistent.

CSS-in-JS means writing styles in JavaScript or TypeScript. It is useful for dynamic styling and themes, but runtime cost and project standards should be considered.

Cross-browser compatibility is managed by using modern but well-supported CSS, checking support on Can I Use, relying on autoprefixer, testing in major browsers, and avoiding unsupported APIs without fallback.

Responsive design is usually implemented mobile-first. Start with small screens, then add breakpoints for tablets and desktops.`,
      },
    ],
  },
  {
    id: "data-security",
    label: "Data and Security",
    description:
      "Sensitive data handling, authentication, network security, validation, and vulnerability management.",
    sections: [
      {
        title: "Data Handling and Privacy",
        body: `Sensitive data is any data that can harm the user or company if it is leaked. In frontend, this can include access tokens, refresh tokens, personal user data, payment data, private documents, API keys, or internal business data.

The browser is not a safe place for secrets. Everything sent to the browser can potentially be inspected through DevTools, source files, local storage, network requests, or runtime state.

You should not store private API keys, database credentials, refresh tokens, or unnecessary sensitive personal data in frontend code, localStorage, or global state.

localStorage persists data until manually removed. It is useful for non-sensitive values like theme, language, filters, or UI preferences, but it is accessible from JavaScript and vulnerable if XSS happens.

sessionStorage is similar, but it exists only during one tab session. It is useful for temporary values such as draft text or temporary UI state.

Cookies are automatically sent with requests to the same domain and can be configured with:
- HttpOnly
- Secure
- SameSite

HttpOnly prevents JavaScript from reading the cookie.
Secure means the cookie is sent only over HTTPS.
SameSite helps protect against CSRF.

The safest common approach is to store refresh tokens in HttpOnly Secure SameSite cookies and keep access tokens short-lived, preferably in memory.

Best interview answer:
If possible, I would not store a long-lived JWT in localStorage. For better security, I would use an HttpOnly Secure SameSite cookie, especially for refresh tokens. If the app uses access and refresh tokens, I would keep the access token short-lived and store it in memory, while the refresh token is stored in an HttpOnly cookie. This reduces the risk of token theft through XSS.`,
      },
      {
        title: "Authentication and Authorization",
        body: `Authentication answers the question: Who are you?
Authorization answers the question: What are you allowed to do?

Token-based authentication means the server gives the client a token after successful login, and the client sends this token with future requests in the Authorization header.

JWT means JSON Web Token. It has three parts:
header.payload.signature

The payload can contain user id, role, and expiration time, but it should not contain sensitive data because it is readable.

OAuth2 is an authorization framework often used for flows like Login with Google. The frontend usually starts the flow, but token exchange should happen on the backend because the frontend should not handle client secrets.

Auth errors should be generic to avoid leaking information. For example, Invalid email or password is safer than telling the user whether the email exists.

MFA means Multi-Factor Authentication and adds another verification step after password login.

RBAC means Role-Based Access Control.
ABAC means Attribute-Based Access Control.

Frontend can hide or show UI based on role or attributes, but backend must always enforce real authorization.

Route protection in frontend improves user experience, but real security must be enforced on the backend because users can manipulate frontend code.`,
      },
      {
        title: "Network security",
        body: `HTTPS encrypts data between browser and server and protects credentials, tokens, API requests, and responses in transit.

Important secure HTTP headers include:
- Content-Security-Policy
- X-Content-Type-Options: nosniff
- X-Frame-Options
- Strict-Transport-Security
- Referrer-Policy
- Permissions-Policy

CSP means Content Security Policy. It controls which scripts, styles, images, fonts, and connections the browser can load. It helps reduce the risk and impact of XSS.

Browsers have built-in security mechanisms such as Same Origin Policy, CORS, secure cookie flags, CSP, and sandboxed iframes.

If an app is vulnerable to XSS, the fix starts with finding where untrusted data is rendered. Avoid dangerouslySetInnerHTML when possible. React escapes text by default, so normal JSX rendering is safer. If HTML rendering is required, sanitize it with a trusted sanitizer like DOMPurify.

Strong answer:
To fix XSS, I would avoid rendering untrusted HTML, remove unsafe innerHTML or dangerouslySetInnerHTML, sanitize user-generated HTML if it must be rendered, validate input, add CSP, avoid eval, and make sure sensitive tokens are protected.`,
      },
      {
        title: "Input validation and sanitization",
        body: `Input validation means checking whether user input matches expected rules. Client-side validation improves user experience, but backend validation is always required because users can bypass frontend code.

Sanitization means removing or escaping dangerous content from user input or user-generated content.

Avoid innerHTML for user-generated content because it can create XSS vulnerabilities. In plain DOM code, prefer textContent over innerHTML. In React, prefer normal JSX text rendering.

Avoid eval because it can execute arbitrary JavaScript and create serious security vulnerabilities.`,
      },
      {
        title: "Code quality and vulnerability management",
        body: `Secure code quality means writing code that is consistent, readable, maintainable, and avoids dangerous patterns.

For frontend, this includes:
- TypeScript strict typing
- ESLint rules
- Prettier or Biome formatting
- Code review
- Safe dependency usage
- No secrets in frontend
- No unsafe HTML rendering
- Proper error handling

Before adding a third-party library, check:
- Whether it is really needed
- Whether it is actively maintained
- Whether it has known vulnerabilities
- Whether bundle size is acceptable
- Whether it supports TypeScript
- Whether documentation is good

Dependencies should be updated regularly because old versions may contain vulnerabilities.

Helpful tools:
- npm audit
- yarn audit
- Snyk
- Dependabot
- GitHub security alerts
- GitLab dependency scanning

Practical risk reduction:
- Use lock files
- Do not install unknown packages without review
- Remove unused dependencies
- Keep packages updated
- Use automated vulnerability scanning in CI/CD
- Review changelogs for major updates`,
      },
      {
        title: "Security testing",
        body: `Vulnerability assessment means checking the application for known security weaknesses such as:
- Dependency vulnerabilities
- XSS risks
- Insecure token storage
- Missing security headers
- Unsafe iframe usage
- Exposed secrets
- Bad CORS configuration

Penetration testing is a deeper manual security test where specialists try to attack the application like real attackers.

Automated security scanning can run in CI/CD. Common tools include:
- npm audit
- Snyk
- Dependabot
- OWASP ZAP
- SonarQube
- GitHub CodeQL
- GitLab dependency scanning

Strong final interview answer:
As a middle frontend developer, I understand that frontend security is not only about UI. It includes safe data handling, secure token storage, authentication and authorization flows, protection from XSS, secure API communication, dependency management, and security testing. I know that the browser is not a safe place for secrets, so I avoid storing sensitive data in frontend code or localStorage when possible. For tokens, I prefer short-lived access tokens and refresh tokens stored in HttpOnly Secure SameSite cookies. I also avoid unsafe APIs like innerHTML and eval, use validation and sanitization, follow secure coding standards, review dependencies, and rely on tools like ESLint, TypeScript, npm audit, Snyk, or CI security scanning.`,
      },
    ],
  },
  {
    id: "ai-fundamentals",
    label: "AI Fundamentals",
    description:
      "RAG, prompting, AI limitations, IDE workflows, and code integrity checks.",
    sections: [
      {
        title: "AI Fundamentals",
        body: `RAG means Retrieval-Augmented Generation. The model first retrieves relevant context from documents, codebase files, tickets, or documentation and then generates an answer based on that context. It is useful when working with private documentation, internal frameworks, or project-specific patterns.

In-context learning means giving examples directly inside the prompt so the model understands the expected format, style, or architecture.

Temperature controls randomness. Low temperature gives more predictable output and is better for code generation. Higher temperature is better for brainstorming, but it increases the risk of incorrect or unstable solutions.

Top-P controls how many possible next tokens the model considers. Lower Top-P makes output more focused. Higher Top-P makes it more diverse.

Frequency penalty reduces repeated words or phrases. It is usually more useful for text than for code.

Trade-offs:
- Low temperature is better for correctness, tests, bug fixing, and strict formats
- High temperature is better for creative exploration and naming ideas

Strong interview answer:
For code generation, I prefer low temperature because correctness is more important than creativity.`,
      },
      {
        title: "Working with internal frameworks and AI limitations",
        body: `AI often does not know proprietary company frameworks because they are private and not part of public training data.

To make AI useful with internal frameworks:
- Provide examples
- Provide type definitions
- Provide documentation
- Tell AI not to invent methods
- Tell AI to follow only known project patterns

AI limitations include:
- Knowledge cutoff
- Hallucinations
- Outdated APIs
- Version confusion
- Invented methods

Version mismatch is a common issue. For example, AI may generate React Router v5 syntax in a project using React Router v6.

To force AI to follow internal patterns, give strict constraints such as:
- Follow the same folder structure
- Use existing shared components
- Use the existing data fetching solution
- Do not create new libraries
- Mark unknown parts as TODO instead of inventing them

To verify suggested methods:
- Check IDE autocomplete
- Inspect installed TypeScript types
- Read official documentation
- Check package source code
- Run a small local test or build

Hallucinations happen because LLMs predict statistically likely text. They do not actually execute code or verify packages unless connected to tools.`,
      },
      {
        title: "Prompt engineering",
        body: `For complex tasks, it is useful to ask AI to create a visible implementation plan before writing code. This helps catch wrong assumptions early.

Few-shot prompting means giving examples so AI follows a specific format, style, or pattern.

Structured output prompting means defining an exact schema such as JSON and asking the model not to include extra text.

When asking AI to generate tests, it is important to request edge cases, not only happy paths.

Useful instruction patterns:
- Cover loading, error, validation, and accessibility states
- Test user-visible behavior
- Do not test implementation details
- Include disabled states, retries, double-submit prevention, and network errors`,
      },
      {
        title: "IDE integration and workflows",
        body: `AI integration in the IDE is useful because it can work with actual codebase context.

Common use cases:
- Generating components
- Refactoring
- Writing tests
- Explaining code
- Finding bugs
- Updating multiple files

Plan or Composer mode is helpful for multi-file tasks because it can list files, steps, risks, and tests before editing.

For multi-file refactoring, give strict rules:
- Do not change behavior
- Keep public props backward compatible
- Update imports
- Add or update tests

Codebase indexing helps AI understand project context, but it is still useful to explicitly point it to source-of-truth files like package.json, shared UI components, API client files, and existing features.

AI-assisted refactoring should always be verified with type checking, linting, tests, and manual review.`,
      },
      {
        title: "Code integrity and security with AI",
        body: `AI may generate simple but dangerous code that loads everything into memory. Production code should be checked for memory complexity.

Example risk:
- Loading a huge file into memory creates O(N) memory usage
- Streaming one record at a time keeps memory closer to O(1)

When AI suggests a dependency:
- Verify the package exists
- Check for typosquatting
- Review npm page and GitHub repo
- Check maintainers, publish date, open issues, license, bundle size, and TypeScript support

License compliance matters. MIT and Apache are usually easier for commercial use. GPL may require legal review.

Last maintenance date matters because abandoned packages may contain vulnerabilities or become incompatible with modern tooling.

AI-generated try/catch blocks are often too generic. Good error handling should preserve context, distinguish transient and terminal errors, and show appropriate feedback.

Retry policy with exponential backoff should retry only transient failures such as:
- Network errors
- Timeouts
- 429
- 5xx responses

It should not retry terminal errors such as:
- 400
- 401
- 403
- 404
- 422

Final strong interview summary:
As a middle frontend developer, I use AI as an assistant, not as a source of truth. I understand concepts like RAG, in-context learning, temperature, and structured prompting. For code generation, I prefer low temperature because correctness is more important than creativity. When working with internal frameworks, I provide AI with real project examples and force it to follow existing patterns. I verify suggested APIs through IDE, TypeScript types, official docs, and local tests. I also review AI-generated code for production risks, such as loading large files into memory, adding unsafe dependencies, swallowing errors, or retrying requests incorrectly. For me, AI improves speed, but code quality, security, and correctness still require developer review.`,
      },
    ],
  },
];

export function InfoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Info"
        description="A six-theme study space with frontend interview notes, engineering concepts, and practical examples."
        breadcrumbs={[ROOT_BREADCRUMB, { label: "Info" }]}
        actions={<Badge variant="outline">6 themes</Badge>}
      />

      <Alert
        variant="info"
        title="All themes added"
        description="Each tab now contains the full study text you provided. The layout stays simple so large theory blocks remain readable."
      />

      <Tabs defaultValue={studyThemes[0].id} className="space-y-4">
        <TabsList>
          {studyThemes.map((theme) => (
            <TabsTrigger key={theme.id} value={theme.id}>
              {theme.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {studyThemes.map((theme) => (
          <TabsContent key={theme.id} value={theme.id} className="space-y-4">
            <ChartCard
              title={theme.label}
              description={theme.description}
              action={
                <Badge variant="default">
                  {theme.sections.length} sections
                </Badge>
              }
            >
              <p className="text-sm leading-7 text-muted-foreground">
                This tab groups the topic into focused sections so it is easier
                to review before interviews or use as a project study guide.
              </p>
            </ChartCard>

            {theme.sections.map((section) => (
              <ChartCard
                key={section.title}
                title={section.title}
                description="Study notes"
              >
                <div className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                  {section.body}
                </div>
              </ChartCard>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
