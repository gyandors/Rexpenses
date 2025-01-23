import { useRef, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";

import Modal from "../UI/Modal";
import Label from "./UI/Label";
import Input from "./UI/Input";
import SubmitButton from "./UI/SubmitButton";
import useAuthContext from "../../context/AuthContext";
import { auth } from "../../firebase";
import { createUser } from "../../utils/firebase";

export default function SignUpForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const history = useHistory();

  const { login, isLoading, setIsLoading } = useAuthContext();

  const [showModal, setShowModal] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!name || !email || !password || !confirmPassword) {
      setShowModal({
        title: "Invalid input",
        message: "Please fill in all required fields.",
      });
      return;
    } else if (password !== confirmPassword) {
      setShowModal({
        title: "Password mismatch",
        message: "Passwords do not match. Please try again.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await createUser(userCredential.user);

      login(userCredential.user);
      history.replace("/dashboard");
    } catch (error) {
      console.error(error);

      setShowModal({
        title: "Registration failed",
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
          <Label htmlFor="name">Full Name</Label>
          <div className="relative mt-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaUser className="text-gray-400" />
            </div>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              ref={nameRef}
            />
          </div>
        </div>

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
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="text-gray-400" />
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="password"
              placeholder="••••••••"
              ref={passwordRef}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative mt-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="text-gray-400" />
            </div>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="confirm-password"
              placeholder="••••••••"
              ref={confirmPasswordRef}
            />
          </div>
        </div>

        <div>
          <SubmitButton
            isLoading={isLoading}
            label="Sign up"
            loadingLabel="Creating account..."
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
