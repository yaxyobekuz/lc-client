import Badge from "@/shared/components/ui/badge/Badge";

const STATUS_LABEL = {
  unpaid: "To'lanmagan",
  partial: "Qisman",
  paid: "To'langan",
  cancelled: "Bekor qilingan",
};

const STATUS_CLASS = {
  unpaid: "bg-red-100 text-red-700",
  partial: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

const InvoiceStatusBadge = ({ status }) => (
  <Badge className={STATUS_CLASS[status] || ""}>
    {STATUS_LABEL[status] || status}
  </Badge>
);

export default InvoiceStatusBadge;
