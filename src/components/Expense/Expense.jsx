import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchedExpense,
  addExpense,
  editExpense,
  deleteExpense,
} from '../../store/expenseSlice';
import { setProMember, setTheme } from '../../store/userSlice';

import ExpenseItems from './ExpenseItems';
import ExpenseForm from './ExpenseForm';
import DataLoader from '../UI/DataLoader';
import Modal from '../UI/Modal';

import premium from '../../assets/premium.svg';
import { LightModeIcon, DarkModeIcon, DownloadIcon } from '../../assets/Icons';

export default function Expense() {
  const expenses = useSelector((state) => state.expenseState.expenses);
  const totalExpenseAmount = useSelector(
    (state) => state.expenseState.totalExpenseAmount
  );

  const proMember = useSelector((state) => state.userState.proMember);
  const theme = useSelector((state) => state.userState.theme);

  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleAddExpense(newExpense) {
    dispatch(addExpense(newExpense));
    setShowModal({
      title: 'Success',
      message: 'Expense has been Added',
    });
  }

  function handleEditExpense(editedExpense) {
    dispatch(editExpense(editedExpense));
    setShowModal({
      title: 'Success',
      message: 'Expense has been updated',
    });
  }

  function handleDeleteExpense(delId, amount) {
    dispatch(deleteExpense({ delId, amount }));
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
        let totalExpenseAmount = 0;

        for (const key in data) {
          fetchedData.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
          totalExpenseAmount += data[key].amount;
        }
        dispatch(fetchedExpense({ fetchedData, totalExpenseAmount }));
      } else {
        alert('error');
      }
      setDataLoader(false);
    }
    fetchExpenses();
  }, []);

  let content;
  {
    content = <p className="text-center text-lg">No expenses found.</p>;
    if (expenses.length > 0) {
      content = (
        <ul className="w-11/12 sm:max-w-3xl">
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
      );
    }
    if (dataLoader) {
      content = (
        <div className="flex justify-center">
          <DataLoader />
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 dark:text-white">
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
      <div className="w-11/12 sm:max-w-3xl flex justify-between items-center">
        <div>
          <h1 className="inline">Total Expense: </h1>
          <span className="font-semibold text-lg">{totalExpenseAmount}</span>
        </div>
        {totalExpenseAmount > 10000 && (
          <button
            className="rounded border-2 border-indigo-600 px-2 py-1 flex items-center gap-1 hover:bg-indigo-600 hover:text-white"
            onClick={() => dispatch(setProMember())}
          >
            <img className="inline" src={premium} alt="..." width={20} />
            <span>{proMember ? 'Deactivate Pro' : 'Activate Pro'}</span>
          </button>
        )}
      </div>
      {proMember && (
        <div className="w-11/12 sm:max-w-3xl bg-gray-400 p-1 rounded-md flex">
          <button
            onClick={() => {
              dispatch(setTheme());
            }}
          >
            {theme ? <LightModeIcon /> : <DarkModeIcon />}
          </button>

          <a
            className="ml-10 cursor-pointer"
            id="a1"
            onClick={() => {
              const expenseItem = expenses.map((e) => Object.values(e));
              expenseItem.map((d) => d.shift());
              expenseItem.unshift(['Amount', 'Description', 'Category']);

              const expensesToDownload = expenseItem
                .map((e) => e.join())
                .join('\n');

              const a1 = document.getElementById('a1');
              const blob1 = new Blob([expensesToDownload]);
              a1.href = URL.createObjectURL(blob1);
            }}
            download="expenses.csv"
            target="_blank"
          >
            <DownloadIcon />
          </a>
        </div>
      )}

      {content}

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
