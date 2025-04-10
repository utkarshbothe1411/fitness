import React, { useState, useEffect } from "react";
import { Activity, RefreshCw, TrendingUp, Award, Heart, Clock, Zap, Moon, Sun } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const StepCounter: React.FC = () => {
  const [steps, setSteps] = useState<number>(0);
  const [goal, setGoal] = useState<number>(10000);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Default to dark mode
  const [weeklyData, setWeeklyData] = useState<{day: string, steps: number}[]>([]);
  const [activeTime, setActiveTime] = useState<number>(0);
  const [heartRate, setHeartRate] = useState<number>(72);

  // Calculate progress percentage
  useEffect(() => {
    setProgress(Math.min(Math.floor((steps / goal) * 100), 100));
  }, [steps, goal]);

  // Generate mock weekly data
  useEffect(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const mockData = days.map(day => ({
      day,
      steps: Math.floor(Math.random() * 15000)
    }));
    setWeeklyData(mockData);
    setActiveTime(Math.floor(Math.random() * 240)); // 0-4 hours
    setHeartRate(Math.floor(Math.random() * 40) + 60); // 60-100 bpm
  }, []);

  // Simulate API fetch with loading state
  const fetchSteps = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setSteps(Math.floor(Math.random() * 15000)); // More realistic range
      setIsSyncing(false);
    }, 1500); // Simulate network delay
  };

  // Generate gradient color based on progress
  const getProgressColor = () => {
    if (progress < 30) return "from-red-400 to-red-600";
    if (progress < 70) return "from-yellow-400 to-yellow-600";
    return "from-green-400 to-green-600";
  };

  // Data for pie chart
  const pieData = [
    { name: 'Completed', value: steps },
    { name: 'Remaining', value: Math.max(0, goal - steps) }
  ];

  const COLORS = ['#0088FE', '#FFBB28'];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Fitness Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-800 text-gray-200"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Step Counter Card */}
          <div className="lg:col-span-2 bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-900 rounded-full">
                  <Activity className="w-5 h-5 text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">Step Tracker</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300">Goal:</span>
                  <input
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(Number(e.target.value))}
                    className="w-20 px-2 py-1 rounded-lg bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <button
                  onClick={fetchSteps}
                  disabled={isSyncing}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${isSyncing ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">Daily Goal: {goal.toLocaleString()}</span>
                <span className="text-sm font-semibold text-blue-400">{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className={`h-4 rounded-full bg-gradient-to-r ${getProgressColor()}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-white">{steps.toLocaleString()}</div>
                <div className="text-sm text-gray-400 flex items-center">
                  <Activity className="w-4 h-4 mr-1" /> Steps
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-white">{Math.floor(steps * 0.04).toLocaleString()}</div>
                <div className="text-sm text-gray-400 flex items-center">
                  <Zap className="w-4 h-4 mr-1" /> Calories
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-white">{Math.floor(steps / 1320).toLocaleString()}</div>
                <div className="text-sm text-gray-400">Kilometers</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-white">{Math.floor(steps / 2000).toLocaleString()}</div>
                <div className="text-sm text-gray-400 flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> Active mins
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-900/30 p-4 rounded-xl border border-blue-800/50">
                <h3 className="font-semibold text-white mb-3 flex items-center">
                  <Heart className="w-5 h-5 text-red-400 mr-2" /> Heart Rate
                </h3>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-white">{heartRate}</span>
                  <span className="text-gray-400 mb-1">bpm</span>
                </div>
                <div className="mt-2 h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-2 rounded-full bg-red-500" 
                    style={{ width: `${Math.min(100, (heartRate - 60) / 0.4)}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2 text-gray-300">
                  {heartRate < 70 ? 'Resting' : heartRate < 90 ? 'Normal' : 'Elevated'}
                </p>
              </div>

              <div className="bg-green-900/30 p-4 rounded-xl border border-green-800/50">
                <h3 className="font-semibold text-white mb-3 flex items-center">
                  <Clock className="w-5 h-5 text-green-400 mr-2" /> Active Time
                </h3>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-white">
                    {Math.floor(activeTime / 60)}h {activeTime % 60}m
                  </span>
                </div>
                <div className="mt-2 h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-2 rounded-full bg-green-500" 
                    style={{ width: `${Math.min(100, (activeTime / 240) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2 text-gray-300">
                  {activeTime < 60 ? 'Keep moving!' : activeTime < 120 ? 'Good activity!' : 'Excellent work!'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Progress Pie Chart */}
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Goal Progress</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [value, value === steps ? 'Steps taken' : 'Steps remaining']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <span className="text-sm text-gray-300">Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-400 rounded-full mr-1"></div>
                  <span className="text-sm text-gray-300">Remaining</span>
                </div>
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Weekly Activity</h3>
              <div className="space-y-3">
                {weeklyData.map((dayData) => (
                  <div key={dayData.day} className="flex items-center">
                    <span className="w-10 text-gray-300">{dayData.day}</span>
                    <div className="flex-1 mx-2">
                      <div className="h-3 bg-gray-700 rounded-full">
                        <div 
                          className="h-3 rounded-full bg-blue-500" 
                          style={{ width: `${Math.min(100, (dayData.steps / 15000) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="w-16 text-right text-white">
                      {dayData.steps.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Card */}
            <div className={`p-4 rounded-xl ${progress >= 100 
              ? 'bg-gradient-to-br from-green-900 to-green-800 border border-green-800' 
              : 'bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-800'}`}>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-300" />
                <div>
                  <h3 className="font-semibold text-white">Activity Trend</h3>
                  <p className="text-sm text-gray-300">
                    {progress >= 100 
                      ? "You crushed your goal! 🎉 Time to celebrate!" 
                      : progress > 70 
                      ? `Almost there! Just ${goal - steps} steps to go!` 
                      : progress > 30
                      ? "You're making progress! Keep it up!"
                      : "Every journey begins with a single step!"}
                  </p>
                </div>
              </div>
            </div>

            {progress >= 100 && (
              <div className="mt-4 p-4 bg-yellow-900 rounded-xl flex items-center justify-center border border-yellow-800">
                <Award className="w-6 h-6 text-yellow-300 mr-2" />
                <span className="text-lg font-medium text-yellow-200">
                  Daily goal achieved! 🎉
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCounter;