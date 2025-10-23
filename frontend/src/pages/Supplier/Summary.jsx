import { useTheme } from "../../context/ThemeContext";
import usePageTitle from "../../hooks/usePageTitle"

export default function SupplierSummary() {
  const { colors } = useTheme();
  usePageTitle('Suppliers Summary')

  return (
    <div className={`p-6 space-y-6 ${colors.bg}`}>
      <h2 className={`text-2xl font-bold ${colors.heading}`}>Supplier Summary</h2>
    </div>
  );
}
