import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="font-sora text-3xl font-bold text-primary dark:text-neutral-light tracking-tight">Bombieri Lead Scorer Pro</h1>
        <p className="text-dark-altern dark:text-slate-400">Agente de Calificación de Leads Comerciales B2B</p>
      </div>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;