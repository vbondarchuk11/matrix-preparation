export const ROOT_BREADCRUMB = {
  label: "Workspace",
  href: "/",
} as const;

export const FILTER_ALL = "All" as const;

export const USER_ROLE = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  SALES: "Sales",
  CUSTOMER_SUCCESS: "Customer Success",
  OPERATIONS: "Operations",
} as const;

export const USER_ROLE_OPTIONS = [
  USER_ROLE.ADMIN,
  USER_ROLE.MANAGER,
  USER_ROLE.SALES,
  USER_ROLE.CUSTOMER_SUCCESS,
  USER_ROLE.OPERATIONS,
] as const;

export const CUSTOMER_STATUS = {
  ACTIVE: "Active",
  AT_RISK: "At risk",
  LEAD: "Lead",
} as const;

export const CUSTOMER_STATUS_OPTIONS = [
  CUSTOMER_STATUS.ACTIVE,
  CUSTOMER_STATUS.AT_RISK,
  CUSTOMER_STATUS.LEAD,
] as const;

export const CUSTOMER_HEALTH = {
  HEALTHY: "Healthy",
  NEEDS_ATTENTION: "Needs attention",
  CRITICAL: "Critical",
} as const;

export const CUSTOMER_HEALTH_OPTIONS = [
  CUSTOMER_HEALTH.HEALTHY,
  CUSTOMER_HEALTH.NEEDS_ATTENTION,
  CUSTOMER_HEALTH.CRITICAL,
] as const;

export const CUSTOMER_PLAN = {
  ENTERPRISE: "Enterprise",
  GROWTH: "Growth",
  STARTER: "Starter",
} as const;

export const CUSTOMER_PLAN_OPTIONS = [
  CUSTOMER_PLAN.ENTERPRISE,
  CUSTOMER_PLAN.GROWTH,
  CUSTOMER_PLAN.STARTER,
] as const;

export const CUSTOMER_SEGMENT = {
  STRATEGIC: "Strategic",
  COMMERCIAL: "Commercial",
  SMB: "SMB",
} as const;

export const CUSTOMER_SEGMENT_OPTIONS = [
  CUSTOMER_SEGMENT.STRATEGIC,
  CUSTOMER_SEGMENT.COMMERCIAL,
  CUSTOMER_SEGMENT.SMB,
] as const;

export const DEAL_STAGE = {
  DISCOVERY: "Discovery",
  PROPOSAL: "Proposal",
  NEGOTIATION: "Negotiation",
  LEGAL: "Legal",
  CLOSED_WON: "Closed won",
  CLOSED_LOST: "Closed lost",
} as const;

export const DEAL_STAGE_OPTIONS = [
  DEAL_STAGE.DISCOVERY,
  DEAL_STAGE.PROPOSAL,
  DEAL_STAGE.NEGOTIATION,
  DEAL_STAGE.LEGAL,
  DEAL_STAGE.CLOSED_WON,
  DEAL_STAGE.CLOSED_LOST,
] as const;

export const OPEN_DEAL_STAGE_OPTIONS = [
  DEAL_STAGE.DISCOVERY,
  DEAL_STAGE.PROPOSAL,
  DEAL_STAGE.NEGOTIATION,
  DEAL_STAGE.LEGAL,
  DEAL_STAGE.CLOSED_WON,
] as const;

export const TASK_PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
} as const;

export const TASK_PRIORITY_OPTIONS = [
  TASK_PRIORITY.LOW,
  TASK_PRIORITY.MEDIUM,
  TASK_PRIORITY.HIGH,
  TASK_PRIORITY.CRITICAL,
] as const;

export const TASK_STATUS = {
  OPEN: "Open",
  IN_PROGRESS: "In progress",
  BLOCKED: "Blocked",
  DONE: "Done",
} as const;

export const TASK_STATUS_OPTIONS = [
  TASK_STATUS.OPEN,
  TASK_STATUS.IN_PROGRESS,
  TASK_STATUS.BLOCKED,
  TASK_STATUS.DONE,
] as const;

export const CALENDAR_EVENT_TYPE = {
  MEETING: "Meeting",
  REVIEW: "Review",
  DEMO: "Demo",
  REMINDER: "Reminder",
} as const;

export const CALENDAR_EVENT_TYPE_OPTIONS = [
  CALENDAR_EVENT_TYPE.MEETING,
  CALENDAR_EVENT_TYPE.REVIEW,
  CALENDAR_EVENT_TYPE.DEMO,
  CALENDAR_EVENT_TYPE.REMINDER,
] as const;

export const NOTIFICATION_TYPE = {
  INFO: "Info",
  SUCCESS: "Success",
  WARNING: "Warning",
  SECURITY: "Security",
} as const;

export const NOTIFICATION_TYPE_OPTIONS = [
  NOTIFICATION_TYPE.INFO,
  NOTIFICATION_TYPE.SUCCESS,
  NOTIFICATION_TYPE.WARNING,
  NOTIFICATION_TYPE.SECURITY,
] as const;

export const AUDIT_SEVERITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

export const AUDIT_SEVERITY_OPTIONS = [
  AUDIT_SEVERITY.LOW,
  AUDIT_SEVERITY.MEDIUM,
  AUDIT_SEVERITY.HIGH,
] as const;

export const DEAL_APPROVAL_MODE = {
  AUTO: "Auto",
  MANAGER: "Manager",
  FINANCE: "Finance",
} as const;

export const DEAL_APPROVAL_MODE_OPTIONS = [
  DEAL_APPROVAL_MODE.AUTO,
  DEAL_APPROVAL_MODE.MANAGER,
  DEAL_APPROVAL_MODE.FINANCE,
] as const;

export const SETTINGS_SECTION_OPTIONS = [
  { id: "workspace", label: "Workspace" },
  { id: "security", label: "Security" },
  { id: "branding", label: "Branding" },
] as const;

export const REPORT_CATEGORY_OPTIONS = [
  "Executive",
  "Retention",
  "Growth",
] as const;

export const DEFAULT_CUSTOMER_REGION = "North America";
export const DEFAULT_CREATED_DATE = new Date().toISOString().slice(0, 10);
export const DEFAULT_RENEWAL_DATE = new Date(
  Date.now() + 1000 * 60 * 60 * 24 * 180,
)
  .toISOString()
  .slice(0, 10);
