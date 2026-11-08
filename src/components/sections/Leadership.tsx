import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Award, 
  Users, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Mic2, 
  FileCheck, 
  ExternalLink 
} from 'lucide-react';

export const Leadership: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="leadership" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full mb-3">
            <span>Organizational Leadership & Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Leadership & IEEE Extracurricular Activities
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Dedicated volunteerism, leading 50+ member student branch executive teams, and serving the IEEE Bangladesh Section.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {data.leadership.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full">
                    {item.role}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {item.organization}
                </h3>

                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-1 mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>

                {item.awardOrRecognition && (
                  <div className="mb-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>{item.awardOrRecognition}</span>
                  </div>
                )}

                <div className="space-y-2">
                  {item.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Peer Reviewing Section */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-white dark:from-navy-950/80 dark:via-navy-900/60 dark:to-navy-950/80 border border-slate-200 dark:border-navy-800 shadow-sm">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full mb-2">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Scientific Community Contribution</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Journal Peer Reviewing Experience
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Invited peer reviewer for internationally indexed Q1/Q2 Elsevier journals based on recognized expertise in AI, biomedical signal processing, and electrical engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {data.peerReviews.map((pr) => (
              <div
                key={pr.id}
                className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400 font-mono">
                      Publisher: {pr.publisher}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      {pr.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {pr.journal}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    <strong className="text-slate-700 dark:text-slate-300">Reviewed Scope:</strong> {pr.scope}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* References Section */}
        <div className="mt-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Verified Contacts
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Academic & Professional References
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Referees who can speak directly to my research aptitude, technical competence, and engineering work ethic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {data.references.map((ref) => (
              <div
                key={ref.id}
                className="p-6 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono uppercase font-semibold px-2.5 py-0.5 rounded-full ${
                    ref.relationType === 'Academic'
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                      : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                  }`}>
                    {ref.relationType} Reference
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {ref.name}
                </h4>

                <div className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">
                  {ref.title} • {ref.department}
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {ref.organization}
                </div>

                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {ref.location}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-900 space-y-1.5 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Email: </span>
                    <a href={`mailto:${ref.email}`} className="text-brand-600 dark:text-brand-400 hover:underline">
                      {ref.email}
                    </a>
                  </div>
                  {ref.phone && (
                    <div>
                      <span className="text-slate-400">Phone: </span>
                      <span className="text-slate-700 dark:text-slate-300">{ref.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
