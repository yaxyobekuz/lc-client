// Hooks
import useObjectState from "@/shared/hooks/useObjectState";

// Sonner
import { toast } from "sonner";

// Components
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import GroupScheduleField from "./GroupScheduleField";
import TeacherSinglePicker from "./TeacherSinglePicker";

// Utils
import { toDateInput } from "@/shared/utils/formatDate";

const buildInitial = (group) => ({
  name: group?.name || "",
  schedule: group?.schedule?.map((s) => ({ ...s })) || [],
  // Guruhda ko'pi bilan bitta o'qituvchi — birinchisini olamiz (id string)
  teacher: (() => {
    const first = (group?.teachers || [])[0];
    if (!first) return "";
    return typeof first === "string" ? first : first._id;
  })(),
  // Yangi guruh — default bugun; mavjud guruh — o'z sanasi (yoki bo'sh)
  startDate: group?.startDate
    ? toDateInput(group.startDate)
    : group
      ? ""
      : toDateInput(new Date()),
  durationMonths: group?.durationMonths ?? "",
});

const GroupForm = ({
  initial,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Saqlash",
}) => {
  // Tahrirlash rejimida o'qituvchi tanlash KO'RSATILMAYDI — o'qituvchini faqat
  // "Almashtirish" tugmasi orqali o'zgartirish mumkin (stavka ham to'g'ri ko'chadi).
  const isEdit = Boolean(initial);

  const {
    name,
    schedule,
    teacher,
    startDate,
    durationMonths,
    setField,
  } = useObjectState(buildInitial(initial));

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
    // Yangi guruh — o'qituvchi tanlash majburiy (aniq 1ta)
    if (!isEdit && !teacher) {
      toast.error("O'qituvchi tanlang");
      return;
    }

    const payload = {
      name: trimmedName,
      schedule,
      startDate: startDate || null,
      durationMonths: durationMonths === "" ? null : Number(durationMonths),
    };
    // O'qituvchini faqat yaratishda yuboramiz. Tahrirlashda o'qituvchi
    // "Almashtirish" orqali boshqariladi — bu yerda tegmaymiz.
    if (!isEdit) payload.teachers = [teacher];

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* 1-qator: nom */}
      <InputField
        name="name"
        label="Guruh nomi"
        placeholder="Masalan: Arabcha A1"
        value={name}
        onChange={(e) => setField("name", e.target.value)}
        required
        disabled={isLoading}
      />

      {/* 2-qator: dars boshlanish sanasi + kurs davomiyligi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InputField
          type="date"
          name="startDate"
          label="Dars boshlanish sanasi"
          value={startDate}
          onChange={(e) => setField("startDate", e.target.value)}
          disabled={isLoading}
        />
        <InputField
          type="number"
          name="durationMonths"
          label="Kurs davomiyligi (oy)"
          placeholder="Masalan: 10"
          min="0"
          value={durationMonths}
          onChange={(e) => setField("durationMonths", e.target.value)}
          disabled={isLoading}
        />
      </div>

      {/* 3-qator: jadval va o'qituvchi. Tahrirlashda o'qituvchi ko'rsatilmaydi —
          u faqat "Almashtirish" orqali o'zgartiriladi, shu sabab jadval to'liq enga. */}
      <div
        className={
          isEdit
            ? "grid grid-cols-1 gap-3"
            : "grid grid-cols-1 md:grid-cols-2 gap-3"
        }
      >
        <GroupScheduleField
          value={schedule}
          onChange={(next) => setField("schedule", next)}
          disabled={isLoading}
        />
        {!isEdit && (
          <TeacherSinglePicker
            value={teacher}
            onChange={(next) => setField("teacher", next)}
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
