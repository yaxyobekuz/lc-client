import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import Card from "@/shared/components/ui/card/Card";
import SelectField from "@/shared/components/ui/select/SelectField";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import usePaymentSettingsQuery from "@/owner/features/paymentSettings/hooks/usePaymentSettingsQuery";
import usePaymentSettingsUpdateMutation from "@/owner/features/paymentSettings/hooks/usePaymentSettingsUpdateMutation";
import useUsersListQuery from "@/owner/features/users/hooks/useUsersListQuery";
import useUserUpdateMutation from "@/owner/features/users/hooks/useUserUpdateMutation";
import { ROLES } from "@/shared/constants/roles";

// Global: o'qituvchi kelmagan kun jarimasi (default jarimasiz)
const GLOBAL_MODES = [
  { value: "none", label: "Jarimasiz (0)" },
  { value: "auto", label: "Avtomatik (1 dars haqi)" },
  { value: "fixed", label: "Belgilangan summa" },
];
// Per-teacher: "inherit" → global sozlama bo'yicha
const TEACHER_MODES = [
  { value: "inherit", label: "Umumiy sozlama bo'yicha" },
  ...GLOBAL_MODES,
];

// Bitta o'qituvchi qatori — o'z holatini saqlaydi (mode + amount)
const TeacherPenaltyRow = ({ teacher }) => {
  const { mutate, isPending } = useUserUpdateMutation();
  const obj = useObjectState({
    teacherAbsenceMode: teacher.teacherAbsenceMode || "inherit",
    teacherAbsenceAmount: teacher.teacherAbsenceAmount ?? 0,
  });

  const savedMode = teacher.teacherAbsenceMode || "inherit";
  const savedAmount = Number(teacher.teacherAbsenceAmount ?? 0);
  const dirty =
    obj.teacherAbsenceMode !== savedMode ||
    Number(obj.teacherAbsenceAmount) !== savedAmount;

  const save = () =>
    mutate({
      id: teacher._id,
      body: {
        teacherAbsenceMode: obj.teacherAbsenceMode,
        teacherAbsenceAmount: Number(obj.teacherAbsenceAmount) || 0,
      },
    });

  return (
    <div className="flex flex-wrap items-end gap-3 border-t py-3">
      <div className="min-w-[160px] flex-1">
        <p className="font-medium">
          {teacher.firstName} {teacher.lastName}
        </p>
        <p className="text-xs text-muted-foreground">@{teacher.username}</p>
      </div>
      <SelectField
        label="Jarima rejimi"
        value={obj.teacherAbsenceMode}
        onChange={(v) => obj.setField("teacherAbsenceMode", v)}
        options={TEACHER_MODES}
        disabled={isPending}
        className="w-48"
      />
      {obj.teacherAbsenceMode === "fixed" && (
        <InputField
          name={`amount_${teacher._id}`}
          label="Summa (so'm)"
          type="number"
          min="0"
          value={obj.teacherAbsenceAmount}
          onChange={(e) => obj.setField("teacherAbsenceAmount", e.target.value)}
          disabled={isPending}
          className="w-40"
        />
      )}
      <Button onClick={save} disabled={isPending || !dirty}>
        {isPending ? "..." : "Saqlash"}
      </Button>
    </div>
  );
};

const TeacherAbsencePenaltySettings = () => {
  const { data: settings } = usePaymentSettingsQuery();
  const { mutate: updateGlobal, isPending: globalPending } =
    usePaymentSettingsUpdateMutation();
  const { data: teachersRes, isLoading: teachersLoading } = useUsersListQuery({
    role: ROLES.TEACHER,
    limit: 200,
  });
  const teachers = teachersRes?.data || [];

  const obj = useObjectState({
    teacherAbsenceMode: "none",
    teacherAbsenceAmount: 0,
  });

  useEffect(() => {
    if (settings) {
      obj.setFields({
        teacherAbsenceMode: settings.teacherAbsenceMode || "none",
        teacherAbsenceAmount: settings.teacherAbsenceAmount ?? 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings?.teacherAbsenceMode, settings?.teacherAbsenceAmount]);

  const saveGlobal = () =>
    updateGlobal({
      teacherAbsenceMode: obj.teacherAbsenceMode,
      teacherAbsenceAmount: Number(obj.teacherAbsenceAmount) || 0,
    });

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="font-semibold">O'qituvchi kelmagan kun jarimasi</h3>
        <p className="text-sm text-muted-foreground">
          O'qituvchi kelmadi deb belgilansa, o'quvchilardan ayiriladigan summa.
          Default holatda jarimasiz (pul ayirilmaydi).
        </p>
      </div>

      {/* Global default */}
      <div className="flex flex-wrap items-end gap-3">
        <SelectField
          label="Umumiy rejim (default)"
          value={obj.teacherAbsenceMode}
          onChange={(v) => obj.setField("teacherAbsenceMode", v)}
          options={GLOBAL_MODES}
          disabled={globalPending}
          className="w-56"
        />
        {obj.teacherAbsenceMode === "fixed" && (
          <InputField
            name="globalAmount"
            label="1 dars uchun summa (so'm)"
            type="number"
            min="0"
            value={obj.teacherAbsenceAmount}
            onChange={(e) => obj.setField("teacherAbsenceAmount", e.target.value)}
            disabled={globalPending}
            className="w-44"
          />
        )}
        <Button onClick={saveGlobal} disabled={globalPending}>
          {globalPending ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>

      {/* Per-teacher overrides */}
      <div>
        <h4 className="font-medium">Har bir o'qituvchi uchun (override)</h4>
        <p className="mb-1 text-xs text-muted-foreground">
          Tanlanmasa, umumiy sozlama qo'llanadi.
        </p>
        {teachersLoading ? (
          <p className="py-3 text-sm text-muted-foreground">Yuklanmoqda...</p>
        ) : teachers.length === 0 ? (
          <p className="py-3 text-sm text-muted-foreground">O'qituvchilar yo'q</p>
        ) : (
          <div className="max-h-[28rem] overflow-y-auto pr-1">
            {teachers.map((t) => (
              <TeacherPenaltyRow key={t._id} teacher={t} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default TeacherAbsencePenaltySettings;
