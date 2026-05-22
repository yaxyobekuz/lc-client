// Router
import { Link, useParams } from "react-router-dom";

// Icons
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import Card from "@/shared/components/ui/card/Card";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import GroupStudentsTable from "../components/GroupStudentsTable";
import GroupHistoryList from "../components/GroupHistoryList";
import GroupEditModal from "../components/modals/GroupEditModal";
import GroupDeleteModal from "../components/modals/GroupDeleteModal";
import GroupAddStudentModal from "../components/modals/GroupAddStudentModal";
import GroupTransferStudentModal from "../components/modals/GroupTransferStudentModal";

// Hooks
import useModal from "@/shared/hooks/useModal";
import useGroupQuery from "../hooks/useGroupQuery";

// Constants
import { MODAL } from "@/shared/constants/modals";

// Utils
import { formatSchedule } from "@/shared/utils/formatSchedule";
import { formatMoney } from "@/shared/utils/formatMoney";
import BackLink from "@/shared/components/ui/link/BackLink";

const GroupDetailPage = () => {
  const { id } = useParams();
  const { openModal } = useModal();
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
        <Link to="/owner/groups" className="text-blue-600 hover:underline">
          Guruhlar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const teachersText =
    (group.teachers || [])
      .map((t) => `${t.firstName} ${t.lastName || ""}`.trim())
      .join(", ") || "-";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <BackLink to="/owner/groups" />

          <h1 className="text-2xl font-semibold">{group.name}</h1>
          <Badge variant="secondary">{group.studentsCount} talaba</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => openModal(MODAL.GROUP_EDIT, { group })}
          >
            <Pencil className="size-4" />
            Tahrirlash
          </Button>
          <Button
            variant="outline"
            className="text-red-600"
            onClick={() => openModal(MODAL.GROUP_DELETE, { group })}
          >
            <Trash2 className="size-4" />
            O'chirish
          </Button>
        </div>
      </div>

      <Card className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Dars jadvali</p>
          <p className="font-medium">{formatSchedule(group.schedule)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">O'qituvchilar</p>
          <p className="font-medium">{teachersText}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Oylik narx</p>
          <p className="font-medium">{formatMoney(group.monthlyPrice)}</p>
        </div>
      </Card>

      <TabsButtons
        items={[
          {
            value: "students",
            label: "Talabalar",
            content: (
              <div className="space-y-3 pt-3">
                <div className="flex justify-end">
                  <Button
                    onClick={() =>
                      openModal(MODAL.GROUP_ADD_STUDENT, { groupId: group._id })
                    }
                  >
                    <Plus className="size-4" />
                    Talaba qo'shish
                  </Button>
                </div>
                <GroupStudentsTable group={group} />
              </div>
            ),
          },
          {
            value: "history",
            label: "Tarix",
            content: (
              <div className="pt-3">
                <GroupHistoryList groupId={group._id} />
              </div>
            ),
          },
        ]}
      />

      <ModalWrapper name={MODAL.GROUP_EDIT} title="Guruhni tahrirlash">
        <GroupEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_DELETE} title="Guruhni o'chirish">
        <GroupDeleteModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_ADD_STUDENT} title="Talaba qo'shish">
        <GroupAddStudentModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.GROUP_TRANSFER_STUDENT}
        title="Boshqa guruhga ko'chirish"
      >
        <GroupTransferStudentModal />
      </ModalWrapper>
    </div>
  );
};

export default GroupDetailPage;
