import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Store, User, Edit, Trash2, Search } from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import axios from "axios";
import { Link } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

export default function CustomerShow() {
  const { colors, borders } = useTheme();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  usePageTitle("Show Customers");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/api/customers/show");
      setCustomers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`/api/customers/delete/${id}`);
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    c.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`p-6 flex flex-col grow ${colors.bg} ${colors.text}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${colors.heading}`}>Customers</h2>
        
        {/* Search */}
        <div className="mb-4 w-sm">
          <Input
            icon="Search"
            placeholder="Search customers..."
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>

      {/* Table (div-based) */}
      <div className={`overflow-x-auto rounded-xl shadow ${colors.card} ${borders.md}`}>
        {/* Table Header */}
        <div className={`grid grid-cols-6 gap-0 bg-gray-100 ${colors.activeHover} p-3 font-semibold`}>
          <div>#</div>
          <div>Customer Name</div>
          <div>Person Name</div>
          <div>Rate</div>
          <div>Status</div>
          <div className="text-center">Action</div>
        </div>

        {/* Table Rows */}
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer, index) => (
            <div
              key={customer._id}
              className="grid grid-cols-6 gap-0 border-b hover:bg-gray-50 transition-colors p-3 items-center"
            >
              <div>{index + 1}</div>
              <div className="flex items-center gap-2">
                <Store size={18} />
                {customer.customer_name}
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                {customer.person_name || "-"}
              </div>
              <div>{customer.rate || "-"}</div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    customer.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {customer.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex justify-center gap-2">
                <Link to={`/customers/edit/${customer._id}`}>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Edit size={14} /> Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => handleDelete(customer._id)}
                >
                  <Trash2 size={14} /> Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500 col-span-6">
            No customers found
          </div>
        )}
      </div>
    </div>
  );
}
