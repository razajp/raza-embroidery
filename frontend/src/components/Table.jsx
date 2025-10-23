import { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import SortableHeader from "./SortableHeader";

export default function Table({
  headers = [], // Each header: { label, key, center, className }
  rows = [],
  renderRow,
  gridCols,
}) {
  const { colors, borders } = useTheme();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const sortedRows = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return rows;
    return [...rows].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }

      return sortConfig.direction === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [rows, sortConfig]);

  return (
    <div
      className={`overflow-x-auto rounded-2xl shadow h-full flex flex-col ${colors.card} p-1`}
    >
      {/* Header */}
      <div
        className={`grid ${gridCols} gap-0 ${colors.primaryBg} px-7 py-2.5 rounded-xl font-semibold`}
      >
        {headers.map((header, idx) => (
          <div
            key={idx}
            className={`flex items-center ${
              header.center ? "justify-center" : ""
            } ${header.className || ""}`}
          >
            <SortableHeader
              label={header.label}
              sortKey={header.key}
              currentSort={sortConfig}
              onSort={handleSort}
            />
          </div>
        ))}
      </div>

      {/* Rows */}
      <div
        className={`h-full overflow-x-hidden overflow-y-auto mt-2.5 m-2 overflow-hidden rounded-xl`}
      >
        {sortedRows.length > 0 ? (
          sortedRows.map((row, index) => (
            <div
              key={index}
              className={`grid ${gridCols} gap-0 ${colors.hover} border-0 ${borders.primary} border-b transition-colors px-5 py-2.5 items-center`}
            >
              {renderRow(row, index)}
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500 col-span-full">
            No data found
          </div>
        )}
      </div>
    </div>
  );
}
