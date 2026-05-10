import { useQuery } from "@tanstack/react-query";
import { discountKindsAPI } from "../api/discountKinds.api";
import { qk } from "@/shared/lib/query/keys";

const useDiscountKindsQuery = (params) =>
  useQuery({
    queryKey: qk.discountKinds.list(params),
    queryFn: () => discountKindsAPI.list(params).then((r) => r.data),
  });

export default useDiscountKindsQuery;
