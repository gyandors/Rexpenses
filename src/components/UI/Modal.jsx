import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "./Style.module.css";

export default function Modal({ title, message, onClick }) {
  return (
    <>
      {createPortal(
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity"
          onClick={onClick}
        ></div>,
        document.getElementById("overlay")
      )}
      {createPortal(
        <div
          className={`${styles["custom-style"]} p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl w-[90%] sm:w-[28rem] fixed z-[1000] left-1/2 top-1/4 -translate-x-1/2 overflow-hidden`}
        >
          <div className="relative">
            {/* Close button */}
            <button
              onClick={onClick}
              className="absolute right-0 top-0 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>

            {/* Title */}
            <div className="pr-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>

            {/* Message */}
            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-300">{message}</p>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClick}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>,
        document.getElementById("overlay")
      )}
    </>
  );
}
