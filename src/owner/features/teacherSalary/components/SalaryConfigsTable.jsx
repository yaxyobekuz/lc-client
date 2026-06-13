import { Pencil } from "lucide-react";
import DataTable from "@/shared/components/ui/table/DataTable";
import Button from "@/shared/components/ui/button/Button";
import StatusBadge from "@/shared/components/ui/badge/StatusBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

// Maosh qoidasini o'qiladigan matnga aylantiradi.
const ruleText = (r) => {
  if (!r.configured) return "Belgilanmagan";
  if (r.salaryType === "percent") return `${r.percentRate}%`;
  if (r.salaryType === "fixed") return formatMoney(r.fixedAmount);
  return `${r.percentRate}% + ${formatMoney(r.fixedAmount)}`;
};

const SalaryConfigsTable = ({ rows = [], isLoading, empty }) => {
  const { openModal } = useModal();
  const open = (r) => openModal(MODAL.SALARY_CONFIG_EDIT, { config: r });

  const headerCls = "px-4 py-2.5 text-left text-xs font-medium text-muted-foreground";

  const columns = [
    {
      key: "teacher",
      header: "O'qituvchi",
      headerClassName: headerCls,
      cell: (r) => (
        <span className="font-medium">
          {r.teacher?.firstName} {r.teacher?.lastName}
        </span>
      ),
    },
    {
      key: "group",
      header: "Guruh",
      headerClassName: headerCls,
      cell: (r) => r.group?.name || "-",
    },
    {
      key: "rule",
      header: "Maosh qoidasi",
      headerClassName: headerCls,
      cell: (r) =>
        r.configured ? (
          <span className="font-semibold">{ruleText(r)}</span>
        ) : (
          <StatusBadge tone="warning">Belgilanmagan</StatusBadge>
        ),
    },
    {
      key: "actions",
      header: "",
      headerClassName: headerCls,
      className: "text-right",
      cell: (r) => (
        <Button size="sm" variant="outline" onClick={() => open(r)}>
          <Pencil className="size-3.5" />
          {r.configured ? "O'zgartirish" : "Belgilash"}
        </Button>
      ),
    },
  ];

  const renderCard = (r) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">
          {r.teacher?.firstName} {r.teacher?.lastName}
        </span>
        {r.configured ? (
          <span className="font-semibold">{ruleText(r)}</span>
        ) : (
          <StatusBadge tone="warning">Belgilanmagan</StatusBadge>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{r.group?.name}</p>
      <Button size="sm" variant="outline" className="w-full" onClick={() => open(r)}>
        <Pencil className="size-3.5" />
        {r.configured ? "O'zgartirish" : "Belgilash"}
      </Button>
    </div>
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      rowKey={(r) => `${r.teacher?._id}:${r.group?._id}`}
      renderCard={renderCard}
      empty={empty}
    />
  );
};

export default SalaryConfigsTable;
