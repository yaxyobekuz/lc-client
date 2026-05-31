import { Link, useParams } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";

import Button from "@/shared/components/ui/button/Button";
import BackLink from "@/shared/components/ui/link/BackLink";
import Card from "@/shared/components/ui/card/Card";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useModal from "@/shared/hooks/useModal";
import useGoBack from "@/shared/hooks/useGoBack";

import InvoiceStatusBadge from "../components/InvoiceStatusBadge";
import PaymentsTable from "../components/PaymentsTable";

import PaymentRecordModal from "../components/modals/PaymentRecordModal";
import PaymentRefundModal from "../components/modals/PaymentRefundModal";
import InvoiceCancelModal from "../components/modals/InvoiceCancelModal";
import InvoiceEditModal from "../components/modals/InvoiceEditModal";

import useInvoiceQuery from "../hooks/useInvoiceQuery";
import { MODAL } from "@/shared/constants/modals";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";

const formatPeriod = (p) => {
  if (!p) return "-";
  return `${String(p.month).padStart(2, "0")}.${p.year}`;
};

const InvoiceDetailPage = () => {
  const { id } = useParams();
  const { openModal } = useModal();
  const goBack = useGoBack("/owner/payments");
  const { data: invoice, isLoading, isError } = useInvoiceQuery(id);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
    );
  }
  if (isError || !invoice) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Hisob topilmadi</p>
        <button
          type="button"
          onClick={goBack}
          className="text-primary hover:underline cursor-pointer"
        >
          Orqaga
        </button>
      </div>
    );
  }

  const remaining = Math.max(0, invoice.totalDue - invoice.paidAmount);
  const isOpen = invoice.status !== "cancelled";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <BackLink to="/owner/payments" />
          <h1 className="text-2xl font-semibold">
            Hisob {formatPeriod(invoice.period)}
          </h1>
          <InvoiceStatusBadge status={invoice.status} />
        </div>

        <div className="flex items-center gap-2">
          {isOpen && remaining > 0 && (
            <Button
              onClick={() => openModal(MODAL.PAYMENT_RECORD, { invoice })}
            >
              <Plus className="size-4" />
              To'lov yozish
            </Button>
          )}
          {isOpen && (
            <Button
              variant="outline"
              onClick={() => openModal(MODAL.INVOICE_EDIT, { invoice })}
            >
              <Pencil className="size-4" />
              Tahrirlash
            </Button>
          )}
          {isOpen && (
            <Button
              variant="outline"
              className="text-rose-500"
              onClick={() => openModal(MODAL.INVOICE_CANCEL, { invoice })}
            >
              <Trash2 className="size-4" />
              Bekor qilish
            </Button>
          )}
        </div>
      </div>

      <Card className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">O'quvchi</p>
          <Link
            to={`/owner/users/${invoice.student?._id}`}
            className="font-medium hover:underline"
          >
            {invoice.student?.firstName} {invoice.student?.lastName}
          </Link>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Guruh</p>
          <Link
            to={`/owner/groups/${invoice.group?._id}`}
            className="font-medium hover:underline"
          >
            {invoice.group?.name || "-"}
          </Link>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">To'lov muddati</p>
          <p className="font-medium">{formatDateUz(invoice.dueDate)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Yaratilgan</p>
          <p className="font-medium">{formatDateUz(invoice.createdAt)}</p>
        </div>
      </Card>

      <Card className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Asosiy summa</p>
          <p className="text-lg font-semibold">{formatMoney(invoice.baseAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Chegirma</p>
          <p className="text-lg font-semibold text-sky-600">
            −{formatMoney(invoice.discountAmount)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">To'lash kerak</p>
          <p className="text-lg font-semibold">{formatMoney(invoice.totalDue)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Qoldiq</p>
          <p
            className={`text-lg font-semibold ${remaining > 0 ? "text-rose-500" : "text-emerald-600"}`}
          >
            {formatMoney(remaining)}
          </p>
        </div>
      </Card>

      {invoice.notes && (
        <Card>
          <p className="text-xs text-muted-foreground mb-1">Izoh</p>
          <p className="text-sm">{invoice.notes}</p>
        </Card>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-2">To'lovlar</h2>
        <PaymentsTable
          items={invoice.payments || []}
          showStudent={false}
        />
      </div>

      <ModalWrapper name={MODAL.PAYMENT_RECORD} title="To'lov yozish">
        <PaymentRecordModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.PAYMENT_REFUND} title="To'lovni qaytarish">
        <PaymentRefundModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.INVOICE_EDIT} title="Hisobni tahrirlash">
        <InvoiceEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.INVOICE_CANCEL} title="Hisobni bekor qilish">
        <InvoiceCancelModal />
      </ModalWrapper>
    </div>
  );
};

export default InvoiceDetailPage;
