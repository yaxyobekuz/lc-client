// Central registry of TanStack Query keys - extend here when adding a feature
export const qk = Object.freeze({
  auth: {
    me: () => ["auth", "me"],
  },
  users: {
    all: () => ["users"],
    list: (params) => ["users", "list", params],
    one: (id) => ["users", "detail", id],
    password: (id) => ["users", "password", id],
    groupHistory: (id, params) => ["users", id, "group-history", params],
  },
  leadSources: {
    all: () => ["leadSources"],
    list: (params) => ["leadSources", "list", params],
    one: (id) => ["leadSources", "detail", id],
  },
  students: {
    all: () => ["students"],
    list: (params) => ["students", "list", params],
    one: (id) => ["students", "detail", id],
  },
  teachers: {
    all: () => ["teachers"],
    list: (params) => ["teachers", "list", params],
    one: (id) => ["teachers", "detail", id],
  },
  classes: {
    all: () => ["classes"],
    list: (params) => ["classes", "list", params],
    one: (id) => ["classes", "detail", id],
  },
  groups: {
    all: () => ["groups"],
    list: (params) => ["groups", "list", params],
    one: (id) => ["groups", "detail", id],
    history: (id, params) => ["groups", id, "history", params],
    myActive: () => ["groups", "me", "active"],
    myTeach: () => ["groups", "me", "teach"],
  },

  // Payments subsystem
  paymentMethods: {
    all: () => ["paymentMethods"],
    list: (params) => ["paymentMethods", "list", params],
    one: (id) => ["paymentMethods", "detail", id],
  },
  discountKinds: {
    all: () => ["discountKinds"],
    list: (params) => ["discountKinds", "list", params],
    one: (id) => ["discountKinds", "detail", id],
  },
  discounts: {
    all: () => ["discounts"],
    list: (params) => ["discounts", "list", params],
    byStudent: (studentId) => ["discounts", "byStudent", studentId],
  },
  invoices: {
    all: () => ["invoices"],
    list: (params) => ["invoices", "list", params],
    one: (id) => ["invoices", "detail", id],
    byStudent: (studentId) => ["invoices", "byStudent", studentId],
  },
  payments: {
    all: () => ["payments"],
    list: (params) => ["payments", "list", params],
    one: (id) => ["payments", "detail", id],
    receipt: (id) => ["payments", "receipt", id],
    byStudent: (studentId) => ["payments", "byStudent", studentId],
  },
  paymentSettings: {
    one: () => ["paymentSettings"],
  },
  paymentReports: {
    summary: (params) => ["paymentReports", "summary", params],
    groupStats: (params) => ["paymentReports", "groupStats", params],
    topDebtors: (params) => ["paymentReports", "topDebtors", params],
    topPayers: (params) => ["paymentReports", "topPayers", params],
    monthlyTrend: (params) => ["paymentReports", "monthlyTrend", params],
    daily: (params) => ["paymentReports", "daily", params],
  },

  // Attendance subsystem
  attendance: {
    all: () => ["attendance"],
    byGroupDate: (gid, date, slot = "") => [
      "attendance",
      "groupDate",
      gid,
      date,
      slot,
    ],
    studentMonthly: (sid, params) => ["attendance", "studentMonthly", sid, params],
    studentYearly: (sid, params) => ["attendance", "studentYearly", sid, params],
    studentSummary: (sid, params) => ["attendance", "studentSummary", sid, params],
    groupSummary: (gid, params) => ["attendance", "groupSummary", gid, params],
    groupMonthly: (gid, params) => ["attendance", "groupMonthly", gid, params],
    teacher: (gid, date) => ["attendance", "teacher", gid, date],
    teacherSummary: (params) => ["attendance", "teacherSummary", params],
    dashboard: (params) => ["attendance", "dashboard", params],
  },
  teacherAttendance: {
    all: () => ["teacherAttendance"],
    byDate: (date) => ["teacherAttendance", "date", date],
  },
  attendanceExemptions: {
    all: () => ["attendanceExemptions"],
    byStudent: (studentId) => ["attendanceExemptions", "byStudent", studentId],
    one: (id) => ["attendanceExemptions", "detail", id],
  },
  studentFreezes: {
    all: () => ["studentFreezes"],
    byStudent: (studentId) => ["studentFreezes", "byStudent", studentId],
  },
  attendanceSettings: {
    one: () => ["attendanceSettings"],
  },

  // Salaries subsystem
  salaries: {
    all: () => ["salaries"],
    list: (params) => ["salaries", "list", params],
    one: (id) => ["salaries", "detail", id],
    payouts: (id) => ["salaries", id, "payouts"],
    dashboard: (params) => ["salaries", "dashboard", params],
    dashboardTeachers: (params) => ["salaries", "dashboard", "teachers", params],
    trend: (params) => ["salaries", "trend", params],
    myCurrent: () => ["salaries", "me", "current"],
    myHistory: (params) => ["salaries", "me", "history", params],
  },
  teacherGroupRates: {
    all: () => ["teacherGroupRates"],
    list: (params) => ["teacherGroupRates", "list", params],
    one: (id) => ["teacherGroupRates", "detail", id],
    byTeacher: (tid) => ["teacherGroupRates", "byTeacher", tid],
  },
  salarySettings: {
    one: () => ["salarySettings"],
  },

  // Leads / CRM subsystem
  leads: {
    all: () => ["leads"],
    list: (params) => ["leads", "list", params],
    one: (id) => ["leads", "detail", id],
    dashboard: (params) => ["leads", "dashboard", params],
    sourcePerformance: (params) => ["leads", "sourcePerformance", params],
    todayReminders: () => ["leads", "reminders", "today"],
    overdueReminders: () => ["leads", "reminders", "overdue"],
  },
  leadDirections: {
    all: () => ["leadDirections"],
    list: (params) => ["leadDirections", "list", params],
    one: (id) => ["leadDirections", "detail", id],
  },
  leadStatuses: {
    all: () => ["leadStatuses"],
    list: (params) => ["leadStatuses", "list", params],
    one: (id) => ["leadStatuses", "detail", id],
  },
  leadSettings: {
    one: () => ["leadSettings"],
  },

  // Notifications + Feedback (Bo'lak 7)
  notifications: {
    all: () => ["notifications"],
    list: (params) => ["notifications", "list", params],
    one: (id) => ["notifications", "detail", id],
    recipients: (id, params) => ["notifications", id, "recipients", params],
    inbox: (params) => ["notifications", "inbox", params],
    unreadCount: () => ["notifications", "inbox", "unreadCount"],
    stats: (params) => ["notifications", "stats", params],
  },
  notificationTemplates: {
    all: () => ["notificationTemplates"],
    list: (params) => ["notificationTemplates", "list", params],
    one: (id) => ["notificationTemplates", "detail", id],
  },
  holidays: {
    all: () => ["holidays"],
    list: (params) => ["holidays", "list", params],
    one: (id) => ["holidays", "detail", id],
  },
  feedback: {
    all: () => ["feedback"],
    list: (params) => ["feedback", "list", params],
    one: (id) => ["feedback", "detail", id],
    me: (params) => ["feedback", "me", params],
    stats: (params) => ["feedback", "stats", params],
  },
  feedbackTypes: {
    all: () => ["feedbackTypes"],
    list: (params) => ["feedbackTypes", "list", params],
    one: (id) => ["feedbackTypes", "detail", id],
  },

  // Boshqaruv paneli (Bo'lak 9)
  expenses: {
    all: () => ["expenses"],
    list: (params) => ["expenses", "list", params],
    one: (id) => ["expenses", "detail", id],
    stats: (params) => ["expenses", "stats", params],
  },
  expenseTypes: {
    all: () => ["expenseTypes"],
    list: (params) => ["expenseTypes", "list", params],
    one: (id) => ["expenseTypes", "detail", id],
  },
  activityLogs: {
    all: () => ["activityLogs"],
    list: (params) => ["activityLogs", "list", params],
    one: (id) => ["activityLogs", "detail", id],
    stats: (params) => ["activityLogs", "stats", params],
  },
  adminDashboard: {
    overview: (params) => ["adminDashboard", "overview", params],
    monthlyFinancials: (params) => ["adminDashboard", "monthlyFinancials", params],
    incomeByDirection: (params) => ["adminDashboard", "incomeByDirection", params],
    incomeByTeacher: (params) => ["adminDashboard", "incomeByTeacher", params],
    studentFlow: (params) => ["adminDashboard", "studentFlow", params],
    forecast: () => ["adminDashboard", "forecast"],
  },
});
