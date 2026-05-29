import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import { EXPENSE_CATEGORY_OPTIONS } from "@/shared/constants/expense";

const CATEGORY_FILTER_OPTIONS = [
  { value: "", label: "Barcha kategoriyalar" },
  ...EXPENSE_CATEGORY_OPTIONS,
];

const ExpenseFilters = ({ filters, onChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
    <SelectField
      label="Kategoriya"
      value={filters.category}
      onChange={(v) => onChange("category", v)}
      options={CATEGORY_FILTER_OPTIONS}
    />
    <InputField
      type="date"
      name="fromDate"
      label="Kimdan"
      value={filters.fromDate}
      onChange={(e) => onChange("fromDate", e.target.value)}
    />
    <InputField
      type="date"
      name="toDate"
      label="Kimgacha"
      value={filters.toDate}
      onChange={(e) => onChange("toDate", e.target.value)}
    />
  </div>
);

export default ExpenseFilters;
