import SelectField from "@/shared/components/ui/select/SelectField";
import SelectYear from "@/shared/components/ui/select/SelectYear";
import { MONTH_LABELS } from "@/shared/constants/salary";

const MONTH_OPTIONS = MONTH_LABELS.map((label, i) => ({
  value: String(i + 1),
  label,
}));

const PeriodPicker = ({ year, month, onChange }) => (
  <div className="flex items-end gap-2">
    <div className="min-w-[120px]">
      <SelectYear
        value={year}
        onChange={(v) => onChange("year", v)}
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
