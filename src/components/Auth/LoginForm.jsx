import { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

import axios from "axios";

import Modal from "../UI/Modal";
import Loader from "../UI/Loader";

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setShowModal({
        title: "Invalid input",
        message: "Please fill the valid details.",
      });
      return;
    }

    setLoader(true);
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        dispatch(
          login({
            jwtToken: response.data.idToken,
            name: response.data.displayName,
            email: response.data.email,
            uniqueId: response.data.localId,
          })
        );
        history.replace("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        setShowModal({
          title: "Login failed",
          message: "Invalid Credentials",
        });
        setLoader(false);
      });
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
              className="mt-2 px-2 py-1.5 w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
              type="email"
              id="email"
              placeholder="example@email.com"
              ref={emailRef}
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="flex-grow text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="font-semibold text-sm text-sky-500 hover:text-sky-600"
              >
                Forgot password?
              </Link>
            </div>
            <input
              className="mt-2 px-2 py-1.5 w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
              type="password"
              id="password"
              placeholder="******"
              ref={passwordRef}
            />
          </div>

          <div>
            <button
              className="flex w-full justify-center items-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              type="submit"
            >
              {loader ? <Loader /> : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            className="font-semibold text-sky-500 hover:text-sky-600"
            to="/signup"
          >
            Sign up
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
