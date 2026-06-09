// Router
import { useParams, useNavigate } from "react-router-dom";

// Icons
import {
  Pencil,
  Plus,
  Trash2,
  CheckCircle2,
  Archive,
  CalendarCheck,
  MoreHorizontal,
} from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/components/shadcn/dropdown-menu";
import GroupStudentsTable from "../components/GroupStudentsTable";
import GroupInfoTab from "../components/tabs/GroupInfoTab";
import GroupAttendanceStatsTab from "../components/tabs/GroupAttendanceStatsTab";
import GroupPaymentsStatsTab from "../components/tabs/GroupPaymentsStatsTab";
import GroupEditModal from "../components/modals/GroupEditModal";
import GroupDeleteModal from "../components/modals/GroupDeleteModal";
import GroupFinishModal from "../components/modals/GroupFinishModal";
import GroupPermanentDeleteModal from "../components/modals/GroupPermanentDeleteModal";
import GroupAddStudentModal from "../components/modals/GroupAddStudentModal";
import GroupTransferStudentModal from "../components/modals/GroupTransferStudentModal";
import GroupRemoveStudentModal from "../components/modals/GroupRemoveStudentModal";
import GroupReplaceTeacherModal from "../components/modals/GroupReplaceTeacherModal";
import { PaymentRecordModal } from "@/owner/features/payments";
import { StudentFreezeModal } from "@/owner/features/studentFreezes";
import { UserPasswordModal } from "@/owner/features/users";

// Hooks
import useModal from "@/shared/hooks/useModal";
import useGoBack from "@/shared/hooks/useGoBack";
import useGroupQuery from "../hooks/useGroupQuery";

// Constants
import { MODAL } from "@/shared/constants/modals";

// Utils
import BackLink from "@/shared/components/ui/link/BackLink";

const GroupDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const goBack = useGoBack("/owner/groups");
  const { data: group, isLoading, isError } = useGroupQuery(id);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Yuklanmoqda...
      </div>
    );
  }

  if (isError || !group) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Guruh topilmadi</p>
        <button
          type="button"
          onClick={goBack}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Guruhlar ro'yxatiga qaytish
        </button>
      </div>
    );
  }

  const isFinished = group.status === "finished";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <BackLink to="/owner/groups" />

          <h1 className="text-2xl font-semibold">{group.name}</h1>
          <Badge variant="secondary">{group.studentsCount} o'quvchi</Badge>
          {isFinished && (
            <Badge className="bg-amber-100 text-amber-700">Yakunlangan</Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isFinished && (
            <Button
              onClick={() =>
                navigate(`/owner/attendance/mark?groupId=${group._id}`)
              }
            >
              <CalendarCheck className="size-4" />
              Davomat belgilash
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" title="Amallar" aria-label="Amallar">
                <MoreHorizontal className="size-4" />
                Amallar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[14rem]">
              <DropdownMenuItem
                onSelect={() => openModal(MODAL.GROUP_EDIT, { group })}
              >
                <Pencil className="size-4" />
                Tahrirlash
              </DropdownMenuItem>
              {!isFinished && (
                <DropdownMenuItem
                  className="text-emerald-600 focus:text-emerald-700"
                  onSelect={() => openModal(MODAL.GROUP_FINISH, { group })}
                >
                  <CheckCircle2 className="size-4" />
                  Kursni yakunlash
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-amber-600 focus:text-amber-700"
                onSelect={() => openModal(MODAL.GROUP_DELETE, { group })}
              >
                <Archive className="size-4" />
                Arxivlash
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-700"
                onSelect={() =>
                  openModal(MODAL.GROUP_PERMANENT_DELETE, { group })
                }
              >
                <Trash2 className="size-4" />
                O'chirish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TabsButtons
        items={[
          {
            value: "info",
            label: "Ma'lumot",
            content: <GroupInfoTab group={group} />,
          },
          {
            value: "students",
            label: "O'quvchilar",
            content: (
              <div className="space-y-3 pt-3">
                <div className="flex justify-end">
                  <Button
                    onClick={() =>
                      openModal(MODAL.GROUP_ADD_STUDENT, { groupId: group._id })
                    }
                  >
                    <Plus className="size-4" />
                    O'quvchi qo'shish
                  </Button>
                </div>
                <GroupStudentsTable group={group} />
              </div>
            ),
          },
          {
            value: "attendance",
            label: "Davomat",
            content: <GroupAttendanceStatsTab groupId={group._id} />,
          },
          {
            value: "payments",
            label: "To'lov",
            content: <GroupPaymentsStatsTab groupId={group._id} />,
          },
        ]}
      />

      <ModalWrapper
        name={MODAL.GROUP_EDIT}
        title="Guruhni tahrirlash"
        className="max-w-4xl"
      >
        <GroupEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_DELETE} title="Guruhni arxivlash">
        <GroupDeleteModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_FINISH} title="Kursni yakunlash">
        <GroupFinishModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_PERMANENT_DELETE} title="Guruhni butunlay o'chirish">
        <GroupPermanentDeleteModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_ADD_STUDENT} title="O'quvchi qo'shish">
        <GroupAddStudentModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.GROUP_TRANSFER_STUDENT}
        title="Boshqa guruhga ko'chirish"
      >
        <GroupTransferStudentModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.GROUP_REMOVE_STUDENT}
        title="O'quvchini guruhdan chiqarish"
      >
        <GroupRemoveStudentModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.GROUP_REPLACE_TEACHER}
        title="O'qituvchini almashtirish"
        className="max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <GroupReplaceTeacherModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.PAYMENT_RECORD} title="To'lov yozish">
        <PaymentRecordModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.STUDENT_FREEZE} title="O'quvchini muzlatish">
        <StudentFreezeModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.USER_PASSWORD} title="Login va parol">
        <UserPasswordModal />
      </ModalWrapper>
    </div>
  );
};

export default GroupDetailPage;
