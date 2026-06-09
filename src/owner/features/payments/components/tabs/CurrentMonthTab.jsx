import { useEffect, useState } from "react";
import Card from "@/shared/components/ui/card/Card";
import { useTopDebtorsQuery, useDailyCollectionsQuery } from "../../hooks/useReportsQueries";
import useInvoiceQuery from "../../hooks/useInvoiceQuery";
import DebtorsTable from "../DebtorsTable";
import { formatMoney } from "@/shared/utils/formatMoney";
import { toDateInput } from "@/shared/utils/formatDate";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const CurrentMonthTab = () => {
  const { data: debtors = [] } = useTopDebtorsQuery({ limit: 30 });
  const { data: today } = useDailyCollectionsQuery({
    date: toDateInput(new Date()),
  });

  // "To'lash" bosilgan qarzdorning eng eski hisobini yuklab, tayyor bo'lgach
  // modalni ochamiz. Modal (PAYMENT_RECORD) PaymentsListPage'da render qilingan.
  const { openModal } = useModal();
  const [payTarget, setPayTarget] = useState(null);
  const { data: invoice, isFetching: invLoading } = useInvoiceQuery(
    payTarget?.invoiceId,
  );

  // Hisob yuklanib bo'lgach modalni ochamiz (async tashqi tizim bilan sinxronlash)
  useEffect(() => {
    if (payTarget && invoice && invoice._id === payTarget.invoiceId) {
      openModal(MODAL.PAYMENT_RECORD, { invoice });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPayTarget(null);
    }
  }, [payTarget, invoice, openModal]);

  const handlePay = (debtor) => {
    if (!debtor.oldestOpenInvoiceId) return;
    setPayTarget({
      studentId: debtor.studentId,
      invoiceId: debtor.oldestOpenInvoiceId,
    });
  };

  return (
    <div className="space-y-4 pt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="bg-emerald-50 border-transparent">
          <p className="text-sm text-muted-foreground">Bugun yig'ilgan</p>
          <p className="text-2xl font-semibold text-emerald-600">
            {formatMoney(today?.total || 0)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {today?.paymentsCount || 0} ta to'lov
          </p>
        </Card>
        <Card className="bg-rose-50 border-transparent">
          <p className="text-sm text-muted-foreground">Jami qarz</p>
          <p className="text-2xl font-semibold text-rose-500">
            {formatMoney(debtors.reduce((s, d) => s + d.debt, 0))}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {debtors.length} ta qarzdor
          </p>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Qarzdorlar ro'yxati</h2>
        <DebtorsTable
          items={debtors}
          onPay={handlePay}
          payingId={invLoading ? payTarget?.studentId : null}
        />
      </div>
    </div>
  );
};

export default CurrentMonthTab;
