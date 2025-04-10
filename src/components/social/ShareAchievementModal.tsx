import React from 'react';
import { X } from 'lucide-react';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
};

const ShareAchievementModal: React.FC<{
  achievement: Achievement | null;
  onClose: () => void;
  onShare: (message: string) => void;
}> = ({ achievement, onClose, onShare }) => {
  const [message, setMessage] = useState('');

  if (!achievement) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <span className="text-5xl mb-3">{achievement.icon}</span>
            <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white">
              Share Your Achievement!
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-1">
              {achievement.title}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add a message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              rows={3}
              placeholder="I just earned this achievement by..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={() => onShare(message)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Share with Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareAchievementModal;