import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import { ADJUSTMENT_TYPE_OPTIONS } from "@/shared/constants/salary";
import { useAddAdjustmentMutation } from "../../hooks/useSalaryMutations";

const AdjustmentAddModal = ({
  salaryId,
  close,
  isLoading,
  setIsLoading,
}) => {
  const obj = useObjectState({ type: "bonus", amount: "", reason: "" });

  const { mutate } = useAddAdjustmentMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.amount) return;
    setIsLoading(true);
    mutate({
      id: salaryId,
      type: obj.type,
      amount: Number(obj.amount),
      reason: obj.reason,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <SelectField
        label="Turi"
        value={obj.type}
        onChange={(v) => obj.setField("type", v)}
        options={ADJUSTMENT_TYPE_OPTIONS}
        disabled={isLoading}
      />
      <InputField
        name="amount"
        label="Summa"
        type="number"
        min="0"
        value={obj.amount}
        onChange={(e) => obj.setField("amount", e.target.value)}
        required
        autoFocus
        disabled={isLoading}
      />
      <InputField
        name="reason"
        label="Sabab (ixtiyoriy)"
        value={obj.reason}
        onChange={(e) => obj.setField("reason", e.target.value)}
        disabled={isLoading}
      />
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
          {isLoading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default AdjustmentAddModal;
