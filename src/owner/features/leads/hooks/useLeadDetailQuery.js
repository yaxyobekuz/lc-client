import { useQuery } from "@tanstack/react-query";
import { leadsAPI } from "../api/leads.api";
import { qk } from "@/shared/lib/query/keys";

const useLeadDetailQuery = (id) =>
  useQuery({
    queryKey: qk.leads.one(id),
    queryFn: () => leadsAPI.byId(id).then((r) => r.data.data),
    enabled: !!id,
  });

export default useLeadDetailQuery;
