/* eslint-disable react/prop-types */

import trash from '../../assets/trash.svg';
import edit from '../../assets/edit.svg';

import ExpenseForm from './ExpenseForm';
import { useState } from 'react';

export default function ExpenseItems(props) {
  const [editExpense, setEditExpense] = useState(false);

  async function handleDelete() {
    const response = await fetch(
      `https://expense-tracker-17-default-rtdb.firebaseio.com/expenses/${props.id}.json`,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      props.onDeleteExpense(props.id);
    }
  }

  function handleEdit(editedExpense) {
    props.onEditExpense(editedExpense);
    setEditExpense(false);
  }

  return (
    <>
      <li className="w-full flex justify-between items-center border-b-4 border-b-stone-500 p-2 mb-2">
        <div className="w-24">
          <span className="font-semibold text-xl">{props.category}</span>
          <p className="ml-2 italic">{props.description}</p>
        </div>
        <span className="w-24 text-end">₹ {props.amount}.00</span>
        <div className=" text-end">
          <button className="p-2" onClick={() => setEditExpense(true)}>
            <img src={edit} width={20} alt="edit icon" />
          </button>
          <button className="p-2" onClick={handleDelete}>
            <img src={trash} width={17} alt="delete icon" />
          </button>
        </div>
      </li>
      {editExpense && (
        <ExpenseForm
          editExpense={editExpense}
          id={props.id}
          category={props.category}
          description={props.description}
          amount={props.amount}
          onEdit={handleEdit}
          onCloseForm={() => setEditExpense(false)}
        />
      )}
    </>
  );
}
