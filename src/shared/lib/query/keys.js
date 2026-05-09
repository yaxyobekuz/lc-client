// Central registry of TanStack Query keys — extend here when adding a feature
export const qk = Object.freeze({
  auth: {
    me: () => ["auth", "me"],
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
});
