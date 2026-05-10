import { useQuery } from "@tanstack/react-query";
import { leadsAPI } from "../api/leads.api";
import { qk } from "@/shared/lib/query/keys";

export const useLeadDashboardQuery = (params = {}) =>
  useQuery({
    queryKey: qk.leads.dashboard(params),
    queryFn: () => leadsAPI.dashboard(params).then((r) => r.data.data),
  });

export const useSourcePerformanceQuery = (params = {}) =>
  useQuery({
    queryKey: qk.leads.sourcePerformance(params),
    queryFn: () =>
      leadsAPI.sourcePerformance(params).then((r) => r.data.data),
  });

export const useTodayRemindersQuery = () =>
  useQuery({
    queryKey: qk.leads.todayReminders(),
    queryFn: () => leadsAPI.todayReminders().then((r) => r.data.data),
  });

export const useOverdueRemindersQuery = () =>
  useQuery({
    queryKey: qk.leads.overdueReminders(),
    queryFn: () => leadsAPI.overdueReminders().then((r) => r.data.data),
  });
