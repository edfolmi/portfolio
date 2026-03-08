import { useScrollReveal } from '../hooks/customHooks';
import candleweblogo from '../assets/candleweb.png';
import shugalogo from '../assets/shuga.png';

interface CaseStudy {
  number: string;
  title: string;
  subtitle: string;
  context: string;
  challenge: string;
  solution: string;
  impact: string;
  tech: string[];
  link?: { href: string; label: string };
  logo?: string;
}

const projects: CaseStudy[] = [
  {
    number: '01',
    title: 'Candleweb',
    subtitle: 'AI Trading Platform',
    context:
      'Engineered the backend and analytics infrastructure for Candleweb.io — enabling real-time AI trading, secure data management, and scalable API services for cryptocurrency markets.',
    challenge:
      'The platform required high-speed AI trade processing, real-time data streaming, and robust admin capabilities while ensuring security, scalability, and reliability across live and demo trading environments.',
    solution:
      'Implemented secure cookie-based API authentication. Built throttling and idempotency mechanisms for critical endpoints. Optimized bot database queries with Redis caching and OOP principles, scaling from 5 trades per minute to thousands per batch. Integrated Kucoin API and WebSocket streams for real-time market data.',
    impact:
      'Increased trading throughput from 5 trades per minute to thousands per batch in seconds. Enabled real-time monitoring and actionable insights for analysts. Streamlined production log management and improved system reliability.',
    tech: ['Django REST Framework', 'PostgreSQL', 'Redis', 'WebSockets', 'Celery', 'Kucoin API', 'OOP'],
    link: { href: 'https://candleweb.io/', label: 'Visit Candleweb' },
    logo: candleweblogo,
  },
  {
    number: '02',
    title: 'ShugaNetwork',
    subtitle: 'Event Ticketing Platform',
    context:
      'A robust and scalable event ticketing platform powering seamless ticket sales, event listings, and payment integrations across iOS, Android, and web.',
    challenge:
      'The client needed a high-performance backend for an event ticketing platform that could manage large-scale user activity, secure transactions, and synchronize seamlessly across web and mobile platforms.',
    solution:
      'Architected a complete backend system using Django REST Framework with PostgreSQL for relational data and AWS S3 for media storage. Integrated secure payment flows through Paystack, Stripe (Google Pay & Apple Pay), and PayPal. Developed the marketing homepage optimized for fast loading and SEO performance.',
    impact:
      'Launched on both iOS and Play Store, supporting thousands of concurrent users. Achieved 99.9% uptime and reduced average API response time to under 250ms.',
    tech: ['Django REST Framework', 'PostgreSQL', 'Celery', 'Nginx', 'Gunicorn', 'AWS S3', 'Paystack', 'Stripe'],
    link: { href: 'https://play.google.com/store/apps/details?id=com.shugaentertainment.shuga', label: 'Visit ShugaNetwork' },
    logo: shugalogo,
  },
  // {
  //   number: '03',
  //   title: 'AffiliateHub',
  //   subtitle: 'AI-Powered Affiliate Marketing Platform',
  //   context:
  //     'Architected a comprehensive full-stack authentication and onboarding system featuring multi-step role-based flows, email verification, 2FA setup, and secure login mechanisms for the creator economy.',
  //   challenge:
  //     'The platform needed a frictionless yet ultra-secure onboarding journey to onboard creators and affiliates quickly, while implementing progressive security without overwhelming users.',
  //   solution:
  //     'Engineered a centralized AuthOnboarding orchestrator in React and TypeScript. Integrated progressive security flows including email verification with OTP, QR-based 2FA using TOTP secrets, and conditional login screens with backup code fallbacks. Built form validation with React Hook Form and Zod.',
  //   impact:
  //     'Accelerated onboarding completion by 35% through guided flows. Enhanced platform security with layered protections reducing unauthorized access risks by 90% in simulations. Early metrics showed 25% uplift in user retention.',
  //   tech: ['React 18', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Hook Form', 'Zod', 'TOTP/2FA'],
  //   link: { href: 'https://affiliatehub-chi.vercel.app/', label: 'Visit AffiliateHub' },
  // },
];

const ProjectSection: React.FC<{ project: CaseStudy; reversed?: boolean }> = ({ project, reversed }) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <article ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 ${reversed ? 'lg:direction-rtl' : ''}`}>
        {/* Number + Title Column */}
        <div className={`lg:col-span-4 ${reversed ? 'lg:col-start-9 lg:text-right' : ''}`} style={{ direction: 'ltr' }}>
          <span className="project-number text-6xl md:text-8xl block mb-4">{project.number}</span>
          <h3 className="ed-title text-3xl md:text-4xl text-charcoal mb-2">{project.title}</h3>
          <p className="text-rust font-medium text-sm tracking-wide uppercase">{project.subtitle}</p>

          {project.logo && (
            <div className="mt-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
              <img src={project.logo} alt={project.title} className="max-w-[120px] h-auto" />
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="ed-tag">{t}</span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-link inline-block mt-8 text-sm font-medium"
            >
              {project.link.label} &#8599;
            </a>
          )}
        </div>

        {/* Story Column */}
        <div className={`lg:col-span-7 ${reversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-6'}`} style={{ direction: 'ltr' }}>
          <p className="ed-body text-lg md:text-xl leading-relaxed mb-10 text-graphite">
            {project.context}
          </p>

          <div className="space-y-8">
            <div>
              <span className="ed-label mb-3 block">The Challenge</span>
              <p className="ed-body">{project.challenge}</p>
            </div>
            <div>
              <span className="ed-label mb-3 block">The Approach</span>
              <p className="ed-body">{project.solution}</p>
            </div>
            <div>
              <span className="ed-label mb-3 block">The Impact</span>
              <p className="ed-body text-charcoal font-medium">{project.impact}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const Work: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36" id="work">
      <hr className="ed-rule mb-24 md:mb-36" />

      <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''} mb-20 md:mb-28`}>
        <span className="ed-label mb-6 block">Selected Work</span>
        <h2 className="ed-title text-4xl md:text-5xl lg:text-6xl text-charcoal max-w-4xl">
          Projects built for
          <span className="text-stone"> production, not portfolios.</span>
        </h2>
      </div>

      <div className="space-y-28 md:space-y-40">
        {projects.map((project, i) => (
          <ProjectSection key={project.number} project={project} reversed={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
};

export default Work;
