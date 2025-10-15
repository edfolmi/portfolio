import React, { useState } from 'react';
import { X, Send, MessageCircle, Linkedin, Mail } from 'lucide-react';
import { FloatingParticles } from '../ui/FloatingParticles';
import { useScrollReveal } from '../../hooks/customHooks';


// ============================================
// ENHANCED CONTACT FORM
// ============================================
const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Please describe your project';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', service: '', message: '' });
      
      setTimeout(() => setShowSuccess(false), 6000);
    }
  };

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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <form onSubmit={handleSubmit} className={`bg-gradient-to-br from-slate-900/80 to-slate-900/40 rounded-3xl p-8 border border-white/5 hover:border-cyan-400/30 transition-all duration-500 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <span>Your Name</span>
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-slate-950/50 border-2 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.name ? 'border-red-500 shake' : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <span>Email Address</span>
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-slate-950/50 border-2 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email ? 'border-red-500 shake' : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="service" className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <span>Select Service</span>
                  <span className="text-red-400">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-slate-950/50 border-2 rounded-2xl text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.service ? 'border-red-500 shake' : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20'
                  }`}
                >
                  <option value="">Choose a package</option>
                  <option value="bronze">Bronze - ₦50k/month</option>
                  <option value="silver">Silver - ₦100k/month (Popular)</option>
                  <option value="gold">Gold - ₦200k/month</option>
                  <option value="custom">Custom Project (₦500k+)</option>
                </select>
                {errors.service && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.service}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <span>Project Details</span>
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className={`w-full px-5 py-4 bg-slate-950/50 border-2 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                    errors.message ? 'border-red-500 shake' : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-full font-bold hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Contact Info Card */}
          <div className={`space-y-6 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 rounded-3xl p-8 border border-white/5 hover:border-cyan-400/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Connect</h3>
              
              <div className="space-y-4">
                <a
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
                </a>

                <a
                  href="https://linkedin.com/in/yourprofile"
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
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div className="text-sm text-gray-400">your.email@example.com</div>
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
                Taking on <span className="text-cyan-400 font-semibold">2 new projects</span> for Q1 2025. 
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
