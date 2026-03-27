const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-5 shadow">
      <div className="h-5 w-1/3 rounded bg-slate-200"></div>
      <div className="mt-3 h-4 w-2/3 rounded bg-slate-200"></div>
      <div className="mt-2 h-4 w-1/2 rounded bg-slate-200"></div>
      <div className="mt-4 h-8 w-24 rounded bg-slate-200"></div>
    </div>
  );
};

export default SkeletonCard;
