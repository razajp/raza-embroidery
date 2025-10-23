import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { registerSelect, unregisterSelect } from "../utils/selectManager";
import { useTheme } from "../context/ThemeContext";

const Select = forwardRef(
  (
    {
      name, // unique name for global manager
      label,
      options: initialOptions = [],
      value,
      onChange,
      placeholder = "Select...",
      searchable = true,
      disabled = false,
      readonly = false,
      showDefault = true,
      defaultLabel = "Select " + (label || "Option"),
    },
    ref
  ) => {
    const { colors, borders } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState(initialOptions);
    const [internalValue, setInternalValue] = useState(value || null);

    const containerRef = useRef(null);
    const searchRef = useRef(null);

    // Internal API object for global access
    const apiRef = useRef({
      setOptions: (newOptions) => setOptions(newOptions),
      setValue: (val) => {
        setInternalValue(val);
        onChange?.(val, options.find((o) => o.value === val));
      },
      clear: () => {
        setInternalValue(null);
        onChange?.(null, null);
      },
    });

    // Expose API via ref
    useImperativeHandle(ref, () => apiRef.current);

    // Register / unregister in global select manager
    useEffect(() => {
      if (name) registerSelect(name, apiRef.current);
      return () => {
        if (name) unregisterSelect(name);
      };
    }, [name]);

    // --- Auto-select first option if showDefault is false ---
    useEffect(() => {
      if (!showDefault && options.length > 0 && internalValue === null) {
        setInternalValue(options[0].value);
        onChange?.(options[0].value, options[0]);
      }
    }, [showDefault, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setIsOpen(false);
          setSearch("");
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Autofocus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchRef.current) searchRef.current.focus();
    }, [isOpen]);

    // Filter options based on search
    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );

    // Determine the label to display in input
    const selectedLabel =
      internalValue !== null
        ? options.find((o) => o.value === internalValue)?.label || defaultLabel
        : defaultLabel;

    // Handle selecting an option
    const handleSelect = (opt) => {
      if (readonly) return;
      setInternalValue(opt.value);
      onChange?.(opt.value, opt);
      setIsOpen(false);
      setSearch("");
    };

    return (
      <div ref={containerRef} className="relative w-full">
        {/* Label */}
        {label && (
          <label className={`block mb-1 text-sm font-medium ${colors.heading}`}>
            {label}
          </label>
        )}

        {/* Select box */}
        <div
          className={`relative w-full rounded-xl border flex items-center ${borders.primary} ${colors.bg} ${
            disabled || readonly ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => !disabled && !readonly && setIsOpen((prev) => !prev)}
        >
          <input
            type="text"
            value={selectedLabel}
            readOnly
            placeholder={placeholder}
            className="w-full px-4 py-2 rounded-xl text-black outline-none bg-transparent"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-600">
            <div className="w-px h-7 bg-gray-300 mx-2.5"></div>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && !readonly && (
          <div className={`absolute z-50 w-full mt-1 rounded-xl shadow-lg border ${borders.primary} max-h-60 overflow-auto ${colors.bg}`}>
            {/* Search */}
            {searchable && (
              <div className="p-1 pb-0">
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className={`w-full px-3 py-2 rounded-lg outline-none border ${borders.primary} ${colors.bg}`}
                />
              </div>
            )}

            {/* Options */}
            <div className="p-1 space-y-1">
              {/* Default option */}
              {showDefault && (
                <div
                  className={`px-4 py-2 cursor-pointer rounded-lg ${
                    internalValue === null ? colors.primaryBtn : colors.hover
                  }`}
                  onClick={() => handleSelect({ value: null, label: defaultLabel })}
                >
                  {defaultLabel}
                </div>
              )}

              {/* Render filtered options */}
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-2 text-gray-500">No options</div>
              ) : (
                filteredOptions.map((opt) => (
                  <div
                    key={opt.value}
                    className={`px-4 py-2 cursor-pointer rounded-lg ${
                      internalValue === opt.value ? colors.primaryBtn : colors.hover
                    }`}
                    onClick={() => handleSelect(opt)}
                  >
                    {opt.label}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Select;
