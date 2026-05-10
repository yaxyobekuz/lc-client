import Badge from "@/shared/components/ui/badge/Badge";
import {
  CATEGORY_LABEL,
  CATEGORY_BADGE_CLASS,
  CATEGORY_EMOJI,
} from "@/shared/constants/notification";

const CategoryBadge = ({ category }) => {
  if (!category) return null;
  return (
    <Badge className={CATEGORY_BADGE_CLASS[category] || ""}>
      <span className="mr-1">{CATEGORY_EMOJI[category]}</span>
      {CATEGORY_LABEL[category] || category}
    </Badge>
  );
};

export default CategoryBadge;
