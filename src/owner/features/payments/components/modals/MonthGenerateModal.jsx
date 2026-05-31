import { useState } from "react";
import SelectField from "@/shared/components/ui/select/SelectField";
import SelectYear from "@/shared/components/ui/select/SelectYear";
import Button from "@/shared/components/ui/button/Button";
import useGenerateMonthMutation from "../../hooks/useGenerateMonthMutation";

const MONTHS = [
  { value: "1", label: "Yanvar" },
  { value: "2", label: "Fevral" },
  { value: "3", label: "Mart" },
  { value: "4", label: "Aprel" },
  { value: "5", label: "May" },
  { value: "6", label: "Iyun" },
  { value: "7", label: "Iyul" },
  { value: "8", label: "Avgust" },
  { value: "9", label: "Sentabr" },
  { value: "10", label: "Oktabr" },
  { value: "11", label: "Noyabr" },
  { value: "12", label: "Dekabr" },
];

const MonthGenerateModal = ({ close, isLoading, setIsLoading }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [result, setResult] = useState(null);

  const { mutate } = useGenerateMonthMutation({
    onSuccess: (data) => {
      setIsLoading(false);
      setResult(data?.data || data);
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(null);
    setIsLoading(true);
    mutate({ year: Number(year), month: Number(month) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Tanlangan oy uchun barcha active talabalarga avto hisoblar yaratiladi
        (mavjudlari o'tkazib yuboriladi).
      </p>
      <div className="grid grid-cols-2 gap-3">
        <SelectYear
          value={year}
          onChange={setYear}
          required
          disabled={isLoading}
        />
        <SelectField
          label="Oy"
          value={month}
          onChange={setMonth}
          options={MONTHS}
          required
          disabled={isLoading}
        />
      </div>
      {result && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm">
          <p className="font-medium text-emerald-700">
            Yaratildi: {result.created}, mavjud: {result.skipped}, jami:{" "}
            {result.total}
          </p>
        </div>
      )}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => close?.()}
          disabled={isLoading}
          className="flex-1"
        >
          Yopish
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Yaratilmoqda..." : "Yaratish"}
        </Button>
      </div>
    </form>
  );
};

export default MonthGenerateModal;
