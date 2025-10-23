import { useTheme } from "../context/ThemeContext";

export default function IconButton({
  onClick,
  icon: Icon,
  size = 20,
  title = "",
  className = "",
  type = "primary", // "primary" | "secondary" | "transparent"
  badge = null, // number | string | null
}) {
  const { colors } = useTheme();

  const baseStyle = `
    relative flex items-center justify-center w-10 h-10 rounded-xl bg-transparent group active:scale-85
  `;

  const typeStyles = {
    primary: `${colors.primaryBtn}`,
    secondary: `${colors.secondaryBtn || "bg-gray-200 hover:bg-gray-300"}`,
    transparent: `bg-transparent hover:bg-gray-100`,
  };

  return (
    <button
      onClick={onClick}
      title={title}
      className={`${baseStyle} ${typeStyles[type]} ${className}`}
    >
      {/* Icon */}
      {Icon && (
        <Icon
          size={size}
          className={`group-hover:text-white ${colors.heading}`}
        />
      )}

      {/* Badge */}
      {badge !== null && (
        <span className={`absolute top-1 right-1 h-2.5 aspect-square bg-red-500 rounded-full`} >
        </span>
      )}
    </button>
  );
}
