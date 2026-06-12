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
import { scheduleActiveOn } from "@/shared/utils/formatSchedule";

const buildInitial = (group) => ({
  name: group?.name || "",
  // Versiyalash: tahrirlashda faqat HOZIRGI amaldagi versiya qatorlarini
  // ko'rsatamiz (effectiveFrom'siz, toza). Tarixiy versiyalar serverda saqlanadi.
  schedule: scheduleActiveOn(group?.schedule || []).map((s) => ({
    day: s.day,
    startTime: s.startTime,
    endTime: s.endTime,
  })),
  // Yangi jadval qaysi sanadan amal qiladi (tahrirlash rejimida) - default bugun
  scheduleEffectiveFrom: toDateInput(new Date()),
  // Guruhda ko'pi bilan bitta o'qituvchi - birinchisini olamiz (id string)
  teacher: (() => {
    const first = (group?.teachers || [])[0];
    if (!first) return "";
    return typeof first === "string" ? first : first._id;
  })(),
  // Yangi guruh - default bugun; mavjud guruh - o'z sanasi (yoki bo'sh)
  startDate: group?.startDate
    ? toDateInput(group.startDate)
    : group
      ? ""
      : toDateInput(new Date()),
  durationMonths: group?.durationMonths ?? "",
  // Oylik narx - faqat yangi guruh yaratishda (joriy oy GroupFee summasi).
  monthlyPrice: "",
});

const GroupForm = ({
  initial,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Saqlash",
}) => {
  // Tahrirlash rejimida o'qituvchi tanlash KO'RSATILMAYDI - o'qituvchini faqat
  // "Almashtirish" tugmasi orqali o'zgartirish mumkin (stavka ham to'g'ri ko'chadi).
  const isEdit = Boolean(initial);

  const {
    name,
    schedule,
    teacher,
    startDate,
    durationMonths,
    monthlyPrice,
    scheduleEffectiveFrom,
    setField,
  } = useObjectState(buildInitial(initial));

  // Tahrirlashda jadval HOZIRGI versiyadan o'zgartirilganmi - shunda "amal qilish
  // sanasi" maydonini ko'rsatamiz (yangi versiya shu sanadan boshlab amal qiladi).
  const initialScheduleKey = JSON.stringify(
    (buildInitial(initial).schedule || []).map((s) => [
      s.day,
      s.startTime,
      s.endTime,
    ]),
  );
  const currentScheduleKey = JSON.stringify(
    schedule.map((s) => [s.day, s.startTime, s.endTime]),
  );
  const scheduleChanged = isEdit && initialScheduleKey !== currentScheduleKey;

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
    // Yangi guruh - o'qituvchi tanlash majburiy (aniq 1ta)
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
    // Jadval o'zgartirilgan bo'lsa - yangi versiya qaysi sanadan amal qilishini
    // yuboramiz (server eski versiyani tarix uchun saqlaydi).
    if (scheduleChanged) {
      payload.scheduleEffectiveFrom = scheduleEffectiveFrom || null;
    }
    // O'qituvchini faqat yaratishda yuboramiz. Tahrirlashda o'qituvchi
    // "Almashtirish" orqali boshqariladi - bu yerda tegmaymiz.
    if (!isEdit) {
      payload.teachers = [teacher];
      // Oylik narx (ixtiyoriy) - berilsa joriy oy GroupFee summasi bo'ladi.
      if (monthlyPrice !== "") payload.monthlyPrice = Number(monthlyPrice);
    }

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

      {/* Oylik narx - faqat yangi guruh yaratishda (keyin Moliyadan tahrirlanadi) */}
      {!isEdit && (
        <InputField
          type="money"
          name="monthlyPrice"
          label="Oylik to'lov (so'm)"
          placeholder="Masalan: 500 000"
          value={monthlyPrice}
          onChange={(e) => setField("monthlyPrice", e.target.value)}
          disabled={isLoading}
          description="Ixtiyoriy - keyin Moliya bo'limidan ham belgilash mumkin"
        />
      )}

      {/* 3-qator: jadval va o'qituvchi. Tahrirlashda o'qituvchi ko'rsatilmaydi -
          u faqat "Almashtirish" orqali o'zgartiriladi, shu sabab jadval to'liq enga. */}
      <div
        className={
          isEdit
            ? "grid grid-cols-1 gap-3"
            : "grid grid-cols-1 md:grid-cols-2 gap-3"
        }
      >
        <div className="space-y-3">
          <GroupScheduleField
            value={schedule}
            onChange={(next) => setField("schedule", next)}
            disabled={isLoading}
          />
          {scheduleChanged && (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 space-y-2">
              <InputField
                type="date"
                name="scheduleEffectiveFrom"
                label="Yangi jadval qaysi sanadan amal qiladi?"
                value={scheduleEffectiveFrom}
                onChange={(e) =>
                  setField("scheduleEffectiveFrom", e.target.value)
                }
                disabled={isLoading}
              />
              <p className="text-[11px] text-amber-700">
                Eski jadval shu sanagacha bo'lgan davomat hisobida saqlanib
                qoladi - tarixiy dars soni o'zgarmaydi.
              </p>
            </div>
          )}
        </div>
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
