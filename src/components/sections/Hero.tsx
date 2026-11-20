import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Download, 
  FileText, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  Radio, 
  Award,
  ChevronRight,
  BookOpen,
  ArrowDown
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background Glow & High-Tech Circuit Aesthetic */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-brand-600/15 via-sky-500/10 to-emerald-500/10 blur-3xl rounded-full" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-brand-500/10 blur-2xl rounded-full" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Identity */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-400/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Seeking Funded MSc / PhD & Research Collaborations</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {profile.name}
            </h1>

            {/* Professional Headline */}
            <p className="text-lg sm:text-xl font-medium text-brand-600 dark:text-brand-400 font-mono tracking-tight">
              {profile.headline}
            </p>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {profile.shortBio}
            </p>

            {/* Micro Badge Strips */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
              <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-300">
                <Zap className="w-3.5 h-3.5 mr-1 text-amber-500" />
                B.Sc. in EEE (PUST) • CGPA 3.40
              </span>
              <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-300">
                <Radio className="w-3.5 h-3.5 mr-1 text-sky-500" />
                DWDM Engineer @ Fiber@Home (Nokia PSS 1830)
              </span>
              <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-300">
                <Award className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                Ex-Chair, IEEE PUST Student Branch
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
              <a
                href="#publications"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-md hover:shadow-brand-500/25 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Publications ({data.publications.length})</span>
              </a>

              <a
                href="#research"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800 border border-slate-300 dark:border-navy-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all"
              >
                <span>Research Interests</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-navy-850 hover:bg-slate-200 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Academic & Social Profiles */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-navy-800/60">
              <span className="block text-xs uppercase tracking-wider font-mono text-slate-600 dark:text-slate-300 mb-2.5">
                Profiles & Repositories
              </span>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <a
                  href={profile.socialLinks.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-500/10 dark:bg-brand-950/70 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 border border-brand-500/30 transition-all shadow-sm"
                  title="Google Scholar Profile (56+ Citations, h-index 5)"
                >
                  <Award className="w-3.5 h-3.5 text-brand-500" />
                  <span>Google Scholar</span>
                  <span className="px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-800 dark:text-brand-200 font-mono text-[10px]">
                    56+ Cites
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={profile.socialLinks.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 dark:bg-emerald-950/70 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 transition-all shadow-sm"
                  title="ResearchGate Profile (Md-Emran-12)"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                  <span>ResearchGate</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-mono text-[10px]">
                    Verified
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={profile.socialLinks.ieeeXplorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-navy-900/80 hover:bg-sky-50 dark:hover:bg-sky-950/60 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-navy-800 transition-colors"
                >
                  <span>IEEE Xplorer</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-navy-900/80 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-navy-800 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-navy-900/80 hover:bg-slate-200 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-800 transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Photo & Metrics Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Decorative Ring & Backdrop Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-600 via-sky-500 to-emerald-500 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-300 group-hover:scale-105" />
              
              {/* Photo Container */}
              <div className="relative w-64 sm:w-72 md:w-80 h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border-2 border-white/20 shadow-2xl">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
                
                {/* Floating Role Overlay Tag */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-navy-950/85 backdrop-blur-md border border-white/10 text-white text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-100">Md. Al Emran</div>
                      <div className="text-[11px] text-brand-300">Fiber@Home Ltd. & PUST</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
                      DWDM Eng.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-6">
              <div className="p-3 text-center rounded-xl bg-white/70 dark:bg-navy-900/70 border border-slate-200 dark:border-navy-800 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400 font-mono">
                  {profile.metrics.journalPapers}
                </div>
                <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                  Journals
                </div>
                <div className="text-[9px] text-slate-600 dark:text-slate-400">Springer & Elsevier</div>
              </div>

              <div className="p-3 text-center rounded-xl bg-white/70 dark:bg-navy-900/70 border border-slate-200 dark:border-navy-800 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-sky-600 dark:text-sky-400 font-mono">
                  {profile.metrics.ieeeConferences}
                </div>
                <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                  IEEE Conf.
                </div>
                <div className="text-[9px] text-slate-600 dark:text-slate-400">International</div>
              </div>

              <div className="p-3 text-center rounded-xl bg-white/70 dark:bg-navy-900/70 border border-slate-200 dark:border-navy-800 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {profile.metrics.oralPresentations}+
                </div>
                <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                  Oral Talks
                </div>
                <div className="text-[9px] text-slate-600 dark:text-slate-400">IEEE Presenter</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
