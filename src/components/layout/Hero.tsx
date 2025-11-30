import { useEffect } from "react";
import { Award, Send, Shield, Star, Zap } from "lucide-react";
import { FloatingParticles } from "../ui/FloatingParticles";
import { useScrollReveal, useCounter } from '../../hooks/customHooks';
import me from "../../assets/me.jpg";


// ============================================
// HERO SECTION WITH PROFILE
// ============================================
const Hero: React.FC = () => {
  const stats = [
    // { value: 200000, label: 'API calls / day', icon: <Code className="w-5 h-5" /> },
    { value: 99.99, label: '% uptime', icon: <Shield className="w-5 h-5" /> },
    { value: 30, label: '+ Projects delivered', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-30 pb-10">
      {/* Animated Background */}
      <FloatingParticles />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse-slow" />
        <div className="absolute w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Content Section */}
          <div className="text-center lg:text-left animate-slide-in-right">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 font-semibold text-sm animate-fade-in">
              ⚡ Available for Premium Projects
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent animate-gradient">
                I build secure, scalable APIs & backends
              </span>
              <br />
              <span className="text-gray-400 text-4xl md:text-5xl">for startups and businesses.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl">
              Specializing in <span className="text-cyan-400 font-semibold">building</span> <span className="text-cyan-400 font-semibold">robust</span> <span className="text-cyan-400 font-semibold">backend</span> <span className="text-cyan-400 font-semibold">APIs</span> that always scales.
            </p>

            <div className="flex gap-6 justify-center lg:justify-start mb-16 flex-wrap">
              <a
                href="#contact"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-full font-semibold hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-110 transition-all duration-300 flex items-center gap-2"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Hire Me - Let's Talk
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold hover:bg-white/10 border-2 border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
              >
                See My Work
              </a>
            </div>

            {/* Enhanced Stats */}
            <div className="flex gap-8 justify-center lg:justify-start flex-wrap">
              {stats.map((stat, index) => (
                <StatCounter key={index} {...stat} delay={index * 0.2} />
              ))}
            </div>
          </div>


          {/* Profile Section */}
          <div className="flex-shrink-0 animate-slide-in-left">
            <div className="relative group">
              {/* Animated rings around photo */}
              <div className="absolute inset-0 -m-4">
                <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-spin-slow" />
                <div className="absolute inset-0 border-2 border-amber-400/30 rounded-full animate-spin-reverse" />
              </div>

              {/* Profile photo placeholder with gradient */}
              <div className="relative w-85 h-85 rounded-full overflow-hidden border-4 border-gradient shadow-2xl shadow-cyan-400/50 group-hover:shadow-cyan-400/50 transition-all duration-500 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-amber-400/20" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/80">
                  <img
                    src={me}
                    alt="EDFolmi"
                  />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/40 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-1 -right-4 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                <Zap className="w-10 h-10 text-white" />
              </div>

              <div className="absolute -bottom-1 -left-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCounter: React.FC<{ value: number; label: string; delay: number; icon: React.ReactNode }> = ({ value, label, delay, icon }) => {
  const { ref, isVisible } = useScrollReveal(0.5);
  const { displayValue, startAnimation, hasAnimated } = useCounter(value);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setTimeout(() => startAnimation(), delay * 1000);
    }
  }, [isVisible, hasAnimated, startAnimation, delay]);

  return (
    <div ref={ref} className="text-center group">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="text-cyan-400 group-hover:scale-125 transition-transform">
          {icon}
        </div>
        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {displayValue}
        </div>
      </div>
      <div className="text-gray-400 text-sm font-medium">{label}</div>
    </div>
  );
};

export default Hero;