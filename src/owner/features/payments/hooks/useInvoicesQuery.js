import { useQuery } from "@tanstack/react-query";
import { invoicesAPI } from "../api/invoices.api";
import { qk } from "@/shared/lib/query/keys";

const useInvoicesQuery = (params) =>
  useQuery({
    queryKey: qk.invoices.list(params),
    queryFn: () => invoicesAPI.list(params).then((r) => r.data),
  });

export default useInvoicesQuery;
