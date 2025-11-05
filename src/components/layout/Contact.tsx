import React, { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';  // MessageCircle,
import { FloatingParticles } from '../ui/FloatingParticles';
import { useScrollReveal } from '../../hooks/customHooks';


// ============================================
// ENHANCED CONTACT FORM
// ============================================
const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <section id="contact" className="py-24 px-6 bg-slate-900/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/5 via-transparent to-transparent" />
      <FloatingParticles />
      
      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/30 rounded-full text-cyan-400 font-semibold text-sm animate-pulse-slow">
            💬 Let's Connect
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-400 mb-6">Ready to build something reliable? Start with a 15-minute call</p>
          <p className="text-cyan-400 font-semibold">⚡ Average response time: 2-4 hours</p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 mb-12">
          {/* Contact Info Card */}
          <div className={`space-y-6 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 rounded-3xl p-8 border border-white/5 hover:border-cyan-400/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Connect</h3>
              
              <div className="space-y-4">
                {/* <a
                  href="https://wa.me/2348012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-green-500/10 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">WhatsApp</div>
                    <div className="text-sm text-gray-400">Fastest response time</div>
                  </div>
                </a> */}

                <a
                  href="https://www.linkedin.com/in/ephraim-daniel-374103172/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">LinkedIn</div>
                    <div className="text-sm text-gray-400">Professional network</div>
                  </div>
                </a>

                <a
                  href="mailto:edfolmi@gmail.com"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div className="text-sm text-gray-400">edfolmi@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 rounded-3xl p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-semibold">Currently Available</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                I'm open to a new role, or taking on <span className="text-cyan-400 font-semibold">1 new project</span> for Q4 2025. 
                Book a free consultation to discuss your requirements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 max-w-md w-full border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/30 animate-scale-in">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">Message Sent! 🎉</h3>
              <p className="text-gray-400 mb-2 leading-relaxed">
                Thank you for reaching out! I'll review your project details and get back to you within <span className="text-cyan-400 font-semibold">48 hours</span>.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Check your email for a confirmation.
              </p>
              
              <button
                onClick={() => setShowSuccess(false)}
                className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-full font-bold hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
