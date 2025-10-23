import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function DropdownMenu({ items = [] }) {
    const { defaultStyling, colors } = useTheme()
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block`} ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`p-1.5 rounded ${colors.hover} transition cursor-pointer`}
      >
        <MoreVertical size={16} />
      </button>

      {/* Dropdown Items */}
      {open && (
        <div className={`absolute right-0 w-auto rounded-2xl shadow-lg z-10 p-1 flex-col gap-1 ${defaultStyling.FloatingBar}`}>
          {items.map((item, idx) => (
            <button
                key={idx}
                onClick={() => {
                item.onClick();
                setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-nowrap cursor-pointer rounded-xl ${
                colors.hover
                } ${item.className || ""}`} // <-- apply custom color class
            >
                {item.icon && <item.icon size={16} />}
                {item.label}
            </button>
            ))}
        </div>
      )}
    </div>
  );
}
