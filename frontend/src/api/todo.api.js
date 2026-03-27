import api from "./axios";

export const getTodoApi = async (params) => {
  const res = await api.get("/todos", { params });
  return res.data;
};

export const createTodoApi = async (payload) => {
  const res = await api.post("/todos", payload);
  return res.data;
};

export const updateTodoApi = async (id, payload) => {
  const resp = await api.put(`/todos/${id}`, payload);
  return resp.data;
};

export const deleteTodoApi = async (id) => {
  const resp = await api.delete(`todos/${id}`);
  return resp.data;
};
