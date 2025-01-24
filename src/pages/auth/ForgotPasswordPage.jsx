import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa6";
import { sendPasswordResetEmail } from "firebase/auth";

import Modal from "../../components/UI/Modal";
import Label from "../../components/Auth/UI/Label";
import Input from "../../components/Auth/UI/Input";
import SubmitButton from "../../components/UI/SubmitButton";

import { auth } from "../../firebase";

export default function ForgotPasswordPage() {
  const emailRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;

    if (!email) {
      setShowModal({
        title: "Invalid input",
        message: "Please enter your email address.",
      });
      return;
    }

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setShowModal({
        title: "Success",
        message: "Password recovery link has been sent to your email.",
      });
      emailRef.current.value = "";
    } catch (error) {
      console.error(error);
      setShowModal({
        title: "Failed",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-center lg:flex-row lg:items-center">
      {/* Illustration Section */}
      <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center p-8">
        <img
          src="/forgot-password-illustration.svg"
          alt="Forgot Password"
          className="max-w-md w-full"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 px-4 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="mb-8">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FaArrowLeft className="mr-2" />
              Back to login
            </Link>
          </div>

          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  ref={emailRef}
                />
              </div>
            </div>

            <div>
              <SubmitButton
                isLoading={isLoading}
                label="Send reset link"
                loadingLabel="Sending reset link..."
                className="w-full"
              />
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {showModal && (
        <Modal
          title={showModal.title}
          message={showModal.message}
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
