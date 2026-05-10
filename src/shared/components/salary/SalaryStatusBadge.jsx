import Badge from "@/shared/components/ui/badge/Badge";
import {
  SALARY_STATUS_LABEL,
  SALARY_STATUS_BADGE_CLASS,
} from "@/shared/constants/salary";

const SalaryStatusBadge = ({ status }) => {
  if (!status) {
    return (
      <Badge variant="outline" className="text-muted-foreground">
        —
      </Badge>
    );
  }
  return (
    <Badge className={SALARY_STATUS_BADGE_CLASS[status] || ""}>
      {SALARY_STATUS_LABEL[status] || status}
    </Badge>
  );
};

export default SalaryStatusBadge;
