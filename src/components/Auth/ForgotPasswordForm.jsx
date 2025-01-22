import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../UI/Modal";
import Loader from "../UI/Loader";

export default function ForgotPasswordForm() {
  const emailRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();

    (async function fetchData() {
      setLoader(true);
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: emailRef.current.value,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setShowModal({
            title: "Success",
            message: "Password recovery link has been sent to your email.",
          });
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        setShowModal({
          title: "Invalid",
          message: error.message,
        });
      }
      setLoader(false);
    })();
  }

  return (
    <>
      <div className="w-11/12 mt-10 mx-auto sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              className="mt-2 px-2 py-1.5 block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
              type="email"
              id="email"
              placeholder="example@email.com"
              ref={emailRef}
            />
          </div>

          <div>
            <button
              className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              type="submit"
            >
              {loader ? <Loader /> : "Send verification link"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Know your password?{" "}
          <Link
            className="font-semibold text-sky-500 hover:text-sky-600"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
      {showModal && (
        <Modal
          title={showModal.title}
          message={showModal.message}
          onClick={() => setShowModal(false)}
        />
      )}
    </>
  );
}
