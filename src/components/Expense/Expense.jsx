import { useEffect, useState } from 'react';
import ExpenseItems from './ExpenseItems';
import NewExpense from './NewExpense';

const dummy_expenses = [];

export default function Expense() {
  const [expenses, setExpenses] = useState(dummy_expenses);

  const [showForm, setShowForm] = useState(false);

  function handleAddExpense(newExpense) {
    console.log(newExpense);
    setExpenses((prevState) => [...prevState, newExpense]);
    setShowForm(false);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://expense-tracker-17-default-rtdb.firebaseio.com/expenses.json'
      );

      const data = await response.json();

      if (response.ok) {
        const fetchedData = [];

        for (const key in data) {
          fetchedData.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
        }
        setExpenses(fetchedData);
      } else {
        alert('error');
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {!showForm && (
        <button
          className="mt-10 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setShowForm(true)}
        >
          Add new expense
        </button>
      )}
      {showForm && (
        <NewExpense
          onShowForm={() => setShowForm(false)}
          onAddExpense={handleAddExpense}
        />
      )}
      <ul className="mt-10 w-11/12 sm:max-w-3xl">
        {expenses.map((e) => {
          return (
            <ExpenseItems
              key={e.id}
              id={e.id}
              amount={e.amount}
              description={e.description}
              category={e.category}
            />
          );
        })}
      </ul>
    </div>
  );
}
