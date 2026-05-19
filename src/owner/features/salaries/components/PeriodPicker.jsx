import SelectField from "@/shared/components/ui/select/SelectField";
import SelectYear from "@/shared/components/ui/select/SelectYear";
import { MONTH_OPTIONS } from "@/shared/constants/salary";

const monthOptions = MONTH_OPTIONS.map((o) => ({
  value: String(o.value),
  label: o.label,
}));

const PeriodPicker = ({ year, month, onChange }) => (
  <div className="flex items-end gap-2">
    <SelectField
      label="Oy"
      value={String(month)}
      onChange={(v) => onChange({ year: Number(year), month: Number(v) })}
      options={monthOptions}
      className="!gap-1"
    />
    <SelectYear
      value={year}
      onChange={(v) => onChange({ year: v, month: Number(month) })}
      className="!gap-1 w-28"
    />
  </div>
);

export default PeriodPicker;
