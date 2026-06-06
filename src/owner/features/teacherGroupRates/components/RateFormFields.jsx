import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import GroupPicker from "@/owner/features/attendance/components/GroupPicker";
import { CALCULATION_TYPE_OPTIONS } from "@/shared/constants/salary";

const RateFormFields = ({
  obj,
  disabled = false,
  lockGroup = false,
  teacherId,
}) => {
  const t = obj.calculationType;
  const showFixed = t === "fixed" || t === "mixed";
  const showHourly = t === "hourly" || t === "mixed";
  const showPercentage = t === "percentage" || t === "mixed";
  const showPerStudent = t === "per_student" || t === "mixed";
  // Minimal kafolat har qanday tur uchun belgilanishi mumkin
  const showMin = true;

  return (
    <div className="space-y-3">
      {!lockGroup && (
        <GroupPicker
          value={obj.group}
          onChange={(v) => obj.setField("group", v)}
          disabled={disabled}
          label="Guruh"
          teacherId={teacherId}
        />
      )}
      <SelectField
        label="Hisoblash turi"
        value={obj.calculationType}
        onChange={(v) => obj.setField("calculationType", v)}
        options={CALCULATION_TYPE_OPTIONS}
        disabled={disabled}
      />

      {showFixed && (
        <InputField
          name="fixedAmount"
          label="Belgilangan summa (so'm/oy)"
          type="number"
          min="0"
          value={obj.fixedAmount}
          onChange={(e) => obj.setField("fixedAmount", e.target.value)}
          disabled={disabled}
        />
      )}

      {showHourly && (
        <div className="grid grid-cols-2 gap-2">
          <InputField
            name="hourlyRate"
            label="Soatlik stavka (so'm)"
            type="number"
            min="0"
            value={obj.hourlyRate}
            onChange={(e) => obj.setField("hourlyRate", e.target.value)}
            disabled={disabled}
          />
          <InputField
            name="hoursPerSession"
            label="Bir darsdagi soatlar"
            type="number"
            min="0"
            step="0.5"
            value={obj.hoursPerSession}
            onChange={(e) => obj.setField("hoursPerSession", e.target.value)}
            disabled={disabled}
          />
        </div>
      )}

      {showPercentage && (
        <InputField
          name="percentageRate"
          label="O'quvchilar to'lovidan foiz (%)"
          type="number"
          min="0"
          max="100"
          value={obj.percentageRate}
          onChange={(e) => obj.setField("percentageRate", e.target.value)}
          disabled={disabled}
        />
      )}

      {showPerStudent && (
        <InputField
          name="amountPerStudent"
          label="Har bir o'quvchidan (so'm)"
          type="number"
          min="0"
          description="Guruhdagi faol o'quvchilar soniga ko'paytiriladi"
          value={obj.amountPerStudent}
          onChange={(e) => obj.setField("amountPerStudent", e.target.value)}
          disabled={disabled}
        />
      )}

      {showMin && (
        <InputField
          name="minMonthlyAmount"
          label="Minimal kafolatli oylik (so'm/oy)"
          type="number"
          min="0"
          description="O'qituvchining umumiy oyligi shu summadan past bo'lmaydi"
          value={obj.minMonthlyAmount}
          onChange={(e) => obj.setField("minMonthlyAmount", e.target.value)}
          disabled={disabled}
        />
      )}

      <InputField
        type="date"
        name="effectiveFrom"
        label="Maosh boshlanish sanasi"
        description="Shu sanadan oldin maosh hisoblanmaydi; boshlangan oy o'tilgan darslarga moslab beriladi"
        value={obj.effectiveFrom || ""}
        onChange={(e) => obj.setField("effectiveFrom", e.target.value)}
        disabled={disabled}
      />

      <InputField
        name="notes"
        label="Izoh (ixtiyoriy)"
        type="textarea"
        value={obj.notes}
        onChange={(e) => obj.setField("notes", e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default RateFormFields;
