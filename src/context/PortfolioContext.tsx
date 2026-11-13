import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PortfolioData, 
  PortfolioProfile, 
  Publication, 
  ResearchInterest, 
  Experience, 
  Project, 
  SkillCategory, 
  LeadershipActivity, 
  Announcement, 
  ContactMessage 
} from '../types/portfolio';
import { initialPortfolioData } from '../data/initialData';

interface PortfolioContextType {
  data: PortfolioData;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAdminLoggedIn: boolean;
  activeView: 'portfolio' | 'admin';
  setActiveView: (view: 'portfolio' | 'admin') => void;
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  updateProfile: (profile: PortfolioProfile) => void;
  // Publications
  addPublication: (publication: Publication) => void;
  updatePublication: (publication: Publication) => void;
  deletePublication: (id: string) => void;
  // Research Interests
  addResearchInterest: (interest: ResearchInterest) => void;
  updateResearchInterest: (interest: ResearchInterest) => void;
  deleteResearchInterest: (id: string) => void;
  // Experience
  addExperience: (experience: Experience) => void;
  updateExperience: (experience: Experience) => void;
  deleteExperience: (id: string) => void;
  // Projects
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  // Skills
  updateSkillCategories: (categories: SkillCategory[]) => void;
  // Leadership
  addLeadership: (activity: LeadershipActivity) => void;
  updateLeadership: (activity: LeadershipActivity) => void;
  deleteLeadership: (id: string) => void;
  // Announcements
  addAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
  // Messages
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  // System
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  resetToDefaultData: () => void;
  setAdminPassword: (newPassword: string) => Promise<void>;
}

const STORAGE_KEY = 'emran_portfolio_data_v1';
const PASSKEY_KEY = 'emran_admin_passkey_v1';
const AUTH_SESSION_KEY = 'emran_admin_session_v1';
// SHA-256 hash of the default passkey — plaintext is never stored or compared directly
const DEFAULT_PASSKEY_HASH = '978a93771473ad4c59b91e581e292f5f664ee16e9619d3f4406d51e5d2eb9fba';

