import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <main className="bg-white dark:bg-slate-900 px-4 lg:px-8 mt-20 lg:mt-0">
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* Illustration */}
        <div className="w-full max-w-md lg:w-1/2">
          <img
            src="/404-illustration.svg"
            alt="404 Not Found"
            className="w-full h-auto"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            Error 404
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Page not found
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
            Perhaps you&apos;ve mistyped the URL or the page has been moved.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-colors"
            >
              <FaHome className="mr-2" />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-base font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-slate-900 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
