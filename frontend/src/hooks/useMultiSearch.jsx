// hooks/useMultiSearch.jsx
import { useState, useMemo } from "react";

export default function useMultiSearch(data, searchTerm, keys = []) {
  const [search, setSearch] = useState(searchTerm || "");

  const filteredData = useMemo(() => {
    if (!search) return data;

    const lower = search.toLowerCase();
    return data.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        return value && value.toString().toLowerCase().includes(lower);
      })
    );
  }, [data, search, keys]);

  return { search, setSearch, filteredData };
}
