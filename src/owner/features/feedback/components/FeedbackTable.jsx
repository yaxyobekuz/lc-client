import { Link } from "react-router-dom";
import FeedbackStatusBadge from "./FeedbackStatusBadge";
import { formatDateUz } from "@/shared/utils/formatDate";

const FeedbackTable = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Feedback topilmadi
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-3 py-2">Muallif</th>
            <th className="px-3 py-2">Tur</th>
            <th className="px-3 py-2">Guruh</th>
            <th className="px-3 py-2">Matn</th>
            <th className="px-3 py-2">Holat</th>
            <th className="px-3 py-2">Sana</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((f) => (
            <tr key={f._id} className="border-t">
              <td className="px-3 py-2">
                {f.isAnonymous || !f.author ? (
                  <span className="text-muted-foreground italic">Anonim</span>
                ) : (
                  `${f.author.firstName} ${f.author.lastName}`
                )}
              </td>
              <td className="px-3 py-2">{f.type?.name || "-"}</td>
              <td className="px-3 py-2 text-muted-foreground">
                {f.group?.name || "-"}
              </td>
              <td className="px-3 py-2 max-w-md truncate">{f.message}</td>
              <td className="px-3 py-2">
                <FeedbackStatusBadge status={f.status} />
              </td>
              <td className="px-3 py-2 text-muted-foreground">
                {formatDateUz(f.createdAt)}
              </td>
              <td className="px-3 py-2 text-right">
                <Link
                  to={`/owner/feedback/${f._id}`}
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

export default FeedbackTable;
