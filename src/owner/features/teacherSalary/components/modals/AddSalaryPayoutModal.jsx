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

// ISO sanani DD.MM.YYYY ko'rinishiga (TZ siljishisiz)
const fmtDate = (d) => {
  if (!d) return "";
  const [y, m, day] = String(d).slice(0, 10).split("-");
  return day && m && y ? `${day}.${m}.${y}` : "";
};

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
    <div className="space-y-5">
      {/* Teacher + status */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium leading-tight">
            {detail.teacher?.firstName} {detail.teacher?.lastName}
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

        {/* Maosh qanday hisoblangani - tafsilot */}
        {(() => {
          const proratedFixed = detail.proratedFixed || 0;
          const percentAmount = detail.percentAmount || 0;
          const bonus = detail.bonusTotal || 0;
          const fine = detail.fineTotal || 0;
          if (!proratedFixed && !percentAmount && !bonus && !fine) return null;

          const factor = detail.prorationFactor ?? 1;
          const prorated = factor < 1;
          const payableDays = detail.payableDays || 0;
          const totalDays = detail.totalDays || 0;
          const daysLabel =
            prorated && totalDays
              ? ` (${payableDays}/${totalDays} kun · ${Math.round(factor * 100)}%)`
              : "";
          // To'liq oylikdan kunlarga ko'ra ayrilgan summa
          const fullFixed = factor > 0 ? Math.round(proratedFixed / factor) : 0;
          const fullPercent = factor > 0 ? Math.round(percentAmount / factor) : 0;
          const deducted =
            fullFixed - proratedFixed + (fullPercent - percentAmount);

          return (
            <div className="mt-3 space-y-1 border-t pt-2 text-xs">
              {proratedFixed > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fiksa{daysLabel}</span>
                  <span>{formatMoney(proratedFixed)}</span>
                </div>
              )}
              {percentAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Foiz ({detail.percentRate}% × {formatMoney(detail.groupRevenue || 0)})
                    {daysLabel}
                  </span>
                  <span>{formatMoney(percentAmount)}</span>
                </div>
              )}
              {prorated && (detail.workStartDate || detail.workEndDate) && (
                <p className="text-[11px] text-muted-foreground">
                  Ish davri: {fmtDate(detail.workStartDate) || "oy boshi"} -{" "}
                  {fmtDate(detail.workEndDate) || "oy oxiri"}
                </p>
              )}
              {prorated && deducted > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Kam ishlangan kunlar uchun</span>
                  <span>−{formatMoney(deducted)}</span>
                </div>
              )}
              {bonus > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Bonus</span>
                  <span>+{formatMoney(bonus)}</span>
                </div>
              )}
              {fine > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Jarima</span>
                  <span>−{formatMoney(fine)}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-1 font-semibold">
                <span>Jami maosh</span>
                <span>{formatMoney(expected)}</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Add form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <InputField
          name="amount"
          type="money"
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
            To'lash
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

export default AddSalaryPayoutModal;
