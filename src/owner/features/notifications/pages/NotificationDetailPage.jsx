import { useParams } from "react-router-dom";
import { Users, Send, BookOpenCheck } from "lucide-react";
import Card from "@/shared/components/ui/card/Card";
import StatCard from "@/shared/components/ui/card/StatCard";
import BackLink from "@/shared/components/ui/link/BackLink";
import Skeleton from "@/shared/components/ui/feedback/Skeleton";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import useGoBack from "@/shared/hooks/useGoBack";
import { formatDateTimeUz } from "@/shared/utils/formatDate";
import {
  AUDIENCE_TYPE_LABEL,
  fillSampleVariables,
} from "@/shared/constants/notification";

import CategoryBadge from "../components/CategoryBadge";
import ChannelBadge from "../components/ChannelBadge";
import NotificationStatusBadge from "../components/NotificationStatusBadge";
import RecipientsTable from "../components/RecipientsTable";
import {
  useNotificationDetailQuery,
  useNotificationRecipientsQuery,
} from "../hooks/useNotificationDetailQuery";

const InfoRow = ({ label, children }) => (
  <div className="flex items-start justify-between gap-3 py-1.5 text-sm">
    <span className="shrink-0 text-muted-foreground">{label}</span>
    <span className="text-right font-medium">{children || "-"}</span>
  </div>
);

const audienceTargets = (notif) => {
  const a = notif.audience;
  if (!a) return null;
  if (a.type === "groups" && a.groupIds?.length)
    return a.groupIds.map((g) => g.name).join(", ");
  if (
    (a.type === "users" || a.type === "individual") &&
    a.userIds?.length
  )
    return a.userIds
      .map((u) => `${u.firstName} ${u.lastName}`)
      .join(", ");
  return null;
};

const NotificationDetailPage = () => {
  const { id } = useParams();
  const goBack = useGoBack("/owner/notifications");
  const { data: notif, isLoading } = useNotificationDetailQuery(id);
  const { data: recipientsData, isLoading: recLoading } =
    useNotificationRecipientsQuery(id, { limit: 200 });
  const recipients = recipientsData?.data || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-64" />
        <div className="grid gap-3 lg:grid-cols-3">
          <Skeleton className="h-40 lg:col-span-2" />
          <Skeleton className="h-40" />
        </div>
        <Skeleton className="h-60" />
      </div>
    );
  }

  if (!notif) {
    return (
      <EmptyState
        title="Xabar topilmadi"
        description="So'ralgan xabar mavjud emas yoki o'chirilgan."
        action={
          <button
            type="button"
            onClick={goBack}
            className="text-primary hover:underline"
          >
            Bildirishnomalarga qaytish
          </button>
        }
      />
    );
  }

  const targets = audienceTargets(notif);

  return (
    <div className="space-y-5">
      {/* Header */}
      <header className="flex flex-wrap items-center gap-3">
        <BackLink to="/owner/notifications" />
        <h1 className="text-2xl font-semibold">{notif.title || "Xabar"}</h1>
        <CategoryBadge category={notif.category} />
        <NotificationStatusBadge status={notif.status} isAuto={notif.isAuto} />
      </header>

      {/* Matn + Meta */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="space-y-3 lg:col-span-2">
          <h3 className="font-semibold">Xabar matni</h3>
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {fillSampleVariables(notif.body)}
          </p>
          {notif.template && (
            <p className="text-xs text-muted-foreground">
              Shablon asosida:{" "}
              <span className="font-medium">{notif.template.name}</span>
            </p>
          )}
        </Card>

        <Card className="space-y-1">
          <h3 className="mb-1 font-semibold">Ma'lumot</h3>
          <InfoRow label="Yuboruvchi">
            {notif.sender
              ? `${notif.sender.firstName} ${notif.sender.lastName}`
              : "Tizim"}
          </InfoRow>
          <InfoRow label="Auditoriya">
            {AUDIENCE_TYPE_LABEL[notif.audience?.type]}
          </InfoRow>
          {targets && <InfoRow label="Maqsad">{targets}</InfoRow>}
          <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
            <span className="text-muted-foreground">Kanallar</span>
            <ChannelBadge channels={notif.channels} />
          </div>
          <InfoRow label={notif.status === "scheduled" ? "Rejalashtirilgan" : "Yuborilgan"}>
            {formatDateTimeUz(notif.scheduleAt || notif.sentAt)}
          </InfoRow>
          <InfoRow label="Avto-yuborilgan">
            {notif.isAuto ? "Ha" : "Yo'q"}
          </InfoRow>
        </Card>
      </div>

      {/* Stat kartalar */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label="Qabul qiluvchilar"
          value={notif.recipientsCount || 0}
          icon={Users}
        />
        <StatCard
          label="Bot orqali yetkazildi"
          value={notif.deliveredViaBot || 0}
          icon={Send}
          tone="info"
        />
        <StatCard
          label="O'qilgan"
          value={notif.readCount || 0}
          icon={BookOpenCheck}
          tone="positive"
        />
      </div>

      {/* Qabul qiluvchilar */}
      <div className="space-y-2">
        <h3 className="font-semibold">Qabul qiluvchilar</h3>
        <RecipientsTable items={recipients} isLoading={recLoading} />
      </div>
    </div>
  );
};

export default NotificationDetailPage;
