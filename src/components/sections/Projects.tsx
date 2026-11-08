import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Sun, 
  Cpu, 
  Eye, 
  Activity, 
  Layers, 
  CheckCircle2, 
  Calendar, 
  ExternalLink 
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();

  const getProjectIcon = (category: string) => {
    if (category.toLowerCase().includes('solar') || category.toLowerCase().includes('renewable')) {
      return <Sun className="w-6 h-6 text-amber-500" />;
    }
    if (category.toLowerCase().includes('driver') || category.toLowerCase().includes('transportation')) {
      return <Eye className="w-6 h-6 text-sky-500" />;
    }
    if (category.toLowerCase().includes('eeg') || category.toLowerCase().includes('biomedical')) {
      return <Activity className="w-6 h-6 text-rose-500" />;
    }
    return <Layers className="w-6 h-6 text-brand-500" />;
  };

  return (
    <section id="projects" className="py-20 bg-slate-100/60 dark:bg-navy-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full mb-3">
            <span>Applied Engineering & Prototyping</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Research & Engineering Projects
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Translating mathematical models into functioning hardware prototypes, embedded IoT devices, and deep learning neural pipelines.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 hover:border-brand-500/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-navy-900 flex items-center justify-center">
                    {getProjectIcon(project.category)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.year}</span>
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-brand-600 dark:text-brand-400 block mb-1">
                  {project.category}
                </span>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h3>

                {project.role && (
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    Role: <span className="text-slate-800 dark:text-slate-200">{project.role}</span>
                  </div>
                )}

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="mt-4 space-y-2">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-900">
                <span className="text-[11px] font-mono text-slate-400 block mb-2">
                  Tools & Components:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-navy-800/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
