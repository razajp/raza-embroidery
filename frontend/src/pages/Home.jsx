import { useTheme } from "../context/ThemeContext";
import { UserPlus, FileText, Users, CreditCard } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle"

export default function Home() {
  const { colors } = useTheme();
  usePageTitle('Home')

  // Static Data
  const stats = [
    { name: "Customers", value: 124, icon: <Users size={24} /> },
    { name: "Orders", value: 87, icon: <FileText size={24} /> },
    { name: "Suppliers", value: 15, icon: <UserPlus size={24} /> },
    { name: "Expenses", value: "$4,320", icon: <CreditCard size={24} /> },
  ];

  // Quick Actions with optional routes
  const quickActions = [
    { name: "Add Customer", icon: <UserPlus size={20} />, route: "/customers/add" },
    { name: "Add Order", icon: <FileText size={20} />, route: "/orders/add" },
    { name: "Add Supplier", icon: <UserPlus size={20} />, route: "/suppliers/add" },
    { name: "Add Expense", icon: <CreditCard size={20} />, route: "/expense/add" },
  ];

  return (
    <div className={`p-6 space-y-6 ${colors.bg}`}>
      <h2 className={`text-2xl font-bold ${colors.heading}`}>Home</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={`flex items-center gap-4 p-4 rounded-lg shadow ${colors.card}`}
          >
            <div className={`p-3 rounded-full ${colors.activeHover} text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-lg font-semibold">{stat.value}</p>
              <p className="text-sm">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className={`text-xl font-semibold ${colors.heading} mb-2`}>Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          {quickActions.map((action) => {
            const content = (
              <Button key={action.name} className="flex items-center gap-2">
                {action.icon}
                <span>{action.name}</span>
              </Button>
            );

            // Wrap in Link if route exists
            return action.route ? (
              <Link key={action.name} to={action.route}>
                {content}
              </Link>
            ) : (
              content
            );
          })}
        </div>
      </div>
    </div>
  );
}
