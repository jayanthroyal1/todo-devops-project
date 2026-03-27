import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../features/todos/todoSlice";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";

const EditTodoModal = ({ isOpen, onClose, todo }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (todo) {
      setForm({
        title: todo.title || "",
        description: todo.description || "",
        status: todo.status || "pending",
      });
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateTodo({
          id: todo._id,
          data: form,
        }),
      ).unwrap();

      toast.success("Todo updated");
      onClose();
    } catch (error) {
      toast.error(error || "Failed to update todo");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Todo">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Todo title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          rows="4"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoModal;
