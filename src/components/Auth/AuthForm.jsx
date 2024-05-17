import { useState, useRef } from 'react';
// import Modal from '../UI/Modal';

/* eslint-disable react/no-unescaped-entities */
export default function AuthForm() {
  const [haveAccount, setHaveAccount] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (haveAccount) {
      //
      console.log('Login');
    } else {
      const confirmPassword = confirmPasswordRef.current.value;
      if (password !== confirmPassword) {
        alert('Password should match');
        return;
      }

      (async function signUp() {
        try {
          const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ',
            {
              method: 'POST',
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const data = await response.json();

          if (response.ok) {
            alert('Your account is successfully created');
          } else {
            throw new Error(data.error.message);
          }
        } catch (error) {
          alert(error.message);
        }
      })();
    }
  }

  return (
    <div className=" border flex min-h-full flex-col justify-center w-96 m-auto p-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {haveAccount ? 'Sign in to your account' : 'Create new account'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <input
              className="mt-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="email"
              id="email"
              required
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
              className="mt-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="password"
              id="password"
              required
              ref={passwordRef}
            />
          </div>
          {!haveAccount && (
            <div>
              <label
                htmlFor="confm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>

              <input
                className="mt-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="password"
                id="confm-password"
                required
                ref={confirmPasswordRef}
              />
            </div>
          )}

          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              {haveAccount ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {haveAccount ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            onClick={() => setHaveAccount(!haveAccount)}
          >
            {haveAccount ? 'Create here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
}
