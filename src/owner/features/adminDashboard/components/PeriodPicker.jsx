import SelectField from "@/shared/components/ui/select/SelectField";
import { MONTH_LABELS } from "@/shared/constants/salary";

const MONTH_OPTIONS = MONTH_LABELS.map((label, i) => ({
  value: String(i + 1),
  label,
}));

const yearOptions = (() => {
  const now = new Date().getFullYear();
  const arr = [];
  for (let y = now - 3; y <= now + 1; y += 1) {
    arr.push({ value: String(y), label: String(y) });
  }
  return arr;
})();

const PeriodPicker = ({ year, month, onChange }) => (
  <div className="flex items-end gap-2">
    <div className="min-w-[120px]">
      <SelectField
        label="Yil"
        value={String(year)}
        onChange={(v) => onChange("year", Number(v))}
        options={yearOptions}
      />
    </div>
    <div className="min-w-[140px]">
      <SelectField
        label="Oy"
        value={String(month)}
        onChange={(v) => onChange("month", Number(v))}
        options={MONTH_OPTIONS}
      />
    </div>
  </div>
);

export default PeriodPicker;
