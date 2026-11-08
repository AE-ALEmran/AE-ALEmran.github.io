import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Code, 
  Brain, 
  Zap, 
  Radio, 
  Wrench, 
  Sliders, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'sk-ai': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'sk-ee': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'sk-telecom': return <Radio className="w-5 h-5 text-sky-500" />;
      case 'sk-tools': return <Code className="w-5 h-5 text-brand-500" />;
      case 'sk-automation': return <Sliders className="w-5 h-5 text-emerald-500" />;
      default: return <Wrench className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full mb-3">
            <span>Engineering & Computational Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical Competencies & Skills
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Strictly derived from verified academic research, industrial DWDM telecommunications, and hands-on laboratory experience.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skillCategories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-900 flex items-center justify-center">
                    {getCategoryIcon(category.id)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {category.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {category.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        skill.highlight
                          ? 'bg-brand-500/10 dark:bg-brand-400/10 text-brand-700 dark:text-brand-300 border border-brand-500/30 font-semibold'
                          : 'bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-navy-800/60'
                      }`}
                    >
                      {skill.highlight && <Sparkles className="w-3 h-3 text-brand-500" />}
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] opacity-60">({skill.level})</span>
                      )}
                    </div>
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
