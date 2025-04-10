import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Waterrem: React.FC = () => {
  const [reminders, setReminders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth");
      return;
    }

    const loadInitialData = () => {
      try {
        // Simulate loading any saved reminders
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load reminders");
        setIsLoading(false);
      }
    };

    loadInitialData();

    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      const newReminder = `Time to drink water! ${timeString}`;
      
      alert(newReminder);
      setReminders((prev) => [...prev, timeString]);
    }, 3600000); // Every 1 hour

    return () => clearInterval(interval);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p>Loading water reminder...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-xl font-bold dark:text-white">Water & Hydration Reminder</h2>
      <p className="mt-2 dark:text-gray-300">
        You will get reminders every hour to drink water!
      </p>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold dark:text-white">Reminder History</h3>
        {reminders.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {reminders.map((time, index) => (
              <li 
                key={index} 
                className="border-b border-gray-200 dark:border-gray-700 py-2 flex items-center"
              >
                <span className="mr-2">💧</span>
                <span className="dark:text-gray-300">{time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No reminders yet. You'll see them here when they appear.
          </p>
        )}
      </div>
    </div>
  );
};

export default Waterrem;