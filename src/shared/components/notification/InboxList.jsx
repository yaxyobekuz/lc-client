import { useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import Card from "@/shared/components/ui/card/Card";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import { formatDateUz } from "@/shared/utils/formatDate";
import {
  CATEGORY_LABEL,
  CATEGORY_EMOJI,
} from "@/shared/constants/notification";
import {
  useInboxQuery,
  useMarkReadMutation,
  useMarkAllReadMutation,
} from "@/owner/features/notifications/hooks/useInboxQuery";

const InboxItem = ({ recipient, onMarkRead }) => {
  const n = recipient.notification;
  if (!n) return null;
  const isUnread = !recipient.readAt;
  const emoji = CATEGORY_EMOJI[n.category] || "📨";

  return (
    <div
      className={`border rounded-md p-3 flex gap-3 ${
        isUnread ? "bg-blue-50/40 border-blue-200" : "bg-white"
      }`}
    >
      <div className="text-2xl">{emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="font-medium text-sm">
            {n.title || CATEGORY_LABEL[n.category] || "Xabar"}
          </p>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatDateUz(n.sentAt)}
          </span>
        </div>
        <p className="text-sm whitespace-pre-wrap">{n.body}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {n.sender
              ? `${n.sender.firstName} ${n.sender.lastName}`
              : "Tizim"}
          </span>
          {isUnread && (
            <button
              type="button"
              onClick={() => onMarkRead(recipient._id)}
              className="text-xs text-blue-600 hover:underline"
            >
              O'qilgan deb belgilash
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InboxList = () => {
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useInboxQuery({ page, limit, unreadOnly });
  const { mutate: markRead } = useMarkReadMutation();
  const { mutate: markAllRead, isPending } = useMarkAllReadMutation();

  const items = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Bildirishnomalar</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(e) => {
                setUnreadOnly(e.target.checked);
                setPage(1);
              }}
            />
            Faqat o'qilmaganlar
          </label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAllRead()}
            disabled={isPending}
          >
            Hammasini o'qilgan deb belgilash
          </Button>
        </div>
      </header>

      {isLoading ? (
        <Card>
          <p className="text-center text-muted-foreground">Yuklanmoqda...</p>
        </Card>
      ) : items.length === 0 ? (
        <Card>
          <p className="text-center text-muted-foreground">
            Xabarlar yo'q
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((r) => (
            <InboxItem
              key={r._id}
              recipient={r}
              onMarkRead={(id) => markRead(id)}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
          hasNextPage={page < totalPages}
          hasPrevPage={page > 1}
        />
      )}
    </div>
  );
};

export default InboxList;
