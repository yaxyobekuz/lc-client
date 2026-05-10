import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import { EXPENSE_CATEGORY_OPTIONS } from "@/shared/constants/expense";

const ExpenseFormFields = ({ obj, disabled = false }) => (
  <div className="space-y-3">
    <SelectField
      label="Kategoriya"
      value={obj.category}
      onChange={(v) => obj.setField("category", v)}
      options={EXPENSE_CATEGORY_OPTIONS}
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
      {obj.category === "salary" && (
        <p className="text-xs text-amber-600 mt-1">
          Maoshlar moduli orqali allaqachon hisoblangan bo'lsa, takroriy
          yozmang.
        </p>
      )}
    </div>
  </div>
);

export default ExpenseFormFields;
