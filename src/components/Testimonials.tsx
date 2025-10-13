import React from 'react';
import type { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 't-1',
    quote: 'He transformed our unstable backend into a rock-solid API layer. Downtime dropped to zero and integrations became painless.',
    name: 'Jane Doe',
    initials: 'JD',
  },
  // add more
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-10 container">
      <div>
        <h2 className="text-2xl font-bold">What Clients Say</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Social proof that builds credibility and makes outreach convert.</p>
      </div>

      <div className="testimonials mt-4">
        <div className="testi-slider flex gap-4 overflow-x-auto pb-4">
          {testimonials.map((t) => (
            <div key={t.id} className="testi-card">
              <p className="quote">{t.quote}</p>
              <div className="client mt-4">
                <div className="avatar">{t.initials}</div>
                <div className="client-info">
                  <strong>{t.name}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
