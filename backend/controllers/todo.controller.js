const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../services/todo.service");
const Todo = require("../models/Todo");
const { getCacheKey, clearCache } = require("../utils/cache");
const redis = require("../config/redis");

const create = async (req, res) => {
  try {
    const todo = await createTodo(req.body, req.user.id);
    await clearCache(req.user.id);
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

    const cacheKey = getCacheKey(req.user.id, req.query);

    const cacheData = await redis.get(cacheKey);
    if (cacheData) {
      console.log("⚡ CACHE HIT");
      return res.status(200).json(JSON.parse(cacheData));
    }
    console.log("🐢 CACHE MISS → DB HIT");

    console.time("getTodos-Start");
    const todos = await getTodo(query)
      .sort({ [sort]: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Todo.countDocuments(query);
    console.timeEnd("getTodos-End");
    const response = {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: todos,
    };

    // 🔥 3. STORE IN CACHE (TTL: 60 sec)
    await redis.set(cacheKey, JSON.stringify(response), "Ex", 60);

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const todo = await updateTodo(req.params.id, req.body, req.user.id);
    await clearCache(req.user.id);
    res.status(200).json(todo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await deleteTodo(req.params.id, req.user.id);
    await clearCache(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { create, getAll, update, remove };
