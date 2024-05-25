import { useEffect, useState } from 'react';

import ExpenseItems from './ExpenseItems';
import ExpenseForm from './ExpenseForm';
import DataLoader from '../UI/DataLoader';
import Modal from '../UI/Modal';

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [dataLoader, setDataLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleAddExpense(newExpense) {
    setExpenses((prevState) => [...prevState, newExpense]);
    setShowForm(false);
    setShowModal({
      title: 'Success',
      message: 'Expense has been Added',
    });
  }

  function handleEditExpense(editedExpense) {
    const updatedExpenses = expenses.map((e) => {
      if (e.id === editedExpense.id) {
        return editedExpense;
      }
      return e;
    });
    setExpenses(updatedExpenses);
    setShowModal({
      title: 'Success',
      message: 'Expense has been updated',
    });
  }

  function handleDeleteExpense(delId) {
    const updatedExpenses = expenses.filter((e) => e.id !== delId);
    setExpenses(updatedExpenses);
    setShowModal({
      title: 'Success',
      message: 'Expense has been deleted',
    });
  }

  useEffect(() => {
    async function fetchExpenses() {
      setDataLoader(true);
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
      setDataLoader(false);
    }
    fetchExpenses();
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
        <ExpenseForm
          onCloseForm={() => setShowForm(false)}
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
              onEditExpense={handleEditExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          );
        })}
      </ul>
      {dataLoader && <DataLoader />}
      {showModal && (
        <Modal
          title={showModal.title}
          message={showModal.message}
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
