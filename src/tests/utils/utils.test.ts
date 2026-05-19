import {
  cn,
  formatCompactNumber,
  formatCurrency,
  formatDate,
  formatPercent,
  getStatusVariant,
} from "@/lib/utils";

describe("utils", () => {
  it("merges class names predictably", () => {
    // Arrange
    const base = "rounded-md px-4";
    const override = "px-6";

    // Act
    const result = cn(base, override, "font-medium");

    // Assert
    expect(result).toContain("rounded-md");
    expect(result).toContain("px-6");
    expect(result).not.toContain("px-4");
  });

  it("formats finance and date helpers for dashboard presentation", () => {
    // Act
    const currency = formatCurrency(125000);
    const compact = formatCompactNumber(125000);
    const percent = formatPercent(41.27);
    const date = formatDate("2026-05-19T00:00:00.000Z", {
      timeZone: "UTC",
    });

    // Assert
    expect(currency).toBe("$125,000");
    expect(compact).toBe("125K");
    expect(percent).toBe("41.3%");
    expect(date).toBe("May 19, 2026");
  });

  it("maps CRM statuses to reusable badge variants", () => {
    // Act
    const success = getStatusVariant("Healthy");
    const warning = getStatusVariant("Critical");
    const danger = getStatusVariant("Security");
    const outline = getStatusVariant("Lead");
    const fallback = getStatusVariant(undefined);

    // Assert
    expect(success).toBe("success");
    expect(warning).toBe("warning");
    expect(danger).toBe("danger");
    expect(outline).toBe("outline");
    expect(fallback).toBe("default");
  });
});
