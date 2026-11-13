import React, { useEffect, useState } from 'react';
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
import { ResetPasskey } from './components/admin/ResetPasskey';

/** Extract reset token from URL hash like #admin-reset?token=XXXX */
function getResetToken(): string | null {
  const hash = window.location.hash; // e.g. "#admin-reset?token=abc123"
  if (!hash.startsWith('#admin-reset')) return null;
  const queryStart = hash.indexOf('?');
  if (queryStart === -1) return null;
  const params = new URLSearchParams(hash.slice(queryStart + 1));
  return params.get('token');
}

export const AppContent: React.FC = () => {
  const { activeView, isAdminLoggedIn, setActiveView } = usePortfolio();
  const [resetToken, setResetToken] = useState<string | null>(() => getResetToken());

  useEffect(() => {
    const handleHashChange = () => {
      const token = getResetToken();
      if (token) {
        setResetToken(token);
      } else {
        setResetToken(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Show reset passkey screen when a valid reset token is in the URL
  if (resetToken) {
    return (
      <ResetPasskey
        token={resetToken}
        onDone={() => {
          setResetToken(null);
          setActiveView('admin');
        }}
      />
    );
  }

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
