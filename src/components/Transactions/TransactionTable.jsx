export default function TransactionTable({ transactions, type }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-x-auto">
      <table className="min-w-[800px] w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-sm md:text-base text-gray-500 dark:text-gray-300">
            <th className="p-4 text-left font-medium">Date</th>
            <th className="p-4 text-left font-medium">Title</th>
            <th className="p-4 text-left font-medium">Category</th>
            <th className="p-4 text-left font-medium">Notes</th>
            <th className="p-4 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center dark:text-white">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-700 text-sm md:text-base dark:text-white"
              >
                <td className="p-4">
                  {new Date(transaction.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4">{transaction.title}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs md:text-sm ${
                      type === "expense"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {transaction.category}
                  </span>
                </td>
                <td className="p-4 w-60 dark:text-white">
                  {transaction.notes}
                </td>
                <td
                  className={`p-4 text-right ${
                    type === "expense" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {type === "expense" ? "-" : "+"}₹
                  {Number(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
