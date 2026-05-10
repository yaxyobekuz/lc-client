import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

import {
  NotificationsTable,
  SendNotificationModal,
  useNotificationsQuery,
} from "@/owner/features/notifications";

const TeacherNotificationsListPage = () => {
  const { openModal } = useModal();
  const [page, setPage] = useState(1);
  const limit = 20;

  // Server avto sender=me filter qiladi (teacher rol)
  const { data, isLoading } = useNotificationsQuery({ page, limit });
  const items = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Yuborilgan xabarlar</h1>
        <Button onClick={() => openModal(MODAL.NOTIFICATION_SEND)}>
          <Plus className="size-4" />
          Yangi xabar
        </Button>
      </header>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <NotificationsTable items={items} inboxLink="/teacher/notifications" />
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

export default TeacherNotificationsListPage;
