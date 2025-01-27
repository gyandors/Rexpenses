import Sidebar from "../components/Sidebar";
import DashboardSkeleton from "../components/UI/DashboardSkeleton";

export default function DashboardLayout({ children, isLoading }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />
      <div className="lg:ml-64 pt-20 pb-20 lg:pb-10 px-4 lg:px-8">
        {isLoading ? <DashboardSkeleton /> : children}
      </div>
    </main>
  );
}
