import { useListState } from "@/hooks/use-list-state";
import { act, renderHook } from "@testing-library/react";

describe("useListState", () => {
  it("resets pagination when search and filters change", () => {
    // Arrange
    const { result } = renderHook(() =>
      useListState({
        status: "All",
        owner: "All",
      }),
    );

    // Act
    act(() => {
      result.current.setPage(4);
      result.current.setSearch("northstar");
    });

    // Assert
    expect(result.current.search).toBe("northstar");
    expect(result.current.page).toBe(1);

    // Act
    act(() => {
      result.current.setPage(3);
      result.current.setFilter("status", "Active");
    });

    // Assert
    expect(result.current.filters.status).toBe("Active");
    expect(result.current.page).toBe(1);
  });

  it("restores defaults when filters are reset", () => {
    // Arrange
    const { result } = renderHook(() =>
      useListState({
        status: "All",
        region: "All",
      }),
    );

    // Act
    act(() => {
      result.current.setSearch("europe");
      result.current.setFilter("status", "At risk");
      result.current.setFilter("region", "EMEA");
      result.current.resetFilters();
    });

    // Assert
    expect(result.current.search).toBe("");
    expect(result.current.page).toBe(1);
    expect(result.current.filters).toEqual({
      status: "All",
      region: "All",
    });
  });
});
