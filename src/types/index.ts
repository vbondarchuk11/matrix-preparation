import type {
  AUDIT_SEVERITY_OPTIONS,
  CALENDAR_EVENT_TYPE_OPTIONS,
  CUSTOMER_HEALTH_OPTIONS,
  CUSTOMER_PLAN_OPTIONS,
  CUSTOMER_SEGMENT_OPTIONS,
  CUSTOMER_STATUS_OPTIONS,
  DEAL_APPROVAL_MODE_OPTIONS,
  DEAL_STAGE_OPTIONS,
  NOTIFICATION_TYPE_OPTIONS,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
  USER_ROLE_OPTIONS,
} from "@/constants/crm";

export type User = {
  id: string;
  name: string;
  email: string;
  role: (typeof USER_ROLE_OPTIONS)[number];
  avatar: string;
  title?: string;
};

export type CustomerStatus = (typeof CUSTOMER_STATUS_OPTIONS)[number];
export type CustomerHealth = (typeof CUSTOMER_HEALTH_OPTIONS)[number];
export type DealStage = (typeof DEAL_STAGE_OPTIONS)[number];
export type TaskPriority = (typeof TASK_PRIORITY_OPTIONS)[number];
export type TaskStatus = (typeof TASK_STATUS_OPTIONS)[number];
export type NotificationType = (typeof NOTIFICATION_TYPE_OPTIONS)[number];
export type AuditSeverity = (typeof AUDIT_SEVERITY_OPTIONS)[number];

export type Customer = {
  id: string;
  company: string;
  industry: string;
  owner: string;
  email: string;
  status: CustomerStatus;
  health: CustomerHealth;
  plan: (typeof CUSTOMER_PLAN_OPTIONS)[number];
  region: string;
  segment: (typeof CUSTOMER_SEGMENT_OPTIONS)[number];
  mrr: number;
  arr: number;
  createdAt: string;
  renewalDate: string;
  contacts: number;
  openDeals: number;
  notes: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
};

export type SalesPoint = {
  name: string;
  revenue: number;
  pipeline: number;
};

export type DashboardQuickAction = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  type: "Deal" | "Customer" | "Task" | "Security";
};

export type Deal = {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  owner: string;
  stage: DealStage;
  value: number;
  probability: number;
  expectedClose: string;
  source: string;
  nextStep: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  title: string;
  account: string;
  assignee: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  type: "Follow-up" | "Renewal" | "Implementation" | "Internal";
};

export type CalendarEvent = {
  id: string;
  title: string;
  owner: string;
  customer?: string;
  start: string;
  end: string;
  location: string;
  type: (typeof CALENDAR_EVENT_TYPE_OPTIONS)[number];
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: User["role"];
  region: string;
  quota: number;
  attainment: number;
  status: "Available" | "In meeting" | "Out of office";
  avatar: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: NotificationType;
  read: boolean;
};

export type AuditLog = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
  severity: AuditSeverity;
};

export type ReportCard = {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
};

export type SegmentPerformance = {
  segment: string;
  retention: number;
  expansion: number;
  pipeline: number;
};

export type DashboardData = {
  metrics: DashboardMetric[];
  salesSeries: SalesPoint[];
  quickActions: DashboardQuickAction[];
  recentActivity: ActivityItem[];
  upcomingTasks: Task[];
  activeDeals: Deal[];
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  title: string;
  phone: string;
  timezone: string;
  bio: string;
  avatar: string;
};

export type SettingsState = {
  companyName: string;
  workspaceId: string;
  securityAlerts: boolean;
  weeklyDigest: boolean;
  autoAssignOwners: boolean;
  dealApprovalMode: (typeof DEAL_APPROVAL_MODE_OPTIONS)[number];
  theme: "Light" | "System";
};
