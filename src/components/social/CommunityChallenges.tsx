import React, { useState } from 'react';

type Challenge = {
  id: string;
  title: string;
  description: string;
  participants: number;
  startDate: string;
  endDate: string;
  joined: boolean;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  badge?: string;
};

const CommunityChallenges: React.FC<{
  challenges: Challenge[];
  onJoinChallenge: (id: string) => void;
}> = ({ challenges, onJoinChallenge }) => {
  const [joiningChallengeId, setJoiningChallengeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'joined' | 'not-joined'>('all');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleJoinChallenge = (id: string) => {
    if (joiningChallengeId) return;
    setJoiningChallengeId(id);
    onJoinChallenge(id);
    setTimeout(() => setJoiningChallengeId(null), 500);
  };

  const filteredChallenges = challenges
    .filter(challenge => 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(challenge => {
      if (filter === 'joined') return challenge.joined;
      if (filter === 'not-joined') return !challenge.joined;
      return true;
    });

  const difficultyColors = {
    Beginner: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Intermediate: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Community Challenges</h3>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search challenges..."
            className="w-full sm:w-64 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <select 
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="all">All Challenges</option>
            <option value="joined">Joined</option>
            <option value="not-joined">Not Joined</option>
          </select>
        </div>
      </div>
      
      {filteredChallenges.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No challenges found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredChallenges.map(challenge => (
            <div key={challenge.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                      {challenge.title}
                    </h4>
                    {challenge.badge && (
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        {challenge.badge}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {challenge.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {challenge.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
                    <span>🗓️ {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}</span>
                    <span>👥 {challenge.participants.toLocaleString()} participants</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleJoinChallenge(challenge.id)}
                  disabled={joiningChallengeId === challenge.id}
                  className={`px-4 py-2 rounded-md min-w-[120px] text-sm ${
                    challenge.joined
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-default'
                      : joiningChallengeId === challenge.id
                        ? 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-200 cursor-wait'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  } transition-colors`}
                >
                  {challenge.joined 
                    ? 'Joined ✓' 
                    : joiningChallengeId === challenge.id 
                      ? 'Joining...' 
                      : 'Join Challenge'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityChallenges;