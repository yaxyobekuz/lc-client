import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import usePermissions from "@/shared/hooks/usePermissions";
import TeacherSalariesPanel from "../components/TeacherSalariesPanel";
import TeacherObligationsPage from "./TeacherObligationsPage";
import SalaryConfigsPage from "./SalaryConfigsPage";

const TeacherSalariesPage = () => {
  const { has } = usePermissions();

  const items = [
    {
      value: "salaries",
      label: "Maoshlar",
      content: <TeacherSalariesPanel />,
    },
    {
      value: "obligations",
      label: "Berilishi kerak",
      content: <TeacherObligationsPage />,
    },
  ];

  // Maosh sozlamalari - faqat salary.manage huquqi borlarga.
  if (has("salary.manage")) {
    items.push({
      value: "settings",
      label: "Sozlamalar",
      content: <SalaryConfigsPage />,
    });
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">O'qituvchi maoshlari</h1>
      <TabsButtons items={items} />
    </div>
  );
};

export default TeacherSalariesPage;
