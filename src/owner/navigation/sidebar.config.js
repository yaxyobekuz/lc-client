import {
  Users,
  GraduationCap,
  Settings,
  Wallet,
  CalendarCheck,
  HandCoins,
  TrendingUp,
  Bell,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const ownerSidebar = [
  {
    title: "Boshqaruv paneli",
    icon: BarChart3,
    isActive: true,
    items: [
      {
        title: "Bosh sahifa",
        url: "/owner/dashboard",
        permission: "admin_dashboard.read",
      },
    ],
  },
  {
    title: "Boshqaruv",
    icon: GraduationCap,
    isActive: true,
    items: [
      {
        title: "Guruhlar",
        url: "/owner/groups",
        permission: "groups.read",
      },
      {
        title: "Foydalanuvchilar",
        url: "/owner/users",
        permission: "users.read",
      },
      {
        title: "Lead manbalari",
        url: "/owner/lead-sources",
        permission: "lead_sources.manage",
      },
    ],
  },
  {
    title: "Davomat",
    icon: CalendarCheck,
    isActive: true,
    items: [
      {
        title: "Davomat belgilash",
        url: "/owner/attendance/mark",
        permission: "attendance.record",
      },
      {
        title: "Hisobotlar",
        url: "/owner/attendance",
        permission: "attendance.read",
      },
      {
        title: "Davomat-To'lov",
        url: "/owner/attendance/correlation",
        permission: "attendance.read",
      },
    ],
  },
  {
    title: "Moliya",
    icon: Wallet,
    isActive: true,
    items: [
      {
        title: "To'lovlar",
        url: "/owner/payments",
        permission: "payments.read",
      },
      {
        title: "To'lov usullari",
        url: "/owner/payment-methods",
        permission: "payment_methods.manage",
      },
      {
        title: "Chegirma turlari",
        url: "/owner/discount-kinds",
        permission: "discount_kinds.manage",
      },
      {
        title: "Xarajatlar",
        url: "/owner/expenses",
        permission: "expenses.read",
      },
    ],
  },
  {
    title: "Maoshlar",
    icon: HandCoins,
    isActive: true,
    items: [
      {
        title: "Maoshlar",
        url: "/owner/salaries",
        permission: "salaries.read",
      },
      {
        title: "Hisobotlar",
        url: "/owner/salaries/dashboard",
        permission: "salaries.read",
      },
    ],
  },
  {
    title: "CRM",
    icon: TrendingUp,
    isActive: true,
    items: [
      {
        title: "Lidlar",
        url: "/owner/leads",
        permission: "leads.read",
      },
      {
        title: "Hisobotlar",
        url: "/owner/leads/dashboard",
        permission: "leads.read",
      },
      {
        title: "Yo'nalishlar",
        url: "/owner/lead-directions",
        permission: "lead_directions.manage",
      },
      {
        title: "Lid statuslari",
        url: "/owner/lead-statuses",
        permission: "lead_statuses.manage",
      },
    ],
  },
  {
    title: "Aloqa",
    icon: Bell,
    isActive: true,
    items: [
      {
        title: "Inbox",
        url: "/owner/inbox",
      },
      {
        title: "Xabarlar",
        url: "/owner/notifications",
        permission: "notifications.read",
      },
      {
        title: "Hisobotlar",
        url: "/owner/notifications/dashboard",
        permission: "notifications.read",
      },
      {
        title: "Shablonlar",
        url: "/owner/notification-templates",
        permission: "notification_templates.manage",
      },
      {
        title: "Bayramlar",
        url: "/owner/holidays",
        permission: "holidays.manage",
      },
      {
        title: "Feedback",
        url: "/owner/feedback",
        permission: "feedback.read",
      },
      {
        title: "Feedback hisoboti",
        url: "/owner/feedback/dashboard",
        permission: "feedback.read",
      },
      {
        title: "Feedback turlari",
        url: "/owner/feedback-types",
        permission: "feedback_types.manage",
      },
    ],
  },
  {
    title: "Audit",
    icon: ShieldCheck,
    isActive: true,
    items: [
      {
        title: "Faoliyat loglari",
        url: "/owner/activity-logs",
        permission: "activity_logs.read",
      },
    ],
  },
  {
    title: "Sozlamalar",
    icon: Settings,
    items: [
      {
        title: "To'lov sozlamalari",
        url: "/owner/settings/payments",
        permission: "payment_settings.manage",
      },
      {
        title: "Davomat sozlamalari",
        url: "/owner/settings/attendance",
        permission: "attendance.manage",
      },
      {
        title: "Maosh sozlamalari",
        url: "/owner/settings/salaries",
        permission: "salaries.manage",
      },
      {
        title: "Lid sozlamalari",
        url: "/owner/settings/leads",
        permission: "leads.update",
      },
    ],
  },
  {
    title: "Hisob",
    icon: Users,
    items: [
      {
        title: "Profil",
        url: "/owner/profile",
      },
    ],
  },
];

export default ownerSidebar;
