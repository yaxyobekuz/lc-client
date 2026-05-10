// State
import { useState } from "react";

// Icons
import { Plus } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import UsersTable from "../components/UsersTable";
import UserCreateModal from "../components/UserCreateModal";
import UserDeleteModal from "../components/UserDeleteModal";
import UserEditModal from "../components/UserEditModal";

// Hooks
import useModal from "@/shared/hooks/useModal";
import useUsersListQuery from "../hooks/useUsersListQuery";

// Constants
import { MODAL } from "@/shared/constants/modals";
import { ROLES } from "@/shared/constants/roles";

const UsersListPage = () => {
  const [tab, setTab] = useState(ROLES.TEACHER);
  const { openModal } = useModal();
  const { data, isLoading } = useUsersListQuery({ role: tab, limit: 100 });
  const users = data?.data || [];

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Foydalanuvchilar</h1>
        <Button
          onClick={() => openModal(MODAL.USER_CREATE, { defaultRole: tab })}
        >
          <Plus className="size-4" />
          Yangi foydalanuvchi
        </Button>
      </header>

      <TabsButtons
        value={tab}
        onChange={setTab}
        items={[
          {
            value: ROLES.TEACHER,
            label: "O'qituvchilar",
            content: (
              <div className="pt-3">
                {isLoading ? (
                  <div className="p-4 text-muted-foreground">Yuklanmoqda...</div>
                ) : (
                  <UsersTable users={users} />
                )}
              </div>
            ),
          },
          {
            value: ROLES.STUDENT,
            label: "Talabalar",
            content: (
              <div className="pt-3">
                {isLoading ? (
                  <div className="p-4 text-muted-foreground">Yuklanmoqda...</div>
                ) : (
                  <UsersTable users={users} />
                )}
              </div>
            ),
          },
        ]}
      />

      <ModalWrapper name={MODAL.USER_CREATE} title="Yangi foydalanuvchi">
        <UserCreateModal />
      </ModalWrapper>

      <ModalWrapper name={MODAL.USER_DELETE} title="Foydalanuvchini o'chirish">
        <UserDeleteModal />
      </ModalWrapper>

      <ModalWrapper
        name={MODAL.USER_EDIT}
        title="Profilni tahrirlash"
        className="max-w-xl"
      >
        <UserEditModal />
      </ModalWrapper>
    </div>
  );
};

export default UsersListPage;
