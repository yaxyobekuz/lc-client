import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import useObjectState from "@/shared/hooks/useObjectState";
import { useSalaryConfigUpsertMutation } from "../../hooks/useSalaryMutations";

const TYPE_OPTIONS = [
  { value: "percent", label: "Foiz (guruh tushumidan)" },
  { value: "fixed", label: "Fiksa (aniq summa)" },
  { value: "mixed", label: "Aralash (fiksa + foiz)" },
];

// config - jadval qatori orqali uzatiladi (ModalWrapper data)
const SalaryConfigEditModal = ({ config, close, setIsLoading }) => {
  const teacher = config?.teacher || {};
  const group = config?.group || {};

  const cfg = useObjectState({
    salaryType: config?.salaryType || "percent",
    fixedAmount: config?.fixedAmount ? String(config.fixedAmount) : "",
    percentRate: config?.percentRate ? String(config.percentRate) : "",
  });

  const upsert = useSalaryConfigUpsertMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const showFixed = cfg.salaryType === "fixed" || cfg.salaryType === "mixed";
  const showPercent = cfg.salaryType === "percent" || cfg.salaryType === "mixed";

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    upsert.mutate({
      teacher: teacher._id,
      group: group._id,
      salaryType: cfg.salaryType,
      fixedAmount: Number(cfg.fixedAmount) || 0,
      percentRate: Number(cfg.percentRate) || 0,
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="rounded-lg border bg-muted/30 p-3 text-sm">
        <p className="font-medium">
          {teacher.firstName} {teacher.lastName}
        </p>
        <p className="text-xs text-muted-foreground">{group.name}</p>
      </div>

      <SelectField
        label="Maosh turi"
        value={cfg.salaryType}
        onChange={(v) => cfg.setField("salaryType", v)}
        options={TYPE_OPTIONS}
      />

      <div className="grid grid-cols-2 gap-3">
        {showPercent && (
          <InputField
            name="percentRate"
            type="number"
            label="Foiz (%)"
            placeholder="0"
            value={cfg.percentRate}
            onChange={(e) => cfg.setField("percentRate", e.target.value)}
          />
        )}
        {showFixed && (
          <InputField
            name="fixedAmount"
            type="money"
            label="Fiksa (so'm)"
            placeholder="0"
            value={cfg.fixedAmount}
            onChange={(e) => cfg.setField("fixedAmount", e.target.value)}
          />
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Bu sozlama joriy oy maoshiga darhol qo'llanadi va har oy avtomatik
        ishlatiladi. O'tgan (to'langan) oylar o'zgarmaydi.
      </p>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => close?.()} disabled={upsert.isPending}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={upsert.isPending}>
          {upsert.isPending ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default SalaryConfigEditModal;
