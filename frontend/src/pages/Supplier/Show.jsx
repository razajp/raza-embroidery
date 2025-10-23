import { useEffect, useState } from "react";
import { Store, Phone, Edit, Trash2, Check, Truck, X } from "lucide-react";
import Input from "../../components/Input";
import Table from "../../components/Table";
import DropdownMenu from "../../components/DropdownMenu";
import DynamicFilterPanel from "../../components/DynamicFilterPanel";
import usePageTitle from "../../hooks/usePageTitle";
import api from "../../utils/api";
import { useTheme } from "../../context/ThemeContext";

export default function SupplierShow() {
  const { colors } = useTheme();
  const [suppliers, setSuppliers] = useState([]);
  const [filters, setFilters] = useState({});
  usePageTitle("Show Suppliers");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await api.get("/suppliers/show");
      setSuppliers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?"))
      return;
    try {
      await api.delete(`/suppliers/delete/${id}`);
      setSuppliers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting supplier:", err);
    }
  };

  const filterConfig = [
    { type: "text", key: "supplier_name", placeholder: "Supplier Name" },
    { type: "text", key: "phone_no", placeholder: "Phone No." },
    {
      type: "select",
      key: "status",
      placeholder: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "In Active", value: "in_active" },
      ],
    },
  ];

  const filteredSuppliers = suppliers.filter((c) => {
    let match = true;

    if (filters.supplier_name)
      match =
        match &&
        c.supplier_name
          .toLowerCase()
          .includes(filters.supplier_name.toLowerCase());
    if (filters.person_name)
      match =
        match &&
        c.person_name.toLowerCase().includes(filters.person_name.toLowerCase());
    if (filters.rate) match = match && c.rate.toString().includes(filters.rate);
    if (filters.status) match = match && c.status === filters.status;

    if (filters.createdAt?.from)
      match =
        match && new Date(c.createdAt) >= new Date(filters.createdAt.from);
    if (filters.createdAt?.to)
      match = match && new Date(c.createdAt) <= new Date(filters.createdAt.to);

    return match;
  });

  return (
    <div className={`p-6 flex flex-col h-full ${colors.bg} ${colors.text}`}>
      {/* Header + Filters */}
      <div className="flex justify-between items-end mb-3.5 px-5 gap-4">
        <span
          className={`text-2xl font-bold flex items-center gap-2 leading-0 tracking-wide ${colors.heading}`}
        >
          <Truck size={25} />
          Suppliers
        </span>

        <div className="flex gap-3 items-center">
          <DynamicFilterPanel
            filtersConfig={filterConfig}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        headers={[
          { label: "#", key: "index" }, // index not actually sortable, but okay
          { label: "Supplier Name", key: "supplier_name" },
          { label: "Phone No.", key: "phone_no" },
          { label: "Status", key: "status", center: true },
          { label: "Action", key: "actions", center: true }, // not really sortable
        ]}
        rows={filteredSuppliers.map((c, i) => ({
          ...c,
          index: i + 1, // add index field for sorting display consistency
        }))}
        gridCols="grid-cols-[60px_2.5fr_2.2fr_2fr_60px]"
        renderRow={(supplier, index) => (
          <>
            <div>{supplier.index}.</div>
            <div className="flex items-center gap-2">
              <Truck size={18} />
              {supplier.supplier_name}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} />
              {supplier.phone_no || "-"}
            </div>
            <div className="text-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium leading-0 tracking-wide ${
                  supplier.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {supplier.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex justify-center">
              <DropdownMenu
                items={[
                  {
                    label: "Edit Supplier",
                    icon: Edit,
                    onClick: () => console.log("Edit", supplier._id),
                  },
                  {
                    label: "Delete Supplier",
                    icon: Trash2,
                    onClick: () => handleDelete(supplier._id),
                  },
                  {
                    label:
                      supplier.status === "active" ? "In Active" : "Active",
                    icon: supplier.status === "active" ? X : Check,
                    onClick: async () => {
                      try {
                        const res = await api.patch(
                          `/suppliers/toggle-status/${supplier._id}`
                        );
                        if (res.data.success) {
                          setSuppliers((prev) =>
                            prev.map((c) =>
                              c._id === supplier._id ? res.data.data : c
                            )
                          );
                        }
                      } catch (err) {
                        console.error("Error toggling status:", err);
                      }
                    },
                    className:
                      supplier.status === "active"
                        ? "text-red-700 hover:bg-red-200"
                        : "text-green-700 hover:bg-green-200",
                  },
                ]}
              />
            </div>
          </>
        )}
      />
    </div>
  );
}
