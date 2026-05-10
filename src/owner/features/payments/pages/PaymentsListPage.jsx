import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useModal from "@/shared/hooks/useModal";

import CurrentMonthTab from "../components/tabs/CurrentMonthTab";
import HistoryTab from "../components/tabs/HistoryTab";
import ReportsTab from "../components/tabs/ReportsTab";

import MonthGenerateModal from "../components/modals/MonthGenerateModal";
import PaymentRecordModal from "../components/modals/PaymentRecordModal";
import PaymentRefundModal from "../components/modals/PaymentRefundModal";
import InvoiceCancelModal from "../components/modals/InvoiceCancelModal";
import InvoiceEditModal from "../components/modals/InvoiceEditModal";

import { MODAL } from "@/shared/constants/modals";

const PaymentsListPage = () => {
  const { openModal } = useModal();

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">To'lovlar</h1>
        <Button onClick={() => openModal(MODAL.INVOICE_GENERATE_MONTH)}>
          <Plus className="size-4" />
          Oyni yaratish
        </Button>
      </header>

      <TabsButtons
        items={[
          {
            value: "current",
            label: "Joriy oy",
            content: <CurrentMonthTab />,
          },
          {
            value: "history",
            label: "Tarix",
            content: <HistoryTab />,
          },
          {
            value: "reports",
            label: "Hisobotlar",
            content: <ReportsTab />,
          },
        ]}
      />

      <ModalWrapper
        name={MODAL.INVOICE_GENERATE_MONTH}
        title="Oy uchun hisoblar yaratish"
      >
        <MonthGenerateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.PAYMENT_RECORD} title="To'lov yozish">
        <PaymentRecordModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.PAYMENT_REFUND} title="To'lovni qaytarish">
        <PaymentRefundModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.INVOICE_CANCEL} title="Hisobni bekor qilish">
        <InvoiceCancelModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.INVOICE_EDIT} title="Hisobni tahrirlash">
        <InvoiceEditModal />
      </ModalWrapper>
    </div>
  );
};

export default PaymentsListPage;
