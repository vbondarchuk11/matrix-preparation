import { api } from "@/services/api";
import type {
  AuditLog,
  CalendarEvent,
  Customer,
  DashboardData,
  Deal,
  NotificationItem,
  Profile,
  ReportCard,
  SegmentPerformance,
  SettingsState,
  Task,
  TeamMember,
} from "@/types";

export const crmService = {
  getDashboard: async () => {
    const { data } = await api.get<DashboardData>("/dashboard");
    return data;
  },
  getCustomers: async () => {
    const { data } = await api.get<Customer[]>("/customers");
    return data;
  },
  getCustomer: async (id: string) => {
    const { data } = await api.get<Customer>(`/customers/${id}`);
    return data;
  },
  createCustomer: async (payload: Omit<Customer, "id">) => {
    const { data } = await api.post<Customer>("/customers", payload);
    return data;
  },
  updateCustomer: async (payload: Customer) => {
    const { data } = await api.put<Customer>(
      `/customers/${payload.id}`,
      payload,
    );
    return data;
  },
  deleteCustomer: async (id: string) => {
    await api.delete(`/customers/${id}`);
  },
  getDeals: async () => {
    const { data } = await api.get<Deal[]>("/deals");
    return data;
  },
  getDeal: async (id: string) => {
    const { data } = await api.get<Deal>(`/deals/${id}`);
    return data;
  },
  getTasks: async () => {
    const { data } = await api.get<Task[]>("/tasks");
    return data;
  },
  getCalendarEvents: async () => {
    const { data } = await api.get<CalendarEvent[]>("/calendar/events");
    return data;
  },
  getReports: async () => {
    const cards = await api.get<ReportCard[]>("/reports/cards");
    const segments = await api.get<SegmentPerformance[]>("/reports/segments");
    return { cards: cards.data, segments: segments.data };
  },
  getTeamMembers: async () => {
    const { data } = await api.get<TeamMember[]>("/team");
    return data;
  },
  getNotifications: async () => {
    const { data } = await api.get<NotificationItem[]>("/notifications");
    return data;
  },
  getAuditLogs: async () => {
    const { data } = await api.get<AuditLog[]>("/audit-logs");
    return data;
  },
  getProfile: async () => {
    const { data } = await api.get<Profile>("/profile");
    return data;
  },
  getSettings: async () => {
    const { data } = await api.get<SettingsState>("/settings");
    return data;
  },
};
