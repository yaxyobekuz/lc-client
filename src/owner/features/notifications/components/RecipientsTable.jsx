import Badge from "@/shared/components/ui/badge/Badge";
import { formatDateUz } from "@/shared/utils/formatDate";

const RecipientsTable = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="border rounded-lg p-6 text-center text-muted-foreground">
        Qabul qiluvchilar topilmadi
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-3 py-2">Foydalanuvchi</th>
            <th className="px-3 py-2">Telefon</th>
            <th className="px-3 py-2">Bot yetkazib berildi</th>
            <th className="px-3 py-2">O'qilgan</th>
            <th className="px-3 py-2">Bot xato</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="px-3 py-2">
                {r.user
                  ? `${r.user.firstName} ${r.user.lastName}`
                  : "—"}
              </td>
              <td className="px-3 py-2 text-muted-foreground">
                {r.user?.phone || "—"}
              </td>
              <td className="px-3 py-2">
                {r.botDeliveredAt ? (
                  <Badge className="bg-green-100 text-green-700">
                    {formatDateUz(r.botDeliveredAt)}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    —
                  </Badge>
                )}
              </td>
              <td className="px-3 py-2">
                {r.readAt ? (
                  <Badge className="bg-blue-100 text-blue-700">
                    {formatDateUz(r.readAt)}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    O'qilmagan
                  </Badge>
                )}
              </td>
              <td className="px-3 py-2 text-xs text-red-600">
                {r.botFailedReason || ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipientsTable;
