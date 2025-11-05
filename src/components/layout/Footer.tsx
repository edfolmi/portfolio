import React from 'react';
// import { Send } from 'lucide-react';


// ============================================
// FOOTER
// ============================================
const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-white/5 py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent mb-3">
            Let's build something reliable.
          </h3>
          {/* <p className="text-xl text-gray-400 mb-8">Start with a 15-minute call.</p> */}
          
          {/* <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-full font-bold hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-110 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
            Schedule Free Consultation
          </a> */}
        </div>
        
        <nav className="flex justify-center gap-8 flex-wrap mb-8">
          {['About', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-400 hover:text-cyan-400 transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="text-center pt-8 border-t border-white/5">
          <p className="text-gray-500">
            © 2025 <span className="text-cyan-400 font-semibold">Edfolmi</span> · All rights reserved · Built with precision and care
          </p>
          <p className="text-gray-600 text-sm mt-2">
            I simply crafted this portfolio with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
