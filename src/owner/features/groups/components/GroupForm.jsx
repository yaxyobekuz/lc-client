// Hooks
import useObjectState from "@/shared/hooks/useObjectState";
import useLeadDirectionsQuery from "@/owner/features/leadDirections/hooks/useLeadDirectionsQuery";

// Sonner
import { toast } from "sonner";

// Components
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import GroupScheduleField from "./GroupScheduleField";
import TeachersMultiPicker from "./TeachersMultiPicker";

const buildInitial = (group) => ({
  name: group?.name || "",
  schedule: group?.schedule?.map((s) => ({ ...s })) || [],
  teachers: (group?.teachers || []).map((t) =>
    typeof t === "string" ? t : t._id,
  ),
  monthlyPrice: group?.monthlyPrice ?? 0,
  direction:
    group?.direction && typeof group.direction === "object"
      ? group.direction._id
      : group?.direction || "",
  teacherAbsenceMode: group?.teacherAbsenceMode || "inherit",
  teacherAbsenceAmount: group?.teacherAbsenceAmount ?? 0,
});

const NONE_DIRECTION = "__none__";

const ABSENCE_MODES = [
  { value: "inherit", label: "Umumiy sozlama bo'yicha" },
  { value: "auto", label: "Avtomatik (oylik narx / darslar soni)" },
  { value: "fixed", label: "Belgilangan summa" },
  { value: "none", label: "Ayirilmasin (0)" },
];

const GroupForm = ({
  initial,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Saqlash",
}) => {
  const {
    name,
    schedule,
    teachers,
    monthlyPrice,
    direction,
    teacherAbsenceMode,
    teacherAbsenceAmount,
    setField,
  } = useObjectState(buildInitial(initial));

  const { data: directionsData } = useLeadDirectionsQuery({ limit: 200 });
  const directionOptions = [
    { value: NONE_DIRECTION, label: "Ko'rsatilmagan" },
    ...(directionsData?.data || []).map((d) => ({
      value: d._id,
      label: d.name,
    })),
  ];

  // Jadvalda takrorlangan kun bormi
  const hasDuplicateDays = (() => {
    const seen = new Set();
    for (const s of schedule) {
      if (seen.has(s.day)) return true;
      seen.add(s.day);
    }
    return false;
  })();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const priceNum = Number(monthlyPrice);

    if (!trimmedName) {
      toast.error("Guruh nomini kiriting");
      return;
    }
    if (trimmedName.length < 2) {
      toast.error("Guruh nomi kamida 2 belgidan iborat bo'lishi kerak");
      return;
    }
    if (trimmedName.length > 120) {
      toast.error("Guruh nomi 120 belgidan oshmasligi kerak");
      return;
    }
    if (monthlyPrice === "" || Number.isNaN(priceNum)) {
      toast.error("Oylik narxni kiriting");
      return;
    }
    if (priceNum < 0) {
      toast.error("Oylik narx 0 dan kichik bo'lmasin");
      return;
    }
    for (const s of schedule) {
      if (!s.day) {
        toast.error("Jadval kunini tanlang");
        return;
      }
      if (!s.startTime || !s.endTime) {
        toast.error("Jadvaldagi vaqtlarni to'liq kiriting");
        return;
      }
      if (s.startTime >= s.endTime) {
        toast.error("Tugash vaqti boshlanish vaqtidan keyin bo'lishi kerak");
        return;
      }
    }
    if (hasDuplicateDays) {
      toast.error("Jadvalda bir kun bir necha marta takrorlangan");
      return;
    }

    onSubmit({
      name: trimmedName,
      schedule,
      teachers,
      monthlyPrice: priceNum,
      direction: direction && direction !== NONE_DIRECTION ? direction : null,
      teacherAbsenceMode,
      teacherAbsenceAmount: Number(teacherAbsenceAmount) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* 1-qator: nom (kengroq) + narx (mobilda alohida) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <InputField
            name="name"
            label="Guruh nomi"
            placeholder="Masalan: Arabcha A1"
            value={name}
            onChange={(e) => setField("name", e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <InputField
          name="monthlyPrice"
          label="Oylik narx (so'm)"
          type="number"
          min="0"
          value={monthlyPrice}
          onChange={(e) => setField("monthlyPrice", e.target.value)}
          disabled={isLoading}
        />
      </div>

      {/* 2-qator: yo'nalish to'liq kenglikda */}
      <SelectField
        label="Yo'nalish"
        value={direction || NONE_DIRECTION}
        onChange={(v) => setField("direction", v)}
        options={directionOptions}
        disabled={isLoading}
      />

      {/* 3-qator: jadval va o'qituvchilar yonma-yon (md+) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <GroupScheduleField
          value={schedule}
          onChange={(next) => setField("schedule", next)}
          disabled={isLoading}
        />
        <TeachersMultiPicker
          value={teachers}
          onChange={(next) => setField("teachers", next)}
          disabled={isLoading}
        />
      </div>

      {/* O'qituvchi kelmagan kun chegirmasi (guruh override) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField
          label="O'qituvchi kelmagan kun chegirmasi"
          value={teacherAbsenceMode}
          onChange={(v) => setField("teacherAbsenceMode", v)}
          options={ABSENCE_MODES}
          disabled={isLoading}
        />
        {teacherAbsenceMode === "fixed" && (
          <InputField
            name="teacherAbsenceAmount"
            label="1 dars uchun summa (so'm)"
            type="number"
            min="0"
            value={teacherAbsenceAmount}
            onChange={(e) => setField("teacherAbsenceAmount", e.target.value)}
            disabled={isLoading}
          />
        )}
      </div>

      <div className="flex gap-2 pt-2 justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="min-w-28"
          >
            Bekor qilish
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading || hasDuplicateDays}
          className="min-w-28"
          title={
            hasDuplicateDays
              ? "Jadvalda takrorlangan kun bor"
              : undefined
          }
        >
          {isLoading ? "Saqlanmoqda..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default GroupForm;
