import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useInView } from "../hooks/useInView";

export default function LandingPage() {
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section className="px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div
          ref={heroRef}
          className={`mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center opacity-0 transition-all duration-1000 delay-200 ${
            heroInView ? "opacity-100 translate-y-0" : "translate-y-10"
          }`}
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Take Control of Your Finances with Budget Buddy
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Your personal finance companion that helps you track expenses, set
            budgets, and achieve your financial goals.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/signup"
              className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              <span>Already have an account?</span>
              <FaArrowRightLong className="size-4 inline ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white min-h-screen flex items-center justify-center">
        <div
          ref={featuresRef}
          className={`mx-auto max-w-7xl px-6 lg:px-8 opacity-0 transition-all duration-1000 delay-500 ${
            featuresInView ? "opacity-100 translate-y-0" : "translate-y-10"
          }`}
        >
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-sky-500">
              Why Choose Budget Buddy?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to manage your money
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
                    📊
                  </div>
                  Expense Tracking
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Easily track your daily expenses and income with our intuitive
                  interface.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
                    🎯
                  </div>
                  Budget Goals
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Set and track your budget goals with visual progress
                  indicators.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
                    📈
                  </div>
                  Insights & Reports
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Get detailed insights and reports to understand your spending
                  patterns.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
                    🔒
                  </div>
                  Secure & Private
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Your financial data is encrypted and secure with our platform.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
