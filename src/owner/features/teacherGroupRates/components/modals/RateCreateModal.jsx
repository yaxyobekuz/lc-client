import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import RateFormFields from "../RateFormFields";
import { useRateCreateMutation } from "../../hooks/useRateMutations";
import { toDateInput } from "@/shared/utils/formatDate";

const RateCreateModal = ({
  teacherId,
  close,
  isLoading,
  setIsLoading,
}) => {
  const obj = useObjectState({
    group: "",
    calculationType: "fixed",
    fixedAmount: "",
    hourlyRate: "",
    hoursPerSession: 2,
    percentageRate: "",
    amountPerStudent: "",
    minMonthlyAmount: "",
    effectiveFrom: toDateInput(new Date()),
    notes: "",
  });

  const { mutate } = useRateCreateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.group) return;
    setIsLoading(true);
    mutate({
      teacher: teacherId,
      group: obj.group,
      calculationType: obj.calculationType,
      fixedAmount: Number(obj.fixedAmount || 0),
      hourlyRate: Number(obj.hourlyRate || 0),
      hoursPerSession: Number(obj.hoursPerSession || 0),
      percentageRate: Number(obj.percentageRate || 0),
      amountPerStudent: Number(obj.amountPerStudent || 0),
      minMonthlyAmount: Number(obj.minMonthlyAmount || 0),
      effectiveFrom: obj.effectiveFrom || undefined,
      notes: obj.notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <RateFormFields obj={obj} disabled={isLoading} teacherId={teacherId} />
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

export default RateCreateModal;
