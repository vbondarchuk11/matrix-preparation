import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(
  value: string,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(new Date(value));
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export function getStatusVariant(
  value: string | undefined,
): "default" | "success" | "warning" | "danger" | "outline" {
  const normalized = value?.toLowerCase() ?? "";

  if (
    normalized.includes("active") ||
    normalized.includes("healthy") ||
    normalized.includes("won") ||
    normalized.includes("available") ||
    normalized.includes("success")
  ) {
    return "success";
  }

  if (
    normalized.includes("risk") ||
    normalized.includes("warning") ||
    normalized.includes("blocked") ||
    normalized.includes("critical")
  ) {
    return "warning";
  }

  if (
    normalized.includes("lost") ||
    normalized.includes("security") ||
    normalized.includes("high")
  ) {
    return "danger";
  }

  if (normalized.includes("lead") || normalized.includes("draft")) {
    return "outline";
  }

  return "default";
}
