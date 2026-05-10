import Card from "@/shared/components/ui/card/Card";
import LeadStatusBadge from "@/shared/components/lead/LeadStatusBadge";
import {
  HISTORY_TYPE_LABEL,
  HISTORY_TYPE_EMOJI,
} from "@/shared/constants/lead";
import { formatDateUz } from "@/shared/utils/formatDate";

const formatTime = (d) => {
  if (!d) return "";
  const dd = new Date(d);
  if (Number.isNaN(dd.getTime())) return "";
  return dd.toLocaleString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const LeadHistoryList = ({ history = [] }) => {
  const reversed = [...history].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <Card className="space-y-3">
      <h3 className="font-semibold">Tarix</h3>
      {reversed.length === 0 ? (
        <p className="text-muted-foreground text-sm">Tarix bo'sh</p>
      ) : (
        <ul className="space-y-2">
          {reversed.map((h) => (
            <li
              key={String(h._id)}
              className="border-l-2 border-muted pl-3 py-1"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="text-base">
                  {HISTORY_TYPE_EMOJI[h.type] || "•"}
                </span>
                <span className="font-medium">
                  {HISTORY_TYPE_LABEL[h.type] || h.type}
                </span>
                {h.type === "status_change" && (
                  <span className="flex items-center gap-1">
                    <LeadStatusBadge status={h.fromStatus} />
                    <span className="text-muted-foreground">→</span>
                    <LeadStatusBadge status={h.toStatus} />
                  </span>
                )}
                <span className="ml-auto text-xs text-muted-foreground">
                  {formatDateUz(h.createdAt)} {formatTime(h.createdAt)}
                </span>
              </div>
              {h.message && (
                <p className="text-sm text-muted-foreground mt-1">{h.message}</p>
              )}
              {h.createdBy && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {h.createdBy.firstName} {h.createdBy.lastName}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default LeadHistoryList;
