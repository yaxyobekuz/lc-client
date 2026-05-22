import { Link } from "react-router-dom";
import LeadStatusBadge from "@/shared/components/lead/LeadStatusBadge";
import { formatDateUz } from "@/shared/utils/formatDate";
import { formatPhone } from "@/shared/utils/formatPhone";

const isOverdue = (date) => {
  if (!date) return false;
  const d = new Date(date);
  const now = new Date();
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  return d.getTime() < today.getTime();
};

const LeadsTable = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Lidlar topilmadi
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-3 py-2">Ism</th>
            <th className="px-3 py-2">Telefon</th>
            <th className="px-3 py-2">Manba</th>
            <th className="px-3 py-2">Yo'nalish</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Mas'ul</th>
            <th className="px-3 py-2">Oxirgi bog'lanish</th>
            <th className="px-3 py-2">Eslatma</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((l) => (
            <tr key={l._id} className="border-t">
              <td className="px-3 py-2 font-medium">
                {l.firstName} {l.lastName}
              </td>
              <td className="px-3 py-2">{formatPhone(l.phone) || l.phone}</td>
              <td className="px-3 py-2">{l.source?.name || "-"}</td>
              <td className="px-3 py-2">{l.direction?.name || "-"}</td>
              <td className="px-3 py-2">
                <LeadStatusBadge status={l.status} />
              </td>
              <td className="px-3 py-2">
                {l.assignedTo
                  ? `${l.assignedTo.firstName} ${l.assignedTo.lastName}`
                  : "-"}
              </td>
              <td className="px-3 py-2 text-muted-foreground">
                {l.lastContactAt ? formatDateUz(l.lastContactAt) : "-"}
                {l.contactCount > 0 && (
                  <span className="ml-1 text-xs">({l.contactCount})</span>
                )}
              </td>
              <td className="px-3 py-2">
                {l.followUpDate ? (
                  <span
                    className={
                      isOverdue(l.followUpDate)
                        ? "text-red-600 font-medium"
                        : ""
                    }
                  >
                    {formatDateUz(l.followUpDate)}
                  </span>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-3 py-2 text-right">
                <Link
                  to={`/owner/leads/${l._id}`}
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

export default LeadsTable;
