import React from "react";
import Dashboard from "./Dashboard";
import ProgressChart from "./ProgressChart";
import Suggestions from "./Suggestions";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header - unchanged but optimized */}
      <header className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Fitness Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Track your progress & stay motivated
        </p>
      </header>

      {/* Dashboard Cards - responsive container */}
      <section className="mb-6 sm:mb-8">
        <Dashboard />
      </section>

      {/* Weekly Progress Chart - responsive container */}
      <section className="mb-6 sm:mb-8 bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-100 mb-3 sm:mb-4">
          Weekly Progress
        </h2>
        <ProgressChart />
      </section>

      {/* Suggestions Section - responsive container */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-100 mb-3 sm:mb-4">
          Personalized Suggestions
        </h2>
        <Suggestions />
      </section>
    </div>
  );
};

export default LandingPage;
