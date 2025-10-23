import { useTheme } from "../../context/ThemeContext";

export default function CustomerSummary() {
  const { colors } = useTheme();

  return (
    <div className={`p-6 space-y-6 ${colors.bg}`}>
      <h2 className={`text-2xl font-bold ${colors.heading}`}>Customer Summary</h2>
    </div>
  );
}
