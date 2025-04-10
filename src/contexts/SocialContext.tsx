import { createContext, useContext, useState } from 'react';
import { Friend, Achievement, Challenge } from '../components/social/types';

type SocialContextType = {
  friends: Friend[];
  achievements: Achievement[];
  challenges: Challenge[];
  addFriend: (friend: Friend) => void;
  shareAchievement: (id: string) => void;
  joinChallenge: (id: string) => void;
};

const SocialContext = createContext<SocialContextType | null>(null);

export const SocialProvider = ({ children }: { children: React.ReactNode }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const addFriend = (friend: Friend) => {
    setFriends(prev => [...prev, friend]);
  };

  const shareAchievement = (id: string) => {
    setAchievements(prev => 
      prev.map(a => a.id === id ? { ...a, shared: true } : a)
    );
  };

  const joinChallenge = (id: string) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === id 
          ? { ...c, joined: true, participants: c.participants + 1 } 
          : c
      )
    );
  };

  return (
    <SocialContext.Provider 
      value={{ friends, achievements, challenges, addFriend, shareAchievement, joinChallenge }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};