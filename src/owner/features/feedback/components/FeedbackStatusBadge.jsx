import Badge from "@/shared/components/ui/badge/Badge";
import {
  FEEDBACK_STATUS_LABEL,
  FEEDBACK_STATUS_BADGE_CLASS,
} from "@/shared/constants/feedback";

const FeedbackStatusBadge = ({ status }) => {
  if (!status) return null;
  return (
    <Badge className={FEEDBACK_STATUS_BADGE_CLASS[status] || ""}>
      {FEEDBACK_STATUS_LABEL[status] || status}
    </Badge>
  );
};

export default FeedbackStatusBadge;
