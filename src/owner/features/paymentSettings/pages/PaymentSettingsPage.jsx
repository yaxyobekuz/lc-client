import PaymentSettingsForm from "../components/PaymentSettingsForm";
import usePaymentSettingsQuery from "../hooks/usePaymentSettingsQuery";

const PaymentSettingsPage = () => {
  const { data: settings, isLoading } = usePaymentSettingsQuery();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">To'lov sozlamalari</h1>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <PaymentSettingsForm settings={settings} />
      )}
    </div>
  );
};

export default PaymentSettingsPage;
