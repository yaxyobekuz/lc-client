// State
import { useState } from "react";

// Components
import Button from "@/shared/components/ui/button/Button";
import SelectField from "@/shared/components/ui/select/SelectField";

// Hooks
import useUsersListQuery from "@/owner/features/users/hooks/useUsersListQuery";
import useGroupAddStudentMutation from "../../hooks/useGroupAddStudentMutation";

// Constants
import { ROLES } from "@/shared/constants/roles";

const GroupAddStudentModal = ({ groupId, close, isLoading, setIsLoading }) => {
  const [studentId, setStudentId] = useState("");
  const { data, isLoading: loadingStudents } = useUsersListQuery({
    role: ROLES.STUDENT,
    limit: 200,
  });

  const students = data?.data || [];
  const options = students.map((s) => ({
    value: s._id,
    label: `${s.firstName} ${s.lastName} (@${s.username})`,
  }));

  const { mutate } = useGroupAddStudentMutation({
    onSuccess: () => {
      setIsLoading(false);
      setStudentId("");
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentId) return;
    setIsLoading(true);
    mutate({ id: groupId, studentId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SelectField
        searchable
        label="O'quvchi"
        placeholder="O'quvchini tanlang"
        emptyText="O'quvchilar topilmadi"
        value={studentId}
        onChange={setStudentId}
        options={options}
        isLoading={loadingStudents}
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
        <Button type="submit" disabled={isLoading || !studentId} className="flex-1">
          {isLoading ? "Qo'shilmoqda..." : "Qo'shish"}
        </Button>
      </div>
    </form>
  );
};

export default GroupAddStudentModal;
