import { Trash2, Plus } from "lucide-react";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import useObjectState from "@/shared/hooks/useObjectState";
import { formatMoney } from "@/shared/utils/formatMoney";
import useTeacherSalaryQuery from "../../hooks/useTeacherSalaryQuery";
import {
  useAdjustmentCreateMutation,
  useAdjustmentRemoveMutation,
} from "../../hooks/useSalaryMutations";

const KIND_OPTIONS = [
  { value: "bonus", label: "Bonus" },
  { value: "fine", label: "Jarima" },
];
const VALUE_TYPE_OPTIONS = [
  { value: "fixed", label: "Aniq summa" },
  { value: "percent", label: "Foiz (%)" },
];

// salary - karta orqali uzatiladi (ModalWrapper data). Maosh stavkasi/ish-oynasi
// endi guruh maosh-davrlaridan (TeacherGroupPeriod) derived - bu yerda faqat
// hisob ko'rsatiladi va bonus/jarima boshqariladi.
const SalaryEditModal = ({ salary }) => {
  const { data } = useTeacherSalaryQuery(salary?._id);
  const detail = data || salary || {};

  const adj = useObjectState({
    kind: "bonus",
    valueType: "fixed",
    value: "",
    reason: "",
  });

  const addAdj = useAdjustmentCreateMutation({
    onSuccess: () => adj.setFields({ value: "", reason: "" }),
  });
  const removeAdj = useAdjustmentRemoveMutation();

  const handleAddAdj = () => {
    if (!adj.value) return;
    addAdj.mutate({
      teacher: detail.teacher?._id || detail.teacher,
      group: detail.group?._id || detail.group,
      kind: adj.kind,
      valueType: adj.valueType,
      value: Number(adj.value),
      scope: "monthly",
      year: detail.year,
      month: detail.month,
      reason: adj.reason || undefined,
    });
  };

  const adjustments = detail.adjustments || [];

  return (
    <div className="space-y-4">
      {/* Joriy hisob (stavka/ish-oynasi guruh maosh-davrlaridan) */}
      <div className="rounded-lg border bg-muted/30 p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Asosiy</span>
          <span>{formatMoney(detail.baseEarnings || 0)}</span>
        </div>
        {detail.bonusTotal > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Bonus</span>
            <span>+{formatMoney(detail.bonusTotal)}</span>
          </div>
        )}
        {detail.fineTotal > 0 && (
          <div className="flex justify-between text-rose-600">
            <span>Jarima</span>
            <span>−{formatMoney(detail.fineTotal)}</span>
          </div>
        )}
        <div className="mt-1 flex justify-between border-t pt-1 font-semibold">
          <span>Jami kutilgan</span>
          <span>{formatMoney(detail.expectedAmount || 0)}</span>
        </div>
      </div>

      {/* Bonus / Jarima */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Bonus / Jarima (shu oy)</p>
        <div className="grid grid-cols-2 gap-2">
          <SelectField
            value={adj.kind}
            onChange={(v) => adj.setField("kind", v)}
            options={KIND_OPTIONS}
          />
          <SelectField
            value={adj.valueType}
            onChange={(v) => adj.setField("valueType", v)}
            options={VALUE_TYPE_OPTIONS}
          />
        </div>
        <div className="flex items-end gap-2">
          <InputField
            name="adjValue"
            type={adj.valueType === "percent" ? "number" : "money"}
            className="flex-1"
            placeholder={adj.valueType === "percent" ? "Foiz" : "Summa"}
            value={adj.value}
            onChange={(e) => adj.setField("value", e.target.value)}
          />
          <Button type="button" variant="outline" onClick={handleAddAdj} disabled={addAdj.isPending}>
            <Plus className="size-4" />
            Qo'shish
          </Button>
        </div>
        <InputField
          name="adjReason"
          placeholder="Sabab (ixtiyoriy)"
          value={adj.reason}
          onChange={(e) => adj.setField("reason", e.target.value)}
        />

        {adjustments.length > 0 && (
          <ul className="divide-y rounded-lg border">
            {adjustments.map((a) => (
              <li key={a._id} className="flex items-center justify-between gap-2 px-3 py-2 text-sm">
                <span className={a.kind === "bonus" ? "text-emerald-600" : "text-rose-600"}>
                  {a.kind === "bonus" ? "Bonus" : "Jarima"}:{" "}
                  {a.valueType === "percent" ? `${a.value}%` : formatMoney(a.value)}
                  {a.reason ? ` - ${a.reason}` : ""}
                </span>
                <button
                  type="button"
                  className="text-rose-500 hover:text-rose-700"
                  onClick={() => removeAdj.mutate(a._id)}
                  aria-label="O'chirish"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SalaryEditModal;
