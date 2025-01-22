import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../UI/Modal";
import Loader from "../UI/Loader";

export default function SignUpForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!email || !password || !confirmPassword) {
      setShowModal({
        title: "Invalid input",
        message: "Please fill the valid details.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setShowModal({
        title: "Invalid input",
        message: "Password did not match.",
      });
      return;
    }

    (async function fetchData() {
      setLoader(true);
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setShowModal({
            title: "Success",
            message: "Your account is successfully created. Go to login page.",
          });

          emailRef.current.value = "";
          passwordRef.current.value = "";
          confirmPasswordRef.current.value = "";
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        setShowModal({
          // title: 'Error',
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
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              className="mt-2 px-2 py-1.5 block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
              type="password"
              id="password"
              placeholder="******"
              ref={passwordRef}
            />
          </div>

          <div>
            <label
              htmlFor="confm-password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm password
            </label>
            <input
              className="mt-2 px-2 py-1.5 block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
              type="password"
              id="confm-password"
              placeholder="******"
              ref={confirmPasswordRef}
            />
          </div>

          <div>
            <button
              className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              type="submit"
            >
              {loader ? <Loader /> : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
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
