import { useTheme } from "../../context/ThemeContext";
import usePageTitle from "../../hooks/usePageTitle"

export default function CustomerSummary() {
  const { colors } = useTheme();
  usePageTitle('Customers Summary')

  return (
    <div className={`p-6 space-y-6 ${colors.bg}`}>
      <h2 className={`text-2xl font-bold ${colors.heading}`}>Customer Summary</h2>
    </div>
  );
}
