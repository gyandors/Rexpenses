/* eslint-disable react/prop-types */
import { useRef } from 'react';

export default function NewExpense(props) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  function handleFormSubmit(event) {
    event.preventDefault();

    props.onAddExpense({
      id: Date.now(),
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    });
  }

  return (
    <>
      <div className="mt-10">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add Expense
        </h2>
      </div>

      <div className="w-11/12 mt-10 mx-auto sm:max-w-sm">
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
              ref={categoryRef}
            >
              <option value="" hidden>
                Select category
              </option>
              <option value="Food">Food</option>
              <option value="Fuel">Fuel</option>
              <option value="Salary">Salary</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div>
            <button
              className="mr-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Add
            </button>
            <button
              className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="cancel"
              onClick={() => props.onShowForm()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
