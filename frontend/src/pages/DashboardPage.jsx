import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todos/todoSlice";
import DashboardLayout from "../layout/DashboardLayout";
import TodoForm from "../components/todo/TodoForm";
import TodoFilters from "../components/todo/TodoFilter";
import TodoStats from "../components/todo/TodoStats";
import TodoList from "../components/todo/TodoList";
import Pagination from "../components/common/Pagination";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { items, loading, page, pages } = useSelector((state) => state.todo);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    sort: "createdAt",
  });

  useEffect(() => {
    dispatch(fetchTodos(filters));
  }, [dispatch, filters]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <TodoStats todos={items} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <TodoForm />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <TodoFilters filters={filters} setFilters={setFilters} />
            <TodoList todos={items} loading={loading} />

            <Pagination
              page={page}
              pages={pages}
              onPageChange={(newPage) =>
                setFilters((prev) => ({
                  ...prev,
                  page: newPage,
                }))
              }
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
