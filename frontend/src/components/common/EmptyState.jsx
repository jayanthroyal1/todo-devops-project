// eslint-disable-next-line react/prop-types
const EmptyState = ({ title, description }) => {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
        📝
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
};

export default EmptyState;
