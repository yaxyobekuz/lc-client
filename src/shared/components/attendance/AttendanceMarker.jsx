import SelectField from "@/shared/components/ui/select/SelectField";
import InputField from "@/shared/components/ui/input/InputField";
import { STATUS_OPTIONS } from "@/shared/constants/attendance";

// Bitta talaba qatori uchun status + (kerakli holatda) qo'shimcha maydon
const AttendanceMarker = ({ value = {}, onChange, disabled = false }) => {
  const { status = "", reason = "", lateMinutes = 0 } = value;

  const update = (patch) => onChange({ ...value, ...patch });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 items-end">
      <SelectField
        value={status}
        onChange={(v) => update({ status: v })}
        options={[{ value: "", label: "— tanlang —" }, ...STATUS_OPTIONS]}
        disabled={disabled}
        className="!gap-1"
      />
      {status === "late" && (
        <InputField
          type="number"
          min="1"
          placeholder="Necha minut kechikdi?"
          value={lateMinutes || ""}
          onChange={(e) => update({ lateMinutes: Number(e.target.value) })}
          disabled={disabled}
          className="!gap-1"
        />
      )}
      {status === "excused" && (
        <InputField
          placeholder="Sabab (kasallik, oilaviy, ...)"
          value={reason}
          onChange={(e) => update({ reason: e.target.value })}
          disabled={disabled}
          className="!gap-1"
        />
      )}
    </div>
  );
};

export default AttendanceMarker;
