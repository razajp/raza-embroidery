import { useState } from "react";
import { X, Filter  } from "lucide-react";
import Input from "./Input";
import Select from "./Select";
import { useTheme } from "../context/ThemeContext";

export default function DynamicFilterPanel({ filtersConfig = [], filters, setFilters }) {
  const { defaultStyling, colors, borders } = useTheme();
  const [open, setOpen] = useState(false);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    const cleared = {};
    filtersConfig.forEach((f) => {
      cleared[f.key] = f.type === "dateRange" ? { from: "", to: "" } : "";
    });
    setFilters(cleared);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium ${colors.primaryBtn}`}
      >
        <Filter size={16} /> {/* ✅ Icon added */}
        Filters
      </button>

      {open && (
        <div className={`absolute top-1/2 -translate-y-1/2 right-5 h-[80%] w-96 ${defaultStyling.FlterBox} z-50 flex flex-col`}>
          {/* Header */}
          <div className={`flex justify-between items-center px-4 py-2.5 w-full border-0 ${borders.primary} border-b`}>
            <h3 className="text-lg font-semibold">Filters</h3>
            <button onClick={() => setOpen(false)} className="cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 w-full overflow-y-auto p-4 flex flex-col gap-4">
            {filtersConfig.map((f, idx) => {
              if (f.type === "text") {
                return (
                  <Input
                    key={idx}
                    icon={f.icon}
                    placeholder={f.placeholder}
                    value={filters[f.key] || ""}
                    onChange={(val) => handleChange(f.key, val)}
                  />
                );
              }
              if (f.type === "select") {
                return (
                  <Select
                    key={idx}
                    name={`select_${f.key}`}
                    label={f.label}
                    value={filters[f.key] || null}
                    onChange={(val) => handleChange(f.key, val)}
                    options={f.options}
                    searchable={f.searchable ?? true}
                    showDefault={f.showDefault ?? true}
                  />
                );
              }
              if (f.type === "dateRange") {
                return (
                  <div key={idx} className="grid grid-cols-2 gap-2.5">
                    <Input
                      type="date"
                      icon="CalendarDays"
                      placeholder="From"
                      value={filters[f.key]?.from || ""}
                      onChange={(val) =>
                        handleChange(f.key, { ...filters[f.key], from: val })
                      }
                      grow={true}
                    />
                    <Input
                      type="date"
                      icon="CalendarDays"
                      placeholder="To"
                      value={filters[f.key]?.to || ""}
                      onChange={(val) =>
                        handleChange(f.key, { ...filters[f.key], to: val })
                      }
                      grow={true}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Footer */}
          <div className={`grid grid-cols-2 gap-2.5 px-2 py-2.5 w-full border-0 ${borders.primary} border-t`}>
            <button
              onClick={handleClear}
              className={`flex items-center justify-center gap-2.5 px-4 py-2 rounded-lg shadow font-medium active:scale-85 ${colors.dangerBtn}`}
            >
              Clear Filters
            </button>
            <button
              onClick={() => setOpen(false)}
              className={`flex items-center justify-center gap-2.5 px-4 py-2 rounded-lg shadow font-medium active:scale-85 ${colors.secondaryBtn}`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
