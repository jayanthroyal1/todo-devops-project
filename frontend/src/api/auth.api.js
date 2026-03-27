import api from "./axios";

export const loginApi = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const registerApi = async (payload) => {
  const resp = await api.post("/auth/register", payload);
  return resp.data;
};

export const logoutApi = async () => {
  const resp = await api.post("/auth/logout");
  return resp.data;
};
