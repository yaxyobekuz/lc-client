// Icons
import { ArrowRightLeft, Trash2 } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";

// Hooks
import useModal from "@/shared/hooks/useModal";
import useGroupRemoveStudentMutation from "../hooks/useGroupRemoveStudentMutation";

// Constants
import { MODAL } from "@/shared/constants/modals";

// Utils
import { formatPhone } from "@/shared/utils/formatPhone";

const GroupStudentsTable = ({ group }) => {
  const { openModal } = useModal();
  const { mutate: removeStudent, isPending } = useGroupRemoveStudentMutation();

  const students = group?.students || [];

  if (students.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Guruhda hali talaba yo'q
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">#</th>
            <th className="px-4 py-2 font-medium">Ism familiya</th>
            <th className="px-4 py-2 font-medium">Telefon</th>
            <th className="px-4 py-2 font-medium">Login</th>
            <th className="px-4 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s._id} className="border-t">
              <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
              <td className="px-4 py-2">
                {s.firstName} {s.lastName}
              </td>
              <td className="px-4 py-2">{formatPhone(s.phone) || "—"}</td>
              <td className="px-4 py-2 text-muted-foreground">@{s.username}</td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      openModal(MODAL.GROUP_TRANSFER_STUDENT, {
                        groupId: group._id,
                        student: s,
                      })
                    }
                    playClickSound={false}
                  >
                    <ArrowRightLeft className="size-4" />
                    Ko'chirish
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isPending}
                    className="text-red-600 hover:text-red-700"
                    onClick={() =>
                      removeStudent({ id: group._id, studentId: s._id })
                    }
                    playClickSound={false}
                  >
                    <Trash2 className="size-4" />
                    Chiqarish
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupStudentsTable;
