import React, { useState } from "react";
import { CalendarDays as Calendar, Clock, X, Flame, Dumbbell, Utensils, Check } from "lucide-react";
import { format } from "date-fns";

interface WorkoutHistory {
  date: string;
  completed: boolean;
  workoutName: string;
  duration: string;
  caloriesBurned: number;
}

interface MealHistory {
  date: string;
  mealsCompleted: number;
  totalMeals: number;
  caloriesConsumed: number;
}

const ProgressPage: React.FC = () => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [view, setView] = useState<"workout" | "meal">("workout");

  // Generate initial workout data for first 10 days
  const generateWorkoutHistory = (): WorkoutHistory[] => {
    const workouts: WorkoutHistory[] = [];
    const workoutTypes = [
      "Full Body HIIT",
      "Upper Body Strength",
      "Yoga Flow",
      "Core & Cardio",
      "Lower Body Burn"
    ];
    
    for (let i = 1; i <= 10; i++) {
      const date = `2023-06-${String(i).padStart(2, '0')}`;
      const randomWorkout = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
      const completed = Math.random() > 0.3; // 70% chance of completion
      
      workouts.push({
        date,
        completed,
        workoutName: randomWorkout,
        duration: completed ? `${Math.floor(Math.random() * 30) + 20} mins` : "0 mins",
        caloriesBurned: completed ? Math.floor(Math.random() * 300) + 150 : 0
      });
    }
    return workouts;
  };

  // Generate initial meal data for first 10 days
  const generateMealHistory = (): MealHistory[] => {
    const meals: MealHistory[] = [];
    
    for (let i = 1; i <= 10; i++) {
      const date = `2023-06-${String(i).padStart(2, '0')}`;
      const completed = Math.floor(Math.random() * 3) + 3; // 3-5 meals completed
      
      meals.push({
        date,
        mealsCompleted: completed,
        totalMeals: 5,
        caloriesConsumed: Math.floor(Math.random() * 1000) + 1200
      });
    }
    return meals;
  };

  const workoutHistory = generateWorkoutHistory();
  const mealHistory = generateMealHistory();

  // Generate calendar days for the current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    const hasWorkout = workoutHistory.some(item => item.date === dateStr);
    const hasMeal = mealHistory.some(item => item.date === dateStr);
    
    return {
      day,
      date: dateStr,
      hasWorkout,
      hasMeal
    };
  });

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const getSelectedDateData = () => {
    if (!selectedDate) return null;
    
    if (view === "workout") {
      return workoutHistory.find(item => item.date === selectedDate);
    } else {
      return mealHistory.find(item => item.date === selectedDate);
    }
  };

  const selectedData = getSelectedDateData();

  return (
    <div className="space-y-6 dark:bg-gray-900 dark:text-white min-h-screen p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Progress</h1>
        <button 
          onClick={() => setShowHistoryModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <Calendar size={18} />
          View History
        </button>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Dumbbell size={20} /> Workout Progress
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Completed Workouts</span>
              <span className="font-semibold">
                {workoutHistory.filter(w => w.completed).length}/{workoutHistory.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Total Calories Burned</span>
              <span className="font-semibold">
                {workoutHistory.reduce((sum, w) => sum + w.caloriesBurned, 0)} cal
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Utensils size={20} /> Nutrition Progress
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Meals Completed</span>
              <span className="font-semibold">
                {mealHistory.reduce((sum, m) => sum + m.mealsCompleted, 0)}/
                {mealHistory.reduce((sum, m) => sum + m.totalMeals, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Average Daily Calories</span>
              <span className="font-semibold">
                {Math.round(mealHistory.reduce((sum, m) => sum + m.caloriesConsumed, 0) / mealHistory.length)} cal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedDate ? format(new Date(selectedDate), 'MMMM d, yyyy') : 'Select a Date'}
              </h2>
              <button 
                onClick={() => {
                  setSelectedDate(null);
                  setShowHistoryModal(false);
                }} 
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {!selectedDate ? (
              <>
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setView("workout")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === "workout" 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Workouts
                  </button>
                  <button
                    onClick={() => setView("meal")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === "meal" 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Meals
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-medium text-gray-500 dark:text-gray-400 text-sm">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map(({ day, date, hasWorkout, hasMeal }) => (
                    <button
                      key={date}
                      onClick={() => handleDateClick(date)}
                      className={`aspect-square p-2 rounded-lg flex flex-col items-center justify-center transition-colors
                        ${date === selectedDate 
                          ? 'bg-indigo-600 text-white' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                        ${currentDate.getDate() === day ? 'border border-indigo-400 dark:border-indigo-500' : ''}
                      `}
                    >
                      <span>{day}</span>
                      <div className="flex mt-1 space-x-1">
                        {hasWorkout && (
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        )}
                        {hasMeal && (
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setView("workout")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === "workout" 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Workout
                  </button>
                  <button
                    onClick={() => setView("meal")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === "meal" 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Meal
                  </button>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Back to Calendar
                  </button>
                </div>

                {view === "workout" ? (
                  selectedData ? (
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg dark:text-white">
                          {(selectedData as WorkoutHistory).workoutName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${
                          (selectedData as WorkoutHistory).completed 
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' 
                            : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'
                        }`}>
                          {(selectedData as WorkoutHistory).completed ? (
                            <Check size={14} />
                          ) : (
                            <X size={14} />
                          )}
                          {(selectedData as WorkoutHistory).completed ? 'Completed' : 'Missed'}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                        <Clock size={16} className="mr-2" />
                        <span>{(selectedData as WorkoutHistory).duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Flame size={16} className="mr-2" />
                        <span>{(selectedData as WorkoutHistory).caloriesBurned} calories burned</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No workout data for this day
                    </div>
                  )
                ) : (
                  selectedData ? (
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2 dark:text-white">Meal Completion</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-300">Meals completed:</span>
                        <span className="font-semibold dark:text-white">
                          {(selectedData as MealHistory).mealsCompleted}/{(selectedData as MealHistory).totalMeals}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Calories consumed:</span>
                        <span className="font-semibold dark:text-white">
                          {(selectedData as MealHistory).caloriesConsumed} cal
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No meal data for this day
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;