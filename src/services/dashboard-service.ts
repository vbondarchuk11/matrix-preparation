import { api } from "@/services/api";
import type { DashboardMetric, SalesPoint } from "@/types";

export const dashboardService = {
  async getMetrics() {
    const { data } = await api.get<DashboardMetric[]>("/dashboard/metrics");
    return data;
  },
  async getSalesSeries() {
    const { data } = await api.get<SalesPoint[]>("/dashboard/sales");
    return data;
  },
};
