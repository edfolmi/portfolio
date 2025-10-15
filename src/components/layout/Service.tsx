import React from 'react';
import { Shield } from 'lucide-react';
import { FloatingParticles } from '../ui/FloatingParticles';
import { useScrollReveal } from '../../hooks/customHooks';
import type { Service } from '../../types/index';


// ============================================
// ENHANCED SERVICES SECTION
// ============================================
const Services: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  const services: Service[] = [
    {
      tier: 'Bronze',
      price: '₦50k',
      features: [
        'API design & development',
        'Database schema design',
        'Basic authentication (JWT)',
        'Complete API documentation',
        'Up to 3 endpoints',
        'Email support (48h response)',
        '2 revision rounds',
      ],
    },
    {
      tier: 'Silver',
      price: '₦100k',
      features: [
        'Everything in Bronze',
        'Up to 10 endpoints',
        'Third-party integrations (Stripe, Twilio, etc.)',
        'Advanced authentication (OAuth2, MFA)',
        'Automated testing & CI/CD setup',
        'Performance optimization',
        'Slack/WhatsApp support (24h response)',
        '5 revision rounds',
        'Code review & refactoring',
      ],
      highlighted: true,
    },
    {
      tier: 'Gold',
      price: '₦200k',
      features: [
        'Everything in Silver',
        'Unlimited endpoints',
        'Microservices architecture',
        'Real-time features (WebSocket)',
        'Cloud deployment & auto-scaling (AWS/GCP)',
        'Monitoring & logging setup (Grafana, ELK)',
        'Comprehensive security audit',
        'Priority 24/7 support',
        'Unlimited revisions',
        'Performance guarantee (SLA)',
      ],
    },
  ];

  return (
    <section id="services" className="py-24 px-6 bg-slate-900/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent" />
      <FloatingParticles />
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-amber-400/10 to-cyan-400/10 border border-amber-400/30 rounded-full text-amber-400 font-semibold text-sm animate-pulse-slow">
            💎 Premium Services
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400 bg-clip-text text-transparent">
            Productized Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Fixed-scope packages designed to get you <span className="text-amber-400 font-semibold">results fast</span>. No surprises, no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.tier}
              className={`relative bg-slate-900/60 backdrop-blur-sm rounded-3xl p-8 border-2 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl group ${
                service.highlighted
                  ? 'border-cyan-400/50 shadow-lg shadow-cyan-400/20 animate-pulse-border'
                  : 'border-white/5 hover:border-cyan-400/30 hover:shadow-cyan-400/10'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/5 group-hover:to-blue-500/5 rounded-3xl transition-all duration-700" />
              
              {service.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-sm font-bold text-slate-950 shadow-lg animate-bounce-slow">
                  ⭐ Most Popular
                </div>
              )}

              <div className="relative z-10">
                <div className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-bold">
                  {service.tier}
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {service.price}
                  </div>
                  <div className="text-2xl text-gray-500">/mo</div>
                </div>
                <div className="text-gray-400 mb-8">Billed monthly, cancel anytime</div>

                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, i) => (
                    <li 
                      key={feature} 
                      className="flex items-start gap-3 text-gray-300 group/item hover:text-white transition-colors"
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 group-hover/item:scale-110 transition-transform">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center py-4 rounded-full font-bold transition-all duration-300 ${
                    service.highlighted
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105'
                      : 'bg-white/5 text-white hover:bg-white/10 border-2 border-white/10 hover:border-cyan-400/50'
                  }`}
                >
                  Get Started →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Money-back guarantee badge */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-400/10 to-emerald-500/10 border border-green-400/30 rounded-full">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
