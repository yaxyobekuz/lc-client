import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import SelectField from "@/shared/components/ui/select/SelectField";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import ErrorState from "@/shared/components/ui/feedback/ErrorState";
import useObjectState from "@/shared/hooks/useObjectState";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { CATEGORY_OPTIONS } from "@/shared/constants/notification";

import NotificationsTable from "../components/NotificationsTable";
import SendNotificationModal from "../components/modals/SendNotificationModal";
import useNotificationsQuery from "../hooks/useNotificationsQuery";

const CATEGORY_FILTER_OPTIONS = [
  { value: "", label: "Barcha kategoriyalar" },
  ...CATEGORY_OPTIONS,
];

const NotificationsListPage = () => {
  const { openModal } = useModal();
  const filters = useObjectState({ category: "" });
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, isError, refetch } = useNotificationsQuery({
    category: filters.category || undefined,
    page,
    limit,
  });

  const items = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Bildirishnomalar</h1>
        <Button onClick={() => openModal(MODAL.NOTIFICATION_SEND)}>
          <Plus className="size-4" />
          Yangi xabar
        </Button>
      </header>

      <div className="flex items-end gap-3 flex-wrap">
        <div className="min-w-[220px]">
          <SelectField
            label="Kategoriya"
            value={filters.category}
            onChange={(v) => {
              filters.setField("category", v);
              setPage(1);
            }}
            options={CATEGORY_FILTER_OPTIONS}
          />
        </div>
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <NotificationsTable items={items} />
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

      <ModalWrapper
        name={MODAL.NOTIFICATION_SEND}
        title="Yangi xabar yuborish"
        className="max-w-xl"
      >
        <SendNotificationModal />
      </ModalWrapper>
    </div>
  );
};

export default NotificationsListPage;
