import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const paymentSettingsAPI = {
  get: () => http.get(ENDPOINTS.paymentSettings.base),
  update: (body) => http.patch(ENDPOINTS.paymentSettings.base, body),
};
