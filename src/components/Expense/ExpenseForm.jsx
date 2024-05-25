/* eslint-disable react/prop-types */
import { useRef } from 'react';

export default function ExpenseForm(props) {
  const amountRef = useRef(props.amount);
  const descriptionRef = useRef(props.description);
  const categoryRef = useRef(props.category);

  function handleFormSubmit(event) {
    event.preventDefault();

    const newExpense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };

    if (props.editExpense) {
      updateExpense();
    } else {
      postExpense();
    }

    async function postExpense() {
      const response = await fetch(
        'https://expense-tracker-17-default-rtdb.firebaseio.com/expenses.json',
        {
          method: 'POST',
          body: JSON.stringify(newExpense),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        props.onAddExpense({ ...newExpense, id: data.name });
      }
    }

    async function updateExpense() {
      const response = await fetch(
        `https://expense-tracker-17-default-rtdb.firebaseio.com/expenses/${props.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(newExpense),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        props.onEdit({ ...newExpense, id: props.id });
      }
    }
  }

  return (
    <>
      <div className="mt-10">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {props.editExpense ? 'Edit Expense' : 'Add Expense'}
        </h2>
      </div>

      <div className="w-11/12 mt-10 mb-10 mx-auto sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="price"
            >
              Amount
            </label>
            <input
              className="mt-2 px-2 py-1.5 block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              type="number"
              id="price"
              placeholder="Enter amount"
              defaultValue={amountRef.current}
              ref={amountRef}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="mt-2 px-2 py-1.5 block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              type="text"
              id="description"
              placeholder="Enter description"
              defaultValue={descriptionRef.current}
              ref={descriptionRef}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="mt-2 px-2 py-1.5 block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              name=""
              id="category"
              defaultValue={categoryRef.current}
              ref={categoryRef}
            >
              <option value="" hidden>
                Select category
              </option>
              <option value="Food">Food</option>
              <option value="Fuel">Fuel</option>
              <option value="Loan">Loan</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div>
            <button
              className="mr-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              {props.editExpense ? 'Update' : 'Add'}
            </button>
            <button
              className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="cancel"
              onClick={() => props.onCloseForm()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
