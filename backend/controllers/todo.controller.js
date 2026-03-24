const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../services/todo.service");

const create = async (req, res) => {
  console.log("CREATE TODO HIT");
  console.log("BODY:", req.body);
  console.log("USER:", req.user);
  try {
    console.time("Create Todos-Start");
    const todo = await createTodo(req.body, req.user.id);
    console.timeEnd("Create Todos-End");
    console.log("todo Create response", todo);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    console.time("getTodos-Start");
    const todos = await getTodo(req.user.id);
    console.timeEnd("getTodos-End");
    res.status(201).json(todos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const todo = await updateTodo(req.params.id, req.body, req.user.id);
    res.status(200).json(todo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    console.log("Req Params", req.params);
    console.log("Req User", req.user);
    const result = await deleteTodo(req.params.id, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { create, getAll, update, remove };
