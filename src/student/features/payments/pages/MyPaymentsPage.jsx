import Card from "@/shared/components/ui/card/Card";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import useMeQuery from "@/features/auth/hooks/useMeQuery";

import MyInvoicesTable from "../components/MyInvoicesTable";
import MyPaymentsTable from "../components/MyPaymentsTable";
import useMyInvoicesQuery from "../hooks/useMyInvoicesQuery";
import useMyPaymentsQuery from "../hooks/useMyPaymentsQuery";

import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";

const MyPaymentsPage = () => {
  const { data: me } = useMeQuery();
  const profile = me?.profile;
  const studentId = profile?._id;
  const summary = profile?.paymentSummary;

  const { data: invoices, isLoading: invLoading } = useMyInvoicesQuery(studentId);
  const { data: payments, isLoading: payLoading } = useMyPaymentsQuery(studentId);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">To'lovlarim</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card>
          <p className="text-sm text-muted-foreground">Joriy qarz</p>
          <p className="text-2xl font-semibold text-red-600">
            {formatMoney(summary?.currentDebt || 0)}
          </p>
          {summary?.openInvoicesCount > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {summary.openInvoicesCount} ta ochiq hisob
            </p>
          )}
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Jami to'langan</p>
          <p className="text-2xl font-semibold text-green-600">
            {formatMoney(summary?.totalPaid || 0)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Oxirgi to'lov</p>
          <p className="text-base font-medium">
            {summary?.lastPaymentAt ? formatDateUz(summary.lastPaymentAt) : "-"}
          </p>
        </Card>
      </div>

      <TabsButtons
        items={[
          {
            value: "invoices",
            label: "Hisoblar",
            content: (
              <div className="pt-3">
                {invLoading ? (
                  <div className="p-4 text-sm text-muted-foreground">
                    Yuklanmoqda...
                  </div>
                ) : (
                  <MyInvoicesTable items={invoices?.data || []} />
                )}
              </div>
            ),
          },
          {
            value: "payments",
            label: "To'lov tarixi",
            content: (
              <div className="pt-3">
                {payLoading ? (
                  <div className="p-4 text-sm text-muted-foreground">
                    Yuklanmoqda...
                  </div>
                ) : (
                  <MyPaymentsTable items={payments?.data || []} />
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default MyPaymentsPage;
