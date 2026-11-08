import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Zap, 
  Grid, 
  Sun, 
  Eye, 
  Activity, 
  Radio, 
  Cpu, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ResearchInterests: React.FC = () => {
  const { data } = usePortfolio();

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'zap': return <Zap className="w-6 h-6 text-amber-500" />;
      case 'grid': return <Grid className="w-6 h-6 text-brand-500" />;
      case 'sun': return <Sun className="w-6 h-6 text-orange-500" />;
      case 'eye': return <Eye className="w-6 h-6 text-sky-500" />;
      case 'activity': return <Activity className="w-6 h-6 text-rose-500" />;
      case 'radio': return <Radio className="w-6 h-6 text-emerald-500" />;
      default: return <Cpu className="w-6 h-6 text-brand-500" />;
    }
  };

  return (
    <section id="research" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full mb-3">
            <span>Specialization & Directions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Research Interests & Scientific Vision
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Dedicated to advancing intelligent energy systems, robust microgrid architectures, and data-driven signal processing algorithms.
          </p>
        </div>

        {/* Primary Research Focus Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-brand-950 border border-brand-500/30 shadow-xl text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,#0284c733,transparent_70%)] pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-mono font-semibold mb-3 border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>Primary Long-Term Research Goal</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
              Integrating Artificial Intelligence with Electrical Power Engineering, Renewable Energy, and Smart Grid Technologies
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              My core academic aspiration is to investigate neural-network-assisted microgrid energy management, reinforcement learning for resilient dynamic grid restoration, battery storage optimization, and AI-driven predictive control for cyber-physical power infrastructure.
            </p>
          </div>
        </div>

        {/* Research Interest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.researchInterests.map((interest) => (
            <div
              key={interest.id}
              className="group p-6 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 hover:border-brand-500/40 dark:hover:border-brand-500/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-navy-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(interest.iconName)}
                  </div>
                  {interest.isPrimary && (
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                      Core Priority
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {interest.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {interest.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-navy-900 flex flex-wrap gap-1.5">
                {interest.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-navy-800/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
