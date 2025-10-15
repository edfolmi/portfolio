import React from 'react';
import { Shield, Zap, Database } from 'lucide-react';
import { FloatingParticles } from '../ui/FloatingParticles';
import { useScrollReveal } from '../../hooks/customHooks';


// ============================================
// ABOUT SECTION (NEW)
// ============================================
const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  const skills = [
    { name: 'Node.js', level: 95 },
    { name: 'Python', level: 90 },
    { name: 'PostgreSQL', level: 92 },
    { name: 'Redis', level: 88 },
    { name: 'Docker', level: 85 },
    { name: 'AWS', level: 87 },
  ];

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <FloatingParticles />
      
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 bg-clip-text text-transparent">
            Why Work With Me?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I don't just write code—I architect scalable solutions that drive real business growth. 
            With <span className="text-cyan-400 font-semibold">5+ years</span> of backend expertise, 
            I've helped startups scale from zero to millions in revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Skills */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h3 className="text-3xl font-bold text-white mb-8">Core Expertise</h3>
            {skills.map((skill, index) => (
              <div key={skill.name} className="group" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-semibold">{skill.name}</span>
                  <span className="text-cyan-400 font-mono">{skill.level}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000 ease-out group-hover:from-amber-400 group-hover:to-orange-500"
                    style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                  >
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Value Props */}
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Security First',
                desc: 'Every API I build follows industry best practices with OAuth2, JWT, and encryption standards.'
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Performance Obsessed',
                desc: 'Sub-200ms response times aren\'t optional—they\'re standard. I optimize for speed at every layer.'
              },
              {
                icon: <Database className="w-6 h-6" />,
                title: 'Scalable Architecture',
                desc: 'From 100 to 100,000 users, your backend will handle it. Microservices, caching, load balancing—done right.'
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex gap-4 p-6 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-cyan-400/50 hover:bg-slate-900/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/20 group"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
