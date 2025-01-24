import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />
      <div className="lg:ml-64 pt-20 pb-20 lg:pb-0 px-4 lg:px-8">
        {children}
      </div>
    </main>
  );
}
