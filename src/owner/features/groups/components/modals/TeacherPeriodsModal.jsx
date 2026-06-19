import { Plus, Pencil, Trash2 } from "lucide-react";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import StatusBadge from "@/shared/components/ui/badge/StatusBadge";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import useObjectState from "@/shared/hooks/useObjectState";
import TeacherSinglePicker from "../TeacherSinglePicker";
import {
  useTeacherPeriodsQuery,
  useTeacherPeriodCreateMutation,
  useTeacherPeriodUpdateMutation,
  useTeacherPeriodRemoveMutation,
} from "../../hooks/useTeacherPeriods";

const dateKey = (v) => (v ? String(v).slice(0, 10) : "");
const fmt = (v) => {
  if (!v) return "hozir";
  const [y, m, d] = String(v).slice(0, 10).split("-");
  return `${d}.${m}.${y}`;
};

// group: { _id, name } - guruhning o'qituvchi dars berish davrlari (kun-darajali).
// endDate EXCLUSIVE saqlanadi - ko'rsatishda "gacha" (chiqib ketgan kuni).
const TeacherPeriodsModal = ({ group, close }) => {
  const groupId = group?._id;
  const { data: periods = [], isLoading } = useTeacherPeriodsQuery(groupId);

  const form = useObjectState({
    visible: false,
    editId: null,
    teacher: "",
    startDate: "",
    endDate: "",
  });

  const createMut = useTeacherPeriodCreateMutation(groupId, {
    onSuccess: () => form.setField("visible", false),
  });
  const updateMut = useTeacherPeriodUpdateMutation(groupId, {
    onSuccess: () => form.setField("visible", false),
  });
  const removeMut = useTeacherPeriodRemoveMutation(groupId);

  const startAdd = () =>
    form.setFields({ visible: true, editId: null, teacher: "", startDate: "", endDate: "" });

  const startEdit = (p) =>
    form.setFields({
      visible: true,
      editId: p._id,
      teacher: p.teacher?._id || p.teacher,
      startDate: dateKey(p.startDate),
      endDate: dateKey(p.endDate),
    });

  const submit = (e) => {
    e.preventDefault();
    if (form.editId) {
      updateMut.mutate({
        id: form.editId,
        body: { startDate: form.startDate, endDate: form.endDate || null },
      });
    } else {
      createMut.mutate({
        teacher: form.teacher,
        startDate: form.startDate,
        endDate: form.endDate || null,
      });
    }
  };

  const pending = createMut.isPending || updateMut.isPending;
  const canSubmit = form.startDate && (form.editId || form.teacher);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Dars berish davrlari</span>
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
        <EmptyState title="Dars berish davrlari yo'q" />
      ) : (
        <ul className="divide-y rounded-lg border bg-white">
          {periods.map((p) => (
            <li key={p._id} className="flex items-center justify-between gap-3 px-3 py-2.5">
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {p.teacher?.firstName} {p.teacher?.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {fmt(p.startDate)} - {fmt(p.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {p.endDate == null && <StatusBadge tone="success">Aktiv</StatusBadge>}
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
        <form onSubmit={submit} className="space-y-3 rounded-lg border p-3 bg-gray-50">
          {!form.editId && (
            <TeacherSinglePicker
              value={form.teacher}
              onChange={(id) => form.setField("teacher", id)}
            />
          )}
          <InputField
            name="startDate"
            type="date"
            label="Boshlanish sanasi"
            required
            value={form.startDate}
            onChange={(e) => form.setField("startDate", e.target.value)}
          />
          <InputField
            name="endDate"
            type="date"
            label="Tugash sanasi (bo'sh = hozir ham dars bermoqda)"
            value={form.endDate}
            onChange={(e) => form.setField("endDate", e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => form.setField("visible", false)}>
              Bekor qilish
            </Button>
            <Button type="submit" disabled={pending || !canSubmit}>
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

export default TeacherPeriodsModal;
