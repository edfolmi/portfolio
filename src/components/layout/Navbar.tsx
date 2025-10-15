import { useEffect, useState } from "react";


// ============================================
// NAVIGATION
// ============================================
const Navigation: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Portfolio', 'Services', 'Testimonials', 'Contact'];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-slate-950/90 py-3 shadow-lg shadow-cyan-400/5' : 'bg-transparent py-6'
      } backdrop-blur-xl border-b border-white/5`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent hover:scale-110 transition-transform">
          Edfolmi
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`relative text-gray-400 hover:text-cyan-400 transition-all duration-300 font-medium group ${
                  activeSection === item.toLowerCase() ? 'text-cyan-400' : ''
                }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-amber-400 transition-all duration-300 ${
                  activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105 transition-all"
        >
          Hire Me
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-all"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-slate-900/95 backdrop-blur-xl border-b border-white/5">
          <ul className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <li key={item} className="animate-slide-in-left" style={{ animationDelay: `${navItems.indexOf(item) * 0.1}s` }}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors py-2"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
