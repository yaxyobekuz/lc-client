import Card from "@/shared/components/ui/card/Card";
import LeadStatusBadge from "@/shared/components/lead/LeadStatusBadge";
import {
  HISTORY_TYPE_LABEL,
  HISTORY_TYPE_ICON,
  HISTORY_TYPE_COLOR,
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
        <ul className="space-y-3">
          {reversed.map((h) => {
            const Icon = HISTORY_TYPE_ICON[h.type];
            const colorClass =
              HISTORY_TYPE_COLOR[h.type] || "text-slate-600 bg-slate-50";
            return (
              <li key={String(h._id)} className="flex gap-3">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${colorClass}`}
                >
                  {Icon ? <Icon className="size-4" /> : null}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm flex-wrap">
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
                    <p className="text-sm text-muted-foreground mt-1">
                      {h.message}
                    </p>
                  )}
                  {h.createdBy && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {h.createdBy.firstName} {h.createdBy.lastName}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
};

export default LeadHistoryList;
