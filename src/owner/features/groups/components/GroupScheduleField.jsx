// Icons
import { Plus, Trash2 } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";

// Utils
import { DAY_OPTIONS } from "@/shared/utils/formatSchedule";

const emptyRow = () => ({ day: "mon", startTime: "14:00", endTime: "15:30" });

const GroupScheduleField = ({ value = [], onChange, disabled = false }) => {
  const update = (idx, key, val) => {
    const next = value.map((item, i) =>
      i === idx ? { ...item, [key]: val } : item,
    );
    onChange(next);
  };

  const addRow = () => onChange([...value, emptyRow()]);
  const removeRow = (idx) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Dars jadvali</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRow}
          disabled={disabled}
        >
          <Plus className="size-4" />
          Qator qo'shish
        </Button>
      </div>

      {value.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Hech qanday dars kuni qo'shilmagan
        </p>
      )}

      {value.map((row, idx) => (
        <div
          key={idx}
          className="grid grid-cols-2 gap-2 items-end p-3 border rounded-lg bg-gray-50"
        >
          <SelectField
            label="Kun"
            value={row.day}
            onChange={(v) => update(idx, "day", v)}
            options={DAY_OPTIONS}
            disabled={disabled}
          />
          <Button
            size="icon"
            type="button"
            variant="danger"
            className="w-full"
            disabled={disabled}
            playClickSound={false}
            onClick={() => removeRow(idx)}
          >
            <Trash2 className="size-4" />
          </Button>
          <InputField
            label="Boshlanish"
            type="time"
            value={row.startTime}
            onChange={(e) => update(idx, "startTime", e.target.value)}
            disabled={disabled}
          />
          <InputField
            label="Tugash"
            type="time"
            value={row.endTime}
            onChange={(e) => update(idx, "endTime", e.target.value)}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
};

export default GroupScheduleField;
