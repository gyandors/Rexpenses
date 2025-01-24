import { Link } from "react-router-dom";
import {
  FaArrowRightLong,
  FaChartLine,
  FaWallet,
  FaPiggyBank,
  FaShieldHalved,
} from "react-icons/fa6";

import useInView from "../hooks/useInView";

export default function LandingPage() {
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1 });

  const features = [
    {
      icon: FaChartLine,
      title: "Smart Analytics",
      description:
        "Get detailed insights and visual reports to understand your spending patterns.",
    },
    {
      icon: FaWallet,
      title: "Expense Tracking",
      description:
        "Easily track your daily expenses and income with our intuitive interface.",
    },
    {
      icon: FaPiggyBank,
      title: "Budget Goals",
      description:
        "Set and track your budget goals with visual progress indicators.",
    },
    {
      icon: FaShieldHalved,
      title: "Secure & Private",
      description:
        "Your financial data is encrypted and secure with our platform.",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative px-4 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-sky-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div
          ref={heroRef}
          className={`mx-auto max-w-2xl text-center opacity-0 transition-all duration-1000 delay-200 ${
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
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              to="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Already have an account?
              <FaArrowRightLong className="inline ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 lg:px-8 pb-20">
        <div
          ref={featuresRef}
          className={`opacity-0 transition-all duration-1000 delay-500 ${
            featuresInView ? "opacity-100 translate-y-0" : "translate-y-10"
          }`}
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Why Choose Budget Buddy?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to manage your money
            </p>
          </div>

          <div className="mt-16 mx-auto max-w-5xl">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
