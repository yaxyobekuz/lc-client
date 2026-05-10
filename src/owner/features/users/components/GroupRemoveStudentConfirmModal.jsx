import Button from "@/shared/components/ui/button/Button";
import useGroupRemoveStudentMutation from "@/owner/features/groups/hooks/useGroupRemoveStudentMutation";

const GroupRemoveStudentConfirmModal = ({
  groupId,
  studentId,
  groupName,
  close,
  isLoading,
  setIsLoading,
}) => {
  const { mutate } = useGroupRemoveStudentMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutate({ id: groupId, studentId });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        Talaba <span className="font-semibold">{groupName}</span> guruhidan
        chiqariladi. Davom etasizmi?
      </p>
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
          variant="destructive"
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
