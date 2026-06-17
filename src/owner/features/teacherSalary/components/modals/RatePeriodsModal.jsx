import { Plus, Pencil, Trash2 } from "lucide-react";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import StatusBadge from "@/shared/components/ui/badge/StatusBadge";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import useObjectState from "@/shared/hooks/useObjectState";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MONTH_LABELS } from "@/shared/constants/calendar";
import MonthPicker from "../MonthPicker";
import {
  useRatePeriodsQuery,
  useRatePeriodCreateMutation,
  useRatePeriodUpdateMutation,
  useRatePeriodRemoveMutation,
} from "../../hooks/useRatePeriods";

const TYPE_OPTIONS = [
  { value: "percent", label: "Foiz (guruh tushumidan)" },
  { value: "fixed", label: "Fiksa (aniq summa)" },
  { value: "mixed", label: "Aralash (fiksa + foiz)" },
];

const TYPE_LABEL = { percent: "Foiz", fixed: "Fiksa", mixed: "Aralash" };

const periodLabel = (p) => {
  const start = `${MONTH_LABELS[p.startMonth - 1]} ${p.startYear}`;
  const end = p.endYear == null ? "hozir" : `${MONTH_LABELS[p.endMonth - 1]} ${p.endYear}`;
  return `${start} — ${end}`;
};

const rateText = (p) => {
  if (p.salaryType === "fixed") return formatMoney(p.fixedAmount);
  if (p.salaryType === "percent") return `${p.percentRate}%`;
  return `${formatMoney(p.fixedAmount)} + ${p.percentRate}%`;
};

// config: { teacher, group } (jadval qatori) — bir juftlikning stavka davrlari.
const RatePeriodsModal = ({ config, close }) => {
  const teacher = config?.teacher || {};
  const group = config?.group || {};
  const now = new Date();

  const { data: periods = [], isLoading } = useRatePeriodsQuery({
    teacher: teacher._id,
    group: group._id,
  });

  const form = useObjectState({
    visible: false,
    editId: null,
    salaryType: "percent",
    fixedAmount: "",
    percentRate: "",
    startYear: now.getFullYear(),
    startMonth: now.getMonth() + 1,
    endYear: now.getFullYear(),
    endMonth: now.getMonth() + 1,
    open: true,
  });

  const createMut = useRatePeriodCreateMutation({ onSuccess: () => form.setField("visible", false) });
  const updateMut = useRatePeriodUpdateMutation({ onSuccess: () => form.setField("visible", false) });
  const removeMut = useRatePeriodRemoveMutation();

  const startAdd = () =>
    form.setFields({
      visible: true,
      editId: null,
      salaryType: "percent",
      fixedAmount: "",
      percentRate: "",
      startYear: now.getFullYear(),
      startMonth: now.getMonth() + 1,
      open: true,
    });

  const startEdit = (p) =>
    form.setFields({
      visible: true,
      editId: p._id,
      salaryType: p.salaryType,
      fixedAmount: p.fixedAmount ? String(p.fixedAmount) : "",
      percentRate: p.percentRate ? String(p.percentRate) : "",
      startYear: p.startYear,
      startMonth: p.startMonth,
      endYear: p.endYear || now.getFullYear(),
      endMonth: p.endMonth || now.getMonth() + 1,
      open: p.endYear == null,
    });

  const submit = (e) => {
    e.preventDefault();
    const body = {
      salaryType: form.salaryType,
      fixedAmount: Number(form.fixedAmount) || 0,
      percentRate: Number(form.percentRate) || 0,
      startYear: Number(form.startYear),
      startMonth: Number(form.startMonth),
      endYear: form.open ? null : Number(form.endYear),
      endMonth: form.open ? null : Number(form.endMonth),
    };
    if (form.editId) updateMut.mutate({ id: form.editId, body });
    else createMut.mutate({ teacher: teacher._id, group: group._id, ...body });
  };

  const showFixed = form.salaryType === "fixed" || form.salaryType === "mixed";
  const showPercent = form.salaryType === "percent" || form.salaryType === "mixed";
  const pending = createMut.isPending || updateMut.isPending;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/30 p-3 text-sm">
        <p className="font-medium">
          {teacher.firstName} {teacher.lastName}
        </p>
        <p className="text-xs text-muted-foreground">{group.name}</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Stavka davrlari</span>
        {!form.visible && (
          <Button size="sm" onClick={startAdd}>
            <Plus className="size-4" />
            Davr qo'shish
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="p-4 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : periods.length === 0 ? (
        <EmptyState title="Stavka davrlari yo'q" />
      ) : (
        <ul className="divide-y rounded-lg border bg-white">
          {periods.map((p) => (
            <li key={p._id} className="flex items-center justify-between gap-3 px-3 py-2.5">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{periodLabel(p)}</span>
                <span className="text-xs text-muted-foreground">
                  {TYPE_LABEL[p.salaryType]} · {rateText(p)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {p.endYear == null && <StatusBadge tone="success">Aktiv</StatusBadge>}
                <button type="button" onClick={() => startEdit(p)} aria-label="Tahrirlash">
                  <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
                </button>
                <button
                  type="button"
                  disabled={removeMut.isPending}
                  onClick={() => removeMut.mutate(p._id)}
                  aria-label="O'chirish"
                >
                  <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {form.visible && (
        <form onSubmit={submit} className="space-y-3 rounded-lg border p-3">
          <SelectField
            label="Maosh turi"
            value={form.salaryType}
            onChange={(v) => form.setField("salaryType", v)}
            options={TYPE_OPTIONS}
          />
          <div className="grid grid-cols-2 gap-3">
            {showPercent && (
              <InputField
                name="percentRate"
                type="number"
                label="Foiz (%)"
                placeholder="0"
                value={form.percentRate}
                onChange={(e) => form.setField("percentRate", e.target.value)}
              />
            )}
            {showFixed && (
              <InputField
                name="fixedAmount"
                type="money"
                label="Fiksa (so'm)"
                placeholder="0"
                value={form.fixedAmount}
                onChange={(e) => form.setField("fixedAmount", e.target.value)}
              />
            )}
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">Boshlanish oyi</p>
            <MonthPicker
              year={form.startYear}
              month={form.startMonth}
              onChange={({ year, month }) => form.setFields({ startYear: year, startMonth: month })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.open}
              onChange={(e) => form.setField("open", e.target.checked)}
            />
            Hozir ham amalda (tugamagan davr)
          </label>
          {!form.open && (
            <div>
              <p className="mb-1 text-sm font-medium">Tugash oyi (shu oy ham kiradi)</p>
              <MonthPicker
                year={form.endYear}
                month={form.endMonth}
                onChange={({ year, month }) => form.setFields({ endYear: year, endMonth: month })}
              />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => form.setField("visible", false)}>
              Bekor qilish
            </Button>
            <Button type="submit" disabled={pending}>
              Saqlash
            </Button>
          </div>
        </form>
      )}

      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Yopish
        </Button>
      </div>
    </div>
  );
};

export default RatePeriodsModal;
