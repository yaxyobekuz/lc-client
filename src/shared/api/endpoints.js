export const ENDPOINTS = Object.freeze({
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
    updateMe: "/auth/me",
    changePassword: "/auth/change-password",
    registerUser: "/auth/register-user",
  },
  users: {
    base: "/users",
    byId: (id) => `/users/${id}`,
    groupHistory: (id) => `/users/${id}/group-history`,
  },
  leadSources: {
    base: "/lead-sources",
    byId: (id) => `/lead-sources/${id}`,
  },
  students: {
    base: "/students",
    byId: (id) => `/students/${id}`,
  },
  teachers: {
    base: "/teachers",
    byId: (id) => `/teachers/${id}`,
  },
  classes: {
    base: "/classes",
    byId: (id) => `/classes/${id}`,
  },
  groups: {
    base: "/groups",
    byId: (id) => `/groups/${id}`,
    students: (id) => `/groups/${id}/students`,
    studentById: (id, sid) => `/groups/${id}/students/${sid}`,
    transfer: (id, sid) => `/groups/${id}/students/${sid}/transfer`,
    history: (id) => `/groups/${id}/history`,
    myActive: "/groups/me/active",
    myTeach: "/groups/me/teach",
  },

  // Payments subsystem
  paymentMethods: {
    base: "/payment-methods",
    byId: (id) => `/payment-methods/${id}`,
  },
  discountKinds: {
    base: "/discount-kinds",
    byId: (id) => `/discount-kinds/${id}`,
  },
  discounts: {
    base: "/discounts",
    byId: (id) => `/discounts/${id}`,
  },
  invoices: {
    base: "/invoices",
    byId: (id) => `/invoices/${id}`,
    cancel: (id) => `/invoices/${id}/cancel`,
    generateMonth: "/invoices/generate-month",
  },
  payments: {
    base: "/payments",
    byId: (id) => `/payments/${id}`,
    refund: (id) => `/payments/${id}/refund`,
    receipt: (id) => `/payments/${id}/receipt`,
  },
  paymentSettings: {
    base: "/payment-settings",
  },
  paymentReports: {
    summary: "/payment-reports/summary",
    groupStats: "/payment-reports/group-stats",
    topDebtors: "/payment-reports/top-debtors",
    topPayers: "/payment-reports/top-payers",
    monthlyTrend: "/payment-reports/monthly-trend",
    daily: "/payment-reports/daily",
  },

  // Attendance subsystem
  attendance: {
    base: "/attendance",
    groupOnDate: (gid) => `/attendance/groups/${gid}`,
    bulk: (gid) => `/attendance/groups/${gid}/bulk`,
    studentMonthly: (sid) => `/attendance/students/${sid}/monthly`,
    studentSummary: (sid) => `/attendance/students/${sid}/summary`,
    groupSummary: (gid) => `/attendance/groups/${gid}/summary`,
    groupMonthly: (gid) => `/attendance/groups/${gid}/monthly`,
    teacherSummary: "/attendance/teacher/me/summary",
    dashboard: "/attendance/dashboard",
    correlation: "/attendance/correlation",
  },
  attendanceExemptions: {
    base: "/attendance-exemptions",
    byId: (id) => `/attendance-exemptions/${id}`,
  },
  attendanceSettings: {
    base: "/attendance-settings",
  },

  // Salaries subsystem
  salaries: {
    base: "/salaries",
    byId: (id) => `/salaries/${id}`,
    payouts: (id) => `/salaries/${id}/payouts`,
    calculate: "/salaries/calculate",
    recompute: (id) => `/salaries/${id}/recompute`,
    approve: (id) => `/salaries/${id}/approve`,
    cancel: (id) => `/salaries/${id}/cancel`,
    adjustments: (id) => `/salaries/${id}/adjustments`,
    adjustmentById: (id, adjId) => `/salaries/${id}/adjustments/${adjId}`,
    payoutById: (payoutId) => `/salaries/payouts/${payoutId}`,
    dashboard: "/salaries/dashboard",
    trend: "/salaries/trend",
    myCurrent: "/salaries/teacher/me/current",
    myHistory: "/salaries/teacher/me",
  },
  teacherGroupRates: {
    base: "/teacher-group-rates",
    byId: (id) => `/teacher-group-rates/${id}`,
  },
  salarySettings: {
    base: "/salary-settings",
  },

  // Leads (CRM) subsystem
  leads: {
    base: "/leads",
    byId: (id) => `/leads/${id}`,
    status: (id) => `/leads/${id}/status`,
    notes: (id) => `/leads/${id}/notes`,
    contacts: (id) => `/leads/${id}/contacts`,
    followUp: (id) => `/leads/${id}/follow-up`,
    trial: (id) => `/leads/${id}/trial`,
    convert: (id) => `/leads/${id}/convert`,
    dashboard: "/leads/dashboard",
    sourcePerformance: "/leads/source-performance",
    todayReminders: "/leads/reminders/today",
    overdueReminders: "/leads/reminders/overdue",
  },
  leadDirections: {
    base: "/lead-directions",
    byId: (id) => `/lead-directions/${id}`,
  },
  leadStatuses: {
    base: "/lead-statuses",
    byId: (id) => `/lead-statuses/${id}`,
  },
  leadSettings: {
    base: "/lead-settings",
  },

  // Notifications + Feedback (Bo'lak 7)
  notifications: {
    base: "/notifications",
    byId: (id) => `/notifications/${id}`,
    recipients: (id) => `/notifications/${id}/recipients`,
    inbox: "/notifications/inbox",
    unreadCount: "/notifications/inbox/unread-count",
    markRead: (id) => `/notifications/inbox/${id}/read`,
    markAllRead: "/notifications/inbox/read-all",
    stats: "/notifications/stats",
  },
  notificationTemplates: {
    base: "/notification-templates",
    byId: (id) => `/notification-templates/${id}`,
  },
  holidays: {
    base: "/holidays",
    byId: (id) => `/holidays/${id}`,
  },
  feedback: {
    base: "/feedback",
    byId: (id) => `/feedback/${id}`,
    me: "/feedback/me",
    stats: "/feedback/stats",
    review: (id) => `/feedback/${id}/review`,
    reply: (id) => `/feedback/${id}/reply`,
    resolve: (id) => `/feedback/${id}/resolve`,
    reject: (id) => `/feedback/${id}/reject`,
  },
  feedbackTypes: {
    base: "/feedback-types",
    byId: (id) => `/feedback-types/${id}`,
  },

  // Admin dashboard / Expenses / Activity logs (Bo'lak 9)
  expenses: {
    base: "/expenses",
    byId: (id) => `/expenses/${id}`,
    stats: "/expenses/stats",
  },
  activityLogs: {
    base: "/activity-logs",
    byId: (id) => `/activity-logs/${id}`,
    stats: "/activity-logs/stats",
  },
  adminDashboard: {
    overview: "/admin-dashboard/overview",
    monthlyFinancials: "/admin-dashboard/monthly-financials",
    incomeByDirection: "/admin-dashboard/income-by-direction",
    incomeByTeacher: "/admin-dashboard/income-by-teacher",
    studentFlow: "/admin-dashboard/student-flow",
    forecast: "/admin-dashboard/forecast",
  },
});
