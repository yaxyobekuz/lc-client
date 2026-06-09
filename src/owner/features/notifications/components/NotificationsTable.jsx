import { useNavigate } from "react-router-dom";
import { Eye, XCircle, MessageSquare } from "lucide-react";
import DataTable from "@/shared/components/ui/table/DataTable";
import Button from "@/shared/components/ui/button/Button";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import { AUDIENCE_TYPE_LABEL } from "@/shared/constants/notification";
import { formatDateUz } from "@/shared/utils/formatDate";

import CategoryBadge from "./CategoryBadge";
import ChannelIcons from "./ChannelIcons";
import DeliveryStat from "./DeliveryStat";
import NotificationStatusBadge from "./NotificationStatusBadge";

const senderName = (n) =>
  n.sender ? `${n.sender.firstName} ${n.sender.lastName}` : "Tizim";

const th = "px-4 py-2 text-left text-xs font-medium text-muted-foreground";

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
      className: "py-2",
      cell: (n) => (
        <span className="whitespace-nowrap text-sm">{senderName(n)}</span>
      ),
    },
    {
      key: "category",
      header: "Kategoriya",
      headerClassName: th,
      className: "py-2",
      cell: (n) => <CategoryBadge category={n.category} />,
    },
    {
      key: "text",
      header: "Matn",
      headerClassName: th,
      className: "max-w-[320px] py-2",
      cell: (n) => (
        <div
          className="truncate text-sm"
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
      className: "py-2",
      cell: (n) => <ChannelIcons channels={n.channels} />,
    },
    {
      key: "delivery",
      header: "Yetkazish",
      headerClassName: th,
      className: "py-2",
      cell: (n) => (
        <DeliveryStat
          recipients={n.recipientsCount || 0}
          bot={n.deliveredViaBot || 0}
          read={n.readCount || 0}
        />
      ),
    },
    {
      key: "status",
      header: "Holat",
      headerClassName: th,
      className: "py-2",
      cell: (n) => (
        <NotificationStatusBadge status={n.status} isAuto={n.isAuto} />
      ),
    },
    {
      key: "date",
      header: "Sana",
      headerClassName: th,
      className: "py-2",
      cell: (n) => (
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {formatDateUz(n.scheduleAt || n.sentAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      headerClassName: th,
      className: "py-2 text-right",
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
      <div className="flex items-center justify-between gap-2 border-t pt-2">
        <ChannelIcons channels={n.channels} />
        <DeliveryStat
          recipients={n.recipientsCount || 0}
          bot={n.deliveredViaBot || 0}
          read={n.readCount || 0}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span>{senderName(n)}</span>
        <span>·</span>
        <span>{AUDIENCE_TYPE_LABEL[n.audience?.type]}</span>
        <span>·</span>
        <span>{formatDateUz(n.scheduleAt || n.sentAt)}</span>
      </div>
    </div>
  );

  return (
    <DataTable
      columns={columns}
      rows={items}
      isLoading={isLoading}
      onRowClick={open}
      rowClassName="border-b border-border/60 last:border-0"
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
