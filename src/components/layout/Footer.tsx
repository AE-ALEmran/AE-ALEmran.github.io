import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Shield, 
  ExternalLink, 
  Download, 
  Heart, 
  ArrowUp, 
  Sparkles 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setActiveView, isAdminLoggedIn } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-navy-950 border-t border-slate-200 dark:border-navy-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-10 border-b border-slate-100 dark:border-navy-900">
          
          {/* Identity Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-brand-500/50">
                <img 
                  src={data.profile.profileImage} 
                  alt={data.profile.name}
                  className="w-full h-full object-cover object-top" 
                />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                {data.profile.name}
              </span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Electrical Engineer & Researcher. Specializing in AI-driven power systems, microgrid resilience, renewable energy optimization, and DWDM optical telecommunications.
            </p>

            <div className="text-[11px] text-slate-400 font-mono">
              Pabna University of Science and Technology (PUST) • Fiber@Home Ltd.
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Navigation
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li><a href="#about" className="hover:text-brand-500 transition-colors">About & Academic Journey</a></li>
              <li><a href="#research" className="hover:text-brand-500 transition-colors">Research Interests</a></li>
              <li><a href="#publications" className="hover:text-brand-500 transition-colors">Publications ({data.publications.length})</a></li>
              <li><a href="#experience" className="hover:text-brand-500 transition-colors">Experience (DWDM & RA)</a></li>
              <li><a href="#projects" className="hover:text-brand-500 transition-colors">Projects & Solar Tracking</a></li>
              <li><a href="#leadership" className="hover:text-brand-500 transition-colors">IEEE Leadership & Review</a></li>
              <li><a href="#contact" className="hover:text-brand-500 transition-colors">Contact Information</a></li>
            </ul>
          </div>

          {/* Downloads & Portals Col */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Documents & Portals
            </div>
            <div className="space-y-2">
              <a
                href={data.profile.resumePdfUrl}
                download
                className="inline-flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 hover:text-brand-500 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-brand-500" />
                <span>Professional Engineering CV (PDF)</span>
              </a>
              <br />
              <a
                href={data.profile.academicResumePdfUrl}
                download
                className="inline-flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 hover:text-brand-500 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-500" />
                <span>Academic & Research CV (PDF)</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveView('admin');
                  window.location.hash = '#admin';
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-400 hover:text-brand-500 hover:border-brand-500/40 transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Panel Login'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-3 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Md. Al Emran. Verified Academic & Engineering Portfolio.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-brand-500 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
