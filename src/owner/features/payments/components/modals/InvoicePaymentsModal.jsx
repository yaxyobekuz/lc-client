import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import InvoiceStatusBadge from "../InvoiceStatusBadge";
import usePaymentsQuery from "../../hooks/usePaymentsQuery";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";

const formatPeriod = (p) =>
  p ? `${String(p.month).padStart(2, "0")}.${p.year}` : "-";

const SummaryRow = ({ label, children }) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-muted-foreground">{label}</span>
    {children}
  </div>
);

const PaymentItem = ({ payment }) => {
  const isRefund = payment.type === "refund";
  return (
    <div className="rounded-lg border p-3 space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">{formatDateUz(payment.paidAt)}</span>
        <span
          className={`tabular-nums font-semibold ${
            isRefund ? "text-rose-500" : "text-emerald-600"
          }`}
        >
          {isRefund ? "−" : ""}
          {formatMoney(payment.amount)}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="text-muted-foreground">
          To'lov usuli:{" "}
          <span className="text-foreground">{payment.method?.name || "-"}</span>
        </span>
        {isRefund ? (
          <Badge variant="outline" className="text-rose-500 border-rose-200">
            Qaytarilgan
          </Badge>
        ) : (
          <Badge className="bg-emerald-100 text-emerald-700">To'lov</Badge>
        )}
      </div>
      {payment.note && (
        <p className="text-xs">
          <span className="text-muted-foreground">Izoh:</span> {payment.note}
        </p>
      )}
      {isRefund && payment.refundReason && (
        <p className="text-xs">
          <span className="text-muted-foreground">Sabab:</span>{" "}
          {payment.refundReason}
        </p>
      )}
    </div>
  );
};

const InvoicePaymentsModal = ({ invoice, close }) => {
  const { data, isLoading } = usePaymentsQuery({
    invoiceId: invoice?._id,
    limit: 100,
  });
  const payments = data?.data || [];

  return (
    <div className="space-y-4">
      {/* Hisob xulosasi */}
      <div className="rounded-lg border bg-gray-50 p-3 space-y-1.5 text-sm">
        <SummaryRow label="Guruh">
          <span className="font-medium">{invoice?.group?.name || "-"}</span>
        </SummaryRow>
        <SummaryRow label="Davr">
          <span className="font-medium">{formatPeriod(invoice?.period)}</span>
        </SummaryRow>
        <SummaryRow label="To'lanishi kerak">
          <span className="font-medium tabular-nums">
            {formatMoney(invoice?.totalDue)}
          </span>
        </SummaryRow>
        <SummaryRow label="To'langan">
          <span className="font-medium tabular-nums text-emerald-600">
            {formatMoney(invoice?.paidAmount)}
          </span>
        </SummaryRow>
        <SummaryRow label="Holat">
          <InvoiceStatusBadge status={invoice?.status} />
        </SummaryRow>
      </div>

      {/* To'lovlar ro'yxati */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">To'lovlar</h4>
        {isLoading ? (
          <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
        ) : payments.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            Bu hisob uchun hali to'lov qilinmagan
          </div>
        ) : (
          <div className="max-h-[50vh] space-y-2 overflow-y-auto">
            {payments.map((p) => (
              <PaymentItem key={p._id} payment={p} />
            ))}
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => close?.()}
        className="w-full"
      >
        Yopish
      </Button>
    </div>
  );
};

export default InvoicePaymentsModal;
