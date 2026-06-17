import { Outlet } from "react-router-dom";
import TabsLinks from "@/shared/components/ui/tabs/TabsLinks";
import usePermissions from "@/shared/hooks/usePermissions";

const BASE = "/owner/finance/teacher-salaries";

// Layout: tab kontenti route darajasida (Outlet). Tablar - TabsLinks (NavLink).
const TeacherSalariesPage = () => {
  const { has } = usePermissions();

  const items = [
    { to: BASE, label: "Maoshlar", exact: true },
    { to: `${BASE}/berilishi-kerak`, label: "Berilishi kerak" },
  ];
  // Maosh sozlamalari - faqat salary.manage huquqi borlarga.
  if (has("salary.manage")) {
    items.push({ to: `${BASE}/sozlamalar`, label: "Sozlamalar" });
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">O'qituvchi maoshlari</h1>
      <TabsLinks items={items} />
      <Outlet />
    </div>
  );
};

export default TeacherSalariesPage;
