// State
import { useState } from "react";

// Router
import { useSearchParams } from "react-router-dom";

// Icons
import { Plus } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ArchiveToggle from "@/shared/components/ui/archive/ArchiveToggle";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import UsersTable from "../components/UsersTable";
import UserCreateModal from "../components/UserCreateModal";
import UserDeleteModal from "../components/UserDeleteModal";
import UserRestoreModal from "../components/UserRestoreModal";
import UserEditModal from "../components/UserEditModal";
import UserPasswordModal from "../components/UserPasswordModal";

// Hooks
import useModal from "@/shared/hooks/useModal";
import useDebounce from "@/shared/hooks/useDebounce";
import useUsersListQuery from "../hooks/useUsersListQuery";

// Constants
import { MODAL } from "@/shared/constants/modals";
import { ROLES } from "@/shared/constants/roles";

const LIMIT = 20;

const UsersTab = ({ role, archived = false }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // Ustun bo'yicha saralash holati (UsersTable sarlavhasini bosganda o'zgaradi)
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useUsersListQuery({
    role,
    search: debouncedSearch || undefined,
    archived: archived ? "1" : undefined,
    sort,
    order,
    page,
    limit: LIMIT,
  });
  const users = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  // Ustun sarlavhasi bosilganda: shu ustun bo'yicha yo'nalishni almashtiradi
  const handleSort = (field) => {
    setPage(1);
    if (sort === field) {
      setOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSort(field);
      setOrder("asc");
    }
  };

  return (
    <div className="pt-3 space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex-1">
          <InputField
            name="search"
            type="search"
            value={search}
            placeholder="Ism, familiya yoki telefon bo'yicha qidirish..."
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-4 text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <>
          <UsersTable
            users={users}
            archived={archived}
            role={role}
            sort={sort}
            order={order}
            onSort={handleSort}
          />
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
  const [searchParams] = useSearchParams();
  // Dashboard kartalari ?tab=student / ?tab=teacher bilan kerakli tabni ochadi
  const initialTab =
    searchParams.get("tab") === ROLES.STUDENT ? ROLES.STUDENT : ROLES.TEACHER;
  const [tab, setTab] = useState(initialTab);
  const [archived, setArchived] = useState(false);
  const { openModal } = useModal();

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Foydalanuvchilar</h1>
        <div className="flex items-center gap-2">
          <ArchiveToggle value={archived} onChange={setArchived} />
          {!archived && (
            <Button
              onClick={() => openModal(MODAL.USER_CREATE, { defaultRole: tab })}
            >
              <Plus className="size-4" />
              Yangi foydalanuvchi
            </Button>
          )}
        </div>
      </header>

      <TabsButtons
        value={tab}
        onChange={setTab}
        items={[
          {
            value: ROLES.TEACHER,
            label: "O'qituvchilar",
            content: <UsersTab role={ROLES.TEACHER} archived={archived} />,
          },
          {
            value: ROLES.STUDENT,
            label: "O'quvchilar",
            content: <UsersTab role={ROLES.STUDENT} archived={archived} />,
          },
        ]}
      />

      <ModalWrapper name={MODAL.USER_CREATE} title="Yangi foydalanuvchi">
        <UserCreateModal />
      </ModalWrapper>

      <ModalWrapper name={MODAL.USER_DELETE} title="Foydalanuvchini arxivlash">
        <UserDeleteModal />
      </ModalWrapper>

      <ModalWrapper name={MODAL.USER_RESTORE} title="Foydalanuvchini tiklash">
        <UserRestoreModal />
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
