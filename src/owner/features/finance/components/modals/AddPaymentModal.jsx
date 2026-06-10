import { Trash2 } from "lucide-react";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import StatusBadge from "@/shared/components/ui/badge/StatusBadge";
import useObjectState from "@/shared/hooks/useObjectState";
import { formatMoney } from "@/shared/utils/formatMoney";
import useStudentPaymentQuery from "../../hooks/useStudentPaymentQuery";
import {
  useAddTransactionMutation,
  useRemoveTransactionMutation,
} from "../../hooks/useFinanceMutations";
import { statusMeta } from "../../utils/status";

const METHODS = [
  { value: "cash", label: "Naqd" },
  { value: "card", label: "Karta" },
];

const todayKey = () => new Date().toISOString().slice(0, 10);

// payment - karta orqali uzatiladi (ModalWrapper data)
const AddPaymentModal = ({ payment, close, setIsLoading }) => {
  const { data, isLoading } = useStudentPaymentQuery(payment?._id);
  const detail = data || payment || {};
  const expected = detail.expectedAmount || 0;
  const paid = detail.paidAmount || 0;
  const remaining = Math.max(0, expected - paid);
  const meta = statusMeta(detail.status);

  const form = useObjectState({
    amount: remaining > 0 ? String(remaining) : "",
    method: "cash",
    paidAt: todayKey(),
  });

  const addMut = useAddTransactionMutation({
    onSuccess: () => {
      setIsLoading(false);
      form.setField("amount", "");
    },
    onError: () => setIsLoading(false),
  });
  const removeMut = useRemoveTransactionMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!amount || amount <= 0) return;
    setIsLoading(true);
    addMut.mutate({
      paymentId: payment._id,
      amount,
      method: form.method,
      paidAt: form.paidAt,
    });
  };

  const transactions = detail.transactions || [];

  const baseFee = detail.baseFee || 0;
  const factor = detail.prorationFactor ?? 1;
  const prorated = Math.round(baseFee * factor);
  const prorationCut = Math.max(0, baseFee - prorated);
  const discount = detail.discountApplied || 0;
  const joinedAt = detail.membership?.joinedAt;
  const hasBreakdown = prorationCut > 0 || discount > 0;

  return (
    <div className="space-y-5">
      {/* Student + status */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium leading-tight">
            {detail.student?.firstName} {detail.student?.lastName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {detail.group?.name}
          </p>
        </div>
        <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
      </div>

      {/* Qoldiq - asosiy ko'rsatkich */}
      <div className="rounded-lg bg-muted/40 px-4 py-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Qoldiq</span>
          <span className="text-xl font-semibold text-rose-600">
            {formatMoney(remaining)}
          </span>
        </div>
        <div className="mt-2 flex justify-between border-t pt-2 text-xs text-muted-foreground">
          <span>Kutilgan: {formatMoney(expected)}</span>
          <span className="text-emerald-600">
            To'langan: {formatMoney(paid)}
          </span>
        </div>

        {/* Yakuniy summa qanday chiqqani - tafsilot (faqat kerak bo'lsa) */}
        {hasBreakdown && (
          <div className="mt-2 space-y-1 border-t pt-2 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Guruh oylik to'lovi</span>
              <span>{formatMoney(baseFee)}</span>
            </div>
            {prorationCut > 0 && (
              <div className="flex justify-between text-amber-600">
                <span>
                  Oy yarmida qo'shilgan
                  {joinedAt ? ` (${String(joinedAt).slice(0, 10)})` : ""} ·{" "}
                  {Math.round(factor * 100)}%
                </span>
                <span>−{formatMoney(prorationCut)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-amber-600">
                <span>Chegirma</span>
                <span>−{formatMoney(discount)}</span>
              </div>
            )}
          </div>
        )}
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
          description="Qoldiqdan ortiq kiritsangiz, ortig'i keyingi oylarga avans sifatida o'tadi"
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
        <div className="flex gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => close?.()}
          >
            Yopish
          </Button>
          <Button type="submit" className="flex-1" disabled={addMut.isPending}>
            To'lovni qo'shish
          </Button>
        </div>
      </form>

      {/* Transactions */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">To'lovlar tarixi</p>
          {transactions.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {transactions.length} ta
            </span>
          )}
        </div>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">Hali to'lov qilinmagan</p>
        ) : (
          <ul className="space-y-1">
            {transactions.map((t) => (
              <li
                key={t._id}
                className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">{formatMoney(t.amount)}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.method === "cash" ? "Naqd" : "Karta"} ·{" "}
                    {String(t.paidAt).slice(0, 10)}
                  </span>
                </div>
                <button
                  type="button"
                  className="flex size-8 shrink-0 items-center justify-center rounded-md text-rose-500 active:bg-rose-50"
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

export default AddPaymentModal;
