import { useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import SelectField from "@/shared/components/ui/select/SelectField";
import useGroupRemoveStudentMutation from "@/owner/features/groups/hooks/useGroupRemoveStudentMutation";
import useArchiveReasonsQuery from "@/owner/features/archiveReasons/hooks/useArchiveReasonsQuery";

const GroupRemoveStudentConfirmModal = ({
  groupId,
  studentId,
  groupName,
  isLast = false,
  close,
  isLoading,
  setIsLoading,
}) => {
  const [reasonId, setReasonId] = useState("");

  const { data } = useArchiveReasonsQuery({ limit: 200 });
  const reasonOptions = [
    { value: "", label: "Sababsiz" },
    ...(data?.data || []).map((r) => ({ value: r._id, label: r.title })),
  ];

  const { mutate } = useGroupRemoveStudentMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutate({ id: groupId, studentId, reasonId: reasonId || undefined });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        O'quvchi <span className="font-semibold">{groupName}</span> guruhidan
        chiqariladi.
        {isLast ? " Bu uning oxirgi guruhi." : " Davom etasizmi?"}
      </p>

      <SelectField
        searchable
        label="Chiqish sababi"
        value={reasonId}
        onChange={setReasonId}
        options={reasonOptions}
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
          type="button"
          variant="danger"
          onClick={handleConfirm}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Chiqarilmoqda..." : "Chiqarish"}
        </Button>
      </div>
    </div>
  );
};

export default GroupRemoveStudentConfirmModal;
