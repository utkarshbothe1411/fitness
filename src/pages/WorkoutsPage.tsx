import React, { useState } from 'react';
import { Dumbbell, Clock, Calendar, Trophy, Flame, Plus, X } from 'lucide-react';

interface Workout {
  title: string;
  duration: string;
  difficulty: string;
  calories: string;
  schedule: string;
}

const defaultWorkouts: Workout[] = [
  {
    title: "Full Body HIIT",
    duration: "30 mins",
    difficulty: "Intermediate",
    calories: "300-400",
    schedule: "Mon, Wed, Fri"
  },
  {
    title: "Upper Body Strength",
    duration: "45 mins",
    difficulty: "Advanced",
    calories: "250-350",
    schedule: "Tue, Sat"
  },
  {
    title: "Core & Cardio",
    duration: "25 mins",
    difficulty: "Beginner",
    calories: "200-300",
    schedule: "Thu, Sun"
  },
  {
    title: "Yoga Flow",
    duration: "40 mins",
    difficulty: "All Levels",
    calories: "150-250",
    schedule: "Daily"
  },
  {
    title: "Lower Body Burn",
    duration: "35 mins",
    difficulty: "Intermediate",
    calories: "280-380",
    schedule: "Mon, Thu"
  },
  {
    title: "Tabata Training",
    duration: "20 mins",
    difficulty: "Advanced",
    calories: "350-450",
    schedule: "Wed, Fri"
  },
  {
    title: "Pilates Core",
    duration: "30 mins",
    difficulty: "Beginner",
    calories: "180-250",
    schedule: "Tue, Thu, Sat"
  },
  {
    title: "Functional Fitness",
    duration: "40 mins",
    difficulty: "Intermediate",
    calories: "250-350",
    schedule: "Mon, Wed, Fri"
  }
];

const WorkoutsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [customWorkouts, setCustomWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState<Workout>({
    title: '',
    duration: '',
    difficulty: 'Beginner',
    calories: '',
    schedule: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkout.title || !newWorkout.duration) return;
    
    setCustomWorkouts(prev => [...prev, newWorkout]);
    setNewWorkout({
      title: '',
      duration: '',
      difficulty: 'Beginner',
      calories: '',
      schedule: ''
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 dark:bg-gray-900 dark:text-white min-h-screen p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Workout Plan</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Create Custom Workout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {defaultWorkouts.map((workout, index) => (
          <WorkoutCard key={`default-${index}`} workout={workout} />
        ))}
        
        {customWorkouts.map((workout, index) => (
          <WorkoutCard key={`custom-${index}`} workout={workout} />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Custom Workout</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Workout Title</label>
                <input
                  type="text"
                  name="title"
                  value={newWorkout.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (mins)</label>
                <input
                  type="text"
                  name="duration"
                  value={newWorkout.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={newWorkout.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Calories Burned</label>
                <input
                  type="text"
                  name="calories"
                  value={newWorkout.calories}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 200-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schedule</label>
                <input
                  type="text"
                  name="schedule"
                  value={newWorkout.schedule}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Mon, Wed, Fri"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Workout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
          <Dumbbell className="text-indigo-600 dark:text-indigo-300" size={24} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{workout.title}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Clock size={18} className="mr-2" />
          <span>{workout.duration}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Trophy size={18} className="mr-2" />
          <span>{workout.difficulty}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Flame size={18} className="mr-2" />
          <span>{workout.calories} cal</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Calendar size={18} className="mr-2" />
          <span>{workout.schedule}</span>
        </div>
      </div>

      <button className="mt-4 w-full py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
        Start Workout
      </button>
    </div>
  );
};

export default WorkoutsPage;