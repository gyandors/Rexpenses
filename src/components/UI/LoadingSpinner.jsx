export default function LoadingSpinner() {
  return (
    <div className="lg:ml-64 min-h-screen flex justify-center items-center">
      <div className="w-12 h-12 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-500"></div>
    </div>
  );
}
