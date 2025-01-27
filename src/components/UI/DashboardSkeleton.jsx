export default function DashboardSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="my-6 flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
      </div>

      {/* Budget Overview Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm"
          >
            <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-8 w-40 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mt-2"></div>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions Skeleton */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="h-6 w-48 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Categories Skeleton */}
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm"
            >
              <div className="h-6 w-40 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
              {[...Array(2)].map((_, j) => (
                <div key={j} className="flex items-center justify-between py-2">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
