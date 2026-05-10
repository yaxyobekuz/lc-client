import { useQuery } from "@tanstack/react-query";
import { paymentReportsAPI } from "../api/paymentReports.api";
import { qk } from "@/shared/lib/query/keys";

export const useSummaryQuery = (params) =>
  useQuery({
    queryKey: qk.paymentReports.summary(params),
    queryFn: () => paymentReportsAPI.summary(params).then((r) => r.data.data),
    enabled: !!(params?.year && params?.month),
  });

export const useGroupStatsQuery = (params) =>
  useQuery({
    queryKey: qk.paymentReports.groupStats(params),
    queryFn: () => paymentReportsAPI.groupStats(params).then((r) => r.data.data),
    enabled: !!(params?.year && params?.month),
  });

export const useTopDebtorsQuery = (params) =>
  useQuery({
    queryKey: qk.paymentReports.topDebtors(params),
    queryFn: () => paymentReportsAPI.topDebtors(params).then((r) => r.data.data),
  });

export const useTopPayersQuery = (params) =>
  useQuery({
    queryKey: qk.paymentReports.topPayers(params),
    queryFn: () => paymentReportsAPI.topPayers(params).then((r) => r.data.data),
  });

export const useMonthlyTrendQuery = (params) =>
  useQuery({
    queryKey: qk.paymentReports.monthlyTrend(params),
    queryFn: () => paymentReportsAPI.monthlyTrend(params).then((r) => r.data.data),
  });

export const useDailyCollectionsQuery = (params) =>
  useQuery({
    queryKey: qk.paymentReports.daily(params),
    queryFn: () => paymentReportsAPI.daily(params).then((r) => r.data.data),
    enabled: !!params?.date,
  });
