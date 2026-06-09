import {
  Wallet,
  CalendarCheck,
  HandCoins,
  TrendingUp,
  Bell,
  MessageSquare,
  Receipt,
  LayoutDashboard,
  MonitorCog,
  Star,
} from "lucide-react";

const ownerSidebar = [
  {
    title: "Asosiy",
    icon: LayoutDashboard,
    isActive: false,
    items: [
      {
        title: "Bosh sahifa",
        url: "/owner/dashboard",
        permission: "admin_dashboard.read",
      },
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
    ],
  },

  {
    title: "Davomat",
    icon: CalendarCheck,
    isActive: false,
    items: [
      {
        title: "Belgilash",
        url: "/owner/attendance/mark",
        permission: "attendance.record",
      },
      {
        title: "O'qituvchilar",
        url: "/owner/attendance/teachers",
        permission: "attendance.record",
      },
      {
        title: "Hisobotlar",
        url: "/owner/attendance",
        permission: "attendance.read",
      },
      {
        title: "Sozlamalar",
        url: "/owner/settings/attendance",
        permission: "attendance.manage",
      },
    ],
  },
  {
    title: "Baholash",
    icon: Star,
    isActive: false,
    items: [
      {
        title: "Baholash",
        url: "/owner/grades",
        permission: "grades.record",
      },
      {
        title: "Reyting",
        url: "/owner/rating",
        permission: "rating.read",
      },
      {
        title: "Sozlamalar",
        url: "/owner/settings/rating",
        permission: "rating.manage",
      },
    ],
  },

  {
    title: "To'lovlar",
    icon: Wallet,
    isActive: false,
    items: [
      {
        title: "Asosiy",
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
        title: "Sozlamalar",
        url: "/owner/settings/payments",
        permission: "payment_settings.manage",
      },
    ],
  },

  {
    title: "Xarajatlar",
    icon: Receipt,
    isActive: false,
    items: [
      {
        title: "Asosiy",
        url: "/owner/expenses",
        permission: "expenses.read",
      },
      {
        title: "Xarajat turlari",
        url: "/owner/expense-types",
        permission: "expenses.manage",
      },
    ],
  },

  {
    title: "Maoshlar",
    icon: HandCoins,
    isActive: false,
    items: [
      {
        title: "Asosiy",
        url: "/owner/salaries",
        permission: "salaries.read",
      },
      {
        title: "Hisobotlar",
        url: "/owner/salaries/dashboard",
        permission: "salaries.read",
      },
      {
        title: "Sozlamalar",
        url: "/owner/settings/salaries",
        permission: "salaries.manage",
      },
    ],
  },

  {
    title: "Lidlar",
    icon: TrendingUp,
    isActive: false,
    items: [
      {
        title: "Asosiy",
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
        title: "Statuslar",
        url: "/owner/lead-statuses",
        permission: "lead_statuses.manage",
      },
      {
        title: "Manbalar",
        url: "/owner/lead-sources",
        permission: "lead_sources.manage",
      },
      {
        title: "Sozlamalar",
        url: "/owner/settings/leads",
        permission: "leads.update",
      },
    ],
  },

  {
    title: "Bildirishnomalar",
    icon: Bell,
    isActive: false,
    items: [
      {
        title: "Kelgan xabarlar",
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
    ],
  },

  {
    title: "Feedback",
    icon: MessageSquare,
    isActive: false,
    items: [
      {
        title: "Asosiy",
        url: "/owner/feedback",
        permission: "feedback.read",
      },
      {
        title: "Hisobotlar",
        url: "/owner/feedback/dashboard",
        permission: "feedback.read",
      },
      {
        title: "Turlari",
        url: "/owner/feedback-types",
        permission: "feedback_types.manage",
      },
    ],
  },

  {
    title: "Tizim",
    icon: MonitorCog,
    items: [
      {
        title: "Ega profili",
        url: "/owner/profile",
      },
      {
        title: "Faoliyat loglari",
        url: "/owner/activity-logs",
        permission: "activity_logs.read",
      },
    ],
  },
];

export default ownerSidebar;
