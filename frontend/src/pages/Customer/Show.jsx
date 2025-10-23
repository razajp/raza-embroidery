import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Store, User, Search } from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CustomerShow() {
  const { colors, borders } = useTheme();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/api/customers/show");
      setCustomers(res.data.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    c.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`p-6 flex flex-col grow ${colors.bg} ${colors.text}`}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${colors.heading}`}>Customers</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-4 max-w-sm">
        <Input
          icon={<Search size={18} />}
          placeholder="Search customers..."
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* Table Section */}
      <div className={`overflow-x-auto rounded-xl shadow ${colors.card} ${borders.md}`}>
        <table className="min-w-full text-sm">
          <thead className={`${colors.activeHover}`}>
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Customer Name</th>
              <th className="py-3 px-4 text-left">Person Name</th>
              <th className="py-3 px-4 text-left">Rate</th>
              <th className="py-3 px-4 text-left">Active</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Store size={18} />
                    {customer.customer_name}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <User size={18} />
                    {customer.person_name}
                  </td>
                  <td className="py-3 px-4">{customer.person || "-"}</td>
                  <td className="py-3 px-4">{customer.city || "-"}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
