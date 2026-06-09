// Router
import { useNavigate } from "react-router-dom";

// Hooks
import { useMarkSystemReadMutation } from "@/owner/features/systemNotifications";

// Sana + vaqt: "12.05.2026 14:30"
const formatDateTime = (dateLike) => {
  if (!dateLike) return "";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()} ${hh}:${min}`;
};

const SystemNotificationItem = ({ notification, onNavigate }) => {
  const navigate = useNavigate();
  const { mutate: markRead } = useMarkSystemReadMutation();
  const { _id, message, link, isRead, createdAt } = notification;

  const handleClick = () => {
    if (!isRead) markRead(_id);
    if (link) {
      onNavigate?.();
      navigate(link);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full text-left flex gap-3 px-4 py-3 border-b transition hover:bg-muted/50 ${
        isRead ? "" : "bg-primary/5"
      }`}
    >
      {/* O'qilmaganlik indikatori */}
      <span
        className={`mt-1.5 size-2 shrink-0 rounded-full ${
          isRead ? "bg-transparent" : "bg-primary"
        }`}
      />

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm break-words ${
            isRead ? "text-muted-foreground" : "font-medium text-foreground"
          }`}
        >
          {message}
        </p>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatDateTime(createdAt)}</span>
          {link && <span className="text-primary">Ko'rish →</span>}
        </div>
      </div>
    </button>
  );
};

export default SystemNotificationItem;
