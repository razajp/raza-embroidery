import { useTheme } from "../context/ThemeContext";
import Button from "../components/Button";
import { UserPlus, FileText, Users, CreditCard, Settings as SettingsIcon } from "lucide-react";
import usePageTitle from "../hooks/usePageTitle"

export default function Settings() {
  const { colors, borders } = useTheme();
  usePageTitle('Settings')

  // Example settings sections
  const settingsSections = [
    {
      title: "User Management",
      description: "Manage users and roles",
      actions: [
        { name: "Add User", icon: <UserPlus size={18} />, route: "/users/add" },
        { name: "View Users", icon: <Users size={18} />, route: "/users" },
      ],
    },
    {
      title: "Orders & Inventory",
      description: "Manage orders, products, and suppliers",
      actions: [
        { name: "Orders", icon: <FileText size={18} />, route: "/orders" },
        { name: "Suppliers", icon: <UserPlus size={18} />, route: "/suppliers" },
      ],
    },
    {
      title: "Finance",
      description: "Track expenses and payments",
      actions: [
        { name: "Expenses", icon: <CreditCard size={18} />, route: "/expenses" },
      ],
    },
    {
      title: "System Settings",
      description: "Configure app preferences",
      actions: [
        { name: "General Settings", icon: <SettingsIcon size={18} />, route: "/settings/general" },
      ],
    },
    {
      title: "System Settings",
      description: "Configure app preferences",
      actions: [
        { name: "General Settings", icon: <SettingsIcon size={18} />, route: "/settings/general" },
      ],
    },
    {
      title: "System Settings",
      description: "Configure app preferences",
      actions: [
        { name: "General Settings", icon: <SettingsIcon size={18} />, route: "/settings/general" },
      ],
    },
    {
      title: "System Settings",
      description: "Configure app preferences",
      actions: [
        { name: "General Settings", icon: <SettingsIcon size={18} />, route: "/settings/general" },
      ],
    },
  ];

  return (
    <div className={`space-y-6 ${colors.bg}`}>
      <h2 className={`text-2xl font-bold ${colors.heading}`}>Settings</h2>

      {settingsSections.map((section) => (
        <div key={section.title} className={`p-6 rounded-2xl ${colors.secondaryBg} ${borders.primary} space-y-4`}>
          <div>
            <h3 className={`text-xl font-semibold ${colors.heading}`}>{section.title}</h3>
            <p className="text-sm text-gray-500">{section.description}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {section.actions.map((action) => (
              <Button key={action.name} className="flex items-center gap-2">
                {action.icon}
                <span>{action.name}</span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
