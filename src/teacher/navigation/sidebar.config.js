import {
  GraduationCap,
  User,
  CalendarCheck,
  HandCoins,
  Bell,
} from "lucide-react";

const teacherSidebar = [
  {
    title: "O'qituvchi paneli",
    icon: GraduationCap,
    isActive: true,
    items: [
      {
        title: "Mening guruhlarim",
        url: "/teacher/groups",
      },
      {
        title: "Davomat",
        url: "/teacher/attendance",
      },
      {
        title: "Baholash",
        url: "/teacher/grades",
      },
      {
        title: "Mening maoshlarim",
        url: "/teacher/salaries",
      },
    ],
  },
  {
    title: "Aloqa",
    icon: Bell,
    isActive: true,
    items: [
      {
        title: "Kelgan xabarlar",
        url: "/teacher/inbox",
      },
      {
        title: "Xabar yuborish",
        url: "/teacher/notifications",
      },
      {
        title: "Feedback",
        url: "/teacher/feedback",
      },
    ],
  },
  {
    title: "Hisob",
    icon: User,
    items: [
      {
        title: "Profil",
        url: "/teacher/profile",
      },
    ],
  },
];

export default teacherSidebar;
