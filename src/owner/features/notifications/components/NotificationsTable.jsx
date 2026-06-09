import { useNavigate } from "react-router-dom";
import { Eye, XCircle, MessageSquare } from "lucide-react";
import DataTable from "@/shared/components/ui/table/DataTable";
import Button from "@/shared/components/ui/button/Button";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import { AUDIENCE_TYPE_LABEL } from "@/shared/constants/notification";
import { formatDateUz } from "@/shared/utils/formatDate";

import CategoryBadge from "./CategoryBadge";
import ChannelBadge from "./ChannelBadge";
import NotificationStatusBadge from "./NotificationStatusBadge";

const senderName = (n) =>
  n.sender ? `${n.sender.firstName} ${n.sender.lastName}` : "Tizim";

const th = "px-4 py-2.5 text-left text-xs font-medium text-muted-foreground";

const NotificationsTable = ({
  items = [],
  isLoading = false,
  basePath = "/owner/notifications",
  onCancel,
}) => {
  const navigate = useNavigate();
  const open = (n) => navigate(`${basePath}/${n._id}`);

  const columns = [
    {
      key: "sender",
      header: "Yuboruvchi",
      headerClassName: th,
      cell: (n) => <span className="whitespace-nowrap">{senderName(n)}</span>,
    },
    {
      key: "category",
      header: "Kategoriya",
      headerClassName: th,
      cell: (n) => <CategoryBadge category={n.category} />,
    },
    {
      key: "audience",
      header: "Auditoriya",
      headerClassName: th,
      cell: (n) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {AUDIENCE_TYPE_LABEL[n.audience?.type] || "-"}
        </span>
      ),
    },
    {
      key: "text",
      header: "Matn",
      headerClassName: th,
      className: "max-w-[280px]",
      cell: (n) => (
        <div
          className="truncate"
          title={(n.title ? `${n.title}: ` : "") + n.body}
        >
          {n.title && <span className="font-medium">{n.title}: </span>}
          <span className="text-muted-foreground">{n.body}</span>
        </div>
      ),
    },
    {
      key: "channels",
      header: "Kanal",
      headerClassName: th,
      cell: (n) => <ChannelBadge channels={n.channels} />,
    },
    {
      key: "recipients",
      header: "Qabul",
      headerClassName: `${th} !text-right`,
      className: "text-right tabular-nums",
      cell: (n) => n.recipientsCount || 0,
    },
    {
      key: "bot",
      header: "Bot",
      headerClassName: `${th} !text-right`,
      className: "text-right tabular-nums text-sky-600",
      cell: (n) => n.deliveredViaBot || 0,
    },
    {
      key: "read",
      header: "O'qilgan",
      headerClassName: `${th} !text-right`,
      className: "text-right tabular-nums text-emerald-700",
      cell: (n) => n.readCount || 0,
    },
    {
      key: "status",
      header: "Holat",
      headerClassName: th,
      cell: (n) => (
        <NotificationStatusBadge status={n.status} isAuto={n.isAuto} />
      ),
    },
    {
      key: "date",
      header: "Sana",
      headerClassName: th,
      cell: (n) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {formatDateUz(n.scheduleAt || n.sentAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      headerClassName: th,
      className: "text-right",
      cell: (n) => (
        <div className="flex items-center justify-end gap-1">
          {n.status === "scheduled" && onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onCancel(n);
              }}
            >
              <XCircle className="size-4" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              open(n);
            }}
          >
            <Eye className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  const renderCard = (n) => (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <CategoryBadge category={n.category} />
        <NotificationStatusBadge status={n.status} isAuto={n.isAuto} />
      </div>
      <p className="text-sm">
        {n.title && <span className="font-medium">{n.title}: </span>}
        <span className="text-muted-foreground line-clamp-2">{n.body}</span>
      </p>
      <ChannelBadge channels={n.channels} />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>{senderName(n)}</span>
        <span>{AUDIENCE_TYPE_LABEL[n.audience?.type]}</span>
        <span>{formatDateUz(n.scheduleAt || n.sentAt)}</span>
      </div>
      <div className="flex items-center gap-4 border-t pt-2 text-xs">
        <span>
          Qabul: <strong>{n.recipientsCount || 0}</strong>
        </span>
        <span className="text-sky-600">Bot: {n.deliveredViaBot || 0}</span>
        <span className="text-emerald-700">O'qilgan: {n.readCount || 0}</span>
      </div>
    </div>
  );

  return (
    <DataTable
      columns={columns}
      rows={items}
      isLoading={isLoading}
      onRowClick={open}
      renderCard={renderCard}
      empty={
        <EmptyState
          icon={MessageSquare}
          title="Xabarlar topilmadi"
          description="Hozircha bu filtrlarga mos xabar yo'q. Yangi xabar yuborib ko'ring."
        />
      }
    />
  );
};

export default NotificationsTable;
