import React from 'react';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  shared: boolean;
};

const ProgressBadges: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {
  const handleShare = (id: string) => {
    console.log(`Sharing achievement ${id}`);
    // In a real app, this would trigger an API call
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Your Achievements</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg relative"
          >
            <span className="text-3xl mb-2">{achievement.icon}</span>
            <h4 className="font-semibold text-center text-gray-800 dark:text-white">
              {achievement.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              {achievement.description}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {new Date(achievement.date).toLocaleDateString()}
            </span>
            <button
              onClick={() => handleShare(achievement.id)}
              className={`absolute top-2 right-2 p-1 rounded-full ${
                achievement.shared 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
              title={achievement.shared ? "Shared" : "Share"}
            >
              {achievement.shared ? '✓' : '↗'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBadges;