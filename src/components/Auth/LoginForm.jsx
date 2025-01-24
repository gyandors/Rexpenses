import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import useAuthContext from "../../context/AuthContext";
import Modal from "../UI/Modal";
import Label from "./UI/Label";
import Input from "./UI/Input";
import SubmitButton from "../UI/SubmitButton";
import { auth } from "../../firebase";

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const { login, isLoading, setIsLoading } = useAuthContext();

  async function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setShowModal({
        title: "Invalid input",
        message: "Please fill in all required fields.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      login(userCredential.user);
      history.replace("/dashboard");
    } catch (error) {
      console.error(error);

      setShowModal({
        title: "Login failed",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="text-gray-400" />
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              ref={passwordRef}
            />
          </div>
        </div>

        <div>
          <SubmitButton
            isLoading={isLoading}
            label="Sign in"
            loadingLabel="Signing in..."
            className="w-full"
          />
        </div>
      </form>

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
