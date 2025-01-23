import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />
      <div className="lg:ml-64 pt-20 px-8">{children}</div>
    </main>
  );
}
