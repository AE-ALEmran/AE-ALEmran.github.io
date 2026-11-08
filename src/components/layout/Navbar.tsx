import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Sun, 
  Moon, 
  Download, 
  Menu, 
  X, 
  Shield, 
  ExternalLink,
  ChevronDown,
  BookOpen,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, theme, toggleTheme, setActiveView, isAdminLoggedIn } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Research', href: '#research' },
    { label: 'Publications', href: '#publications' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-navy-950/90 shadow-lg backdrop-blur-md border-b border-slate-200/80 dark:border-navy-800/80 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <a 
            href="#" 
            className="group flex items-center space-x-3 transition-transform hover:scale-[1.02]"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-brand-500/40 dark:ring-brand-400/30 group-hover:ring-brand-400 transition-all shadow-md">
              <img 
                src={data.profile.profileImage} 
                alt={data.profile.name}
                className="w-full h-full object-cover object-top" 
              />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Md. Al Emran
              </span>
              <span className="block text-xs font-mono text-slate-500 dark:text-slate-400">
                EEE • Researcher • DWDM
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-navy-900/60 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: CV Download, Theme Toggle, Admin */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* CV Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
                className="inline-flex items-center space-x-2 text-xs font-semibold px-3.5 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-sky-600 hover:from-brand-500 hover:to-sky-500 text-white shadow-sm hover:shadow-brand-500/25 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
              </button>

              {cvDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setCvDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-navy-900 shadow-xl border border-slate-200 dark:border-navy-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-mono">
                      Curriculum Vitae
                    </div>
                    <a
                      href={data.profile.resumePdfUrl}
                      download="Md_Al_Emran_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-navy-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      onClick={() => setCvDropdownOpen(false)}
                    >
                      <Briefcase className="w-4 h-4 mr-2.5 text-brand-500" />
                      <div>
                        <div className="font-semibold">Professional Engineering CV</div>
                        <div className="text-[10px] text-slate-400">Industry & DWDM Focused</div>
                      </div>
                    </a>
                    <a
                      href={data.profile.academicResumePdfUrl}
                      download="Md_Al_Emran_Academic_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-navy-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      onClick={() => setCvDropdownOpen(false)}
                    >
                      <BookOpen className="w-4 h-4 mr-2.5 text-emerald-500" />
                      <div>
                        <div className="font-semibold">Academic & Research CV</div>
                        <div className="text-[10px] text-slate-400">MSc/PhD & Publication Focused</div>
                      </div>
                    </a>
                  </div>
                </>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-90 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => {
                setActiveView('admin');
                window.location.hash = '#admin';
              }}
              className={`p-2 rounded-lg border transition-all ${
                isAdminLoggedIn
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 dark:text-emerald-400'
                  : 'border-slate-200 dark:border-navy-800 text-slate-500 dark:text-slate-400 hover:text-brand-500 hover:border-brand-500/40'
              }`}
              title={isAdminLoggedIn ? "Admin Panel (Active Session)" : "Admin Portal"}
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-navy-950 border-b border-slate-200 dark:border-navy-800 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-900 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-navy-800 flex flex-col space-y-2">
            <a
              href={data.profile.resumePdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-brand-600 text-white font-medium text-sm shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveView('admin');
                window.location.hash = '#admin';
              }}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg border border-slate-300 dark:border-navy-700 text-slate-700 dark:text-slate-300 font-medium text-sm"
            >
              <Shield className="w-4 h-4" />
              <span>{isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
