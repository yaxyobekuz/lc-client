import { useQuery } from "@tanstack/react-query";
import { leadDirectionsAPI } from "../api/leadDirections.api";
import { qk } from "@/shared/lib/query/keys";

const useLeadDirectionsQuery = (params) =>
  useQuery({
    queryKey: qk.leadDirections.list(params),
    queryFn: () => leadDirectionsAPI.list(params).then((r) => r.data),
  });

export default useLeadDirectionsQuery;
