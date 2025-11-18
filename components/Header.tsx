import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onLogout }) => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="font-sora text-3xl font-bold text-primary dark:text-neutral-light tracking-tight">Bombieri Lead Scorer Pro</h1>
        <p className="text-dark-altern dark:text-slate-400">Agente de Calificación de Leads Comerciales B2B</p>
      </div>
      <div className="flex items-center gap-2">
        {onLogout && (
            <button
                onClick={onLogout}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary dark:focus:ring-offset-slate-900"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        )}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
