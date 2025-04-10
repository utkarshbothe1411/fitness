import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  target: string | number;
  icon: string;
  color: string;
  progress: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, target, icon, color, progress }) => {
  const bgColor = color.replace('border-', 'bg-'); // Convert border color to background color

  return (
    <div className={`glass-effect p-6 rounded-xl shadow-lg border-l-4 ${color} card-hover dark:bg-gray-800 dark:border-gray-700`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`${bgColor} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Target: {target}</p>
        </div>
        <div className="text-3xl opacity-80 dark:text-white">{icon}</div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <DashboardCard
        title="Daily Steps"
        value="8,439"
        target="10,000"
        icon="🚶‍♂️"
        color="border-blue-500"
        progress={84}
      />
      <DashboardCard
        title="Calories Burned"
        value="1,850"
        target="2,000"
        icon="🔥"
        color="border-orange-500"
        progress={92}
      />
      <DashboardCard
        title="Protein Intake"
        value="85g"
        target="120g"
        icon="🍗"
        color="border-purple-500"
        progress={70}
      />
      <DashboardCard
        title="Active Minutes"
        value="45"
        target="60"
        icon="⏱️"
        color="border-green-500"
        progress={75}
      />
      <DashboardCard
        title="Heart Rate"
        value="72 bpm"
        target="Zone: Normal"
        icon="❤️"
        color="border-red-500"
        progress={65}
      />
      <DashboardCard
        title="Sleep Hours"
        value="7.5h"
        target="8h"
        icon="🌙"
        color="border-indigo-500"
        progress={94}
      />
      <DashboardCard
        title="Water Intake"
        value="2.1L"
        target="2.5L"
        icon="💧"
        color="border-cyan-500"
        progress={84}
      />
      <DashboardCard
        title="Daily Progress"
        value="85%"
        target="100%"
        icon="📈"
        color="border-emerald-500"
        progress={85}
      />
    </div>
  );
};

export default Dashboard;