import Badge from "@/shared/components/ui/badge/Badge";

const STATUS_LABEL = {
  unpaid: "To'lanmagan",
  partial: "Qisman",
  paid: "To'langan",
  cancelled: "Bekor qilingan",
};

const STATUS_CLASS = {
  unpaid: "bg-rose-100 text-rose-600",
  partial: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-slate-100 text-slate-500",
};

const InvoiceStatusBadge = ({ status }) => (
  <Badge className={STATUS_CLASS[status] || ""}>
    {STATUS_LABEL[status] || status}
  </Badge>
);

export default InvoiceStatusBadge;
