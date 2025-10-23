import { useState, useMemo } from "react";

/**
 * Flexible search hook
 * @param {Array} data - original data array
 * @param {Object} initialFilters - initial filter values per field
 */
export default function useSearch(data, initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // skip empty filters
        const itemValue = item[key]?.toString().toLowerCase() || "";
        const searchValue = value.toString().toLowerCase();
        return itemValue.includes(searchValue);
      });
    });
  }, [data, filters]);

  return { filters, setFilters, filteredData };
}
