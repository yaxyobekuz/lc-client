// State
import { useState } from "react";

// Components
import Button from "@/shared/components/ui/button/Button";
import SelectField from "@/shared/components/ui/select/SelectField";

// Hooks
import useGroupsListQuery from "../../hooks/useGroupsListQuery";
import useGroupTransferStudentMutation from "../../hooks/useGroupTransferStudentMutation";

const GroupTransferStudentModal = ({
  groupId,
  student,
  close,
  isLoading,
  setIsLoading,
}) => {
  const [targetGroupId, setTargetGroupId] = useState("");
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
    mutate({ id: groupId, studentId: student._id, targetGroupId });
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
        onChange={setTargetGroupId}
        options={options}
        isLoading={loadingGroups}
        required
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
