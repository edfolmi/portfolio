import React from 'react';
// import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header-backdrop sticky top-0 z-20">
      <div className="container flex items-center justify-between gap-4 py-3">
        <div className="logo font-bold text-lg">
          <span className="underline">YourName</span>
        </div>

        <nav className="hidden md:flex gap-5 text-sm items-center">
          <a href="#portfolio">Portfolio</a>
          <a href="#services">Services</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
          <a href="#hire" className="btn">Hire Me</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="toggle p-2 rounded-full bg-white/5" aria-label="Toggle theme">
            {/* simple sun/moon svg */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.95 16.95l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.95 7.05l1.42-1.42" />
            </svg>
          </button>
        </div>

        {/* mobile nav could be added here */}
      </div>
    </header>
  );
};

export default Header;
