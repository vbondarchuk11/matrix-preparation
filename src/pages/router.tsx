import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth-store";
import { type ReactNode, Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

const AppLayout = lazy(() =>
  import("@/layouts/app-layout").then((module) => ({
    default: module.AppLayout,
  })),
);
const AuthLayout = lazy(() =>
  import("@/layouts/auth-layout").then((module) => ({
    default: module.AuthLayout,
  })),
);
const CustomersPage = lazy(() =>
  import("@/pages/customers-page").then((module) => ({
    default: module.CustomersPage,
  })),
);
const CustomerDetailsPage = lazy(() =>
  import("@/pages/customer-details-page").then((module) => ({
    default: module.CustomerDetailsPage,
  })),
);
const DashboardPage = lazy(() =>
  import("@/pages/dashboard-page").then((module) => ({
    default: module.DashboardPage,
  })),
);
const DealsPage = lazy(() =>
  import("@/pages/deals-page").then((module) => ({
    default: module.DealsPage,
  })),
);
const DealDetailsPage = lazy(() =>
  import("@/pages/deal-details-page").then((module) => ({
    default: module.DealDetailsPage,
  })),
);
const TasksPage = lazy(() =>
  import("@/pages/tasks-page").then((module) => ({
    default: module.TasksPage,
  })),
);
const CalendarPage = lazy(() =>
  import("@/pages/calendar-page").then((module) => ({
    default: module.CalendarPage,
  })),
);
const ReportsPage = lazy(() =>
  import("@/pages/reports-page").then((module) => ({
    default: module.ReportsPage,
  })),
);
const TeamMembersPage = lazy(() =>
  import("@/pages/team-members-page").then((module) => ({
    default: module.TeamMembersPage,
  })),
);
const SettingsPage = lazy(() =>
  import("@/pages/settings-page").then((module) => ({
    default: module.SettingsPage,
  })),
);
const ProfilePage = lazy(() =>
  import("@/pages/profile-page").then((module) => ({
    default: module.ProfilePage,
  })),
);
const NotificationsPage = lazy(() =>
  import("@/pages/notifications-page").then((module) => ({
    default: module.NotificationsPage,
  })),
);
const AuditLogsPage = lazy(() =>
  import("@/pages/audit-logs-page").then((module) => ({
    default: module.AuditLogsPage,
  })),
);
const LoginPage = lazy(() =>
  import("@/pages/login-page").then((module) => ({
    default: module.LoginPage,
  })),
);

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token, hydrated } = useAuthStore();

  if (!token && hydrated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

function PublicOnly({ children }: { children: ReactNode }) {
  const { token, hydrated } = useAuthStore();

  if (token && hydrated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function RouteFallback() {
  return (
    <div className="space-y-4 p-4 sm:p-6 lg:p-8">
      <Skeleton className="h-28" />
      <Skeleton className="h-80" />
    </div>
  );
}

export const router = createBrowserRouter(
  [
    {
      path: "/auth",
      element: (
        <PublicOnly>
          <Suspense fallback={<RouteFallback />}>
            <AuthLayout />
          </Suspense>
        </PublicOnly>
      ),
      children: [
        {
          path: "login",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <LoginPage />
            </Suspense>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <LoginPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<RouteFallback />}>
            <AppLayout />
          </Suspense>
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<RouteFallback />}>
              <DashboardPage />
            </Suspense>
          ),
        },
        {
          path: "customers",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <CustomersPage />
            </Suspense>
          ),
        },
        {
          path: "customers/:customerId",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <CustomerDetailsPage />
            </Suspense>
          ),
        },
        {
          path: "deals",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <DealsPage />
            </Suspense>
          ),
        },
        {
          path: "deals/:dealId",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <DealDetailsPage />
            </Suspense>
          ),
        },
        {
          path: "tasks",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <TasksPage />
            </Suspense>
          ),
        },
        {
          path: "calendar",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <CalendarPage />
            </Suspense>
          ),
        },
        {
          path: "reports",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <ReportsPage />
            </Suspense>
          ),
        },
        {
          path: "team",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <TeamMembersPage />
            </Suspense>
          ),
        },
        {
          path: "settings",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <SettingsPage />
            </Suspense>
          ),
        },
        {
          path: "profile",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <ProfilePage />
            </Suspense>
          ),
        },
        {
          path: "notifications",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <NotificationsPage />
            </Suspense>
          ),
        },
        {
          path: "audit-logs",
          element: (
            <Suspense fallback={<RouteFallback />}>
              <AuditLogsPage />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    basename: "/matrix-preparation",
  },
);
