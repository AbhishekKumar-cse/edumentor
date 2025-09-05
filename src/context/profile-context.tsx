"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Profile = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  studyGoals: string;
};

type ProfileContextType = {
  profile: Profile;
  setProfile: (profile: Profile) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({
    name: 'Student',
    email: 'student@example.com',
    bio: 'A passionate learner exploring the world of science and mathematics.',
    avatar: 'https://picsum.photos/100',
    studyGoals: 'Ace the upcoming physics exam and master calculus.',
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
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
