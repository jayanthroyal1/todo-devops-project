import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createTodo } from "../../features/todos/todoSlice";
import { uploadMultipleFilesApi } from "../../api/upload.api";
import AttachmentDropzone from "./AttachementDropZone";
import Button from "../common/Button";
import Input from "../common/Input";

const TodoForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return toast.error("Title is required");
    }

    try {
      setSubmitting(true);

      let attachments = [];

      // ✅ Upload files first
      if (files.length > 0) {
        const uploadedFiles = await uploadMultipleFilesApi(files);

        attachments = uploadedFiles.map((file) => ({
          fileUrl: file.fileUrl,
        }));
      }

      // ✅ Then create todo
      await dispatch(
        createTodo({
          ...form,
          attachments,
        }),
      ).unwrap();

      toast.success("Todo created successfully");

      setForm({
        title: "",
        description: "",
        status: "pending",
      });

      setFiles([]);
    } catch (error) {
      toast.error(error || "Failed to create todo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Create New Todo</h2>
        <span className="text-sm text-slate-500">Stay organized</span>
      </div>

      <Input
        placeholder="Todo title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
        placeholder="Description"
        rows="4"
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

      <AttachmentDropzone files={files} setFiles={setFiles} />

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Creating..." : "Create Todo"}
      </Button>
    </form>
  );
};

export default TodoForm;
