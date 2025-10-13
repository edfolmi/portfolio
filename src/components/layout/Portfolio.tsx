import { Card } from '../ui/Card';


export function PortfolioSection() {
    return (
        <section id="portfolio" aria-label="Portfolio section">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h2 className="m-0 text-2xl font-semibold">Selected Projects</h2>
                    <p className="mt-1 text-sm">4–6 of the best backend / API integrations & performance wins.</p>
                </div>
                <div>
                    <span className="text-sm bg-white/7 px-4 py-2 rounded-full">Goal: ₦700k–₦1M/month by end of year</span>
                </div>
            </div>

            <div className="grid gap-6 mt-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    title="Fintech API Platform"
                    subtitle="Built a secure payment aggregation backend for a payments startup."
                    techBadge="Django + DRF"
                    result="Client result: Reduced API response time by 40%; handled 5k requests/min during peak."
                    tags={['PostgreSQL', 'AWS Lambda', 'Redis Caching']}
                    links={[
                        { href: '#', label: 'Live Demo', variant: 'primary' },
                        { href: '#', label: 'Case Study', variant: 'ghost' },
                    ]}
                />

                <Card
                    title="SaaS Backend Scaling"
                    subtitle="Rearchitected microservice communication to support multi-tenant scaling."
                    techBadge="Python"
                    result="Client result: 99.9% uptime; backend scales seamlessly to +10k concurrent users."
                    tags={['Celery', 'PostgreSQL', 'Kubernetes']}
                    links={[{ href: '#', label: 'Case Study', variant: 'primary' }]}
                />

                <Card
                    title="Healthtech Data Sync"
                    subtitle="Built HIPAA-aligned integration layer for patient records synchronization."
                    techBadge="Django + Celery"
                    result="Client result: Real-time sync with external EMR systems; error rate under 0.2%."
                    tags={['RabbitMQ', 'PostgreSQL', 'Audit Logging']}
                    links={[{ href: '#', label: 'Live', variant: 'primary' }]}
                />
            </div>
        </section>
    );
}

export default PortfolioSection;
