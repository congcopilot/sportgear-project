import httpClient from "../../../shared/services/httpClient";
import { API_PATHS } from "../../../shared/constants/apiPaths";

function extractError(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Có lỗi xảy ra. Vui lòng thử lại."
  );
}

export const profileApi = {
  async getProfile() {
    try {
      const { data } = await httpClient.get(API_PATHS.user.profile);
      return data;
    } catch (error) {
      throw new Error(extractError(error));
    }
  },

  async updateProfile(payload) {
    try {
      const { data } = await httpClient.put(API_PATHS.user.profile, payload);
      return data;
    } catch (error) {
      throw new Error(extractError(error));
    }
  }
};
