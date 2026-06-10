// Hooks
import useObjectState from "@/shared/hooks/useObjectState";

// Components
import Button from "@/shared/components/ui/button/Button";
import SelectField from "@/shared/components/ui/select/SelectField";
import InputField from "@/shared/components/ui/input/InputField";

// Hooks
import useGroupsListQuery from "@/owner/features/groups/hooks/useGroupsListQuery";
import useGroupAddStudentMutation from "../../hooks/useGroupAddStudentMutation";

// Utils
import { todayInput } from "@/shared/utils/formatDate";

/**
 * StudentAddToGroupModal — o'quvchi detalidan turib uni guruhga qo'shadi.
 * GroupAddStudentModal'ning teskarisi: bu yerda o'quvchi tayin, GURUH tanlanadi.
 *
 * Props (openModal payload'idan): studentId, excludeGroupIds (allaqachon a'zo).
 */
const StudentAddToGroupModal = ({
  studentId,
  excludeGroupIds = [],
  close,
  isLoading,
  setIsLoading,
}) => {
  const { groupId, joinedAt, setField, resetState } = useObjectState({
    groupId: "",
    joinedAt: todayInput(),
  });

  // Faqat faol (arxivlanmagan, yakunlanmagan) guruhlar
  const { data, isLoading: loadingGroups } = useGroupsListQuery({
    archived: "0",
    limit: 200,
  });

  const exclude = new Set(excludeGroupIds.map(String));
  const groups = (data?.data || []).filter(
    (g) => g.status !== "finished" && !exclude.has(String(g._id)),
  );
  const options = groups.map((g) => ({
    value: g._id,
    label: g.name,
  }));

  const { mutate } = useGroupAddStudentMutation({
    onSuccess: () => {
      setIsLoading(false);
      resetState();
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupId || !studentId) return;
    setIsLoading(true);
    mutate({ id: groupId, studentId, joinedAt: joinedAt || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SelectField
        searchable
        label="Guruh"
        placeholder="Guruhni tanlang"
        emptyText="Mos guruh topilmadi"
        value={groupId}
        onChange={(v) => setField("groupId", v)}
        options={options}
        isLoading={loadingGroups}
        required
        disabled={isLoading}
      />

      <InputField
        type="date"
        name="joinedAt"
        label="Boshlash sanasi"
        value={joinedAt}
        max={todayInput()}
        onChange={(e) => setField("joinedAt", e.target.value)}
        disabled={isLoading}
      />

      <div className="flex gap-2">
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
          disabled={isLoading || !groupId}
          className="flex-1"
        >
          {isLoading ? "Qo'shilmoqda..." : "Qo'shish"}
        </Button>
      </div>
    </form>
  );
};

export default StudentAddToGroupModal;
