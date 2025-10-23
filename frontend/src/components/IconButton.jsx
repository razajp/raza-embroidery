import { useTheme } from "../context/ThemeContext";

export default function IconButton({
  onClick,
  icon: Icon,
  size = 20,
  title = "",
  className = "",
  type = "primary", // "primary" | "secondary" | "transparent"
  badge = null, // number | string | null
  iconColor = null,
}) {
  const { colors } = useTheme();

  const baseStyle = `
    relative flex items-center justify-center w-10 h-10 rounded-xl active:scale-85
  `;

  const typeStyles = {
    primary: `bg-transparent ${colors.primaryBtn} group`,
    secondary: `bg-transparent ${colors.secondaryBtn || "bg-gray-200 hover:bg-gray-300"} group`,
    transparent: `bg-transparent hover:bg-transparent cursor-pointer`,
    danger: `${colors.bgDangerHover} cursor-pointer group`,
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
          className={`${type === "danger" ? 'text-red-700' : 'group-hover:text-white'} ${iconColor || colors.heading}`}
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
