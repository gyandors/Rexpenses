import { updatePassword } from "firebase/auth";
import toast from "react-hot-toast";

import { auth } from "../../firebase";
import useAuthContext from "../../context/AuthContext";
import SubmitButton from "./SubmitButton";

export default function PasswordModal({ isOpen, onClose }) {
  const { isLoading, setIsLoading } = useAuthContext();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (e.target.newPassword.value !== e.target.confirmNewPassword.value) {
      toast.error("Passwords do not match!");
      return;
    } else if (
      e.target.newPassword.value.trim() === "" ||
      e.target.confirmNewPassword.value.trim() === ""
    ) {
      toast.error("Password cannot be empty!");
      return;
    }

    setIsLoading(true);

    try {
      await updatePassword(auth.currentUser, e.target.newPassword.value);
      toast.success("Password updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update password!");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <Input label="New Password" type="password" name="newPassword" />

          <Input
            label="Confirm New Password"
            type="password"
            name="confirmNewPassword"
          />

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm md:text-base text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <SubmitButton
              isLoading={isLoading}
              label="Update Password"
              loadingLabel="Updating..."
            />
          </div>
        </form>
      </div>
    </div>
  );
}

// Input component
function Input({ label, type, name }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 dark:text-gray-200">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-slate-700 dark:text-gray-200"
      />
    </div>
  );
}
