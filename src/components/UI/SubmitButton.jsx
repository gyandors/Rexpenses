import { FaSpinner } from "react-icons/fa6";

export default function SubmitButton({
  isLoading,
  label,
  loadingLabel,
  className = "",
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`flex justify-center items-center rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin mr-2" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
