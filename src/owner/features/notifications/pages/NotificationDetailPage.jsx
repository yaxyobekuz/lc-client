import { useParams } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";
import BackLink from "@/shared/components/ui/link/BackLink";
import useGoBack from "@/shared/hooks/useGoBack";
import { formatDateUz } from "@/shared/utils/formatDate";
import { AUDIENCE_TYPE_LABEL } from "@/shared/constants/notification";

import CategoryBadge from "../components/CategoryBadge";
import RecipientsTable from "../components/RecipientsTable";
import {
  useNotificationDetailQuery,
  useNotificationRecipientsQuery,
} from "../hooks/useNotificationDetailQuery";

const InfoRow = ({ label, children }) => (
  <div className="flex justify-between gap-3 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{children || "-"}</span>
  </div>
);

const NotificationDetailPage = () => {
  const { id } = useParams();
  const goBack = useGoBack("/owner/notifications");
  const { data: notif, isLoading } = useNotificationDetailQuery(id);
  const { data: recipientsData } = useNotificationRecipientsQuery(id, {
    limit: 200,
  });
  const recipients = recipientsData?.data || [];

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Yuklanmoqda...
      </div>
    );
  }
  if (!notif) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Xabar topilmadi</p>
        <button
          type="button"
          onClick={goBack}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Bildirishnomalarga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-3 flex-wrap">
        <BackLink to="/owner/notifications" />
        <h1 className="text-2xl font-semibold">{notif.title || "Xabar"}</h1>
        <CategoryBadge category={notif.category} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="space-y-2 lg:col-span-2">
          <h3 className="font-semibold">Xabar matni</h3>
          <p className="whitespace-pre-wrap text-sm">{notif.body}</p>
          {notif.template && (
            <p className="text-xs text-muted-foreground">
              Shablon: {notif.template.name}
            </p>
          )}
        </Card>

        <Card className="space-y-2">
          <h3 className="font-semibold">Ma'lumot</h3>
          <InfoRow label="Yuboruvchi">
            {notif.sender
              ? `${notif.sender.firstName} ${notif.sender.lastName}`
              : "Tizim"}
          </InfoRow>
          <InfoRow label="Auditoriya turi">
            {AUDIENCE_TYPE_LABEL[notif.audience?.type]}
          </InfoRow>
          <InfoRow label="Yuborilgan sana">
            {formatDateUz(notif.sentAt)}
          </InfoRow>
          <InfoRow label="Avto-yuborilgan">
            {notif.isAuto ? "Ha" : "Yo'q"}
          </InfoRow>
        </Card>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <Card>
          <p className="text-sm text-muted-foreground">Qabul qiluvchilar</p>
          <p className="text-2xl font-semibold">{notif.recipientsCount || 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Bot orqali yetkazib berildi</p>
          <p className="text-2xl font-semibold text-blue-600">
            {notif.deliveredViaBot || 0}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">O'qilgan</p>
          <p className="text-2xl font-semibold text-green-600">
            {notif.readCount || 0}
          </p>
        </Card>
      </div>

      <RecipientsTable items={recipients} />
    </div>
  );
};

export default NotificationDetailPage;
