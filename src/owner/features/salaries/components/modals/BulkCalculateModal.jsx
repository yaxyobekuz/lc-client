import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import PeriodPicker from "../PeriodPicker";
import { useCalculateSalariesMutation } from "../../hooks/useSalaryMutations";

const BulkCalculateModal = ({ close, isLoading, setIsLoading }) => {
  const now = new Date();
  const obj = useObjectState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const { mutate } = useCalculateSalariesMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mutate({ year: obj.year, month: obj.month });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Tanlangan oy uchun barcha faol o'qituvchilar uchun maosh hisoblanadi.
        Mavjud oyliklar qayta hisoblanadi (to'liq to'langanlar saqlanadi).
      </p>

      <PeriodPicker
        year={obj.year}
        month={obj.month}
        onChange={({ year, month }) => obj.setFields({ year, month })}
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
          {isLoading ? "Hisoblanmoqda..." : "Hisoblash"}
        </Button>
      </div>
    </form>
  );
};

export default BulkCalculateModal;
