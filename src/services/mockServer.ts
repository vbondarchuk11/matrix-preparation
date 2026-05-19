import {
  auditLogs,
  calendarEvents,
  currentUser,
  customers,
  deals,
  getDashboardData,
  notifications,
  profile,
  reportCards,
  segmentPerformance,
  settings,
  tasks,
  teamMembers,
} from "@/services/mock-data";
import type { Customer } from "@/types";

const originalFetch = window.fetch.bind(window);

window.fetch = async (input, init) => {
  const urlValue =
    typeof input === "string"
      ? input
      : input instanceof Request
        ? input.url
        : input.toString();

  if (!urlValue.startsWith("/api")) {
    return originalFetch(input, init);
  }

  const url = new URL(urlValue, window.location.origin);
  const method = init?.method ?? "GET";
  const pathname = url.pathname;

  await new Promise((resolve) => setTimeout(resolve, 350));

  if (pathname === "/api/auth/login" && method === "POST") {
    return jsonResponse({
      token: "demo-token",
      user: currentUser,
    });
  }

  if (pathname === "/api/dashboard" && method === "GET") {
    return jsonResponse(getDashboardData());
  }

  if (pathname === "/api/customers" && method === "GET") {
    return jsonResponse(customers);
  }

  if (pathname === "/api/customers" && method === "POST") {
    const payload = JSON.parse(init?.body as string) as Omit<Customer, "id">;
    const customer = { ...payload, id: `cus_${Date.now()}` };
    customers.unshift(customer);
    return jsonResponse(customer, 201);
  }

  if (pathname.startsWith("/api/customers/") && method === "GET") {
    const id = pathname.split("/").pop();
    const customer = customers.find((item) => item.id === id);
    return customer
      ? jsonResponse(customer)
      : jsonResponse({ message: "Customer not found" }, 404);
  }

  if (pathname.startsWith("/api/customers/") && method === "PUT") {
    const payload = JSON.parse(init?.body as string) as Customer;
    const index = customers.findIndex((item) => item.id === payload.id);

    if (index >= 0) {
      customers[index] = payload;
      return jsonResponse(payload);
    }

    return jsonResponse({ message: "Customer not found" }, 404);
  }

  if (pathname.startsWith("/api/customers/") && method === "DELETE") {
    const id = pathname.split("/").pop();
    const index = customers.findIndex((item) => item.id === id);

    if (index >= 0) {
      customers.splice(index, 1);
      return new Response(null, { status: 204 });
    }

    return jsonResponse({ message: "Customer not found" }, 404);
  }

  if (pathname === "/api/deals" && method === "GET") {
    return jsonResponse(deals);
  }

  if (pathname.startsWith("/api/deals/") && method === "GET") {
    const id = pathname.split("/").pop();
    const deal = deals.find((item) => item.id === id);
    return deal
      ? jsonResponse(deal)
      : jsonResponse({ message: "Deal not found" }, 404);
  }

  if (pathname === "/api/tasks" && method === "GET") {
    return jsonResponse(tasks);
  }

  if (pathname === "/api/calendar/events" && method === "GET") {
    return jsonResponse(calendarEvents);
  }

  if (pathname === "/api/reports/cards" && method === "GET") {
    return jsonResponse(reportCards);
  }

  if (pathname === "/api/reports/segments" && method === "GET") {
    return jsonResponse(segmentPerformance);
  }

  if (pathname === "/api/team" && method === "GET") {
    return jsonResponse(teamMembers);
  }

  if (pathname === "/api/notifications" && method === "GET") {
    return jsonResponse(notifications);
  }

  if (pathname === "/api/audit-logs" && method === "GET") {
    return jsonResponse(auditLogs);
  }

  if (pathname === "/api/profile" && method === "GET") {
    return jsonResponse(profile);
  }

  if (pathname === "/api/settings" && method === "GET") {
    return jsonResponse(settings);
  }

  return jsonResponse({ message: "Not found" }, 404);
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
