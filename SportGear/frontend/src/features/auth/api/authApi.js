import httpClient from "../../../shared/services/httpClient";
import { API_PATHS } from "../../../shared/constants/apiPaths";

function extractError(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Có lỗi xảy ra. Vui lòng thử lại."
  );
}

export const authApi = {
  async register(payload) {
    try {
      const { data } = await httpClient.post(API_PATHS.auth.register, payload);
      return data;
    } catch (error) {
      throw new Error(extractError(error));
    }
  },

  async login(payload) {
    try {
      const { data } = await httpClient.post(API_PATHS.auth.login, payload);
      return data;
    } catch (error) {
      throw new Error(extractError(error));
    }
  },

  async forgotPassword(payload) {
    try {
      const { data } = await httpClient.post(API_PATHS.auth.forgotPassword, payload);
      return data;
    } catch (error) {
      throw new Error(extractError(error));
    }
  },

  async resetPassword(payload) {
    try {
      const { data } = await httpClient.post(API_PATHS.auth.resetPassword, payload);
      return data;
    } catch (error) {
      throw new Error(extractError(error));
    }
  }
};