async function hashPasskey(passkey: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(passkey);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'authenticated';
  });

  // Active view: public portfolio or private admin panel
  const [activeView, setActiveView] = useState<'portfolio' | 'admin'>(() => {
    if (window.location.hash === '#admin') return 'admin';
    return 'portfolio';
  });

  // Main portfolio data state with localStorage persistence
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure publications and profile exist
        if (parsed.profile && parsed.publications) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse stored portfolio data', e);
    }
    return initialPortfolioData;
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  }, [data]);

  // Sync theme with HTML document class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Sync URL hash with view
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setActiveView('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const loginAdmin = async (password: string): Promise<boolean> => {
    const inputHash = await hashPasskey(password);
    let savedHash = localStorage.getItem(PASSKEY_KEY);
    // Auto-migrate: if stored value is old plaintext (not 64-char hex), re-hash it
    if (savedHash && savedHash.length !== 64) {
      savedHash = await hashPasskey(savedHash);
      localStorage.setItem(PASSKEY_KEY, savedHash);
    }
    if (!savedHash) savedHash = DEFAULT_PASSKEY_HASH;
    if (inputHash === savedHash) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(AUTH_SESSION_KEY, 'authenticated');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setActiveView('portfolio');
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
  };

  const setAdminPassword = async (newPassword: string): Promise<void> => {
    const hash = await hashPasskey(newPassword);
    localStorage.setItem(PASSKEY_KEY, hash);
  };

  const updateProfile = (profile: PortfolioProfile) => {
    setData(prev => ({ ...prev, profile }));
  };

  // Publications
  const addPublication = (publication: Publication) => {
    setData(prev => ({
      ...prev,
      publications: [publication, ...prev.publications],
      profile: {
        ...prev.profile,
        metrics: {
          ...prev.profile.metrics,
          journalPapers: publication.type === 'journal' ? prev.profile.metrics.journalPapers + 1 : prev.profile.metrics.journalPapers,
          ieeeConferences: publication.type === 'ieee_conference' ? prev.profile.metrics.ieeeConferences + 1 : prev.profile.metrics.ieeeConferences,
        }
      }
    }));
  };

  const updatePublication = (updated: Publication) => {
    setData(prev => ({
      ...prev,
      publications: prev.publications.map(p => p.id === updated.id ? updated : p)
    }));
  };

  const deletePublication = (id: string) => {
    setData(prev => ({
      ...prev,
      publications: prev.publications.filter(p => p.id !== id)
    }));
  };

  // Research Interests
  const addResearchInterest = (interest: ResearchInterest) => {
    setData(prev => ({
      ...prev,
      researchInterests: [...prev.researchInterests, interest]
    }));
  };

  const updateResearchInterest = (interest: ResearchInterest) => {
    setData(prev => ({
      ...prev,
      researchInterests: prev.researchInterests.map(ri => ri.id === interest.id ? interest : ri)
    }));
  };

  const deleteResearchInterest = (id: string) => {
    setData(prev => ({
      ...prev,
      researchInterests: prev.researchInterests.filter(ri => ri.id !== id)
    }));
  };

  // Experience
  const addExperience = (experience: Experience) => {
    setData(prev => ({
      ...prev,
      experiences: [experience, ...prev.experiences]
    }));
  };

  const updateExperience = (experience: Experience) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => e.id === experience.id ? experience : e)
    }));
  };

  const deleteExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }));
  };

  // Projects
  const addProject = (project: Project) => {
    setData(prev => ({
      ...prev,
      projects: [project, ...prev.projects]
    }));
  };

  const updateProject = (project: Project) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === project.id ? project : p)
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Skills
  const updateSkillCategories = (categories: SkillCategory[]) => {
    setData(prev => ({
      ...prev,
      skillCategories: categories
    }));
  };

  // Leadership
  const addLeadership = (activity: LeadershipActivity) => {
    setData(prev => ({
      ...prev,
      leadership: [activity, ...prev.leadership]
    }));
  };

  const updateLeadership = (activity: LeadershipActivity) => {
    setData(prev => ({
      ...prev,
      leadership: prev.leadership.map(l => l.id === activity.id ? activity : l)
    }));
  };

  const deleteLeadership = (id: string) => {
    setData(prev => ({
      ...prev,
      leadership: prev.leadership.filter(l => l.id !== id)
    }));
  };

  // Announcements
  const addAnnouncement = (announcement: Announcement) => {
    setData(prev => ({
      ...prev,
      announcements: [announcement, ...prev.announcements]
    }));
  };

  const updateAnnouncement = (announcement: Announcement) => {
    setData(prev => ({
      ...prev,
      announcements: prev.announcements.map(a => a.id === announcement.id ? announcement : a)
    }));
  };

  const deleteAnnouncement = (id: string) => {
    setData(prev => ({
      ...prev,
      announcements: prev.announcements.filter(a => a.id !== id)
    }));
  };

  // Messages (Inbox)
  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setData(prev => ({
      ...prev,
      messages: [newMessage, ...prev.messages]
    }));
  };

  const markMessageRead = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m => m.id === id ? { ...m, read: true } : m)
    }));
  };

  const deleteMessage = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.filter(m => m.id !== id)
    }));
  };

  // System Import / Export / Reset
  const exportDataJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile && parsed.publications) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import', e);
    }
    return false;
  };

  const resetToDefaultData = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        toggleTheme,
        isAdminLoggedIn,
        activeView,
        setActiveView,
        loginAdmin,
        logoutAdmin,
        updateProfile,
        addPublication,
        updatePublication,
        deletePublication,
        addResearchInterest,
        updateResearchInterest,
        deleteResearchInterest,
        addExperience,
        updateExperience,
        deleteExperience,
        addProject,
        updateProject,
        deleteProject,
        updateSkillCategories,
        addLeadership,
        updateLeadership,
        deleteLeadership,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        addContactMessage,
        markMessageRead,
        deleteMessage,
        exportDataJSON,
        importDataJSON,
        resetToDefaultData,
        setAdminPassword,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
