import { useQuery } from "@tanstack/react-query";
import { paymentMethodsAPI } from "../api/paymentMethods.api";
import { qk } from "@/shared/lib/query/keys";

const usePaymentMethodsQuery = (params) =>
  useQuery({
    queryKey: qk.paymentMethods.list(params),
    queryFn: () => paymentMethodsAPI.list(params).then((r) => r.data),
  });

export default usePaymentMethodsQuery;
