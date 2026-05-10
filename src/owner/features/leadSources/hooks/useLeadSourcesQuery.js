import { useQuery } from "@tanstack/react-query";
import { leadSourcesAPI } from "../api/leadSources.api";
import { qk } from "@/shared/lib/query/keys";

const useLeadSourcesQuery = (params) =>
  useQuery({
    queryKey: qk.leadSources.list(params),
    queryFn: () => leadSourcesAPI.list(params).then((r) => r.data),
  });

export default useLeadSourcesQuery;
