import React, { useState } from 'react';

type Friend = {
  id: string;
  name: string;
  avatar: string;
  fitnessLevel: string;
};

const FriendConnections: React.FC<{
  friends: Friend[];
  onAddFriend: (id: string) => void;
}> = ({ friends, onAddFriend }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addingFriendId, setAddingFriendId] = useState<string | null>(null);

  // Mock suggested friends - in a real app this would come from an API
  const suggestedFriends = [
    { id: '3', name: 'Aditya Kale', avatar: '👨', fitnessLevel: 'Beginner' },
    { id: '4', name: 'Annany Sharma', avatar: '👨', fitnessLevel: 'Advanced' },
    { id: '5', name: 'Jagjit Bhosale', avatar: '👨', fitnessLevel: 'Intermediate' },
    { id: '6', name: 'Arjun Bhosale', avatar: '👨', fitnessLevel: 'Advanced' },
    { id: '7', name: 'Rushikesh Potdar', avatar: '👨', fitnessLevel: 'Intermediate' },
    { id: '8', name: 'Prathamesh Jawahire', avatar: '👨', fitnessLevel: 'Beginner' },
    { id: '9', name: 'Sujal Gaikwad', avatar: '👨', fitnessLevel: 'Advanced' },
    { id: '10', name: 'Ryan Reynolds', avatar: '👨', fitnessLevel: 'Intermediate' },
    { id: '11', name: 'Brie Larson', avatar: '👩', fitnessLevel: 'Beginner' },
    { id: '12', name: 'Chris Hemsworth', avatar: '👨', fitnessLevel: 'Advanced' },
    { id: '13', name: 'Scarlett Johansson', avatar: '👩', fitnessLevel: 'Intermediate' },
    { id: '14', name: 'Robert Downey Jr.', avatar: '👨', fitnessLevel: 'Advanced' }
  ];

  const handleAddFriend = (id: string) => {
    if (addingFriendId) return; // Prevent multiple clicks
    
    setAddingFriendId(id);
    onAddFriend(id);
    
    // Reset after a small delay to allow state update
    setTimeout(() => {
      setAddingFriendId(null);
    }, 500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Fitness Friends</h3>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for friends..."
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700 dark:text-gray-300">Your Connections</h4>
        {friends.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {friends.map(friend => (
              <div key={friend.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-2xl mr-3">{friend.avatar}</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{friend.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {friend.fitnessLevel} Level
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">You haven't added any friends yet</p>
        )}

        <h4 className="font-medium text-gray-700 dark:text-gray-300 mt-6">Suggested Friends</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestedFriends
            .filter(friend => 
              friend.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
              !friends.some(f => f.id === friend.id) // Don't show already added friends
            )
            .map(friend => (
              <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{friend.avatar}</span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{friend.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {friend.fitnessLevel} Level
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddFriend(friend.id)}
                  disabled={addingFriendId === friend.id}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    addingFriendId === friend.id
                      ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {addingFriendId === friend.id ? 'Adding...' : 'Add'}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FriendConnections;