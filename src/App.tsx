import React from 'react';
import { usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { ResearchInterests } from './components/sections/ResearchInterests';
import { Publications } from './components/sections/Publications';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Leadership } from './components/sections/Leadership';
import { Contact } from './components/sections/Contact';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const AppContent: React.FC = () => {
  const { activeView, isAdminLoggedIn } = usePortfolio();

  if (activeView === 'admin') {
    if (isAdminLoggedIn) {
      return <AdminDashboard />;
    }
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <ResearchInterests />
        <Publications />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
