export { default as SalariesListPage } from "./pages/SalariesListPage";
export { default as SalaryDetailPage } from "./pages/SalaryDetailPage";
export { default as SalariesDashboardPage } from "./pages/SalariesDashboardPage";
export { default as SalarySettingsPage } from "./pages/SalarySettingsPage";

export { salariesAPI } from "./api/salaries.api";
export { default as useSalariesQuery } from "./hooks/useSalariesQuery";
export { default as useSalaryDetailQuery } from "./hooks/useSalaryDetailQuery";
export { default as useSalaryPayoutsQuery } from "./hooks/useSalaryPayoutsQuery";
export { default as useSalaryDashboardQuery } from "./hooks/useSalaryDashboardQuery";
export { default as useSalaryTrendQuery } from "./hooks/useSalaryTrendQuery";
export {
  useCalculateSalariesMutation,
  useRecomputeSalaryMutation,
  useApproveSalaryMutation,
  useCancelSalaryMutation,
  useAddAdjustmentMutation,
  useRemoveAdjustmentMutation,
  useRecordPayoutMutation,
  useRemovePayoutMutation,
} from "./hooks/useSalaryMutations";
export {
  useSalarySettingsQuery,
  useSalarySettingsUpdateMutation,
} from "./hooks/useSalarySettingsQuery";

export { default as TeacherPicker } from "./components/TeacherPicker";
export { default as PeriodPicker } from "./components/PeriodPicker";
export { default as SalariesTable } from "./components/SalariesTable";
export { default as GroupBreakdownTable } from "./components/GroupBreakdownTable";
export { default as AdjustmentsList } from "./components/AdjustmentsList";
export { default as PayoutsList } from "./components/PayoutsList";
export { default as SalaryActionsBar } from "./components/SalaryActionsBar";

// Modallar (UserDetailPage'da reuse uchun)
export { default as AdjustmentAddModal } from "./components/modals/AdjustmentAddModal";
export { default as AdjustmentRemoveModal } from "./components/modals/AdjustmentRemoveModal";
export { default as PayoutAddModal } from "./components/modals/PayoutAddModal";
export { default as PayoutRemoveModal } from "./components/modals/PayoutRemoveModal";
export { default as RecomputeConfirmModal } from "./components/modals/RecomputeConfirmModal";
export { default as ApproveConfirmModal } from "./components/modals/ApproveConfirmModal";
export { default as CancelConfirmModal } from "./components/modals/CancelConfirmModal";
export { default as BulkCalculateModal } from "./components/modals/BulkCalculateModal";
