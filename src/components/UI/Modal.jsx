/* eslint-disable react/prop-types */
import styles from './Style.module.css';
import { createPortal } from 'react-dom';

export default function Modal(props) {
  return (
    <>
      {createPortal(
        <div
          className="h-screen w-screen fixed bg-black bg-opacity-20 z-[100] transition-opacity"
          onClick={() => props.onClick()}
        ></div>,
        document.getElementById('overlay')
      )}
      {createPortal(
        <div
          className={`${styles['custom-style']} p-4 bg-white rounded-md w-[80%] sm:w-[25rem] fixed z-[1000] left-2/4 top-1/4 -translate-x-2/4 overflow-hidden dark:bg-slate-600`}
        >
          <header className="font-semibold">
            <h1 className=" text-base text-gray-900 dark:text-white">
              {props.title}
            </h1>
          </header>
          <section className="mt-3">
            <p className=" text-sm text-gray-600 dark:text-white">
              {props.message}
            </p>
          </section>
          <footer className="mt-3 text-right">
            <button
              className="px-2 py-1 text-white font-semibold rounded-md bg-red-600 hover:bg-red-500"
              onClick={() => props.onClick()}
            >
              Close
            </button>
          </footer>
        </div>,
        document.getElementById('overlay')
      )}
    </>
  );
}
