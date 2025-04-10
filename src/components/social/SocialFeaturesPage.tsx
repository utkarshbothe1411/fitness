import { useState } from 'react';
import ProgressBadges from './ProgressBadges';
import FriendConnections from './FriendConnections';
import CommunityChallenges from './CommunityChallenges';
import ShareAchievementModal from './ShareAchievementModal';

// Define types
type Friend = {
  id: string;
  name: string;
  avatar: string;
  fitnessLevel: string;
};

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  shared: boolean;
};

type Challenge = {
  id: string;
  title: string;
  description: string;
  participants: number;
  startDate: string;
  endDate: string;
  joined: boolean;
};

// Mock data
const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: '5K Runner',
    description: 'Completed your first 5K run',
    icon: '🏃',
    date: '2023-05-15',
    shared: false
  },
  {
    id: '2',
    title: 'Weight Loss',
    description: 'Lost 5kg this month',
    icon: '⚖️',
    date: '2023-06-02',
    shared: true
  }
];

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: '30-Day Plank Challenge',
    description: 'Increase your plank time from 30 seconds to 5 minutes in 30 days',
    participants: 42,
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    joined: false
  },
  {
    id: '2',
    title: '10K Steps Daily',
    description: 'Walk 10,000 steps every day for a month',
    participants: 87,
    startDate: '2023-04-1',
    endDate: '2023-04-15',
    joined: true
  },
  {
    id: '3',
    title: '10K Steps Daily',
    description: 'Walk 10,000 steps every day for a month',
    participants: 87,
    startDate: '2023-04-1',
    endDate: '2023-04-15',
    joined: true
  }
];

const SocialFeaturesPage = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isAddingFriend, setIsAddingFriend] = useState(false); // New state to track adding status

  const handleAddFriend = (friendId: string) => {
    if (isAddingFriend) return; // Prevent multiple clicks
    
    setIsAddingFriend(true);
    
    // In a real app, this would be an API call
    const newFriend: Friend = {
      id: friendId,
      name: `Friend ${friends.length + 1}`,
      avatar: '👤',
      fitnessLevel: 'Intermediate'
    };
    
    setFriends(prev => [...prev, newFriend]);
    
    // Reset after a small delay to allow state update
    setTimeout(() => {
      setIsAddingFriend(false);
    }, 500);
  };

  const handleJoinChallenge = (id: string) => {
    setChallenges(prev => 
      prev.map(c => 
        c.id === id ? { ...c, joined: true, participants: c.participants + 1 } : c
      )
    );
  };

  const handleShareAchievement = (message: string) => {
    if (selectedAchievement) {
      console.log('Sharing:', selectedAchievement.title, 'with message:', message);
      
      setAchievements(prev =>
        prev.map(a =>
          a.id === selectedAchievement.id ? { ...a, shared: true } : a
        )
      );
      
      setSelectedAchievement(null);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <ProgressBadges 
        achievements={achievements} 
        onShare={setSelectedAchievement} 
      />
      <FriendConnections 
        friends={friends} 
        onAddFriend={handleAddFriend} 
        isAddingFriend={isAddingFriend} // Pass the loading state
      />
      <CommunityChallenges 
        challenges={challenges} 
        onJoinChallenge={handleJoinChallenge} 
      />
      
      {selectedAchievement && (
        <ShareAchievementModal
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
          onShare={handleShareAchievement}
        />
      )}
    </div>
  );
};

export default SocialFeaturesPage;