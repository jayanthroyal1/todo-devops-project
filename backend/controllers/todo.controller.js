const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../services/todo.service");
const Todo = require("../models/Todo");

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
    const {
      page = 1,
      limit = 10,
      search,
      status,
      sort = "createdAt",
    } = req.query;

    const query = {
      user: req.user.id,
    };

    //Search
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Filter
    if (status) {
      query.status = status;
    }

    console.time("getTodos-Start");
    const todos = await getTodo(query)
      .sort({ [sort]: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Todo.countDocuments(query);
    console.timeEnd("getTodos-End");
    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: todos,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server Error" });
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
