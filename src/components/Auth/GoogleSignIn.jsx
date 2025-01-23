import { useState } from "react";
import { useHistory } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa6";

import useAuthContext from "../../context/AuthContext";
import { auth } from "../../firebase";
import Modal from "../UI/Modal";
import { createUser } from "../../utils/firebase";

export default function GoogleSignIn() {
  const history = useHistory();

  const { login, isLoading, setIsLoading } = useAuthContext();

  const [showModal, setShowModal] = useState(false);

  async function handleGoogleSignIn() {
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      await createUser(userCredential.user);

      login(userCredential.user);
      history.replace("/dashboard");
    } catch (error) {
      console.error(error);
      setShowModal({
        title: "Sign in error",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white dark:bg-slate-800 px-2 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <FaSpinner className="h-5 w-5 animate-spin text-gray-600 dark:text-gray-400" />
          ) : (
            <FcGoogle className="h-5 w-5" />
          )}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </span>
        </button>
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
