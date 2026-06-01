import PaymentSettingsForm from "../components/PaymentSettingsForm";
import usePaymentSettingsQuery from "../hooks/usePaymentSettingsQuery";

const PaymentSettingsPage = () => {
  const { data: settings, isLoading } = usePaymentSettingsQuery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">To'lov sozlamalari</h1>
        <p className="text-sm text-muted-foreground">
          To'lov muddati, Telegram eslatmalari va o'qituvchi kelmagan kun qoidalari
        </p>
      </div>

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
