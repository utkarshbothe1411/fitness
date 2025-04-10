import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Settings, Moon, Sun, User, Key, LogOut, Lock, Loader2, CheckCircle, X, Edit, ShoppingCart } from "lucide-react";
import EquipmentMarketplace from "../pages/EquipmentMarketplace";


const Header: React.FC = () => {
  // Existing header states
  
  const [userName, setUserName] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Password change states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // User profile states
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: localStorage.getItem("userName") || "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitnessLevel: "beginner",
    goals: "",
    medicalConditions: ""
  });
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    setUserName(storedName);
  }, []);
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && 
         (showChangePassword || showUserProfile)) {
        setShowChangePassword(false);
        setShowUserProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showChangePassword, showUserProfile]);

  // Initialize user data
  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    // Load user profile data from localStorage
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Existing handlers
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark", newMode);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    setUserName(null);
    setDropdownOpen(false);
    navigate("/auth");
  };

  // Password change handlers
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setIsLoading(true);

    try {
      // Validation
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        throw new Error("All fields are required");
      }
      if (passwordData.newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New passwords don't match");
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPasswordSuccess(true);
      setTimeout(() => {
        setShowChangePassword(false);
        setPasswordSuccess(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      }, 2000);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Password change failed");
    } finally {
      setIsLoading(false);
    }
  };

  // User profile handlers
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    localStorage.setItem("userName", userProfile.name);
    setUserName(userProfile.name);
    setIsEditingProfile(false);
    setShowUserProfile(false);
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 backdrop-blur-md bg-white/30 dark:bg-gray-900/80 shadow-md rounded-xl mx-4 my-4">
        <div className="text-lg font-semibold text-indigo-800 dark:text-white">
          {userName ? `Welcome, ${userName}!` : "Welcome!"}
        </div>

        <nav className="flex items-center space-x-4">
          {["Dashboard", "Workouts", "Social", "Nutrition", "Progress", "Recipes", "Workout Plan", "Video Lectures"].map((item) => (
            <Link 
              key={item} 
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {item}
            </Link>
          ))}

          {/* Fitness Tools Dropdown */}
          <div className="relative" ref={toolsDropdownRef}>
            <button
              onClick={() => {
                setToolsDropdownOpen(!toolsDropdownOpen);
                setDropdownOpen(false);
              }}
              className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Activity className="w-5 h-5 mr-2" />
              Fitness Tools
            </button>

            {toolsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link 
                      to="/sleep-tracker" 
                      className="flex items-center"
                      onClick={() => setToolsDropdownOpen(false)}
                    >
                      <span className="mr-2">😴</span> Sleep Tracker
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link 
                      to="/water-reminder" 
                      className="flex items-center"
                      onClick={() => setToolsDropdownOpen(false)}
                      
                    >
                      <span className="mr-2">💧</span> Water Reminder
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link 
                      to="/calorie-tracker" 
                      className="flex items-center"
                      onClick={() => setToolsDropdownOpen(false)}
                    >
                      <span className="mr-2">🍎</span> Calorie Tracker
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link 
                      to="/step-counter" 
                      className="flex items-center"
                      onClick={() => setToolsDropdownOpen(false)}
                    >
                      <span className="mr-2">🚶</span> Step Counter
                    </Link>
                  </li>
                  {/* Added Marketplace Link */}
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link 
                      to="/marketplace" 
                      className="flex items-center"
                      onClick={(e) => {
      e.preventDefault(); // Prevent default navigation (temporary for debugging)
      setToolsDropdownOpen(false);
      navigate("/marketplace"); // Manually navigate (if using React Router)
    }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Equipment Marketplace
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        {/* {userName && (
  <div className="mr-4 text-gray-700 dark:text-gray-200 font-semibold">
    Welcome, {userName}
  </div>
)} */}
    
{/* Settings Dropdown */}
<div className="relative" ref={dropdownRef}>
</div>
        {/* Settings Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setToolsDropdownOpen(false);
            }}
            className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
              <ul className="py-2">
                <li 
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setDropdownOpen(false);
                    setShowUserProfile(true);
                  }}
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    My Profile
                  </div>
                </li>
                <li 
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setDropdownOpen(false);
                    setShowChangePassword(true);
                  }}
                >
                  <div className="flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    Change Password
                  </div>
                </li>
                <li 
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center cursor-pointer"
                  onClick={toggleDarkMode}
                >
                  <div className="flex items-center">
                    {darkMode ? <Moon className="w-5 h-5 mr-2" /> : <Sun className="w-5 h-5 mr-2" />}
                    Dark Mode
                  </div>
                  <span>{darkMode ? "🌙" : "☀️"}</span>
                </li>
                <li 
                  className="px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={handleLogout}
                >
                  <div className="flex items-center">
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Password Change Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowChangePassword(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>

            {passwordSuccess ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Password Changed!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your password has been updated successfully.
                </p>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <Lock className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-2xl font-bold ml-2 text-gray-800 dark:text-white">
                    Change Password
                  </h2>
                </div>

                {passwordError && (
                  <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
                    {passwordError}
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Must be at least 8 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
                      required
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
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showUserProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {isEditingProfile ? "Edit Profile" : "My Profile"}
                </h2>
                <button
                  onClick={() => {
                    setShowUserProfile(false);
                    setIsEditingProfile(false);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              {isEditingProfile ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userProfile.name}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userProfile.email}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={userProfile.age}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={userProfile.gender}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={userProfile.height}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={userProfile.weight}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fitness Level
                    </label>
                    <select
                      name="fitnessLevel"
                      value={userProfile.fitnessLevel}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fitness Goals
                    </label>
                    <textarea
                      name="goals"
                      value={userProfile.goals}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Medical Conditions
                    </label>
                    <textarea
                      name="medicalConditions"
                      value={userProfile.medicalConditions}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      rows={2}
                      placeholder="Any conditions we should know about"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveProfile}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Personal Information</h3>
                      <div className="mt-4 space-y-3">
                        <p><span className="font-medium">Name:</span> {userProfile.name || "Not set"}</p>
                        <p><span className="font-medium">Email:</span> {userProfile.email || "Not set"}</p>
                        <p><span className="font-medium">Age:</span> {userProfile.age || "Not set"}</p>
                        <p><span className="font-medium">Gender:</span> {userProfile.gender || "Not set"}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Body Metrics</h3>
                      <div className="mt-4 space-y-3">
                        <p><span className="font-medium">Height:</span> {userProfile.height ? `${userProfile.height} cm` : "Not set"}</p>
                        <p><span className="font-medium">Weight:</span> {userProfile.weight ? `${userProfile.weight} kg` : "Not set"}</p>
                        <p><span className="font-medium">Fitness Level:</span> {userProfile.fitnessLevel}</p>
                      </div>
                    </div>
                  </div>

                  {userProfile.goals && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Fitness Goals</h3>
                      <p className="mt-2 whitespace-pre-line">{userProfile.goals}</p>
                    </div>
                  )}

                  {userProfile.medicalConditions && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Medical Notes</h3>
                      <p className="mt-2 whitespace-pre-line">{userProfile.medicalConditions}</p>
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;