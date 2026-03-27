import TodoCard from "./TodoCard";
import SkeletonCard from "../common/SkeletonCard";
import EmptyState from "../common/EmptyState";

const TodoList = ({ todos, loading }) => {
  if (loading) {
    return (
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!todos.length) {
    return (
      <EmptyState
        title="No todos found"
        description="Try creating a new todo or adjusting your filters."
      />
    );
  }

  return (
    <div className="grid gap-4">
      {todos.map((todo) => (
        <TodoCard key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
