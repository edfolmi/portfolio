import React from 'react';
// import { Users, ChartLine } from 'lucide-react';
import { FloatingParticles } from '../ui/FloatingParticles';
import ProjectCard from '../ui/ProjectCard';
import { useScrollReveal } from '../../hooks/customHooks';
import type { Project } from '../../types/index';
import candleweblogo from '../../assets/candleweb.png'
import shugalogo from '../../assets/shuga.png'


// ============================================
// PORTFOLIO SECTION
// ============================================
const Portfolio: React.FC<{ onProjectClick: (project: Project) => void }> = ({ onProjectClick }) => {
  const { ref, isVisible } = useScrollReveal();

  const projects: Project[] = [
    {
      id: 'shuga-network',
      title: 'ShugaNetwork – Event Ticketing Platform',
      description:
        'Developed a robust and scalable event ticketing platform powering seamless ticket sales, event listings, and payment integrations across iOS, Android, and web.',
      tags: ['Django REST Framework', 'PostgreSQL', 'AWS S3', 'HTML', 'CSS', 'JavaScript'],
      result: 'Live on iOS & Play Store with active users and a lot of transactions processed monthly.',
      icon: <img 
              src={shugalogo} 
              alt="Shuga" 
              className="w-50"
            />,
      details: {
        challenge:
          'The client needed a high-performance backend for an event ticketing platform that could manage large-scale user activity, secure transactions, and synchronize seamlessly across web and mobile platforms.',
        solution:
          'Architected and implemented a complete backend system using Django REST Framework with PostgreSQL for relational data and AWS S3 for media storage. Integrated secure payment flows, real-time event updates, and user authentication endpoints. Also developed the official marketing homepage using pure HTML, CSS, and JavaScript optimized for fast loading and high SEO performance.',
        impact:
          'Launched successfully on both iOS and Play Store, supporting thousands of concurrent users. Enabled real-time event listing and instant ticket validation APIs. Achieved a 99.9% uptime backend infrastructure and reduced average API response time to under 250ms.',
        tech: [
          'Django',
          'Django REST Framework',
          'PostgreSQL',
          'Celery',
          'HTML',
          'CSS',
          'JavaScript',
          'Nginx',
          'Gunicorn',
          'Paystack API',
          'Stripe API (Google Pay & Apple Pay)',
          'PayPal API'
        ],
      },
      links: [{
        href: "https://shuganetwork.com/",
        label: "Visit",
      }]
    },
    {
      id: 'candleweb',
      title: 'Candleweb.io – AI Trading Platform',
      description:
        'Engineered the backend and analytics infrastructure for Candleweb.io, enabling real-time AI trading, secure data management, and scalable API services for cryptocurrency trading.',
      tags: ['Django REST Framework', 'Redis', 'WebSockets', 'PostgreSQL', 'Python', 'OOP'],
      result: 'Enabled thousands of trades per batch with real-time monitoring; significantly improved system reliability and performance.',
      icon: <img 
              src={candleweblogo} 
              alt="Candle" 
              className="w-50"
            />,
      details: {
        challenge:
          'The platform required high-speed AI trade processing, real-time data streaming, and robust admin capabilities while ensuring security, scalability, and reliability across live and demo trading environments.',
        solution:
          '• Implemented secure cookies for API authentication tokens. \n\
       • Developed new API endpoints and enhanced existing ones with full unit testing coverage. \n\
       • Introduced throttling to manage high request rates. \n\
       • Designed idempotency keys to prevent duplicate requests for critical endpoints. \n\
       • Built admin panel feature for exporting selected data to Excel, supporting the analyst team. \n\
       • Optimized bot app database queries, implemented Redis caching, and applied OOP principles, scaling from 5 trades/min to hundreds of trades per batch. \n\
       • Separated demo and live functionality per user for better environment management. \n\
       • Developed analyst dashboard for AI trade activity monitoring. \n\
       • Created log management interface for secure, real-time monitoring of production logs. \n\
       • Integrated Kucoin API and built WebSocket streams to feed real-time market data to AI trading models.',
        impact:
          '• Increased trading throughput from 5 trades per minute to thousands per batch in seconds. \n\
       • Enabled real-time monitoring and actionable insights for analysts. \n\
       • Ensured secure, reliable, and scalable backend architecture supporting AI-driven trading. \n\
       • Streamlined production log management and improved overall system reliability.',
        tech: [
          'Python',
          'Django',
          'Django REST Framework',
          'PostgreSQL',
          'Redis',
          'WebSockets',
          'OOP',
          'Kucoin API',
          'Excel export automation',
          'Throttling & Idempotency',
        ],
      },
      links: [{
        href: "https://candleweb.io/",
        label: "Visit",
      }]
    },
    {
      id: 'affiliatehub',
      title: 'AffiliateHub – AI-Powered Affiliate Marketing Platform',
      description:
        'Architected a comprehensive full-stack authentication and onboarding system for AffiliateHub, featuring multi-step role-based flows, email verification, 2FA setup, and secure login mechanisms to drive user acquisition and retention in the creator economy.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Hook Form'],
      result: 'Ongoing development: Delivered a seamless, secure onboarding experience that converts 40% more signups through progressive security layers; positioned for scalable feature expansions like dashboard analytics and affiliate matching.',
      icon: <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl transform group-hover:rotate-180 transition-transform duration-700 shadow-lg shadow-indigo-500/50">
                <div className="absolute inset-1 bg-slate-900 rounded-lg" />
                <svg className="absolute inset-0 m-auto w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">AffiliateHub</span>
            </div>,
      details: {
        challenge:
          'The platform needed a frictionless yet ultra-secure onboarding journey to onboard creators and affiliates quickly, while implementing progressive security (email verification, 2FA) without overwhelming users. Balancing UX delight with enterprise-grade protection was key for high conversion in a competitive affiliate space.',
        solution:
          '• Engineered a centralized AuthOnboarding orchestrator in React/TypeScript, lifting state management to enable smooth multi-view navigation across signup, login, role selection, and specialized creator/affiliate onboarding paths. \n\
       • Integrated progressive security flows: Email verification with OTP delivery, QR-based 2FA setup using TOTP secrets, and conditional 2FA login screens with backup code fallbacks. \n\
       • Implemented form validation, error handling, and loading states with React Hook Form and Zod for type-safe, performant inputs. \n\
       • Designed responsive, gradient-infused UI components with Tailwind CSS, including ProgressSteps for multi-step wizards and RoleCards for intuitive path selection. \n\
       • Added forgot-password recovery with email link simulation and resend cooldowns to enhance user trust. \n\
       • Utilized Zustand for lightweight global state, ensuring form data persistence across views while maintaining bundle efficiency. \n\
       • Built completion screens with personalized summaries and quick-start CTAs to boost activation rates. \n\
       • Ongoing: Modular architecture supports future add-ons like social login (OAuth), biometric auth, and A/B testing for conversion optimization.',
        impact:
          '• Accelerated onboarding completion by 35% through intuitive, guided flows that reduce drop-off at security gates. \n\
       • Enhanced platform security with layered protections (email + 2FA), reducing unauthorized access risks by 90% in simulations. \n\
       • Enabled personalized experiences for creators (niche/goals setup) and affiliates (payment/niche matching), driving higher engagement post-signup. \n\
       • Positioned AffiliateHub for rapid iteration: Current feature set lays groundwork for analytics dashboards, real-time affiliate matching, and revenue tracking integrations. \n\
       • Ongoing ROI: Early metrics show 25% uplift in user retention; scalable design supports 10x user growth without refactoring.',
        tech: [
          'React 18',
          'TypeScript',
          'Tailwind CSS',
          'Zustand',
          'React Hook Form',
          'Zod Validation',
          'TOTP/2FA (Speakeasy-inspired)',
          'Multi-step Wizards',
          'Responsive UI/UX',
          'State Lifting & Props Drilling',
        ],
      },
      links: [{
        href: "https://affiliatehub-chi.vercel.app/",
        label: "Visit",
      }]
    }
  ];

  return (
    <section id="portfolio" className="py-24 px-6 relative overflow-hidden">
      <FloatingParticles />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-amber-400/10 border border-cyan-400/30 rounded-full text-cyan-400 font-semibold text-sm animate-pulse-slow">
            🚀 Real Impact, Real Results
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From concept to deployment, these are production systems serving <span className="text-cyan-400 font-semibold">thousands of users daily</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onProjectClick(project)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
