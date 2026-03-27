const TodoStats = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.status === "completed").length;
  const pending = todos.filter((todo) => todo.status === "pending").length;

  const stats = [
    { label: "Total Todos", value: total },
    { label: "Completed", value: completed },
    { label: "Pending", value: pending },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl bg-white p-5 shadow">
          <p className="text-sm text-slate-500">{stat.label}</p>
          <h3 className="mt-2 text-3xl font-bold">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default TodoStats;
