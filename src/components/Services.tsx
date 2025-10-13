import React from 'react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-10 container">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Productized Packages</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Clear, predictable offerings for retainers and maintenance.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="service-card">
          <div className="service-title font-bold">Bronze</div>
          <div className="price font-semibold">₦50,000 <span className="text-xs">/ month</span></div>
          <p>Monitoring + Bug Fixing</p>
          <ul className="service-features mt-2 text-sm">
            <li>Uptime & error alerts</li>
            <li>Fix critical bugs (up to 2)</li>
            <li>Weekly health summary</li>
          </ul>
          <div className="mt-auto">
            <a href="#contact" className="btn">Start Bronze</a>
          </div>
        </div>

        {/* Silver & Gold: copy/paste and modify */}
      </div>
    </section>
  );
};

export default Services;
