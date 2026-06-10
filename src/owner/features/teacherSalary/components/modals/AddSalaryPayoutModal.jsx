import { Trash2 } from "lucide-react";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import StatusBadge from "@/shared/components/ui/badge/StatusBadge";
import useObjectState from "@/shared/hooks/useObjectState";
import { formatMoney } from "@/shared/utils/formatMoney";
import useTeacherSalaryQuery from "../../hooks/useTeacherSalaryQuery";
import {
  useAddSalaryPayoutMutation,
  useRemoveSalaryPayoutMutation,
} from "../../hooks/useSalaryMutations";
import { statusMeta } from "../../utils/status";

const METHODS = [
  { value: "cash", label: "Naqd" },
  { value: "card", label: "Karta" },
];

const todayKey = () => new Date().toISOString().slice(0, 10);

// salary - karta orqali uzatiladi (ModalWrapper data)
const AddSalaryPayoutModal = ({ salary, close, setIsLoading }) => {
  const { data, isLoading } = useTeacherSalaryQuery(salary?._id);
  const detail = data || salary || {};
  const expected = detail.expectedAmount || 0;
  const paid = detail.paidAmount || 0;
  const remaining = Math.max(0, expected - paid);
  const meta = statusMeta(detail.status);

  const form = useObjectState({
    amount: remaining > 0 ? String(remaining) : "",
    method: "cash",
    paidAt: todayKey(),
  });

  const addMut = useAddSalaryPayoutMutation({
    onSuccess: () => {
      setIsLoading(false);
      form.setField("amount", "");
    },
    onError: () => setIsLoading(false),
  });
  const removeMut = useRemoveSalaryPayoutMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!amount || amount <= 0) return;
    setIsLoading(true);
    addMut.mutate({
      salaryId: salary._id,
      amount,
      method: form.method,
      paidAt: form.paidAt,
    });
  };

  const transactions = detail.transactions || [];

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="rounded-lg border bg-muted/30 p-3">
        <div className="flex items-center justify-between">
          <p className="font-medium">
            {detail.teacher?.firstName} {detail.teacher?.lastName}
          </p>
          <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
        </div>
        <p className="text-xs text-muted-foreground">{detail.group?.name}</p>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Kutilgan</p>
            <p className="font-semibold">{formatMoney(expected)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">To'langan</p>
            <p className="font-semibold text-emerald-600">{formatMoney(paid)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Qoldiq</p>
            <p className="font-semibold text-rose-600">{formatMoney(remaining)}</p>
          </div>
        </div>
      </div>

      {/* Add form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <InputField
          name="amount"
          type="number"
          label="To'lov summasi"
          required
          placeholder="0"
          value={form.amount}
          onChange={(e) => form.setField("amount", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <SelectField
            label="To'lov turi"
            value={form.method}
            onChange={(v) => form.setField("method", v)}
            options={METHODS}
          />
          <InputField
            name="paidAt"
            type="date"
            label="Sana"
            value={form.paidAt}
            onChange={(e) => form.setField("paidAt", e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => close?.()}>
            Yopish
          </Button>
          <Button type="submit" disabled={addMut.isPending}>
            To'lash
          </Button>
        </div>
      </form>

      {/* Transactions */}
      <div className="space-y-2">
        <p className="text-sm font-medium">To'lovlar tarixi</p>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">To'lovlar yo'q</p>
        ) : (
          <ul className="divide-y rounded-lg border">
            {transactions.map((t) => (
              <li key={t._id} className="flex items-center justify-between gap-2 px-3 py-2 text-sm">
                <div>
                  <span className="font-medium">{formatMoney(t.amount)}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {t.method === "cash" ? "Naqd" : "Karta"} • {String(t.paidAt).slice(0, 10)}
                  </span>
                </div>
                <button
                  type="button"
                  className="text-rose-500 hover:text-rose-700"
                  onClick={() => removeMut.mutate(t._id)}
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

export default AddSalaryPayoutModal;
