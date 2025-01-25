import { useEffect, useState } from "react";
import { FaEdit, FaKey } from "react-icons/fa";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

import PasswordModal from "../components/UI/PasswordModal";
import { auth } from "../firebase";
import useAuthContext from "../context/AuthContext";
import SubmitButton from "../components/UI/SubmitButton";
import { updateUser } from "../utils/firebase";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [userData, setUserData] = useState({});

  const { isLoading, setIsLoading } = useAuthContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUserData(user);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: e.target.fullName.value,
        photoURL: e.target.photoURL.value,
      });

      await updateUser(auth.currentUser);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update profile!");
    } finally {
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow mt-6">
        {/* Profile Header */}
        <div className="relative h-32 bg-blue-600 rounded-t-lg">
          <div className="absolute -bottom-16 left-8">
            <img
              src={userData?.photoURL || "/avatar.svg"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 bg-white"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {userData?.displayName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Member since{" "}
                {new Date(
                  userData?.metadata?.creationTime
                ).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-4 py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              <FaEdit className="mr-2" />
              Edit
            </button>
          </div>

          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </h3>
                  <p className="mt-1 dark:text-gray-200">{userData?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Phone Number
                  </h3>
                  <p className="mt-1 dark:text-gray-200">
                    {userData?.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <FaKey className="mr-2" />
                  Change Password
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    defaultValue={userData?.displayName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-slate-700 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    name="photoURL"
                    defaultValue={userData?.photoURL}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-slate-700 dark:text-gray-200"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm md:text-base text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <SubmitButton
                  isLoading={isLoading}
                  label="Save Changes"
                  loadingLabel="Saving..."
                />
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}
