export { default as FeedbackTypesListPage } from "./pages/FeedbackTypesListPage";
export { feedbackTypesAPI } from "./api/feedbackTypes.api";
export { default as useFeedbackTypesQuery } from "./hooks/useFeedbackTypesQuery";
export {
  useFeedbackTypeCreateMutation,
  useFeedbackTypeUpdateMutation,
  useFeedbackTypeRemoveMutation,
} from "./hooks/useFeedbackTypeMutations";
