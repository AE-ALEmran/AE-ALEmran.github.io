import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Publication, 
  ResearchInterest, 
  Experience, 
  Project, 
  LeadershipActivity, 
  Announcement,
  PortfolioProfile,
  PublicationType,
  PublicationStatus
} from '../../types/portfolio';
import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  Cpu, 
  Briefcase, 
  Layers, 
  Award, 
  Bell, 
  Mail, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Check, 
  Download, 
  Upload, 
  RefreshCw, 
  ExternalLink,
  Search,
  Sparkles,
  Shield,
  Sun,
  Moon,
  Loader2,
  Copy,
  FileCode
} from 'lucide-react';
import { compressImage } from '../../utils/imageCompressor';

export const AdminDashboard: React.FC = () => {
  const { 
    data, 
    logoutAdmin, 
    setActiveView, 
    theme, 
    toggleTheme,
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
    markMessageRead,
    deleteMessage,
    exportDataJSON,
    importDataJSON,
    resetToDefaultData,
    setAdminPassword
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'publications' | 'research' | 'experience' | 'projects' | 'skills' | 'leadership' | 'announcements' | 'messages' | 'settings'
  >('overview');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // -------------------------------------------------------------
  // PROFILE TAB STATE
  // -------------------------------------------------------------
  const [profileForm, setProfileForm] = useState<PortfolioProfile>({ ...data.profile });
  const [isCompressingPhoto, setIsCompressingPhoto] = useState(false);

  // Keep form synchronized if underlying data changes (e.g. IndexedDB hydration)
  React.useEffect(() => {
    setProfileForm({ ...data.profile });
  }, [data.profile]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast('Profile information successfully saved!');
  };

  // Image file reader with automatic canvas compression (reduces 5MB to ~40KB)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressingPhoto(true);
    showToast('Compressing and optimizing photo for web...');

    try {
      const result = await compressImage(file, 800, 800, 0.82);
      setProfileForm(prev => ({
        ...prev,
        profileImage: result.dataUrl
      }));
      showToast(
        `Photo optimized: ${result.originalSizeKb} KB → ${result.compressedSizeKb} KB (${result.compressionRatio}% smaller)! Click "Save Profile Changes" to persist.`
      );
    } catch (err) {
      console.warn('Image compression fallback:', err);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
        showToast('Photo uploaded! Click "Save Profile Changes" to persist.');
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressingPhoto(false);
    }
  };

  // -------------------------------------------------------------
  // PUBLICATIONS TAB STATE
  // -------------------------------------------------------------
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [isAddingPub, setIsAddingPub] = useState(false);
  const [pubSearch, setPubSearch] = useState('');
  const [pubToDelete, setPubToDelete] = useState<string | null>(null);

  const [pubForm, setPubForm] = useState<Publication>({
    id: '',
    title: '',
    authors: 'Md. Al Emran et al.',
    venue: '',
    publisher: '',
    year: new Date().getFullYear(),
    type: 'ieee_conference',
    status: 'published',
    doi: '',
    category: 'Intelligent Systems & Activity Recognition',
    abstract: '',
    impactFactor: '',
    isCorrespondingAuthor: false,
    isUndergradThesis: false,
    keywords: []
  });

  const openAddPubModal = () => {
    setPubForm({
      id: `pub-${Date.now()}`,
      title: '',
      authors: 'Md. Al Emran, ...',
      venue: '',
      publisher: '',
      year: new Date().getFullYear(),
      type: 'journal',
      status: 'published',
      doi: '',
      category: 'Intelligent Systems & Activity Recognition',
      abstract: '',
      impactFactor: '',
      isCorrespondingAuthor: false,
      isUndergradThesis: false,
      keywords: []
    });
    setIsAddingPub(true);
    setEditingPub(null);
  };

  const openEditPubModal = (pub: Publication) => {
    setPubForm({ ...pub });
    setEditingPub(pub);
    setIsAddingPub(false);
  };

  const handleSavePublication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubForm.title || !pubForm.venue) return;

    if (editingPub) {
      updatePublication(pubForm);
      showToast('Publication updated successfully!');
    } else {
      addPublication(pubForm);
      showToast('New publication added to catalog!');
    }
    setEditingPub(null);
    setIsAddingPub(false);
  };

  // -------------------------------------------------------------
  // RESEARCH INTERESTS TAB STATE
  // -------------------------------------------------------------
  const [editingInterest, setEditingInterest] = useState<ResearchInterest | null>(null);
  const [interestForm, setInterestForm] = useState<ResearchInterest>({
    id: '',
    title: '',
    description: '',
    iconName: 'Zap',
    isPrimary: true,
    tags: []
  });
  const [interestTagsText, setInterestTagsText] = useState('');

  const openAddInterestModal = () => {
    setInterestForm({
      id: `ri-${Date.now()}`,
      title: '',
      description: '',
      iconName: 'Zap',
      isPrimary: false,
      tags: []
    });
    setInterestTagsText('');
    setEditingInterest({} as any);
  };

  const handleSaveInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = interestTagsText.split(',').map(t => t.trim()).filter(Boolean);
    const updated = { ...interestForm, tags: tagsArray };

    const exists = data.researchInterests.some(ri => ri.id === updated.id);
    if (exists) {
      updateResearchInterest(updated);
      showToast('Research interest updated!');
    } else {
      addResearchInterest(updated);
      showToast('Research interest added!');
    }
    setEditingInterest(null);
  };

  // -------------------------------------------------------------
  // ANNOUNCEMENTS TAB STATE
  // -------------------------------------------------------------
  const [announcementForm, setAnnouncementForm] = useState<Announcement>({
    id: `ann-${Date.now()}`,
    title: '',
    content: '',
    date: 'February 2026',
    tag: 'Publication',
    link: '',
    active: true
  });
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementForm.title) return;
    addAnnouncement(announcementForm);
    showToast('Announcement posted!');
    setIsAddingAnnouncement(false);
    setAnnouncementForm({
      id: `ann-${Date.now()}`,
      title: '',
      content: '',
      date: 'February 2026',
      tag: 'Publication',
      link: '',
      active: true
    });
  };

  // -------------------------------------------------------------
  // SETTINGS & BACKUP STATE
  // -------------------------------------------------------------
  const [newPasskey, setNewPasskey] = useState('');
  const [importJsonText, setImportJsonText] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasskey || newPasskey.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    await setAdminPassword(newPasskey);
    setNewPasskey('');
    showToast('Admin passkey successfully updated!');
  };

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Md_Al_Emran_Portfolio_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON Backup downloaded!');
  };

  const handleDownloadInitialData = () => {
    const fileContent = `import { PortfolioData } from '../types/portfolio';\n\nexport const initialPortfolioData: PortfolioData = ${JSON.stringify(data, null, 2)};\n`;
    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'initialData.ts';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded initialData.ts! Place in src/data/ to deploy for everyone.');
  };

  const handleCopyCode = () => {
    const fileContent = `import { PortfolioData } from '../types/portfolio';\n\nexport const initialPortfolioData: PortfolioData = ${JSON.stringify(data, null, 2)};\n`;
    navigator.clipboard.writeText(fileContent);
    showToast('Copied full initialData.ts code to clipboard!');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataJSON(importJsonText);
    if (ok) {
      showToast('Data imported successfully!');
      setImportJsonText('');
    } else {
      alert('Invalid JSON structure. Please check the format.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 flex flex-col">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-navy-800 px-4 sm:px-6 py-3 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <span>Personal Admin Dashboard</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold">
                  Secure Mode
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Md. Al Emran • Portfolio CMS
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* View live site button */}
            <button
              onClick={() => {
                setActiveView('portfolio');
                window.location.hash = '';
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Website</span>
            </button>

            {/* Theme switch */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Logout */}
            <button
              onClick={logoutAdmin}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="text-xs font-mono font-semibold uppercase text-slate-400 px-3 py-2">
            Admin Sections
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Identity</span>
          </button>

          <button
            onClick={() => setActiveTab('publications')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'publications'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <BookOpen className="w-4 h-4" />
              <span>Publications</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
              {data.publications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'research'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Research Interests</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'experience'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Experience & Visits</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Projects & Prototyping</span>
          </button>

          <button
            onClick={() => setActiveTab('leadership')}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'leadership'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>IEEE Leadership & Awards</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'announcements'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>News & Announcements</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'messages'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4" />
              <span>Contact Messages</span>
            </div>
            {data.messages.filter(m => !m.read).length > 0 && (
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold">
                {data.messages.filter(m => !m.read).length} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings & Backup</span>
          </button>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* ========================================================= */}
          {/* OVERVIEW TAB */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Welcome, Md. Al Emran
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Here is a high-level summary of your academic catalog, publications database, and incoming inquiries.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
                  <div className="text-xs font-mono text-slate-400">Total Publications</div>
                  <div className="text-2xl font-black text-brand-600 dark:text-brand-400 font-mono mt-1">
                    {data.publications.length}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {data.publications.filter(p => p.type === 'journal').length} Journals • {data.publications.filter(p => p.type === 'ieee_conference').length} IEEE Conf
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
                  <div className="text-xs font-mono text-slate-400">Research Focus Areas</div>
                  <div className="text-2xl font-black text-sky-600 dark:text-sky-400 font-mono mt-1">
                    {data.researchInterests.length}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    AI, Power Systems, Microgrids
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
                  <div className="text-xs font-mono text-slate-400">Industrial Attachments</div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mt-1">
                    {data.industrialVisits.length}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Kaptai Hydro • Betbunia SSGS • HVDC
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
                  <div className="text-xs font-mono text-slate-400">Contact Messages</div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                    {data.messages.length}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {data.messages.filter(m => !m.read).length} unread
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  Quick Content Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('publications');
                      openAddPubModal();
                    }}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Publication</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('profile')}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-navy-700 transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Bio & Headline</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('announcements');
                      setIsAddingAnnouncement(true);
                    }}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-navy-700 transition-all"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Post Research Update</span>
                  </button>

                  <button
                    onClick={handleExport}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-navy-700 transition-all ml-auto"
                  >
                    <Download className="w-4 h-4" />
                    <span>Backup Database (JSON)</span>
                  </button>
                </div>
              </div>

              {/* Recent Publications Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Recent Publications in Database
                  </h3>
                  <button
                    onClick={() => setActiveTab('publications')}
                    className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                  >
                    Manage all {data.publications.length} papers
                  </button>
                </div>

                <div className="space-y-2">
                  {data.publications.slice(0, 3).map(pub => (
                    <div
                      key={pub.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex items-center justify-between text-xs"
                    >
                      <div className="truncate mr-4">
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {pub.title}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {pub.venue} ({pub.year}) • {pub.type} • Status: {pub.status}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('publications');
                          openEditPubModal(pub);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-500"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* PROFILE TAB */}
          {/* ========================================================= */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Profile & Identity Management
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Update your public name, headline, short bio, contact info, photo, and academic profile links.
                </p>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-5 text-xs sm:text-sm">
                
                {/* Photo & Basic Details */}
                <div className="flex flex-col sm:flex-row gap-6 items-start p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
                  <div className="relative group shrink-0">
                    <img
                      src={profileForm.profileImage}
                      alt={profileForm.name}
                      className="w-24 h-28 object-cover object-top rounded-xl border border-slate-200 dark:border-navy-700 shadow-md"
                    />
                  </div>

                  <div className="space-y-3 flex-1 w-full">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Profile Photo URL or Upload Local Image
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={profileForm.profileImage}
                          onChange={(e) => setProfileForm({ ...profileForm, profileImage: e.target.value })}
                          className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                          placeholder="/profile.png or URL"
                        />
                        <label className={`px-3 py-2 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer hover:bg-slate-300 dark:hover:bg-navy-700 flex items-center space-x-1 shrink-0 ${isCompressingPhoto ? 'opacity-60 cursor-not-allowed' : ''}`}>
                          {isCompressingPhoto ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-500" />
                              <span>Optimizing...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload File</span>
                            </>
                          )}
                          <input 
                            type="file" 
                            accept="image/*" 
                            disabled={isCompressingPhoto}
                            onChange={handlePhotoUpload} 
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Current Location
                        </label>
                        <input
                          type="text"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Headline */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={profileForm.headline}
                    onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white font-mono text-xs"
                  />
                </div>

                {/* Short Introduction */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Short Bio (Hero Section)
                  </label>
                  <textarea
                    rows={3}
                    value={profileForm.shortBio}
                    onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white text-xs leading-relaxed"
                  />
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                </div>

                {/* Social & Academic Repository Links */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800 space-y-3">
                  <div className="text-xs font-mono font-bold uppercase text-slate-400">
                    Academic Repositories & Social Profiles
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-500 font-mono mb-1">Google Scholar URL</label>
                      <input
                        type="text"
                        value={profileForm.socialLinks.googleScholar}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          socialLinks: { ...profileForm.socialLinks, googleScholar: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 font-mono mb-1">ResearchGate URL</label>
                      <input
                        type="text"
                        value={profileForm.socialLinks.researchGate}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          socialLinks: { ...profileForm.socialLinks, researchGate: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 font-mono mb-1">IEEE Xplorer URL</label>
                      <input
                        type="text"
                        value={profileForm.socialLinks.ieeeXplorer}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          socialLinks: { ...profileForm.socialLinks, ieeeXplorer: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 font-mono mb-1">LinkedIn Profile URL</label>
                      <input
                        type="text"
                        value={profileForm.socialLinks.linkedin}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          socialLinks: { ...profileForm.socialLinks, linkedin: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* PUBLICATIONS TAB */}
          {/* ========================================================= */}
          {activeTab === 'publications' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Publications Database ({data.publications.length})
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Add, edit, or delete journal manuscripts and IEEE conference papers.
                  </p>
                </div>

                <button
                  onClick={openAddPubModal}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-sm transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Publication</span>
                </button>
              </div>

              {/* Google Scholar & ResearchGate Auto-Sync Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-500/10 via-sky-500/5 to-emerald-500/10 border border-brand-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-900 dark:text-white">
                      Connected to Google Scholar & ResearchGate
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-mono text-[10px]">
                      ID: 6wAa7doAAAAJ
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Automated weekly sync runs via GitHub Actions (<code className="font-mono">sync-scholar.yml</code>). When any paper is added on Scholar or ResearchGate, it updates and republishes your website.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://scholar.google.com/citations?user=6wAa7doAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-navy-850 flex items-center space-x-1"
                  >
                    <span>Scholar (56+ Cites)</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                  <a
                    href="https://www.researchgate.net/profile/Md-Emran-12?ev=hdr_xprf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center space-x-1"
                  >
                    <span>ResearchGate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Add / Edit Publication Form Modal */}
              {(isAddingPub || editingPub) && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-brand-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-navy-800 pb-3">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {editingPub ? 'Edit Publication' : 'Add New Publication'}
                    </h3>
                    <button
                      onClick={() => {
                        setEditingPub(null);
                        setIsAddingPub(false);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSavePublication} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Paper Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={pubForm.title}
                        onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                        placeholder="e.g. Cross-Architecture Evaluation for Multi-Class Driver State Recognition..."
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Author List *
                        </label>
                        <input
                          type="text"
                          required
                          value={pubForm.authors}
                          onChange={(e) => setPubForm({ ...pubForm, authors: e.target.value })}
                          placeholder="Md. Al Emran, Md. Ariful Islam, ..."
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Venue (Journal or Conference Name) *
                        </label>
                        <input
                          type="text"
                          required
                          value={pubForm.venue}
                          onChange={(e) => setPubForm({ ...pubForm, venue: e.target.value })}
                          placeholder="e.g. Cognitive Neurodynamics or IEEE ECCE 2025"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Publication Type
                        </label>
                        <select
                          value={pubForm.type}
                          onChange={(e) => setPubForm({ ...pubForm, type: e.target.value as PublicationType })}
                          className="w-full px-2.5 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        >
                          <option value="journal">Journal Paper</option>
                          <option value="ieee_conference">IEEE Conference</option>
                          <option value="under_review">Under Review Manuscript</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Status
                        </label>
                        <select
                          value={pubForm.status}
                          onChange={(e) => setPubForm({ ...pubForm, status: e.target.value as PublicationStatus })}
                          className="w-full px-2.5 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        >
                          <option value="published">Published</option>
                          <option value="accepted">Accepted (In Press)</option>
                          <option value="under_review">Under Review</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Year
                        </label>
                        <input
                          type="number"
                          value={pubForm.year}
                          onChange={(e) => setPubForm({ ...pubForm, year: parseInt(e.target.value) || 2026 })}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Publisher
                        </label>
                        <input
                          type="text"
                          value={pubForm.publisher || ''}
                          onChange={(e) => setPubForm({ ...pubForm, publisher: e.target.value })}
                          placeholder="Springer / Elsevier / IEEE"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                          DOI String (e.g. 10.1007/s11571-025-10376-1)
                        </label>
                        <input
                          type="text"
                          value={pubForm.doi || ''}
                          onChange={(e) => setPubForm({ ...pubForm, doi: e.target.value })}
                          placeholder="10.1109/..."
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Research Category
                        </label>
                        <input
                          type="text"
                          value={pubForm.category}
                          onChange={(e) => setPubForm({ ...pubForm, category: e.target.value })}
                          placeholder="Power Systems / Computer Vision / Agriculture AI"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Impact Factor / SJR (Optional for journals)
                      </label>
                      <input
                        type="text"
                        value={pubForm.impactFactor || ''}
                        onChange={(e) => setPubForm({ ...pubForm, impactFactor: e.target.value })}
                        placeholder="Impact Factor: 3.9 | Q2 Journal"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Paper Abstract / Description
                      </label>
                      <textarea
                        rows={3}
                        value={pubForm.abstract || ''}
                        onChange={(e) => setPubForm({ ...pubForm, abstract: e.target.value })}
                        placeholder="Abstract summary of the paper..."
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center space-x-6 pt-1">
                      <label className="inline-flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pubForm.isCorrespondingAuthor || false}
                          onChange={(e) => setPubForm({ ...pubForm, isCorrespondingAuthor: e.target.checked })}
                          className="rounded text-brand-600 focus:ring-brand-500"
                        />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          Corresponding Author
                        </span>
                      </label>

                      <label className="inline-flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pubForm.isUndergradThesis || false}
                          onChange={(e) => setPubForm({ ...pubForm, isUndergradThesis: e.target.checked })}
                          className="rounded text-brand-600 focus:ring-brand-500"
                        />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          B.Sc. Thesis Paper
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold shadow-sm"
                      >
                        {editingPub ? 'Update Publication' : 'Add to Catalog'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPub(null);
                          setIsAddingPub(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Publications List Table / Cards */}
              <div className="space-y-3">
                {data.publications.map(pub => (
                  <div
                    key={pub.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          pub.type === 'journal' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-sky-500/15 text-sky-600'
                        }`}>
                          {pub.type}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-navy-900 text-slate-700 dark:text-slate-300">
                          {pub.status}
                        </span>
                        <span className="font-mono text-slate-400">
                          {pub.year}
                        </span>
                      </div>

                      <div className="font-bold text-slate-900 dark:text-white">
                        {pub.title}
                      </div>

                      <div className="text-slate-500 truncate">
                        {pub.venue} • {pub.authors}
                      </div>

                      {pub.doi && (
                        <div className="text-[11px] font-mono text-brand-600 dark:text-brand-400">
                          DOI: {pub.doi}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => openEditPubModal(pub)}
                        className="p-2 rounded-lg bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:text-brand-500"
                        title="Edit paper"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {pubToDelete === pub.id ? (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => {
                              deletePublication(pub.id);
                              setPubToDelete(null);
                              showToast('Publication deleted.');
                            }}
                            className="px-2 py-1 rounded bg-rose-600 text-white font-bold text-[10px]"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setPubToDelete(null)}
                            className="px-2 py-1 rounded bg-slate-200 text-slate-700 text-[10px]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setPubToDelete(pub.id)}
                          className="p-2 rounded-lg bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:text-rose-500"
                          title="Delete paper"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* RESEARCH INTERESTS TAB */}
          {/* ========================================================= */}
          {activeTab === 'research' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Research Interests & Focus Areas
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage the scientific domains featured on your public website.
                  </p>
                </div>
                <button
                  onClick={openAddInterestModal}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-brand-600 text-white font-semibold text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Focus Area</span>
                </button>
              </div>

              {editingInterest && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-brand-500/30 space-y-3 text-xs">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {editingInterest.id ? 'Edit Research Area' : 'Add Research Area'}
                  </h3>
                  <form onSubmit={handleSaveInterest} className="space-y-3">
                    <div>
                      <label className="block font-mono mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={interestForm.title}
                        onChange={(e) => setInterestForm({ ...interestForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-mono mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={interestForm.description}
                        onChange={(e) => setInterestForm({ ...interestForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-mono mb-1">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={interestTagsText || interestForm.tags.join(', ')}
                        onChange={(e) => setInterestTagsText(e.target.value)}
                        placeholder="Smart Grids, Microgrids, AI"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={interestForm.isPrimary || false}
                          onChange={(e) => setInterestForm({ ...interestForm, isPrimary: e.target.checked })}
                        />
                        <span>Core Research Focus</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <button type="submit" className="px-4 py-2 rounded-xl bg-brand-600 text-white font-semibold">
                        Save Area
                      </button>
                      <button type="button" onClick={() => setEditingInterest(null)} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-3">
                {data.researchInterests.map(ri => (
                  <div
                    key={ri.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {ri.title}
                      </div>
                      <div className="text-slate-500 mt-1">
                        {ri.description}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ri.tags.map((t, idx) => (
                          <span key={idx} className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-900 text-slate-600 dark:text-slate-400">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => {
                          setInterestForm({ ...ri });
                          setInterestTagsText(ri.tags.join(', '));
                          setEditingInterest(ri);
                        }}
                        className="p-2 rounded-lg bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          deleteResearchInterest(ri.id);
                          showToast('Interest deleted.');
                        }}
                        className="p-2 rounded-lg bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* CONTACT MESSAGES INBOX TAB */}
          {/* ========================================================= */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Contact Messages Inbox ({data.messages.length})
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Inquiries and collaboration requests submitted through your website contact form.
                </p>
              </div>

              {data.messages.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-slate-400 text-xs">
                  <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span>No messages received yet. Messages sent via the public contact form will appear here.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        !msg.read 
                          ? 'bg-brand-50/50 dark:bg-brand-950/20 border-brand-500/30' 
                          : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-navy-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {msg.name}
                          </span>
                          <span className="text-slate-400 font-mono">
                            ({msg.email})
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {msg.date}
                        </span>
                      </div>

                      <div className="font-semibold text-brand-600 dark:text-brand-400">
                        Subject: {msg.subject}
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-navy-900 p-3 rounded-lg border border-slate-200/80 dark:border-navy-850">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="inline-flex items-center space-x-1 text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email</span>
                        </a>

                        <div className="flex items-center space-x-2">
                          {!msg.read && (
                            <button
                              onClick={() => markMessageRead(msg.id)}
                              className="px-2 py-1 rounded bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 text-[10px]"
                            >
                              Mark as Read
                            </button>
                          )}
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* ANNOUNCEMENTS TAB */}
          {/* ========================================================= */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    News & Announcements
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Display research updates, new paper acceptances, and milestones.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingAnnouncement(true)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-brand-600 text-white font-semibold text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Announcement</span>
                </button>
              </div>

              {isAddingAnnouncement && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-brand-500/30 space-y-3 text-xs">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Create New Announcement
                  </h3>
                  <form onSubmit={handleSaveAnnouncement} className="space-y-3">
                    <div>
                      <label className="block font-mono mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={announcementForm.title}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                        placeholder="e.g. Paper accepted in Measurement (Elsevier)"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-mono mb-1">Content *</label>
                      <textarea
                        rows={2}
                        required
                        value={announcementForm.content}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                        placeholder="Details of the update..."
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono mb-1">Date</label>
                        <input
                          type="text"
                          value={announcementForm.date}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, date: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-mono mb-1">Direct Link (DOI or URL)</label>
                        <input
                          type="text"
                          value={announcementForm.link || ''}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, link: e.target.value })}
                          placeholder="https://doi.org/..."
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <button type="submit" className="px-4 py-2 rounded-xl bg-brand-600 text-white font-semibold">
                        Post Announcement
                      </button>
                      <button type="button" onClick={() => setIsAddingAnnouncement(false)} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-3">
                {data.announcements.map(ann => (
                  <div
                    key={ann.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {ann.title}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          ({ann.date})
                        </span>
                      </div>
                      <p className="text-slate-500 mt-1">
                        {ann.content}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        deleteAnnouncement(ann.id);
                        showToast('Announcement removed.');
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SETTINGS, BACKUP & CLOUD SYNC TAB */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Security, Backup & Cloud Database
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage passkey, export JSON backups, import data, and connect Supabase / Firebase.
                </p>
              </div>

              {/* Passkey Change */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800 space-y-3 text-xs">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Change Administrator Passkey
                </h3>
                <form onSubmit={handlePasswordChange} className="flex gap-2 max-w-md">
                  <input
                    type="password"
                    value={newPasskey}
                    onChange={(e) => setNewPasskey(e.target.value)}
                    placeholder="Enter new administrator passkey..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold"
                  >
                    Update Passkey
                  </button>
                </form>
              </div>

              {/* Backup & Restore */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800 space-y-4 text-xs">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Full Database Backup & Restore
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleExport}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to restore original default CV data? Any local edits will be reset.')) {
                        resetToDefaultData();
                        showToast('Reset to default CV data!');
                      }
                    }}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-semibold hover:bg-rose-500/20"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset to Default CV Data</span>
                  </button>
                </div>

                <div className="pt-2">
                  <label className="block font-mono mb-1 text-slate-500">
                    Import JSON Backup Data:
                  </label>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="Paste exported JSON structure here to restore..."
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 font-mono text-[11px]"
                  />
                  <button
                    onClick={handleImport}
                    className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                  >
                    Import JSON
                  </button>
                </div>
              </div>

              {/* Deploy to GitHub Pages for All Visitors */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/20 space-y-3 text-xs">
                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
                  <FileCode className="w-4 h-4 text-emerald-500" />
                  <span>Make Edits Live for All Visitors (GitHub Pages)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your changes are automatically saved in your browser storage (IndexedDB & LocalStorage). To make your changes permanent for <strong>all visitors worldwide</strong> on GitHub Pages (<code className="font-mono text-brand-500">https://ae-alemran.github.io/</code>):
                </p>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <button
                    onClick={handleDownloadInitialData}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download updated initialData.ts</span>
                  </button>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-navy-800 hover:bg-slate-300 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 font-semibold transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy initialData.ts Code</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Tip: You can also copy the code or tell Antigravity in chat to "commit my latest changes to GitHub" and it will be pushed automatically!
                </p>
              </div>

              {/* Cloud Database Guide (Supabase / Firebase) */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-600/10 via-sky-500/10 to-transparent border border-brand-500/20 space-y-2 text-xs">
                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-brand-500" />
                  <span>Cloud Database Deployment Guide (Supabase & Firebase)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  The portfolio runs with instant zero-config HTML5 LocalStorage persistence out of the box. For multi-device cloud synchronization across Vercel / Netlify / GitHub Pages:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400">
                  <li><strong>Supabase:</strong> Create a project on <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-brand-500 underline">supabase.com</a>. Create a table named <code className="font-mono">portfolio_data</code> with a jsonb column <code className="font-mono">payload</code>. Add <code className="font-mono">VITE_SUPABASE_URL</code> and <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> into your <code className="font-mono">.env</code> file.</li>
                  <li><strong>Firebase:</strong> Create a Firestore database on <a href="https://firebase.google.com" target="_blank" rel="noreferrer" className="text-brand-500 underline">firebase.google.com</a> and add your configuration credentials.</li>
                </ul>
              </div>

            </div>
          )}

          {/* Fallback for Experience & Projects */}
          {(activeTab === 'experience' || activeTab === 'projects' || activeTab === 'skills' || activeTab === 'leadership') && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                {activeTab} Management
              </h2>
              <p className="text-xs text-slate-500">
                You can inspect your {activeTab} data below. To edit specific fields, you can also export the JSON backup, make batch adjustments, and import it right back in the Settings tab.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <pre className="text-[11px] font-mono text-slate-600 dark:text-slate-300 overflow-x-auto max-h-96">
                  {JSON.stringify(data[activeTab === 'experience' ? 'experiences' : activeTab === 'projects' ? 'projects' : activeTab === 'skills' ? 'skillCategories' : 'leadership'], null, 2)}
                </pre>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
