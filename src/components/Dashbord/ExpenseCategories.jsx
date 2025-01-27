import { useSelector } from "react-redux";

export default function ExpenseCategories() {
  const { expenses } = useSelector((state) => state.expenseState);

  // Color mapping for different categories
  const categoryColors = {
    Food: "bg-blue-600",
    Transportation: "bg-green-600",
    Entertainment: "bg-purple-600",
    Shopping: "bg-yellow-600",
    Bills: "bg-red-600",
    Health: "bg-pink-600",
    Education: "bg-indigo-600",
    Other: "bg-gray-600",
  };

  // Set fixed date for testing (December 2024)
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter expenses for current month
  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  // Calculate total amount for the month
  const monthlyTotal = currentMonthExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  // Get the total expenses for each category
  const categoryTotals = currentMonthExpenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  // Calculate percentages for each category
  const categoryPercentages = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      category,
      percentage: ((amount / monthlyTotal) * 100).toFixed(1),
    })
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">
        Expense Categories
      </h2>
      <div className="space-y-4">
        {categoryPercentages.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No expense data available for this month.
          </p>
        )}

        {categoryPercentages.map(({ category, percentage }) => (
          <div key={category} className="flex items-center justify-between">
            <div className="flex-grow">
              <p className="font-medium dark:text-gray-200">{category}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className={`${
                    categoryColors[category] || "bg-blue-600"
                  } h-2.5 rounded-full`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
            <span className="font-medium dark:text-gray-200 min-w-16 text-right">
              {percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
