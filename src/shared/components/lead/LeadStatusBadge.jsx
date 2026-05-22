import Badge from "@/shared/components/ui/badge/Badge";

const LeadStatusBadge = ({ status }) => {
  if (!status) {
    return (
      <Badge variant="outline" className="text-muted-foreground">
        -
      </Badge>
    );
  }
  const color = status.color || "#6366f1";
  return (
    <Badge
      className="text-white"
      style={{ backgroundColor: color, borderColor: color }}
    >
      {status.name}
    </Badge>
  );
};

export default LeadStatusBadge;
