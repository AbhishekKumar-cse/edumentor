
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Profile = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  studyGoals: string;
};

type ProfileContextType = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  isLoading: boolean;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might fetch this from an API
    // For now, we simulate a load with a timeout
    setTimeout(() => {
        setProfile({
            name: 'Student',
            email: 'student@example.com',
            bio: 'A passionate learner exploring the world of science and mathematics.',
            avatar: 'https://picsum.photos/100',
            studyGoals: 'Ace the upcoming physics exam and master calculus.',
        });
        setIsLoading(false);
    }, 500);
  }, []);
  
  const handleSetProfile = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile: handleSetProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
