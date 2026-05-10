import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useReceiptQuery from "../hooks/useReceiptQuery";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";
import { formatPhone } from "@/shared/utils/formatPhone";

const formatPeriod = (p) => {
  if (!p) return "—";
  return `${String(p.month).padStart(2, "0")}.${p.year}`;
};

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between gap-3 py-1 text-sm border-b last:border-b-0 border-dashed">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value || "—"}</span>
  </div>
);

const ReceiptPage = () => {
  const { paymentId } = useParams();
  const { data, isLoading, isError } = useReceiptQuery(paymentId);

  useEffect(() => {
    if (data) {
      const t = setTimeout(() => window.print(), 300);
      return () => clearTimeout(t);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Yuklanmoqda...
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chek topilmadi
      </div>
    );
  }

  const { centerName, payment, invoice, student, group, receivedBy, netPaid } =
    data;
  const remaining = Math.max(0, (invoice?.totalDue || 0) - netPaid);

  return (
    <>
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div className="min-h-screen bg-gray-50 print:bg-white py-6 px-4">
        <div className="max-w-md mx-auto bg-white border rounded-lg p-6 shadow-sm print:border-0 print:shadow-none">
          <div className="text-center border-b pb-3 mb-3">
            <h1 className="text-xl font-bold">{centerName}</h1>
            <p className="text-xs text-gray-500 mt-1">
              {payment.type === "refund" ? "Qaytarilgan to'lov" : "To'lov cheki"}
            </p>
          </div>

          <Row label="Chek raqami" value={String(payment._id).slice(-8)} />
          <Row label="Sana" value={formatDateUz(payment.paidAt)} />
          <Row
            label="Talaba"
            value={`${student?.firstName || ""} ${student?.lastName || ""}`.trim()}
          />
          <Row label="Telefon" value={formatPhone(student?.phone)} />
          <Row label="Guruh" value={group?.name} />
          <Row label="Davr" value={formatPeriod(invoice?.period)} />
          <Row label="To'lov usuli" value={payment.method?.name} />
          <Row
            label="Qabul qilgan"
            value={
              receivedBy
                ? `${receivedBy.firstName} ${receivedBy.lastName}`
                : "—"
            }
          />

          <div className="mt-4 pt-3 border-t">
            <div className="flex items-center justify-between text-base">
              <span className="font-semibold">
                {payment.type === "refund" ? "Qaytarilgan summa" : "To'langan summa"}
              </span>
              <span
                className={`font-bold text-lg ${payment.type === "refund" ? "text-red-600" : "text-green-600"}`}
              >
                {payment.type === "refund" ? "−" : ""}
                {formatMoney(payment.amount)}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Hisob jami:</span>
              <span>{formatMoney(invoice?.totalDue)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sof to'langan:</span>
              <span>{formatMoney(netPaid)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Qoldiq:</span>
              <span>{formatMoney(remaining)}</span>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Tashrifingiz uchun rahmat!
          </p>
        </div>

        <div className="no-print max-w-md mx-auto mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Chop etish
          </button>
        </div>
      </div>
    </>
  );
};

export default ReceiptPage;
