import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Languages 
} from 'lucide-react';

export const Education: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="education" className="py-20 bg-slate-100/60 dark:bg-navy-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full mb-3">
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education & Academic Background
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Four-year undergraduate engineering education conducted in English, complemented by consistent high scholastic achievement.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {data.education.map((item, idx) => (
            <div
              key={item.id}
              className={`p-6 sm:p-8 rounded-2xl bg-white dark:bg-navy-950/70 border shadow-sm relative ${
                idx === 0 
                  ? 'border-brand-500/40 dark:border-brand-500/40 ring-1 ring-brand-500/20' 
                  : 'border-slate-200 dark:border-navy-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold">
                      {item.resultType}: {item.result}
                    </span>
                    {item.mediumOfInstruction && (
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                        <Languages className="w-3 h-3" />
                        <span>Medium: {item.mediumOfInstruction}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {item.degree}
                  </h3>

                  <div className="text-base font-semibold text-brand-600 dark:text-brand-400">
                    {item.major}
                  </div>

                  <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    {item.institution}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400 pt-1">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.duration}</span>
                    </span>
                  </div>
                </div>

                <div className="shrink-0 sm:text-right">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-center sm:text-right">
                    <div className="text-xs text-slate-400 font-mono">Academic Standing</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                      {item.result}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thesis Info */}
              {item.thesisTitle && (
                <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-brand-500/10 to-sky-500/10 border border-brand-500/20 space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold uppercase text-brand-600 dark:text-brand-400">
                    <BookOpen className="w-4 h-4" />
                    <span>Undergraduate Engineering Thesis</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    "{item.thesisTitle}"
                  </div>
                  {item.thesisStatus && (
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      Status: {item.thesisStatus}
                    </div>
                  )}
                </div>
              )}

              {/* Details List */}
              {item.details && item.details.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-navy-900 space-y-1.5">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
