import api from "./axios";

export const getTodoApi = async (params) => {
  const res = await api.get("/todos", { params });
  return res.data;
};

export const createTodoApi = async (data) => {
  const res = await api.post("/todos", data);
  return res.data;
};

export const updateTodoApi = async (id, data) => {
  const res = await api.put(`/todos/${id}`, data);
  return res.data;
};

export const deleteTodoApi = async (id) => {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
};
