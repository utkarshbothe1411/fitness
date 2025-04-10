import React from 'react';

interface Suggestion {
  icon: string;
  title: string;
  description: string;
  tag: string;
}

const suggestions: Suggestion[] = [
  {
    icon: "🏋️‍♂️",
    title: "Workout Suggestion",
    description: "Try HIIT training today - 20 minutes of high-intensity intervals can boost your metabolism.",
    tag: "Exercise"
  },
  {
    icon: "🍏",
    title: "Nutrition Tip",
    description: "Add more leafy greens to your next meal to boost your iron and vitamin intake.",
    tag: "Nutrition"
  },
  {
    icon: "❤️",
    title: "Health Insight",
    description: "Your heart rate variability has improved! Keep maintaining regular exercise patterns.",
    tag: "Health"
  },
  {
    icon: "🧘",
    title: "Mindfulness",
    description: "Take 5 minutes to meditate - it can help reduce stress and improve focus.",
    tag: "Wellness"
  },
  {
    icon: "☕",
    title: "Habit Building",
    description: "Replace your afternoon coffee with green tea for better sleep quality.",
    tag: "Lifestyle"
  },
  {
    icon: "☀️",
    title: "Daily Challenge",
    description: "Get 15 minutes of morning sunlight to regulate your circadian rhythm.",
    tag: "Challenge"
  }
];

const Suggestions: React.FC = () => {
  return (
    <div className="glass-effect p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Personalized Insights</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          View All
        </button>
      </div>

      {/* Suggestions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-4 p-4 rounded-lg bg-white/50 hover:bg-white/80 
            transition-colors duration-200 cursor-pointer"
          >
            <div className="p-2 bg-white rounded-full shadow-sm text-2xl">
              {suggestion.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {suggestion.tag}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
