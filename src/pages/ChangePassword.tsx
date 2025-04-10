import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Loader2, CheckCircle } from "lucide-react";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("All fields are required");
      }

      if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("New passwords don't match");
      }

      if (newPassword === currentPassword) {
        throw new Error("New password must be different from current password");
      }

      // Simulate API call (replace with actual implementation)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isSuccess = true; // Replace with actual API response
      
      if (!isSuccess) {
        throw new Error("Current password is incorrect");
      }

      setSuccess(true);
      setTimeout(() => navigate("/profile"), 2000); // Redirect after success
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password change failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Password Changed!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your password has been updated successfully.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Redirecting to profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Lock className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Change Password
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
              required
              minLength={8}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Must be at least 8 characters
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Updating...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
          >
            ← Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;