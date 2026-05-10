import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";

const MONTHS = [
  { value: "1", label: "Yanvar" },
  { value: "2", label: "Fevral" },
  { value: "3", label: "Mart" },
  { value: "4", label: "Aprel" },
  { value: "5", label: "May" },
  { value: "6", label: "Iyun" },
  { value: "7", label: "Iyul" },
  { value: "8", label: "Avgust" },
  { value: "9", label: "Sentabr" },
  { value: "10", label: "Oktabr" },
  { value: "11", label: "Noyabr" },
  { value: "12", label: "Dekabr" },
];

const PeriodPicker = ({ year, month, onChange }) => (
  <div className="flex items-end gap-2">
    <SelectField
      label="Oy"
      value={String(month)}
      onChange={(v) => onChange({ year: Number(year), month: Number(v) })}
      options={MONTHS}
      className="!gap-1"
    />
    <InputField
      name="year"
      label="Yil"
      type="number"
      min="2024"
      max="2100"
      value={year}
      onChange={(e) =>
        onChange({ year: Number(e.target.value), month: Number(month) })
      }
      className="!gap-1 w-28"
    />
  </div>
);

export default PeriodPicker;
