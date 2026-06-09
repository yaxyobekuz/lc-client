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
  // O'quvchilar uchun tezkor filter: "all" | "debtors"
  const [quickFilter, setQuickFilter] = useState("all");
  const debouncedSearch = useDebounce(search);

  const isStudent = role === ROLES.STUDENT;
  // "Qarzdorlar" filteri qarz bo'yicha kamayish tartibida saralaydi
  const effectiveSort = quickFilter === "debtors" ? "debt" : sort;
  const effectiveOrder = quickFilter === "debtors" ? "desc" : order;

  const { data, isLoading } = useUsersListQuery({
    role,
    search: debouncedSearch || undefined,
    archived: archived ? "1" : undefined,
    sort: effectiveSort,
    order: effectiveOrder,
    page,
    limit: LIMIT,
  });
  let users = data?.data || [];
  // "Qarzdorlar" tanlansa — qarzi 0 bo'lganlarni yashiramiz (sahifa ichida)
  if (isStudent && quickFilter === "debtors") {
    users = users.filter((u) => (u.currentDebt || 0) > 0);
  }
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  // Ustun sarlavhasi bosilganda: shu ustun bo'yicha yo'nalishni almashtiradi
  const handleSort = (field) => {
    setQuickFilter("all");
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

        {/* Tezkor filter chiplar — faqat o'quvchilar uchun */}
        {isStudent && !archived && (
          <div className="flex gap-1 rounded-md border bg-white p-0.5">
            {[
              { key: "all", label: "Hammasi" },
              { key: "debtors", label: "Qarzdorlar" },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  setQuickFilter(f.key);
                  setPage(1);
                }}
                className={
                  "rounded px-3 py-1.5 text-sm transition-colors " +
                  (quickFilter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-gray-100")
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="p-4 text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <>
          <UsersTable
            users={users}
            archived={archived}
            role={role}
            sort={effectiveSort}
            order={effectiveOrder}
            onSort={handleSort}
          />
          {totalPages > 1 && quickFilter !== "debtors" && (
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
