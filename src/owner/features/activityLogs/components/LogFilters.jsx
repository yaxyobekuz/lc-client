import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";

const METHOD_OPTIONS = [
  { value: "", label: "Barcha metodlar" },
  { value: "POST", label: "POST" },
  { value: "PATCH", label: "PATCH" },
  { value: "PUT", label: "PUT" },
  { value: "DELETE", label: "DELETE" },
];

const RESOURCE_OPTIONS = [
  { value: "", label: "Barcha resurslar" },
  { value: "user", label: "Foydalanuvchi" },
  { value: "group", label: "Guruh" },
  { value: "payment", label: "To'lov" },
  { value: "invoice", label: "Hisob-faktura" },
  { value: "salary", label: "Maosh" },
  { value: "lead", label: "Lid" },
  { value: "feedback", label: "Fikr-mulohaza" },
  { value: "holiday", label: "Bayram" },
  { value: "notification", label: "Bildirishnoma" },
  { value: "expense", label: "Xarajat" },
  { value: "attendance", label: "Davomat" },
];

const LogFilters = ({ filters, onChange }) => (
  <div className="flex items-end gap-3 flex-wrap">
    <div className="min-w-[160px]">
      <SelectField
        label="Metod"
        value={filters.method}
        onChange={(v) => onChange("method", v)}
        options={METHOD_OPTIONS}
      />
    </div>
    <div className="min-w-[200px]">
      <SelectField
        label="Resurs"
        value={filters.resourceType}
        onChange={(v) => onChange("resourceType", v)}
        options={RESOURCE_OPTIONS}
      />
    </div>
    <div>
      <InputField
        type="date"
        name="fromDate"
        label="Kimdan"
        value={filters.fromDate}
        onChange={(e) => onChange("fromDate", e.target.value)}
      />
    </div>
    <div>
      <InputField
        type="date"
        name="toDate"
        label="Kimgacha"
        value={filters.toDate}
        onChange={(e) => onChange("toDate", e.target.value)}
      />
    </div>
  </div>
);

export default LogFilters;
