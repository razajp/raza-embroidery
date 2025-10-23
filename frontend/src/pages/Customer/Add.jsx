import { useTheme } from "../../context/ThemeContext";
import { Plus } from "lucide-react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { useToast } from "../../context/ToastProvider";
import { validators } from "../../utils/validators";
import { textTransformers } from "../../utils/textTransformers";
import { useState } from "react";
import axios from "axios";
import { allInputsValidate } from "../../utils/allInputsValidate";
import usePageTitle from "../../hooks/usePageTitle"

export default function CustomerAdd() {
  const { colors, borders } = useTheme();
  const { addToast } = useToast();
  usePageTitle('Add Customer')

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [personName, setPersonName] = useState("");
  const [rate, setRate] = useState("");
  const [status, setStatus] = useState("active");

  // ✅ Handle form submission
  const handleAdd = async () => {
    try {
      if (!customerName || !personName || !rate) {
        addToast({ message: "Please fill in all fields", type: "error" });
        return;
      }

      const inputs = [
        { value: customerName, validators: [validators.friendly, validators.unique("customers", "customer_name")] },
        { value: personName, validators: [validators.friendly] },
        { value: rate, validators: [validators.decimal] },
      ];

      const { valid } = await allInputsValidate(inputs);

      if (!valid) {
        // Show only the first error
        addToast({ message: "Please fix the form first", type: "error" });
        return;
      }

      const data = {
        customer_name: customerName,
        person_name: personName,
        rate: parseFloat(rate),
        status: status,
      };

      const res = await axios.post("http://localhost:5000/api/customers/add", data);

      if (res.data.success) {
        addToast({ message: "Customer added successfully!", type: "success" });

        // Reset form
        setCustomerName("");
        setPersonName("");
        setRate("");
        setStatus("active");
      }
    } catch (err) {
      console.error(err);
      addToast({
        message: err.response?.data?.message || "Error adding customer",
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
            Add Customer
          </h2>
          <Input
            label="Customer Name"
            value={customerName}
            onChange={(val) => {
              // Remove leading space (only at the start)
              if (val.startsWith(" ")) val = val.slice(1);
              setCustomerName(textTransformers.capitalize(val));
            }}
            placeholder="Enter Customer Name"
            icon="Store"
            validators={[validators.friendly, validators.unique("customers", "customer_name")]}
            maxLength={30}
          />

          {/* Person Name Input */}
          <Input
            label="Person Name"
            value={personName}
            onChange={(val) => setPersonName(textTransformers.capitalize(val))}
            placeholder="Enter Person Name"
            icon="User"
            validators={[validators.friendly]}
            maxLength={30}
          />

          {/* Rate Input */}
          <Input
            label="Rates"
            value={rate}
            onChange={setRate}
            placeholder="Enter Rate"
            icon="BadgePercent"
            validators={[validators.decimal]}
            maxLength={10}
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
