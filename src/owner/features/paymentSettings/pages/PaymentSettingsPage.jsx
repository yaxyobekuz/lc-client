import PaymentSettingsForm from "../components/PaymentSettingsForm";
import usePaymentSettingsQuery from "../hooks/usePaymentSettingsQuery";

const PaymentSettingsPage = () => {
  const { data: settings, isLoading } = usePaymentSettingsQuery();

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 py-6">
      <h1 className="text-2xl font-semibold text-center">To'lov sozlamalari</h1>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <PaymentSettingsForm settings={settings} />
      )}
    </div>
  );
};

export default PaymentSettingsPage;
