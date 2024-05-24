/* eslint-disable react/prop-types */

export default function ExpenseItems(props) {
  return (
    <li className="w-full flex justify-between items-center border p-2 mb-2">
      <span className=" w-24">{props.category}</span>
      <p className="w-24">{props.description}</p>
      <span className="w-24 text-end">₹ {props.amount}.00</span>
    </li>
  );
}
