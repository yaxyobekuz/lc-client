// Hooks
import useObjectState from "@/shared/hooks/useObjectState";

// Components
import Button from "@/shared/components/ui/button/Button";
import SelectField from "@/shared/components/ui/select/SelectField";
import InputField from "@/shared/components/ui/input/InputField";

// Hooks
import useGroupsListQuery from "../../hooks/useGroupsListQuery";
import useGroupTransferStudentMutation from "../../hooks/useGroupTransferStudentMutation";

// Utils
import { todayInput } from "@/shared/utils/formatDate";

const GroupTransferStudentModal = ({
  groupId,
  student,
  close,
  isLoading,
  setIsLoading,
}) => {
  const { targetGroupId, joinedAt, setField } = useObjectState({
    targetGroupId: "",
    joinedAt: todayInput(),
  });
  const { data, isLoading: loadingGroups } = useGroupsListQuery({ limit: 100 });
  const groups = (data?.data || []).filter((g) => String(g._id) !== String(groupId));

  const options = groups.map((g) => ({ value: g._id, label: g.name }));

  const { mutate } = useGroupTransferStudentMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetGroupId) return;
    setIsLoading(true);
    mutate({
      id: groupId,
      studentId: student._id,
      targetGroupId,
      joinedAt: joinedAt || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm">
        <span className="font-medium">
          {student?.firstName} {student?.lastName}
        </span>{" "}
        boshqa guruhga ko'chiriladi
      </p>

      <SelectField
        searchable
        label="Yangi guruh"
        placeholder="Guruhni tanlang"
        emptyText="Boshqa guruhlar yo'q"
        value={targetGroupId}
        onChange={(v) => setField("targetGroupId", v)}
        options={options}
        isLoading={loadingGroups}
        required
        disabled={isLoading}
      />

      <InputField
        type="date"
        name="joinedAt"
        label="Yangi guruhda boshlash sanasi"
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
          disabled={isLoading || !targetGroupId}
          className="flex-1"
        >
          {isLoading ? "Ko'chirilmoqda..." : "Ko'chirish"}
        </Button>
      </div>
    </form>
  );
};

export default GroupTransferStudentModal;
