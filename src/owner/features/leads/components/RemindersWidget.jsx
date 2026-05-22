import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/card/Card";
import LeadStatusBadge from "@/shared/components/lead/LeadStatusBadge";
import { formatDateUz } from "@/shared/utils/formatDate";
import { formatPhone } from "@/shared/utils/formatPhone";

const Section = ({ title, items = [], emptyText, accentClass = "" }) => (
  <Card className="space-y-2">
    <h3 className={`font-semibold ${accentClass}`}>{title}</h3>
    {items.length === 0 ? (
      <p className="text-muted-foreground text-sm">{emptyText}</p>
    ) : (
      <ul className="space-y-2">
        {items.slice(0, 8).map((l) => (
          <li
            key={l._id}
            className="flex items-center justify-between gap-2 border-b last:border-0 pb-2 last:pb-0"
          >
            <div className="min-w-0">
              <Link
                to={`/owner/leads/${l._id}`}
                className="font-medium hover:underline"
              >
                {l.firstName} {l.lastName}
              </Link>
              <p className="text-xs text-muted-foreground">
                {formatPhone(l.phone) || l.phone} •{" "}
                {l.source?.name || "-"}
                {" • "}
                {formatDateUz(l.followUpDate)}
              </p>
            </div>
            <LeadStatusBadge status={l.status} />
          </li>
        ))}
      </ul>
    )}
    {items.length > 8 && (
      <p className="text-xs text-muted-foreground">
        Yana {items.length - 8} ta...
      </p>
    )}
  </Card>
);

const RemindersWidget = ({ todayItems = [], overdueItems = [] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
    <Section
      title="Bugungi eslatmalar"
      items={todayItems}
      emptyText="Bugun eslatma yo'q"
      accentClass="text-blue-700"
    />
    <Section
      title="Kechikkan eslatmalar"
      items={overdueItems}
      emptyText="Kechikkan yo'q"
      accentClass="text-red-700"
    />
  </div>
);

export default RemindersWidget;
