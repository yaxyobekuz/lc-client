import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import { EXPENSE_CATEGORY_OPTIONS } from "@/shared/constants/expense";

const CATEGORY_FILTER_OPTIONS = [
  { value: "", label: "Barcha kategoriyalar" },
  ...EXPENSE_CATEGORY_OPTIONS,
];

const ExpenseFilters = ({ filters, onChange }) => (
  <div className="flex items-end gap-3 flex-wrap">
    <div className="min-w-[220px]">
      <SelectField
        label="Kategoriya"
        value={filters.category}
        onChange={(v) => onChange("category", v)}
        options={CATEGORY_FILTER_OPTIONS}
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

export default ExpenseFilters;
