/* eslint-disable react/prop-types */
const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900 ${className}`}
    />
  );
};

export default Input;
