import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, icon: Icon, error, className = "", id, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id || props.name}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <div
        className={`flex items-center rounded-2xl border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 ${className}`}
      >
        {Icon && (
          <Icon className="mr-2 h-4 w-4 text-slate-400" />
        )}

        <input
          id={id || props.name}
          ref={ref}
          className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;