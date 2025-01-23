import { forwardRef } from "react";

export default forwardRef(function Input(
  { id, type, autoComplete, placeholder },
  ref
) {
  return (
    <input
      id={id}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      ref={ref}
      className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:text-white dark:bg-slate-800 dark:focus:ring-blue-500"
    />
  );
});
