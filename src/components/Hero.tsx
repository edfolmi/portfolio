import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="py-10">
      <div className="hero container">
        <div className="hero-text fade-in" style={{ animationDelay: '.1s' }}>
          <div className="pretitle uppercase tracking-wider text-sm" style={{ color: 'var(--muted)' }}>
            Backend & API Specialist
          </div>
          <h1 className="headline text-4xl font-extrabold leading-tight">
            I build secure, scalable APIs & backends for startups and businesses.
          </h1>
          <p className="subheadline text-base" style={{ color: 'var(--muted)' }}>
            Specializing in fintech, SaaS, healthtech & logistics integrations.
          </p>

          <div className="cta-group mt-4 flex gap-3 flex-wrap">
            <a href="#contact" className="btn">Hire Me</a>
            <a href="#portfolio" className="inline-flex items-center px-4 py-2 rounded-full border border-white/10">View Work</a>
          </div>

          <div className="mt-4 flex gap-2">
            <span className="pill">Python</span>
            <span className="pill">Django / DRF</span>
            <span className="pill">PostgreSQL</span>
            <span className="pill">AWS</span>
          </div>
        </div>

        <div className="hero-visual fade-in" style={{ animationDelay: '.25s' }}>
          <div className="code-mockup p-4 rounded-md" aria-label="Code snippet">
            <pre style={{ margin: 0, fontFamily: 'ui-monospace,monospace', fontSize: '.75rem', color: '#cdd6f4' }}>
{`@api_view(['GET'])
def metrics(request):
    \"\"\"Returns system health and throughput\"\"\"
    data = calculate_metrics()
    return Response(data)`}
            </pre>
            <div style={{ marginTop: 8, fontSize: '.75rem', color: 'var(--muted)' }}>
              /* Real backend, real results. */
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
