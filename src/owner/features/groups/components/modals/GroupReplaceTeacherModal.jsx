// State
import useObjectState from "@/shared/hooks/useObjectState";

// Components
import Button from "@/shared/components/ui/button/Button";
import SelectField from "@/shared/components/ui/select/SelectField";
import InputField from "@/shared/components/ui/input/InputField";

// Hooks
import useUsersListQuery from "@/owner/features/users/hooks/useUsersListQuery";
import useGroupReplaceTeacherMutation from "../../hooks/useGroupReplaceTeacherMutation";

// Constants
import { ROLES } from "@/shared/constants/roles";

// Utils
import { toDateInput } from "@/shared/utils/formatDate";

const CALC_OPTIONS = [
  { value: "fixed", label: "Belgilangan (oylik)" },
  { value: "hourly", label: "Soatbay" },
  { value: "percentage", label: "Foiz (to'lovdan)" },
  { value: "per_student", label: "Har o'quvchidan" },
  { value: "mixed", label: "Aralash" },
];


// `group` va `teacher` ModalWrapper orqali data sifatida keladi
const GroupReplaceTeacherModal = ({
  group,
  teacher,
  close,
  isLoading,
  setIsLoading,
}) => {
  const form = useObjectState({
    newTeacherId: "",
    date: toDateInput(new Date()),
    calculationType: "fixed",
    fixedAmount: "",
    hourlyRate: "",
    hoursPerSession: 2,
    percentageRate: "",
    amountPerStudent: "",
    minMonthlyAmount: "",
  });

  const { data, isLoading: loadingTeachers } = useUsersListQuery({
    role: ROLES.TEACHER,
    limit: 100,
  });

  // Guruhdagi mavjud o'qituvchilar ro'yxatdan chiqariladi
  const currentIds = (group?.teachers || []).map((t) => t._id || t);
  const teacherOptions = (data?.data || [])
    .filter((t) => !currentIds.includes(t._id))
    .map((t) => ({
      value: t._id,
      label: `${t.firstName} ${t.lastName || ""}`.trim() + ` (@${t.username})`,
    }));

  const { mutate } = useGroupReplaceTeacherMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const t = form.calculationType;
  const showFixed = t === "fixed" || t === "mixed";
  const showHourly = t === "hourly" || t === "mixed";
  const showPercentage = t === "percentage" || t === "mixed";
  const showPerStudent = t === "per_student" || t === "mixed";

  // Tanlangan turga mos kamida bitta komponent kiritilganmi
  const rateValid =
    (showFixed && Number(form.fixedAmount) > 0) ||
    (showHourly && Number(form.hourlyRate) > 0) ||
    (showPercentage && Number(form.percentageRate) > 0) ||
    (showPerStudent && Number(form.amountPerStudent) > 0);

  const canSubmit = !!form.newTeacherId && !!form.date && rateValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsLoading(true);
    mutate({
      id: group._id,
      body: {
        oldTeacherId: teacher._id,
        newTeacherId: form.newTeacherId,
        date: form.date,
        rate: {
          calculationType: t,
          fixedAmount: Number(form.fixedAmount || 0),
          hourlyRate: Number(form.hourlyRate || 0),
          hoursPerSession: Number(form.hoursPerSession || 0),
          percentageRate: Number(form.percentageRate || 0),
          amountPerStudent: Number(form.amountPerStudent || 0),
          minMonthlyAmount: Number(form.minMonthlyAmount || 0),
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Kim almashtirilmoqda */}
      <div className="rounded-lg bg-muted/40 px-3.5 py-2 text-sm">
        <span className="font-medium">
          {teacher?.firstName} {teacher?.lastName}
        </span>
        <span className="text-muted-foreground"> almashtirilmoqda</span>
      </div>

      {/* 1-bo'lim: kim va qachon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField
          searchable
          label="Yangi o'qituvchi"
          placeholder="Tanlang"
          emptyText="Yo'q"
          value={form.newTeacherId}
          onChange={(v) => form.setField("newTeacherId", v)}
          options={teacherOptions}
          isLoading={loadingTeachers}
          required
          disabled={isLoading}
        />
        <InputField
          type="date"
          name="date"
          label="Almashish sanasi"
          value={form.date}
          onChange={(e) => form.setField("date", e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* 2-bo'lim: stavka — alohida kartada, maydonlar 2 ustunli grid */}
      <div className="space-y-3 rounded-lg border p-4">
        <p className="text-sm font-semibold">Stavka</p>

        <SelectField
          label="Hisoblash turi"
          value={form.calculationType}
          onChange={(v) => form.setField("calculationType", v)}
          options={CALC_OPTIONS}
          disabled={isLoading}
        />

        {t === "mixed" && (
          <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Kerakli maydon(lar)ni to'ldiring — bittasi yetarli.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
          {showFixed && (
            <InputField
              type="number"
              min="0"
              name="fixedAmount"
              label="Summa (so'm)"
              placeholder="2 000 000"
              value={form.fixedAmount}
              onChange={(e) => form.setField("fixedAmount", e.target.value)}
              disabled={isLoading}
            />
          )}
          {showHourly && (
            <InputField
              type="number"
              min="0"
              name="hourlyRate"
              label="Soatlik (so'm)"
              placeholder="50 000"
              value={form.hourlyRate}
              onChange={(e) => form.setField("hourlyRate", e.target.value)}
              disabled={isLoading}
            />
          )}
          {showHourly && (
            <InputField
              type="number"
              min="0"
              step="0.5"
              name="hoursPerSession"
              label="Soat/dars"
              placeholder="2"
              value={form.hoursPerSession}
              onChange={(e) => form.setField("hoursPerSession", e.target.value)}
              disabled={isLoading}
            />
          )}
          {showPercentage && (
            <InputField
              type="number"
              min="0"
              max="100"
              name="percentageRate"
              label="Foiz (%)"
              placeholder="40"
              value={form.percentageRate}
              onChange={(e) => form.setField("percentageRate", e.target.value)}
              disabled={isLoading}
            />
          )}
          {showPerStudent && (
            <InputField
              type="number"
              min="0"
              name="amountPerStudent"
              label="O'quvchidan (so'm)"
              placeholder="150 000"
              value={form.amountPerStudent}
              onChange={(e) => form.setField("amountPerStudent", e.target.value)}
              disabled={isLoading}
            />
          )}
          <InputField
            type="number"
            min="0"
            name="minMonthlyAmount"
            label="Min. oylik"
            placeholder="Ixtiyoriy"
            value={form.minMonthlyAmount}
            onChange={(e) => form.setField("minMonthlyAmount", e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={() => close?.()}
          disabled={isLoading}
          className="flex-1"
        >
          Bekor qilish
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !canSubmit}
          className="flex-1"
        >
          {isLoading ? "Almashtirilmoqda..." : "Almashtirish"}
        </Button>
      </div>
    </form>
  );
};

export default GroupReplaceTeacherModal;
