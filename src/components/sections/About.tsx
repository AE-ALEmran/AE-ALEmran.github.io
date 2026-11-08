import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  GraduationCap, 
  Briefcase, 
  Compass, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Globe2, 
  Languages 
} from 'lucide-react';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section id="about" className="py-20 bg-slate-100/60 dark:bg-navy-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full mb-3">
            <span>Identity & Research Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Md. Al Emran
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            A synthesis of rigorous academic electrical engineering research, machine learning innovation, and nationwide optical transport infrastructure engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Compass className="w-5 h-5 text-brand-500" />
                <span>Professional Biography & Research Philosophy</span>
              </h3>
              
              {profile.fullBio.map((paragraph, idx) => (
                <p 
                  key={idx} 
                  className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base"
                >
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-slate-100 dark:border-navy-900 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Undergraduate Thesis:</strong> Published in Springer’s Cognitive Neurodynamics (Q2, IF: 3.9).
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Active Industry Role:</strong> Deploying Nokia PSS 1830 L-Band DWDM infrastructure at Fiber@Home Ltd.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">IEEE Leadership:</strong> Former Chair of IEEE PUST Student Branch & Section Conference Ambassador.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Elsevier Peer Reviewer:</strong> Evaluating manuscripts in Biomedical Signal Processing & AgTech.
                  </span>
                </div>
              </div>
            </div>

            {/* Academic & Career Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm">
                <GraduationCap className="w-6 h-6 text-brand-500 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Academic Rigor</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Four-year B.Sc. in EEE from PUST with CGPA 3.40/4.00; English medium curriculum.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm">
                <Briefcase className="w-6 h-6 text-sky-500 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Industrial Expertise</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Optical transport networks, DWDM, ROADM systems, transponders, and fiber testing.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm">
                <Award className="w-6 h-6 text-emerald-500 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Research Productivity</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  16+ IEEE conferences, 2 Springer journals, 1 accepted Elsevier, and 10+ oral talks.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight border-b border-slate-100 dark:border-navy-900 pb-3 font-mono">
                Candidate Profile
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Degree</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    B.Sc. in Electrical and Electronic Engineering
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Alma Mater</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Pabna University of Science and Technology (PUST)
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">CGPA & Scale</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    3.40 / 4.00 (Medium: English)
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Current Employment</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    DWDM Network Engineer, Fiber@Home Ltd.
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Primary Research Goal</span>
                  <span className="font-semibold text-brand-600 dark:text-brand-400">
                    AI for Power Systems & Smart Grids
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-navy-900 space-y-2">
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                    <a href={`mailto:${profile.email}`} className="hover:text-brand-500 transition-colors">
                      {profile.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                    <Languages className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                    <span>English (Fluent), Bengali (Native)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcement / News Card if any */}
            {data.announcements.filter(a => a.active).length > 0 && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-600/10 via-sky-500/10 to-transparent border border-brand-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Latest Research News
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-500 text-white font-mono">
                    {data.announcements[0].date}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {data.announcements[0].title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {data.announcements[0].content}
                </p>
                {data.announcements[0].link && (
                  <a
                    href={data.announcements[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-brand-600 dark:text-brand-400 font-semibold mt-2 hover:underline"
                  >
                    <span>Read Paper DOI</span>
                    <Globe2 className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
