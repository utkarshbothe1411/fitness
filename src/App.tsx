import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import HomePage from "./pages/HomePage";
import WorkoutsPage from "./pages/WorkoutsPage";
import NutritionPage from "./pages/NutritionPage";
import ProgressPage from "./pages/ProgressPage";
import RecipesPage from "./pages/RecipesPage";
import AuthPage from "./pages/AuthPage";
import WorkoutPlan from "./pages/WorkoutPlan";
import VideoLectures from "./pages/VideoLectures";
import SleepTracker from "./pages/SleepTracker";
import RecipeDetail from "./pages/RecipeDetail";
import StepCounter from "./pages/StepCounter";
import Waterrem from "./pages/Waterrem";
import CalorieTracker from "./pages/CalorieTracker";
import SocialFeaturesPage from "./components/social/SocialFeaturesPage";
import { SocialProvider } from "./contexts/SocialContext";
import EquipmentMarketplace from "./pages/EquipmentMarketplace";
function App() {
  return (
    <Router>
      <SocialProvider>
        <AppContent />
      </SocialProvider>
    </Router>
  );
}

const AppContent = () => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  // Added dark mode state (ONLY ADDITION)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true" ? true : saved === "false" ? false : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Added dark mode effect (ONLY ADDITION)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Sync user state across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem("user"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Update user state on route changes
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [location.pathname]);

  return (
    // Added dark mode class (ONLY CHANGE)
    <div className={`flex flex-col min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Header appears on ALL pages except /auth */}
      {!isAuthPage && <Header darkMode={darkMode} setDarkMode={setDarkMode} />}

      <div className="flex-grow bg-gray-50 dark:bg-gray-900">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<LandingPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/workout-plan" element={<WorkoutPlan />} />
            <Route path="/video-lectures" element={<VideoLectures />} />
            <Route path="/sleep-tracker" element={<SleepTracker />} />
            <Route path="/step-counter" element={<StepCounter />} />
            <Route path="/water-reminder" element={<Waterrem />} />
            <Route path="/calorie-tracker" element={<CalorieTracker />} />
            <Route path="/social" element={<SocialFeaturesPage />} />
            <Route path="/marketplace" element={<EquipmentMarketplace />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;