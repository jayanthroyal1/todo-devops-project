import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteTodo, updateTodo } from "../../features/todos/todoSlice";
import Button from "../common/Button";
import EditTodoModal from "./EditTodoModal";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const toggleStatus = async () => {
    try {
      await dispatch(
        updateTodo({
          id: todo._id,
          data: {
            status: todo.status === "completed" ? "pending" : "completed",
          },
        }),
      ).unwrap();

      toast.success("Todo status updated");
    } catch (error) {
      toast.error(error || "Failed to update status");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTodo(todo._id)).unwrap();
      toast.success("Todo deleted");
    } catch (error) {
      toast.error(error || "Failed to delete todo");
    }
  };

  return (
    <>
      <div className="rounded-2xl bg-white p-5 shadow transition hover:shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">{todo.title}</h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  todo.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {todo.status}
              </span>
            </div>

            <p className="mt-2 text-slate-600">
              {todo.description || "No description provided"}
            </p>

            <p className="mt-3 text-xs text-slate-400">
              Created: {new Date(todo.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="blue" onClick={toggleStatus}>
              Toggle
            </Button>

            <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
              Edit
            </Button>

            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      <EditTodoModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        todo={todo}
      />
    </>
  );
};

export default TodoCard;
