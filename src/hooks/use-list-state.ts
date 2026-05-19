import { useState } from "react";

type StringFilters<TFilters extends Record<string, string>> = {
  [K in keyof TFilters]: string;
};

export function useListState<TFilters extends Record<string, string>>(
  defaultFilters: TFilters,
) {
  const [search, setSearchState] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] =
    useState<StringFilters<TFilters>>(defaultFilters);

  function setSearch(value: string) {
    setSearchState(value);
    setPage(1);
  }

  function setFilter<K extends keyof TFilters>(
    key: K,
    value: StringFilters<TFilters>[K],
  ) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setSearchState("");
    setPage(1);
  }

  return {
    search,
    setSearch,
    page,
    setPage,
    filters,
    setFilter,
    resetFilters,
  };
}
