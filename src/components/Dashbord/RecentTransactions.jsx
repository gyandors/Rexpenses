import { useSelector } from "react-redux";

export default function RecentTransactions() {
  const { expenses } = useSelector((state) => state.expenseState);
  const { incomes } = useSelector((state) => state.incomeState);

  // Combine and sort both expenses and incomes
  const recentTransactions = [...expenses, ...incomes]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="lg:col-span-2">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold dark:text-gray-300">
            Recent Transactions
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentTransactions.length === 0 ? (
            <div className="p-6 text-center dark:text-white">
              No recent transactions
            </div>
          ) : (
            recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium dark:text-gray-200">
                    {transaction.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.category} •{" "}
                    {new Date(transaction.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`font-semibold ${
                    incomes.some((inc) => inc.id === transaction.id)
                      ? "text-green-600 dark:text-green-400"
                      : "dark:text-gray-200"
                  }`}
                >
                  {incomes.some((inc) => inc.id === transaction.id) ? "+" : "-"}
                  ₹{Number(transaction.amount).toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
