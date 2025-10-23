import { useTheme } from '../context/ThemeContext'

export default function Button({ onClick, children, className = "", type = 'primary' }) {
  const { colors } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2.5 px-4 py-2 rounded-xl shadow font-medium active:scale-85 ${type == 'primary' ? colors.primaryBtn : ''} ${className}`}
    >
      {children}
    </button>
  );
}
