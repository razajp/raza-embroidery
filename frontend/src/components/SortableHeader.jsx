// components/SortableHeader.jsx
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export default function SortableHeader({ label, sortKey, currentSort, onSort }) {
  const { key, direction } = currentSort || {};

  const handleClick = () => {
    if (!sortKey) return;
    let newDirection = "asc";
    if (key === sortKey && direction === "desc") newDirection = null; // reset sort
    else if (key === sortKey && direction === "asc") newDirection = "desc";
    onSort(sortKey, newDirection);
  };

  const getIcon = () => {
    if (key !== sortKey) return <ArrowUpDown size={14} />;
    if (direction === "desc") return <ArrowDown size={14} />;
    if (direction === "asc") return <ArrowUp size={14} />;
    return <ArrowUpDown size={14} />;
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 select-none cursor-pointer hover:opacity-80"
    >
      {label}
      {getIcon()}
    </button>
  );
}
