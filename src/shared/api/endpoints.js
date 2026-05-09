export const ENDPOINTS = Object.freeze({
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
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
});
