import Input from "../common/Input";

const TodoFilters = ({ filters, setFilters }) => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow">
      <div className="grid gap-4 md:grid-cols-4">
        <Input
          placeholder="Search todos..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
              page: 1,
            }))
          }
        />

        <select
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              status: e.target.value,
              page: 1,
            }))
          }
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          value={filters.sort}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              sort: e.target.value,
            }))
          }
        >
          <option value="createdAt">Newest</option>
          <option value="updatedAt">Recently Updated</option>
        </select>

        <select
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          value={filters.limit}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              limit: Number(e.target.value),
              page: 1,
            }))
          }
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>
      </div>
    </div>
  );
};

export default TodoFilters;
