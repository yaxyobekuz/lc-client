import { useState } from "react";
import { Calculator, Wallet } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import SelectField from "@/shared/components/ui/select/SelectField";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import useObjectState from "@/shared/hooks/useObjectState";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { SALARY_STATUS_OPTIONS } from "@/shared/constants/salary";
import { formatMoney } from "@/shared/utils/formatMoney";

import TeacherPicker from "../components/TeacherPicker";
import PeriodPicker from "../components/PeriodPicker";
import SalariesTable from "../components/SalariesTable";
import BulkCalculateModal from "../components/modals/BulkCalculateModal";
import PayoutAddModal from "../components/modals/PayoutAddModal";
import BulkPayoutModal from "../components/modals/BulkPayoutModal";
import useSalariesQuery from "../hooks/useSalariesQuery";

const STATUS_OPTIONS = [
  { value: "", label: "Barcha holatlar" },
  ...SALARY_STATUS_OPTIONS,
];

// Paid/cancelled bo'lmagan oylikni to'lash mumkin
const isPayable = (s) => s.status !== "paid" && s.status !== "cancelled";

const remainingOf = (s) =>
  Math.max(0, (s.finalAmount || 0) - (s.paidAmount || 0));

const SalariesListPage = () => {
  const { openModal } = useModal();
  const now = new Date();

  const filters = useObjectState({
    teacherId: "",
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    status: "",
  });
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const limit = 20;

  const { data, isLoading, isError, refetch } = useSalariesQuery({
    teacherId: filters.teacherId || undefined,
    year: filters.year,
    month: filters.month,
    status: filters.status || undefined,
    page,
    limit,
  });

  const items = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Faqat ko'rinib turgan va to'lsa bo'ladigan oyliklar tanlovga hisobga olinadi
  const payableItems = items.filter(isPayable);
  const payableIdSet = new Set(payableItems.map((s) => s._id));
  const selectedVisible = selectedIds.filter((id) => payableIdSet.has(id));
  const selectedSet = new Set(selectedVisible);

  const allSelected =
    payableItems.length > 0 &&
    payableItems.every((s) => selectedSet.has(s._id));
  const someSelected = selectedVisible.length > 0;

  const totalRemaining = items
    .filter((s) => selectedSet.has(s._id))
    .reduce((acc, s) => acc + remainingOf(s), 0);

  const clearSelection = () => setSelectedIds([]);

  const toggle = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleAll = () =>
    setSelectedIds(allSelected ? [] : payableItems.map((s) => s._id));

  const openSinglePayout = (s) =>
    openModal(MODAL.SALARY_PAYOUT_ADD, {
      salaryId: s._id,
      remaining: remainingOf(s),
    });

  const openBulkPayout = () =>
    openModal(MODAL.SALARY_PAYOUT_BULK, {
      salaryIds: selectedVisible,
      count: selectedVisible.length,
      totalRemaining,
    });

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Maoshlar</h1>
        <Button onClick={() => openModal(MODAL.SALARY_CALCULATE_BULK)}>
          <Calculator className="size-4" />
          Hisoblash
        </Button>
      </header>

      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[220px]">
          <TeacherPicker
            value={filters.teacherId}
            onChange={(v) => {
              filters.setField("teacherId", v);
              setPage(1);
              clearSelection();
            }}
          />
        </div>
        <PeriodPicker
          year={filters.year}
          month={filters.month}
          onChange={({ year, month }) => {
            filters.setFields({ year, month });
            setPage(1);
            clearSelection();
          }}
        />
        <div className="min-w-[200px]">
          <SelectField
            label="Holat"
            value={filters.status}
            onChange={(v) => {
              filters.setField("status", v);
              setPage(1);
              clearSelection();
            }}
            options={STATUS_OPTIONS}
          />
        </div>
      </div>

      {someSelected && (
        <div className="flex items-center justify-between gap-3 flex-wrap rounded-md border bg-muted/40 px-3 py-2 text-sm">
          <span>
            <b>{selectedVisible.length}</b> ta tanlandi · Jami qoldiq:{" "}
            <b>{formatMoney(totalRemaining)}</b>
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={clearSelection}>
              Bekor qilish
            </Button>
            <Button size="sm" onClick={openBulkPayout}>
              <Wallet className="size-4" />
              Tanlanganlarni to'lash
            </Button>
          </div>
        </div>
      )}

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <SalariesTable
            items={items}
            selectedIds={selectedVisible}
            onToggle={toggle}
            onToggleAll={toggleAll}
            allSelected={allSelected}
            someSelected={someSelected}
            onPay={openSinglePayout}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              onPageChange={(p) => {
                setPage(p);
                clearSelection();
              }}
              totalPages={totalPages}
              hasNextPage={page < totalPages}
              hasPrevPage={page > 1}
            />
          )}
        </>
      )}

      <ModalWrapper
        name={MODAL.SALARY_CALCULATE_BULK}
        title="Maoshlarni hisoblash"
      >
        <BulkCalculateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.SALARY_PAYOUT_ADD} title="To'lov qilish">
        <PayoutAddModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.SALARY_PAYOUT_BULK}
        title="Tanlanganlarga to'lov"
      >
        <BulkPayoutModal />
      </ModalWrapper>
    </div>
  );
};

export default SalariesListPage;
