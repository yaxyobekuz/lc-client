import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import { useCancelSalaryMutation } from "../../hooks/useSalaryMutations";

const CancelConfirmModal = ({
  salaryId,
  close,
  isLoading,
  setIsLoading,
}) => {
  const obj = useObjectState({ reason: "" });

  const { mutate } = useCancelSalaryMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mutate({ id: salaryId, reason: obj.reason });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-amber-700">
        Bekor qilingan oylikni qayta tiklab bo'lmaydi. Mavjud to'lovlar bo'lsa,
        avval ularni o'chiring.
      </p>
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
          Yopish
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Bekor qilinmoqda..." : "Bekor qilish"}
        </Button>
      </div>
    </form>
  );
};

export default CancelConfirmModal;
