import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import DateRangeSlider from "@/shared/components/ui/dateSlider/DateRangeSlider";
import { toDateInput } from "@/shared/utils/formatDate";
import DaysOfWeekToggle from "./DaysOfWeekToggle";
import { useExemptionCreateMutation } from "../hooks/useExemptionMutations";

const ExemptionCreateModal = ({ studentId, close, isLoading, setIsLoading }) => {
  const today = toDateInput(new Date());

  const obj = useObjectState({
    startDate: today,
    endDate: today,
    daysOfWeek: [],
    reason: "",
  });

  const { mutate } = useExemptionCreateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.startDate) return;
    setIsLoading(true);
    mutate({
      student: studentId,
      startDate: obj.startDate,
      endDate: obj.endDate || null,
      daysOfWeek: obj.daysOfWeek,
      reason: obj.reason,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <DateRangeSlider
        startValue={obj.startDate}
        endValue={obj.endDate}
        onChange={({ startDate, endDate }) =>
          obj.setFields({ startDate, endDate })
        }
        disabled={isLoading}
      />

      <DaysOfWeekToggle
        value={obj.daysOfWeek}
        onChange={(v) => obj.setField("daysOfWeek", v)}
        disabled={isLoading}
      />

      <InputField
        name="reason"
        type="textarea"
        label="Sabab"
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
          {isLoading ? "Yaratilmoqda..." : "Yaratish"}
        </Button>
      </div>
    </form>
  );
};

export default ExemptionCreateModal;
