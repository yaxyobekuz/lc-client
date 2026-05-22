import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useObjectState from "@/shared/hooks/useObjectState";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { formatMoney } from "@/shared/utils/formatMoney";

import ExpensesTable from "../components/ExpensesTable";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseCreateModal from "../components/ExpenseCreateModal";
import ExpenseEditModal from "../components/ExpenseEditModal";
import ExpenseDeleteModal from "../components/ExpenseDeleteModal";
import useExpensesQuery from "../hooks/useExpensesQuery";
import useExpenseStatsQuery from "../hooks/useExpenseStatsQuery";

const ExpensesListPage = () => {
  const { openModal } = useModal();
  const filters = useObjectState({
    category: "",
    fromDate: "",
    toDate: "",
  });
  const [page, setPage] = useState(1);
  const limit = 20;

  const queryParams = {
    category: filters.category || undefined,
    fromDate: filters.fromDate || undefined,
    toDate: filters.toDate || undefined,
    page,
    limit,
  };
  const statsParams = {
    fromDate: filters.fromDate || undefined,
    toDate: filters.toDate || undefined,
  };

  const { data, isLoading } = useExpensesQuery(queryParams);
  const { data: stats } = useExpenseStatsQuery(statsParams);

  const items = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const onFilterChange = (key, value) => {
    filters.setField(key, value);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Xarajatlar</h1>
          <p className="text-sm text-muted-foreground">
            Markaz xarajatlarini kategoriya bo'yicha kuzating
          </p>
        </div>
        <Button onClick={() => openModal(MODAL.EXPENSE_CREATE)}>
          <Plus className="size-4" />
          Yangi xarajat
        </Button>
      </header>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="border rounded-lg p-4 bg-white">
            <p className="text-xs text-muted-foreground">Jami xarajatlar</p>
            <p className="text-xl font-semibold mt-1">
              {formatMoney(stats.total)}
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <p className="text-xs text-muted-foreground">Yozuvlar soni</p>
            <p className="text-xl font-semibold mt-1">{stats.count}</p>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <p className="text-xs text-muted-foreground">Eng katta kategoriya</p>
            <p className="text-xl font-semibold mt-1">
              {stats.byCategory?.[0]?._id
                ? formatMoney(stats.byCategory[0].sum)
                : "-"}
            </p>
          </div>
        </div>
      )}

      <ExpenseFilters filters={filters} onChange={onFilterChange} />

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <ExpensesTable items={items} />
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

      <ModalWrapper name={MODAL.EXPENSE_CREATE} title="Yangi xarajat">
        <ExpenseCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.EXPENSE_EDIT} title="Xarajatni tahrirlash">
        <ExpenseEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.EXPENSE_DELETE} title="Xarajatni o'chirish">
        <ExpenseDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default ExpensesListPage;
