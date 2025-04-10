import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

const ProgressChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'steps' | 'calories' | 'protein' | 'water'>('steps');
  const [currentWeek, setCurrentWeek] = useState(0);

  const metrics = {
    steps: { color: 'bg-blue-500', label: 'Steps', unit: 'steps', icon: '👟', target: 10000 },
    calories: { color: 'bg-orange-500', label: 'Calories', unit: 'kcal', icon: '🔥', target: 2500 },
    protein: { color: 'bg-purple-500', label: 'Protein', unit: 'g', icon: '🍗', target: 120 },
    water: { color: 'bg-cyan-500', label: 'Water', unit: 'L', icon: '💧', target: 3.0 }
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Realistic varying data with clear patterns
  const weeklyData = [
    {
      steps: [4200, 6800, 5700, 8100, 7400, 12500, 9800],  // Weekend spike
      calories: [1850, 2100, 1950, 2300, 2150, 2800, 2400], // Weekend spike
      protein: [65, 85, 72, 95, 88, 110, 102],              // Weekend increase
      water: [1.8, 2.1, 2.0, 2.3, 2.2, 2.7, 2.5]           // Weekend increase
    },
    {
      steps: [3800, 7200, 6100, 7900, 6800, 11800, 10500],  // Different pattern
      calories: [1750, 2250, 2050, 2450, 1950, 2650, 2550], // Different pattern
      protein: [70, 90, 80, 100, 85, 115, 95],              // Different pattern
      water: [1.9, 2.2, 2.1, 2.4, 2.0, 2.8, 2.6]            // Different pattern
    }
  ];

  const currentData = weeklyData[currentWeek % weeklyData.length];
  const values = currentData[activeMetric];
  const targetValue = metrics[activeMetric].target;

  // Calculate statistics
  const weeklyAvg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const weeklyTotal = values.reduce((a, b) => a + b, 0);
  const comparison = ((weeklyTotal / (targetValue * 7)) * 100).toFixed(1);
  const dayWithHighest = days[values.indexOf(Math.max(...values))];
  const dayWithLowest = days[values.indexOf(Math.min(...values))];

  const handlePrevWeek = () => setCurrentWeek(prev => Math.max(0, prev - 1));
  const handleNextWeek = () => setCurrentWeek(prev => prev + 1);

  return (
    <div className="glass-effect p-6 rounded-xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <TrendingUp className="text-blue-500" /> Weekly Progress
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Week {currentWeek + 1} • {metrics[activeMetric].label}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Weekly Avg</p>
            <p className="font-bold dark:text-white">
              {weeklyAvg.toLocaleString()} {metrics[activeMetric].unit}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">vs Target</p>
            <p className={`font-bold ${
              parseFloat(comparison) >= 100 ? 'text-green-500' : 'text-orange-500'
            }`}>
              {comparison}%
            </p>
          </div>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(metrics).map(([key, { color, label, icon }]) => (
          <button
            key={key}
            onClick={() => setActiveMetric(key as any)}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeMetric === key 
                ? `${color} text-white` 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            <span className="mr-1 text-base">{icon}</span> {label}
          </button>
        ))}
      </div>

      {/* Progress Bar Chart */}
      <div className="flex items-end justify-between h-48 gap-1">
        {days.map((day, index) => {
          const value = values[index];
          const percentage = Math.min((value / targetValue) * 100, 100);
          const isWeekend = index >= 5;
          const isHighest = value === Math.max(...values);
          const isLowest = value === Math.min(...values);
          
          return (
            <div key={day} className="flex flex-col items-center w-full">
              <div className="relative w-full group">
                <div
                  className={`w-4/5 mx-auto ${metrics[activeMetric].color} rounded-t transition-all duration-200 ${
                    isHighest ? 'hue-rotate-15 brightness-110 animate-pulse' : 
                    isLowest ? 'brightness-75' : 'opacity-90'
                  } ${isWeekend ? 'ring-2 ring-white dark:ring-gray-600' : ''}`}
                  style={{
                    height: `${percentage}%`,
                    minHeight: '12px',
                  }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white 
                    px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {value.toLocaleString()} {metrics[activeMetric].unit}
                    <div className="text-xs text-gray-300">
                      {percentage.toFixed(0)}% of target
                    </div>
                  </div>
                </div>
              </div>
              <span className={`text-sm mt-2 ${
                isWeekend 
                  ? 'text-blue-500 dark:text-blue-400 font-medium' 
                  : 'text-gray-600 dark:text-gray-400'
              } ${
                isHighest ? 'font-bold text-green-600 dark:text-green-400' :
                isLowest ? 'text-orange-500 dark:text-orange-400' : ''
              }`}>
                {day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Chart footer */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span>Weekdays</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-1 ring-2 ring-blue-200"></div>
            <span>Weekends</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Highest: {dayWithHighest} ({Math.max(...values).toLocaleString()})</span>
          <span>•</span>
          <span>Lowest: {dayWithLowest} ({Math.min(...values).toLocaleString()})</span>
        </div>
        
        <div className="text-right">
          <span className="font-medium">Target: {targetValue.toLocaleString()} {metrics[activeMetric].unit}/day</span>
        </div>
      </div>

      {/* Week navigation */}
      <div className="mt-4 flex justify-center">
        <button 
          onClick={handlePrevWeek}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <button className="flex items-center px-4 py-1 mx-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 rounded-full text-sm">
          <Calendar size={16} className="mr-1" />
          Week {currentWeek + 1}
        </button>
        <button 
          onClick={handleNextWeek}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default ProgressChart;