import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import ExpenseTypesTable from "../components/ExpenseTypesTable";
import ExpenseTypeCreateModal from "../components/ExpenseTypeCreateModal";
import ExpenseTypeEditModal from "../components/ExpenseTypeEditModal";
import ExpenseTypeDeleteModal from "../components/ExpenseTypeDeleteModal";
import useModal from "@/shared/hooks/useModal";
import useExpenseTypesQuery from "../hooks/useExpenseTypesQuery";
import { MODAL } from "@/shared/constants/modals";

const ExpenseTypesListPage = () => {
  const [search, setSearch] = useState("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const { openModal } = useModal();
  const { data, isLoading, isError, refetch } = useExpenseTypesQuery({
    search,
    includeInactive,
    limit: 100,
  });
  const items = data?.data || [];

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Xarajat turlari</h1>
          <p className="text-sm text-muted-foreground">
            Xarajatlarni tasniflash uchun turlar (dinamik)
          </p>
        </div>
        <Button onClick={() => openModal(MODAL.EXPENSE_TYPE_CREATE)}>
          <Plus className="size-4" />
          Yangi tur
        </Button>
      </header>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="max-w-sm flex-1">
          <InputField
            name="search"
            placeholder="Nom bo'yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeInactive}
            onChange={(e) => setIncludeInactive(e.target.checked)}
          />
          Arxivlanganlarni ko'rsatish
        </label>
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <ExpenseTypesTable items={items} />
      )}

      <ModalWrapper name={MODAL.EXPENSE_TYPE_CREATE} title="Yangi xarajat turi">
        <ExpenseTypeCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.EXPENSE_TYPE_EDIT} title="Xarajat turini tahrirlash">
        <ExpenseTypeEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.EXPENSE_TYPE_DELETE} title="Xarajat turini arxivlash">
        <ExpenseTypeDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default ExpenseTypesListPage;
