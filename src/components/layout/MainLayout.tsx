// src/layouts/MainLayout.tsx
import type { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const MainLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="font-heading text-xl text-primary font-semibold">Ephraim Daniel</h1>
          <nav className="space-x-6">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <Link to="/about" className="hover:text-primary transition">About</Link>
            <Link to="/projects" className="hover:text-primary transition">Projects</Link>
            <Link to="/contact" className="hover:text-primary transition">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-10">
        {children || <Outlet />}
      </main>

      <footer className="bg-secondary text-white text-center py-6 text-sm">
        © {new Date().getFullYear()} Ephraim Daniel — Python Developer | API Engineer
      </footer>
    </div>
  );
};
