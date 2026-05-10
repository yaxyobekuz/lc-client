import { useQuery } from "@tanstack/react-query";
import { leadStatusesAPI } from "../api/leadStatuses.api";
import { qk } from "@/shared/lib/query/keys";

const useLeadStatusesQuery = (params) =>
  useQuery({
    queryKey: qk.leadStatuses.list(params),
    queryFn: () => leadStatusesAPI.list(params).then((r) => r.data),
  });

export default useLeadStatusesQuery;
