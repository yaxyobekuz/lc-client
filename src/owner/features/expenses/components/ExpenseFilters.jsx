import { useMemo } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import useExpenseTypesQuery from "@/owner/features/expenseTypes/hooks/useExpenseTypesQuery";

const ExpenseFilters = ({ filters, onChange }) => {
  const { data } = useExpenseTypesQuery({ limit: 200 });
  const typeOptions = useMemo(
    () => [
      { value: "", label: "Barcha turlar" },
      ...(data?.data || []).map((t) => ({ value: t._id, label: t.name })),
    ],
    [data],
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
      <SelectField
        label="Xarajat turi"
        value={filters.type}
        onChange={(v) => onChange("type", v)}
        options={typeOptions}
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
};

export default ExpenseFilters;
