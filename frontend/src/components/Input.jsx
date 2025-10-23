import * as Icons from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";

export default function Input({
  label,
  value,
  onChange,
  onEnter,
  placeholder,
  type = "text",
  required = true,
  maxLength,
  inputMode,
  validators = [], // Array of validator objects { validate: fn, message: string }
  icon = null,
  invertBg = false,
}) {
  const { colors, borders } = useTheme();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!validators.length) return;

    const checkValidators = async () => {
      for (let v of validators) {
        const valid =
          v.validate.constructor.name === "AsyncFunction"
            ? await v.validate(value)
            : v.validate(value);

        if (!valid) {
          setError(v.message);
          return;
        }
      }
      setError(null); // all validators passed
    };

    checkValidators();
  }, [value, validators]);

  const handleChange = (e) => {
    let val = e.target.value;
    console.log(val);
    

    // Limit max length
    if (maxLength && val.length > maxLength) return;

    // Run synchronous validators only to block invalid characters
    let allow = true;
    for (let v of validators) {
      if (v.validate.constructor.name !== "AsyncFunction") {
        if (!v.validate(val)) {
          allow = false;
          break;
        }
      }
    }

    if (allow) onChange(val); // only allow if valid
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onEnter) onEnter();
  };

  const IconComponent = icon ? Icons[icon] : null;

  return (
    <div className="relative w-full">
      {label && (
        <label className={`block mb-1 text-sm font-medium ${colors.heading}`}>
          {label} {!required ? '(optional)' : ''}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          value={value}
          maxLength={maxLength}
          inputMode={inputMode}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          className={`w-full ps-4 pr-10 p-2 rounded-xl outline-none ${
            error ? "border border-red-500" : borders.primary
          } ${!invertBg ? colors.bg : colors.secondaryBg}`}
        />

        {IconComponent && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-600">
            <div className="w-px h-7 bg-gray-300 mx-2.5"></div>
            <IconComponent size={16} />
          </span>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
