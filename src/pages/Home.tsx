import React, { useState, useEffect } from 'react';

import type { Project } from '../types/index';
// import { AnimatedCursor } from '../components/ui/AnimatedCursor';
import { Preloader } from '../components/ui/Preloader';
import SkillSphere3D from '../components/ui/SkillSphere';

import Navigation from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import About from '../components/layout/About';
import Portfolio from '../components/layout/Portfolio';
// import Services from '../components/layout/Service';
import Testimonials from '../components/layout/Testimonial';
import Contact from '../components/layout/Contact';
import ProjectModal from '../components/ui/ProjectModal';
import Footer from '../components/layout/Footer';


// ============================================
// MAIN HOME PAGE COMPONENT
// ============================================
const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'portfolio', 'services', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          {/* <AnimatedCursor /> */}
          <Navigation activeSection={activeSection} />
          <Hero />
          <SkillSphere3D />
          <About />
          <Portfolio onProjectClick={setSelectedProject} />
          {/* <Services /> */}
          <Testimonials />
          <Contact />
          <Footer />
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </>
      )}
    </div>
  );
};

export default Home;
