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

  const canSubmit = !!form.newTeacherId && !!form.date;

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

      {/* Kim va qachon */}
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
        <Button type="submit" disabled={isLoading || !canSubmit} className="flex-1">
          {isLoading ? "Almashtirilmoqda..." : "Almashtirish"}
        </Button>
      </div>
    </form>
  );
};

export default GroupReplaceTeacherModal;
