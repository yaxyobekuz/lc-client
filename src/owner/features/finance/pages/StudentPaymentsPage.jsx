import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import StudentPaymentsPanel from "../components/StudentPaymentsPanel";
import StudentObligationsPanel from "../components/StudentObligationsPanel";

const StudentPaymentsPage = () => {
  const items = [
    {
      value: "payments",
      label: "To'lovlar",
      content: <StudentPaymentsPanel />,
    },
    {
      value: "debtors",
      label: "Qarzdorlar",
      content: <StudentObligationsPanel />,
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">O'quvchi to'lovlari</h1>
      <TabsButtons items={items} />
    </div>
  );
};

export default StudentPaymentsPage;
