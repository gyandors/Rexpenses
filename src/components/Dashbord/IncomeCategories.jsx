import { useSelector } from "react-redux";

export default function IncomeCategories({ currentDate }) {
  const { incomes } = useSelector((state) => state.incomeState);

  // Color mapping for different categories
  const categoryColors = {
    Salary: "bg-emerald-600",
    Freelance: "bg-cyan-600",
    Business: "bg-orange-600",
    Investment: "bg-violet-600",
    Rental: "bg-rose-600",
    Gift: "bg-amber-600",
    Other: "bg-slate-600",
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter income for current month
  const currentMonthIncome = incomes.filter((inc) => {
    const incomeDate = new Date(inc.date);
    return (
      incomeDate.getMonth() === currentMonth &&
      incomeDate.getFullYear() === currentYear
    );
  });

  // Calculate total amount for the month
  const monthlyTotal = currentMonthIncome.reduce(
    (total, inc) => total + Number(inc.amount),
    0
  );

  // Get the total income for each category
  const categoryTotals = currentMonthIncome.reduce((acc, inc) => {
    acc[inc.category] = (acc[inc.category] || 0) + Number(inc.amount);
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
        Income Categories
      </h2>
      <div className="space-y-4">
        {categoryPercentages.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No income data available for this month.
          </p>
        )}

        {categoryPercentages.map(({ category, percentage }) => (
          <div
            key={category}
            className="flex items-center justify-between gap-8"
          >
            <div className="flex-grow">
              <p className="font-medium dark:text-gray-200">{category}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className={`${
                    categoryColors[category] || "bg-emerald-600"
                  } h-2.5 rounded-full`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
            <span className="font-medium dark:text-gray-200">
              {percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
