import Badge from "@/shared/components/ui/badge/Badge";
import { CALCULATION_TYPE_LABEL } from "@/shared/constants/salary";

const CalculationTypeBadge = ({ type }) => {
  if (!type) return null;
  return (
    <Badge variant="outline">{CALCULATION_TYPE_LABEL[type] || type}</Badge>
  );
};

export default CalculationTypeBadge;
