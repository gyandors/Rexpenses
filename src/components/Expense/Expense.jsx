import { useState } from 'react';
import ExpenseItems from './ExpenseItems';
import NewExpense from './NewExpense';

const dummy_expenses = [
  { id: 'e1', amount: 10, description: 'Grocery', category: 'Food' },
  { id: 'e2', amount: 20, description: 'Electricity', category: 'Households' },
  { id: 'e3', amount: 10, description: 'Dosa, Idli', category: 'Restaurant' },
];

export default function Expense() {
  const [expenses, setExpenses] = useState(dummy_expenses);

  const [showForm, setShowForm] = useState(false);

  function handleAddExpense(newExpense) {
    setExpenses((prevState) => [...prevState, newExpense]);
    setShowForm(false);
  }

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
