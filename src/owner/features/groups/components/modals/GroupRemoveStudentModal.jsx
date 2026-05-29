import Button from "@/shared/components/ui/button/Button";
import useGroupRemoveStudentMutation from "../../hooks/useGroupRemoveStudentMutation";

const GroupRemoveStudentModal = ({
  groupId,
  student,
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
    mutate({ id: groupId, studentId: student._id });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">
          {student?.firstName} {student?.lastName}
        </span>{" "}
        guruhdan chiqariladi. Davomat va to'lov tarixi saqlanadi. Davom etasizmi?
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

export default GroupRemoveStudentModal;
