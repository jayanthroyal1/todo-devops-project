const Todo = require("../models/Todo");

const createTodo = async (data, userId) => {
  return await Todo.create({
    ...data,
    user: userId,
  });
};

const getTodo = async (userId) => {
  return await Todo.find({ user: userId }).sort({ createdAt: -1 });
};

// const updateTodo = async (id, data, userId) => {
//   const todo = await Todo.findOne({ _id: id, user: userId });

//   if (!todo) throw new Error("Todo not found");
//   Object.assign(todo, data);

//   return await todo.save();
// };

const updateTodo = async (id, data, userId) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    { new: true }, // return updated doc
  );

  if (!todo) throw new Error("Todo not found");

  return todo;
};

const deleteTodo = async (id, userId) => {
  console.log("ID from Serveice", id);
  console.log("UserID from Serveice", userId);
  const todo = await Todo.findOne({ _id: id, user: userId });
  if (!todo) return new Error("Todo not found");
  await todo.deleteOne();
  return { message: "Todo deleted" };
};
module.exports = {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
