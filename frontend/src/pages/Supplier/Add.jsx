import { useTheme } from "../../context/ThemeContext";
import { Plus } from "lucide-react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { useToast } from "../../context/ToastProvider";
import { validators } from "../../utils/validators";
import { textTransformers } from "../../utils/textTransformers";
import { useState } from "react";
import { allInputsValidate } from "../../utils/allInputsValidate";
import usePageTitle from "../../hooks/usePageTitle"
import api from "../../utils/api"; 

export default function SupplierAdd() {
  const { colors, borders } = useTheme();
  const { addToast } = useToast();
  usePageTitle('Add Supplier')

  // Form state
  const [supplierName, setSupplierName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [status, setStatus] = useState("active");

  // ✅ Handle form submission
  const handleAdd = async () => {
    try {
      if (!supplierName) {
        addToast({ message: "Please fill in all fields", type: "error" });
        return;
      }

      const inputs = [
        { value: supplierName, validators: [validators.friendly, validators.unique("suppliers", "supplier_name")] },
        { value: phoneNo, validators: [validators.phone] },
      ];

      const { valid } = await allInputsValidate(inputs);

      if (!valid) {
        // Show only the first error
        addToast({ message: "Please fix the form first", type: "error" });
        return;
      }

      const data = {
        supplier_name: supplierName,
        phone_no: phoneNo,
        status: status,
      };

      const res = await api.post("/suppliers/add", data);

      if (res.data.success) {
        addToast({ message: "Supplier added successfully!", type: "success" });

        // Reset form
        setSupplierName("");
        setPhoneNo("");
        setStatus("active");
      }
    } catch (err) {
      console.error(err);
      addToast({
        message: err.response?.data?.message || "Error adding supplier",
        type: "error",
      });
    }
  };

  return (
    <div className={`grow flex ${colors.bg}`}>
      <div className="mx-auto my-auto">
        <div
          className={`p-8 rounded-2xl w-md grid grid-cols-1 gap-4 ${colors.secondaryBg} ${borders.primary}`}
        >
          <h2 className={`text-3xl text-center font-semibold mb-2.5 ${colors.heading}`}>
            Add Supplier
          </h2>

          <Input
            label="Supplier Name"
            value={supplierName}
            onChange={(val) => {
              // Remove leading space (only at the start)
              if (val.startsWith(" ")) val = val.slice(1);
              setSupplierName(textTransformers.capitalize(val));
            }}
            placeholder="Enter Supplier Name"
            icon="Truck"
            validators={[validators.friendly, validators.unique("suppliers", "supplier_name")]}
            maxLength={30}
          />

          <Input
            label="Phone No."
            value={phoneNo}
            onChange={(val) => {
              setPhoneNo(textTransformers.phone(val));
            }}
            placeholder="Enter Phone No."
            icon="Phone"
            validators={[validators.phone]}
            required={false}
          />

          {/* Status Select */}
          <Select
            name="statusSelect" // Unique name for global select manager
            label="Status"
            value={status}
            onChange={(val) => setStatus(val)} // 👈 get selected value her
            options={[
              { label: "Active", value: "active" },
              { label: "In Active", value: "in_active" },
            ]}
            searchable={false}
            showDefault={false}
          />

          {/* Add Button */}
          <Button
            onClick={handleAdd}
            className="w-full flex justify-center items-center gap-2"
          >
            <Plus size={18} />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
