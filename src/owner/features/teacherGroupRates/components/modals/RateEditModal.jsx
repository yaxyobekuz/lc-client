import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import RateFormFields from "../RateFormFields";
import { useRateUpdateMutation } from "../../hooks/useRateMutations";
import { toDateInput } from "@/shared/utils/formatDate";

const RateEditModal = ({
  rateId,
  rate,
  close,
  isLoading,
  setIsLoading,
}) => {
  const obj = useObjectState({
    group: rate?.group?._id || rate?.group || "",
    calculationType: rate?.calculationType || "fixed",
    fixedAmount: rate?.fixedAmount || "",
    hourlyRate: rate?.hourlyRate || "",
    hoursPerSession: rate?.hoursPerSession ?? 2,
    percentageRate: rate?.percentageRate || "",
    amountPerStudent: rate?.amountPerStudent || "",
    minMonthlyAmount: rate?.minMonthlyAmount || "",
    effectiveFrom: rate?.effectiveFrom ? toDateInput(rate.effectiveFrom) : "",
    notes: rate?.notes || "",
  });

  const { mutate } = useRateUpdateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mutate({
      id: rateId,
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
      <p className="text-xs text-muted-foreground">
        Tahrirlanganda eski stavka tarixga o'tadi (deaktivatsiya), yangi stavka
        joriy bo'ladi.
      </p>
      <RateFormFields obj={obj} disabled={isLoading} lockGroup />
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

export default RateEditModal;
