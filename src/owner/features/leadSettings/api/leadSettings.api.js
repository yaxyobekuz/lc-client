import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const leadSettingsAPI = {
  get: () => http.get(ENDPOINTS.leadSettings.base),
  update: (body) => http.patch(ENDPOINTS.leadSettings.base, body),
};
