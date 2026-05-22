import { Link } from "react-router-dom";
import CategoryBadge from "./CategoryBadge";
import { AUDIENCE_TYPE_LABEL } from "@/shared/constants/notification";
import { formatDateUz } from "@/shared/utils/formatDate";

const NotificationsTable = ({ items = [], inboxLink = "/owner/notifications" }) => {
  if (!items.length) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Xabarlar topilmadi
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-3 py-2">Yuboruvchi</th>
            <th className="px-3 py-2">Kategoriya</th>
            <th className="px-3 py-2">Auditoriya</th>
            <th className="px-3 py-2">Matn</th>
            <th className="px-3 py-2 text-right">Qabul</th>
            <th className="px-3 py-2 text-right">Bot</th>
            <th className="px-3 py-2 text-right">O'qilgan</th>
            <th className="px-3 py-2">Sana</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((n) => (
            <tr key={n._id} className="border-t">
              <td className="px-3 py-2">
                {n.sender
                  ? `${n.sender.firstName} ${n.sender.lastName}`
                  : "Tizim"}
              </td>
              <td className="px-3 py-2">
                <CategoryBadge category={n.category} />
              </td>
              <td className="px-3 py-2 text-muted-foreground">
                {AUDIENCE_TYPE_LABEL[n.audience?.type] || "-"}
              </td>
              <td className="px-3 py-2 max-w-md">
                <div className="truncate">
                  {n.title && <span className="font-medium">{n.title}: </span>}
                  {n.body}
                </div>
              </td>
              <td className="px-3 py-2 text-right">{n.recipientsCount || 0}</td>
              <td className="px-3 py-2 text-right text-blue-600">
                {n.deliveredViaBot || 0}
              </td>
              <td className="px-3 py-2 text-right text-green-700">
                {n.readCount || 0}
              </td>
              <td className="px-3 py-2 text-muted-foreground">
                {formatDateUz(n.sentAt)}
              </td>
              <td className="px-3 py-2 text-right">
                <Link
                  to={`${inboxLink}/${n._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ochish
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsTable;
