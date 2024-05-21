import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordForm() {
  const emailRef = useRef();

  function handleFormSubmit(event) {
    event.preventDefault();

    (async function fetchData() {
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ',
          {
            method: 'POST',
            body: JSON.stringify({
              requestType: 'PASSWORD_RESET',
              email: emailRef.current.value,
            }),
          }
        );

        console.log(response);

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }

  return (
    <div className="flex flex-col justify-center pt-8">
      <div className="w-11/12 mt-10 mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>
      <div className="w-11/12 mt-10 mx-auto sm:w-full sm:max-w-sm">
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
          <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Send verification link
          </button>
          <div className="text-sm">
            <p className="mt-10 text-center text-sm text-gray-500">
              Know your password?{' '}
              <Link
                to="/auth"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
