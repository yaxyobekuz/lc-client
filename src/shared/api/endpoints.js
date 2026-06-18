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
    password: (id) => `/users/${id}/password`,
    groupHistory: (id) => `/users/${id}/group-history`,
  },
  archiveReasons: {
    base: "/archive-reasons",
    byId: (id) => `/archive-reasons/${id}`,
    report: "/archive-reasons/report",
  },
  leads: {
    base: "/leads",
    byId: (id) => `/leads/${id}`,
    convert: (id) => `/leads/${id}/convert`,
    reminder: (id) => `/leads/${id}/reminder`,
    stats: "/leads/stats",
  },
  leadOptions: {
    base: "/lead-options",
    byId: (id) => `/lead-options/${id}`,
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
    removalNoticeSeen: "/groups/me/removal-notice/seen",
    teacherPeriods: (id) => `/groups/${id}/teacher-periods`,
    teacherPeriodById: (id, pid) => `/groups/${id}/teacher-periods/${pid}`,
  },


  // Attendance subsystem
  attendance: {
    base: "/attendance",
    groupOnDate: (gid) => `/attendance/groups/${gid}`,
    bulk: (gid) => `/attendance/groups/${gid}/bulk`,
    studentMonthly: (sid) => `/attendance/students/${sid}/monthly`,
    studentYearly: (sid) => `/attendance/students/${sid}/yearly`,
    studentSummary: (sid) => `/attendance/students/${sid}/summary`,
    groupSummary: (gid) => `/attendance/groups/${gid}/summary`,
    groupMonthly: (gid) => `/attendance/groups/${gid}/monthly`,
    teacher: (gid) => `/attendance/groups/${gid}/teacher`,
    teacherSummary: "/attendance/teacher/me/summary",
    dashboard: "/attendance/dashboard",
  },
  grades: {
    groupOnDate: (gid) => `/grades/groups/${gid}`,
    bulk: (gid) => `/grades/groups/${gid}/bulk`,
    groupSummary: (gid) => `/grades/groups/${gid}/summary`,
    studentSummary: (sid) => `/grades/students/${sid}/summary`,
  },
  rating: {
    leaderboard: "/grades/rating/leaderboard",
    settings: "/grades/rating/settings",
    studentRank: (sid) => `/grades/rating/students/${sid}`,
  },
  teacherAttendance: {
    base: "/teacher-attendance",
    bulk: "/teacher-attendance/bulk",
  },
  studentFreezes: {
    base: "/student-freezes",
    byId: (id) => `/student-freezes/${id}`,
  },
  attendanceExemptions: {
    base: "/attendance-exemptions",
    byId: (id) => `/attendance-exemptions/${id}`,
  },
  attendanceSettings: {
    base: "/attendance-settings",
  },

  // Notifications + Feedback (Bo'lak 7)
  notifications: {
    base: "/notifications",
    byId: (id) => `/notifications/${id}`,
    recipients: (id) => `/notifications/${id}/recipients`,
    preview: "/notifications/preview",
    cancel: (id) => `/notifications/${id}/cancel`,
    inbox: "/notifications/inbox",
    unreadCount: "/notifications/inbox/unread-count",
    markRead: (id) => `/notifications/inbox/${id}/read`,
    markAllRead: "/notifications/inbox/read-all",
  },
  // Tizim bildirishnomalari (, owner)
  systemNotifications: {
    base: "/system-notifications",
    unreadCount: "/system-notifications/unread-count",
    markRead: (id) => `/system-notifications/${id}/read`,
    markAllRead: "/system-notifications/read-all",
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

  // Admin dashboard / Activity logs (Bo'lak 9)
  activityLogs: {
    base: "/activity-logs",
    byId: (id) => `/activity-logs/${id}`,
    stats: "/activity-logs/stats",
  },
  adminDashboard: {
    overview: "/admin-dashboard/overview",
    studentFlow: "/admin-dashboard/student-flow",
    studentStats: "/admin-dashboard/student-stats",
    retention: "/admin-dashboard/retention",
    churnedStudents: "/admin-dashboard/churned-students",
  },

  // Finance (Moliya)
  finance: {
    groupFees: "/finance/group-fees",
    groupFeesByGroup: (gid) => `/finance/group-fees/group/${gid}`,
    studentPayments: "/finance/student-payments",
    studentObligations: "/finance/student-payments/obligations",
    studentPaymentById: (id) => `/finance/student-payments/${id}`,
    studentPaymentHistory: (studentId) =>
      `/finance/student-payments/by-student/${studentId}`,
    transactions: "/finance/transactions",
    transactionById: (id) => `/finance/transactions/${id}`,
    discounts: "/finance/discounts",
    discountById: (id) => `/finance/discounts/${id}`,
  },

  // Teacher salary (O'qituvchi maoshlari)
  teacherSalary: {
    salaries: "/teacher-salary/salaries",
    salaryById: (id) => `/teacher-salary/salaries/${id}`,
    salaryHistory: (teacherId) =>
      `/teacher-salary/salaries/by-teacher/${teacherId}`,
    myFinance: "/teacher-salary/me/finance",
    obligations: "/teacher-salary/obligations",
    transactions: "/teacher-salary/transactions",
    transactionById: (id) => `/teacher-salary/transactions/${id}`,
  },
});
