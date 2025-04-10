import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Moon, Sunrise, Clock, Activity, Zap, Droplet } from "lucide-react";

type SleepStage = {
  name: string;
  value: number;
  color: string;
};

type SleepLogEntry = {
  date: string;
  sleepTime: string;
  wakeTime: string;
  totalHours: number;
  deepSleep: number;
  lightSleep: number;
  remSleep: number;
  wakeUps: number;
  sleepQuality: number;
  heartRate: number;
  recommendation: string;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SleepTracker: React.FC = () => {
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [log, setLog] = useState<SleepLogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"log" | "stats" | "trends">("log");
  const [sleepStages, setSleepStages] = useState<SleepStage[]>([]);

  // Pre-load sample data
  useEffect(() => {
    const sampleData: SleepLogEntry[] = [
      {
        date: "2025-04-01",
        sleepTime: "22:30",
        wakeTime: "06:45",
        totalHours: 8.25,
        deepSleep: 2.1,
        lightSleep: 4.5,
        remSleep: 1.4,
        wakeUps: 2,
        sleepQuality: 85,
        heartRate: 58,
        recommendation: "Excellent sleep duration. Keep it up!"
      },
      {
        date: "2025-04-02",
        sleepTime: "23:15",
        wakeTime: "06:30",
        totalHours: 7.25,
        deepSleep: 1.8,
        lightSleep: 4.2,
        remSleep: 1.1,
        wakeUps: 3,
        sleepQuality: 78,
        heartRate: 62,
        recommendation: "Good sleep, try going to bed earlier"
      },
      {
        date: "2025-04-03",
        sleepTime: "00:30",
        wakeTime: "07:00",
        totalHours: 6.5,
        deepSleep: 1.2,
        lightSleep: 4.0,
        remSleep: 1.0,
        wakeUps: 4,
        sleepQuality: 65,
        heartRate: 65,
        recommendation: "Moderate sleep debt. Prioritize rest."
      }
    ];

    setLog(sampleData);
    updateSleepStages(sampleData[0]); // Show first entry's data in chart initially
  }, []);

  const calculateSleep = () => {
    if (!sleepTime || !wakeTime) {
      alert("Please enter both sleep and wake times.");
      return;
    }

    const sleepDate = new Date(`2022-01-01T${sleepTime}`);
    const wakeDate = new Date(`2022-01-01T${wakeTime}`);
    const diffHours = (wakeDate.getTime() - sleepDate.getTime()) / (1000 * 60 * 60);

    const newEntry: SleepLogEntry = {
      date: new Date().toLocaleDateString(),
      sleepTime,
      wakeTime,
      totalHours: parseFloat(diffHours.toFixed(1)),
      deepSleep: Math.random() * 3 + 1,
      lightSleep: Math.random() * 4 + 2,
      remSleep: Math.random() * 2 + 0.5,
      wakeUps: Math.floor(Math.random() * 5),
      sleepQuality: Math.floor(Math.random() * 40 + 60),
      heartRate: Math.floor(Math.random() * 20 + 50),
      recommendation: getRecommendation(diffHours),
    };

    setLog([...log, newEntry]);
    updateSleepStages(newEntry);
    setSleepTime("");
    setWakeTime("");
  };

  const getRecommendation = (hours: number) => {
    if (hours < 6) return "Severe sleep deprivation. Prioritize rest.";
    if (hours < 7) return "Moderate sleep debt. Try to sleep earlier.";
    if (hours > 9) return "Good duration, but check sleep quality.";
    return "Excellent sleep duration. Keep it up!";
  };

  const updateSleepStages = (entry: SleepLogEntry) => {
    setSleepStages([
      { name: "Deep Sleep", value: parseFloat(entry.deepSleep.toFixed(1)), color: COLORS[0] },
      { name: "Light Sleep", value: parseFloat(entry.lightSleep.toFixed(1)), color: COLORS[1] },
      { name: "REM", value: parseFloat(entry.remSleep.toFixed(1)), color: COLORS[2] },
      { name: "Awake", value: 0.5 * entry.wakeUps, color: COLORS[3] },
    ]);
  };

  const handleLogEntryClick = (entry: SleepLogEntry) => {
    updateSleepStages(entry);
    setActiveTab("stats"); // Switch to stats tab to see the chart
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <Moon className="text-indigo-600" /> Sleep Tracker
      </h2>

      {/* Input form remains the same */}
      <div className="flex space-x-4 my-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sleep Time
          </label>
          <input
            type="time"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Wake Time
          </label>
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <button
          onClick={calculateSleep}
          className="self-end px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Log Sleep
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`px-4 py-2 ${activeTab === "log" ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setActiveTab("log")}
        >
          Sleep Log
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "stats" ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setActiveTab("stats")}
        >
          Sleep Stats
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "trends" ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setActiveTab("trends")}
        >
          Trends
        </button>
      </div>

      {activeTab === "log" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Sleep Sessions</h3>
          {log.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No sleep data logged yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {log.map((entry, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleLogEntryClick(entry)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {entry.date}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {entry.sleepTime} - {entry.wakeTime}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                      {entry.totalHours}h
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm">
                      <Activity className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Quality: {entry.sleepQuality}%
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Zap className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Wake-ups: {entry.wakeUps}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Droplet className="w-4 h-4 mr-2 text-red-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Heart rate: {entry.heartRate} bpm
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    {entry.recommendation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "stats" && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sleep Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-500" /> Sleep Stages
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sleepStages}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sleepStages.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} hours`, name]} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                Click on sleep entries to view their stage breakdown
              </p>
            </div>

            {/* Rest of the stats content remains the same */}
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center">
                  <Sunrise className="w-5 h-5 mr-2 text-yellow-500" /> Sleep Statistics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow">
                    <p className="text-sm text-gray-500 dark:text-gray-300">Avg. Duration</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {log.length > 0 
                        ? (log.reduce((sum, entry) => sum + entry.totalHours, 0) / log.length).toFixed(1) + "h"
                        : "N/A"}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow">
                    <p className="text-sm text-gray-500 dark:text-gray-300">Avg. Quality</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {log.length > 0 
                        ? (log.reduce((sum, entry) => sum + entry.sleepQuality, 0) / log.length).toFixed(0) + "%"
                        : "N/A"}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow">
                    <p className="text-sm text-gray-500 dark:text-gray-300">Avg. Wake-ups</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {log.length > 0 
                        ? (log.reduce((sum, entry) => sum + entry.wakeUps, 0) / log.length).toFixed(1)
                        : "N/A"}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow">
                    <p className="text-sm text-gray-500 dark:text-gray-300">Heart Rate</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {log.length > 0 
                        ? (log.reduce((sum, entry) => sum + entry.heartRate, 0) / log.length).toFixed(0) + " bpm"
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Maintain consistent sleep schedule</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Limit screen time before bed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Keep bedroom cool and dark</span>
                  </li>
                  {log.length > 0 && log[log.length - 1].totalHours < 7 && (
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">!</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        Consider going to bed earlier to increase sleep duration
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "trends" && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Sleep trends visualization coming soon</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            This will show your weekly/monthly sleep patterns and improvements
          </p>
        </div>
      )}
    </div>
  );
};

export default SleepTracker;