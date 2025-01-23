import { Link } from "react-router-dom";

import GoogleSignIn from "../../components/Auth/GoogleSignIn";
import SignUpForm from "../../components/Auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-center lg:flex-row lg:items-center pt-20 pb-10">
      {/* Illustration Section */}
      <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center p-8">
        <img
          src="/signup-illustration.svg"
          alt="Sign Up"
          className="max-w-md w-full"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 px-4 lg:px-8">
        <div className="mx-auto max-w-md">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Start your financial journey with Budget Buddy
          </p>

          <GoogleSignIn />
          <SignUpForm />

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
