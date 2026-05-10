import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import DiscountKindPicker from "./DiscountKindPicker";
import useDiscountCreateMutation from "../hooks/useDiscountCreateMutation";

const VALUE_TYPE_OPTIONS = [
  { value: "percent", label: "Foiz (%)" },
  { value: "amount", label: "Summa (so'm)" },
];

const DiscountCreateModal = ({ studentId, close, isLoading, setIsLoading }) => {
  const obj = useObjectState({
    kind: "",
    valueType: "percent",
    value: "",
    reason: "",
    startDate: "",
    endDate: "",
  });

  const { mutate } = useDiscountCreateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.kind || !obj.value) return;
    setIsLoading(true);
    mutate({
      student: studentId,
      kind: obj.kind,
      valueType: obj.valueType,
      value: Number(obj.value),
      reason: obj.reason,
      startDate: obj.startDate || undefined,
      endDate: obj.endDate || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <DiscountKindPicker
        value={obj.kind}
        onChange={(v) => obj.setField("kind", v)}
        disabled={isLoading}
      />
      <div className="grid grid-cols-2 gap-3">
        <SelectField
          label="Turi"
          value={obj.valueType}
          onChange={(v) => obj.setField("valueType", v)}
          options={VALUE_TYPE_OPTIONS}
          required
          disabled={isLoading}
        />
        <InputField
          name="value"
          label={obj.valueType === "percent" ? "Foiz" : "Summa"}
          type="number"
          min="0"
          max={obj.valueType === "percent" ? "100" : undefined}
          value={obj.value}
          onChange={(e) => obj.setField("value", e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <InputField
        name="reason"
        label="Sabab"
        value={obj.reason}
        onChange={(e) => obj.setField("reason", e.target.value)}
        disabled={isLoading}
      />
      <div className="grid grid-cols-2 gap-3">
        <InputField
          type="date"
          name="startDate"
          label="Boshlanish"
          value={obj.startDate}
          onChange={(e) => obj.setField("startDate", e.target.value)}
          disabled={isLoading}
        />
        <InputField
          type="date"
          name="endDate"
          label="Tugash (ixtiyoriy)"
          value={obj.endDate}
          onChange={(e) => obj.setField("endDate", e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={() => close?.()}
          disabled={isLoading}
          className="flex-1"
        >
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Yaratilmoqda..." : "Yaratish"}
        </Button>
      </div>
    </form>
  );
};

export default DiscountCreateModal;
