import http from "@/shared/api/http";

export const botAuthAPI = {
  verify: (initData) => http.post("/bot-auth/verify", { initData }),
};
