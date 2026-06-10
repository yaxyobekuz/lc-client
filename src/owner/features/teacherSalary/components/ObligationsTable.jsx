import DataTable from "@/shared/components/ui/table/DataTable";
import { formatMoney } from "@/shared/utils/formatMoney";

const ObligationsTable = ({ rows = [], isLoading }) => {
  const columns = [
    {
      key: "teacher",
      header: "O'qituvchi",
      headerClassName: "px-4 py-2.5 text-left text-xs font-medium text-muted-foreground",
      cell: (r) => (
        <span className="font-medium">
          {r.teacher?.firstName} {r.teacher?.lastName}
        </span>
      ),
    },
    {
      key: "group",
      header: "Guruh",
      headerClassName: "px-4 py-2.5 text-left text-xs font-medium text-muted-foreground",
      cell: (r) => r.group?.name || "-",
    },
    {
      key: "expected",
      header: "Kutilgan",
      headerClassName: "px-4 py-2.5 text-left text-xs font-medium text-muted-foreground",
      cell: (r) => formatMoney(r.expectedAmount || 0),
    },
    {
      key: "paid",
      header: "To'langan",
      headerClassName: "px-4 py-2.5 text-left text-xs font-medium text-muted-foreground",
      cell: (r) => <span className="text-emerald-600">{formatMoney(r.paidAmount || 0)}</span>,
    },
    {
      key: "remaining",
      header: "Qoldiq",
      headerClassName: "px-4 py-2.5 text-left text-xs font-medium text-muted-foreground",
      cell: (r) => <span className="font-semibold text-rose-600">{formatMoney(r.remaining || 0)}</span>,
    },
  ];

  const renderCard = (r) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-medium">
          {r.teacher?.firstName} {r.teacher?.lastName}
        </span>
        <span className="font-semibold text-rose-600">{formatMoney(r.remaining || 0)}</span>
      </div>
      <p className="text-xs text-muted-foreground">{r.group?.name}</p>
      <p className="text-xs text-muted-foreground">
        {formatMoney(r.paidAmount || 0)} / {formatMoney(r.expectedAmount || 0)}
      </p>
    </div>
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      rowKey={(r) => r._id}
      renderCard={renderCard}
    />
  );
};

export default ObligationsTable;
