import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import Button from "@/shared/components/ui/button/Button";
import useDebounce from "@/shared/hooks/useDebounce";
import { MODAL } from "@/shared/constants/modals";
import { formatMoney } from "@/shared/utils/formatMoney";
import RefundCard from "../components/RefundCard";
import RefundConfirmModal from "../components/modals/RefundConfirmModal";
import useRefundsPendingQuery from "../hooks/useRefundsPendingQuery";

const LIMIT = 24;

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="h-44 animate-pulse rounded-xl border bg-muted/40" />
    ))}
  </div>
);

const RefundsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const onSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isFetching, isError, refetch } = useRefundsPendingQuery(
    {
      search: debouncedSearch || undefined,
      page,
      limit: LIMIT,
    },
    { placeholderData: keepPreviousData },
  );

  const items = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = data?.meta?.pages || 1;

  // Joriy sahifadagi jami qaytariladigan summa (ko'rsatkich uchun)
  const pageTotal = items.reduce((s, p) => s + (p.refundable || 0), 0);

  const rangeStart = total === 0 ? 0 : (page - 1) * LIMIT + 1;
  const rangeEnd = Math.min(page * LIMIT, total);

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Qaytariladigan pul</h1>
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Yuklanmoqda..."
              : `Guruhdan ketgan ${total} ta o'quvchiga qaytarish kerak`}
          </p>
        </div>
        {!isLoading && total > 0 && (
          <div className="rounded-lg border bg-rose-50 px-4 py-2 text-right">
            <p className="text-xs text-rose-500">Bu sahifada jami</p>
            <p className="text-lg font-semibold text-rose-600">
              {formatMoney(pageTotal)}
            </p>
          </div>
        )}
      </header>

      <div className="rounded-lg border bg-white p-3">
        <InputField
          name="search"
          type="search"
          label="Qidiruv"
          placeholder="O'quvchi ismi, raqami yoki username..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <SkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState
          title="Qaytariladigan pul yo'q"
          description={
            debouncedSearch
              ? "Qidiruv bo'yicha natija topilmadi."
              : "Hozircha ortiqcha to'lab guruhdan ketgan o'quvchilar yo'q."
          }
          action={
            debouncedSearch ? (
              <Button variant="outline" size="sm" onClick={() => onSearch("")}>
                Qidiruvni tozalash
              </Button>
            ) : null
          }
        />
      ) : (
        <>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {rangeStart}–{rangeEnd} / {total} ko'rsatilmoqda
            </span>
            {isFetching && <span>Yangilanmoqda...</span>}
          </div>

          <div
            className={`grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
              isFetching ? "opacity-60" : ""
            }`}
          >
            {items.map((p) => (
              <RefundCard key={p._id} item={p} />
            ))}
          </div>

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

      <ModalWrapper name={MODAL.FINANCE_REFUND} title="Pulni qaytarish">
        <RefundConfirmModal />
      </ModalWrapper>
    </div>
  );
};

export default RefundsPage;
