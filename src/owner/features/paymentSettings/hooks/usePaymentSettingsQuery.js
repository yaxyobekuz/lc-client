import { useQuery } from "@tanstack/react-query";
import { paymentSettingsAPI } from "../api/paymentSettings.api";
import { qk } from "@/shared/lib/query/keys";

const usePaymentSettingsQuery = () =>
  useQuery({
    queryKey: qk.paymentSettings.one(),
    queryFn: () => paymentSettingsAPI.get().then((r) => r.data.data),
  });

export default usePaymentSettingsQuery;
