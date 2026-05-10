import Badge from "@/shared/components/ui/badge/Badge";
import {
  ADJUSTMENT_TYPE_LABEL,
  ADJUSTMENT_TYPE_BADGE_CLASS,
  ADJUSTMENT_TYPE_EMOJI,
} from "@/shared/constants/salary";

const AdjustmentTypeBadge = ({ type }) => {
  if (!type) return null;
  return (
    <Badge className={ADJUSTMENT_TYPE_BADGE_CLASS[type] || ""}>
      <span className="font-mono">{ADJUSTMENT_TYPE_EMOJI[type]}</span>{" "}
      {ADJUSTMENT_TYPE_LABEL[type] || type}
    </Badge>
  );
};

export default AdjustmentTypeBadge;
