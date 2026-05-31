// State
import { useState } from "react";

// Icons
import { Plus } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import UsersTable from "../components/UsersTable";
import UserCreateModal from "../components/UserCreateModal";
import UserDeleteModal from "../components/UserDeleteModal";
import UserEditModal from "../components/UserEditModal";
import UserPasswordModal from "../components/UserPasswordModal";

// Hooks
import useModal from "@/shared/hooks/useModal";
import useUsersListQuery from "../hooks/useUsersListQuery";

// Constants
import { MODAL } from "@/shared/constants/modals";
import { ROLES } from "@/shared/constants/roles";

const LIMIT = 20;

const UsersTab = ({ role }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useUsersListQuery({
    role,
    search: search || undefined,
    page,
    limit: LIMIT,
  });
  const users = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  return (
    <div className="pt-3 space-y-3">
      <InputField
        name="search"
        type="search"
        value={search}
        placeholder="Ism, familiya yoki login bo'yicha qidirish..."
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {isLoading ? (
        <div className="p-4 text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <>
          <UsersTable users={users} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              onPageChange={setPage}
              totalPages={totalPages}
              hasNextPage={page < totalPages}
              hasPrevPage={page > 1}
            />
          )}
        </>
      )}
    </div>
  );
};

const UsersListPage = () => {
  const [tab, setTab] = useState(ROLES.TEACHER);
  const { openModal } = useModal();

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
            content: <UsersTab role={ROLES.TEACHER} />,
          },
          {
            value: ROLES.STUDENT,
            label: "O'quvchilar",
            content: <UsersTab role={ROLES.STUDENT} />,
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

      <ModalWrapper name={MODAL.USER_PASSWORD} title="Foydalanuvchi paroli">
        <UserPasswordModal />
      </ModalWrapper>
    </div>
  );
};

export default UsersListPage;
