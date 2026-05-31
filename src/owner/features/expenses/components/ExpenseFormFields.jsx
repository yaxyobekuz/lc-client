import { useEffect, useMemo } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import useExpenseTypesQuery from "@/owner/features/expenseTypes/hooks/useExpenseTypesQuery";

const ExpenseFormFields = ({ obj, disabled = false }) => {
  const { data } = useExpenseTypesQuery({ limit: 200 });
  const typeOptions = useMemo(
    () => (data?.data || []).map((t) => ({ value: t._id, label: t.name })),
    [data],
  );

  // Tanlanmagan bo'lsa — birinchi turni avtomatik tanlaymiz
  useEffect(() => {
    if (!obj.type && typeOptions.length > 0) {
      obj.setField("type", typeOptions[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeOptions]);

  return (
    <div className="space-y-3">
      <SelectField
        label="Xarajat turi"
        value={obj.type}
        onChange={(v) => obj.setField("type", v)}
        options={typeOptions}
        disabled={disabled}
      />

      <InputField
        name="amount"
        label="Summa (so'm)"
        type="number"
        min="0"
        step="1000"
        placeholder="0"
        value={obj.amount}
        onChange={(e) => obj.setField("amount", e.target.value)}
        required
        disabled={disabled}
      />

      <InputField
        name="date"
        label="Sana"
        type="date"
        value={obj.date}
        onChange={(e) => obj.setField("date", e.target.value)}
        required
        disabled={disabled}
      />

      <div>
        <label className="text-sm font-medium block mb-1">Izoh</label>
        <textarea
          rows={3}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masalan: May ijarasi"
          value={obj.description}
          onChange={(e) => obj.setField("description", e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ExpenseFormFields;
