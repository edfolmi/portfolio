import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { useAppStore } from '../state/useAppStore';
import { fetchProjects } from '../utils/api';

const Home: React.FC = () => {
  const setProjects = useAppStore((s) => s.setProjects);
  const projects = useAppStore((s) => s.projects);

  useEffect(() => {
    // fetch projects and populate store — error handling omitted for brevity
    fetchProjects().then(setProjects).catch(() => {
      // fallback sample projects
      setProjects([
        {
          id: '1',
          title: 'Fintech API Platform',
          description: 'Built a secure payment aggregation backend for a payments startup.',
          stack: ['PostgreSQL', 'AWS Lambda', 'Redis'],
          badge: 'Django + DRF',
          result: 'Reduced API response time by 40%; handled 5k req/min.',
          links: [{ label: 'Live Demo', href: '#' }]
        }
      ]);
    });
  }, [setProjects]);

  return (
    <>
      <Header />
      <main id="top" className="container">
        <Hero />
        <section id="portfolio" className="py-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Selected Projects</h2>
              <p className="text-sm mt-1">4–6 of the best backend / API integrations & performance wins.</p>
            </div>
            <div>
              <span className="pill">Goal: ₦700k–₦1M/month by end of year</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <Services />
        <Testimonials />

        <section id="contact" className="py-10 container">
          <div className="grid md:grid-cols-2 gap-6">
            <ContactForm />
            <div className="contact-info">
              <h3 className="text-xl font-bold">Contact</h3>
              <p style={{ color: 'var(--muted)' }}>Email: hello@yourdomain.com</p>
              <p style={{ color: 'var(--muted)' }}>Based in Lagos, Nigeria — Available for remote work</p>
              <div className="socials mt-4">
                <a className="social-link" href="#">LinkedIn</a>
                <a className="social-link" href="#">GitHub</a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Home;
