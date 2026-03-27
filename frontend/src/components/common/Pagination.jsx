/* eslint-disable react/prop-types */
import Button from "./Button";

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 pt-4">
      <Button
        variant="secondary"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </Button>

      <span className="text-sm text-slate-600">
        Page <strong>{page}</strong> of <strong>{pages}</strong>
      </span>

      <Button
        variant="secondary"
        disabled={page === pages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
