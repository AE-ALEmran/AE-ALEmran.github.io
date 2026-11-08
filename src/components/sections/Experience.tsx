import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Briefcase, 
  Radio, 
  Cpu, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Wrench, 
  Building2,
  Zap,
  Activity,
  Award
} from 'lucide-react';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'industry' | 'visits' | 'training'>('industry');

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full mb-3">
            <span>Engineering Roles & Field Attachments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Professional Experience & Industrial Training
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Real-world optical transmission network deployment, academic research assistantship, and high-voltage grid/hydro/satellite industrial exposure.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800">
            <button
              onClick={() => setActiveTab('industry')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'industry'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Professional Roles ({data.experiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('visits')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'visits'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Industrial Field Visits ({data.industrialVisits.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('training')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'training'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Automation Training</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Industry & Research Roles */}
        {activeTab === 'industry' && (
          <div className="space-y-8">
            {data.experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm relative overflow-hidden"
              >
                {/* Current Badge Glow */}
                {exp.isCurrent && (
                  <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-[11px] font-mono uppercase font-semibold px-2.5 py-0.5 rounded-full ${
                        exp.type === 'industry'
                          ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                          : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                      }`}>
                        {exp.type === 'industry' ? 'Industry Position' : 'Academic Research'}
                      </span>
                      {exp.isCurrent && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Present</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                      {exp.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400 mt-1">
                      <span className="font-semibold text-brand-600 dark:text-brand-400 flex items-center space-x-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{exp.organization}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </span>
                      <span className="flex items-center space-x-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.startDate} – {exp.endDate}</span>
                      </span>
                    </div>

                    {exp.projectFocus && (
                      <div className="mt-3 inline-flex items-center space-x-1.5 text-xs font-mono font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-800">
                        <Radio className="w-3.5 h-3.5 text-brand-500" />
                        <span>Focus: {exp.projectFocus}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Responsibilities */}
                <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-navy-900">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 mb-2">
                    Key Responsibilities & Engineering Activities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {exp.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment & Tools Tag Strip */}
                {exp.equipmentAndTools && exp.equipmentAndTools.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-navy-900">
                    <span className="text-xs font-mono text-slate-400 block mb-2">
                      Equipment, Technologies & Hardware Handled:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.equipmentAndTools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-800 flex items-center space-x-1"
                        >
                          <Wrench className="w-3 h-3 text-brand-500" />
                          <span>{tool}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Industrial Field Visits & Observation */}
        {activeTab === 'visits' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data.industrialVisits.map((visit) => (
              <div
                key={visit.id}
                className="p-6 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                      {visit.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {visit.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {visit.title}
                  </h3>

                  <div className="text-xs text-brand-600 dark:text-brand-400 font-medium mt-1">
                    {visit.organization} • {visit.location}
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 space-y-2">
                    {visit.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-navy-900">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Technical Scope
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {visit.technicalExposure}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Industrial Automation & Control */}
        {activeTab === 'training' && (
          <div className="p-8 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-navy-900 pb-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-brand-600 dark:text-brand-400">
                  Certified Technical Training
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Professional Industrial Automation (PLC, HMI & SCADA)
                </h3>
                <div className="text-sm text-slate-500 mt-1">
                  Nur Engineering Technology And Automation, Dhaka, Bangladesh
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 shrink-0">
                2025 – 2026
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900/50 border border-slate-200/80 dark:border-navy-800/80">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-1.5">
                  <Cpu className="w-4 h-4 text-brand-500" />
                  <span>Control Systems & Controllers</span>
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>Siemens S7-1200 PLC programming with ladder logic & function block diagrams.</li>
                  <li>Supervisory Control and Data Acquisition (SCADA) system fundamentals.</li>
                  <li>Human Machine Interface (HMI) screen development & alarm management.</li>
                  <li>Closed-loop PID control: Temperature, pressure, and fluid flow loops.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900/50 border border-slate-200/80 dark:border-navy-800/80">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-1.5">
                  <Wrench className="w-4 h-4 text-emerald-500" />
                  <span>Motors, Drivers & Industrial Protocols</span>
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>Variable Frequency Drives (VFD) configuration & speed regulation.</li>
                  <li>Industrial actuation: Stepper Motors, Servo Motors, and Rotary Encoders.</li>
                  <li>Industrial Fieldbus Protocols: Modbus RTU/TCP, Profibus, and Profinet.</li>
                  <li>Industrial instrumentation sensors: proximity, thermocouple, load cells.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
