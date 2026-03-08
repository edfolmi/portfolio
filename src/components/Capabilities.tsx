import { useScrollReveal } from '../hooks/customHooks';

interface Capability {
  area: string;
  description: string;
  tools: string[];
}

const capabilities: Capability[] = [
  {
    area: 'AI & Automation',
    description: 'Building intelligent agents, RAG systems, Fine tuning models, and backend tooling.',
    tools: ['Celery', 'Custom AI Tools', 'LLM Integration', 'Task Queues', 'RAG Systems', 'Fine Tuning Models'],
  },
  {
    area: 'Backend Architecture',
    description: 'Designing and building production-grade server systems that scale with your business.',
    tools: ['Django', 'Flask', 'FastAPI', 'Python'],
  },
  {
    area: 'API Development',
    description: 'Creating robust, well-documented APIs that teams love to integrate with.',
    tools: ['REST', 'GraphQL', 'WebSockets', 'OpenAPI'],
  },
  {
    area: 'Database Engineering',
    description: 'Modeling, optimizing, and scaling data layers for performance and reliability.',
    tools: ['PostgreSQL', 'MySQL', 'Redis', 'Query Optimization'],
  },
  {
    area: 'Security Engineering',
    description: 'Implementing authentication, authorization, and data protection at every layer.',
    tools: ['OAuth2', 'JWT', '2FA/TOTP', 'Encryption'],
  },
  {
    area: 'DevOps & Deployment',
    description: 'Containerizing, deploying, and monitoring applications in production environments.',
    tools: ['Docker', 'Kubernetes', 'AWS', 'Nginx', 'CI/CD'],
  },
];

const Capabilities: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const { ref: listRef, isVisible: listVisible } = useScrollReveal(0.05);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36" id="capabilities">
      <hr className="ed-rule mb-24 md:mb-36" />

      <div ref={headerRef} className={`reveal ${headerVisible ? 'visible' : ''} mb-16 md:mb-24`}>
        <span className="ed-label mb-6 block">Capabilities</span>
        <h2 className="ed-title text-4xl md:text-5xl lg:text-6xl text-charcoal max-w-3xl">
          What I bring
          <span className="text-stone"> to the table.</span>
        </h2>
      </div>

      <div ref={listRef} className={`reveal ${listVisible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {capabilities.map((cap, i) => (
            <div
              key={cap.area}
              className="py-8 border-t border-mist/50 group"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="ed-serif text-xl md:text-2xl font-bold text-charcoal group-hover:text-rust transition-colors duration-300">
                  {cap.area}
                </h3>
                <span className="project-number text-lg text-mist">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <p className="ed-body text-sm mb-4">{cap.description}</p>

              <div className="flex flex-wrap gap-2">
                {cap.tools.map((tool) => (
                  <span key={tool} className="text-xs text-silver font-medium">
                    {tool}
                    {tool !== cap.tools[cap.tools.length - 1] && (
                      <span className="text-mist ml-2">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
