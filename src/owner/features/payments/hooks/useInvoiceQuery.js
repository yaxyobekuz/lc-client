import { useQuery } from "@tanstack/react-query";
import { invoicesAPI } from "../api/invoices.api";
import { qk } from "@/shared/lib/query/keys";

const useInvoiceQuery = (id) =>
  useQuery({
    queryKey: qk.invoices.one(id),
    queryFn: () => invoicesAPI.byId(id).then((r) => r.data.data),
    enabled: !!id,
  });

export default useInvoiceQuery;
