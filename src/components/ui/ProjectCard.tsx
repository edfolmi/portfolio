import React from 'react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../../hooks/customHooks';
import type { Project } from '../../types/index';

// ============================================
// ENHANCED PROJECT CARD
// ============================================
const ProjectCard: React.FC<{ project: Project; onClick: () => void; index: number }> = ({ project, onClick, index }) => {
  const { ref, isVisible } = useScrollReveal(0.15);

  // Different entrance animations
  const animations = [
    'animate-slide-in-bottom',
    'animate-slide-in-left',
    'animate-slide-in-right',
    'animate-zoom-in',
    'animate-flip-in',
    'animate-rotate-in'
  ];

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`project-card group relative bg-gradient-to-br from-slate-900/80 to-slate-900/40 rounded-3xl overflow-hidden border border-white/5 cursor-pointer transition-all duration-700 hover:border-cyan-400/50 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-400/30 ${
        isVisible ? animations[index % animations.length] : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-blue-500/0 to-amber-400/0 group-hover:from-cyan-400/10 group-hover:via-blue-500/10 group-hover:to-amber-400/10 transition-all duration-700" />
      
      {/* Icon section */}
      <div className="relative h-52 bg-gradient-to-br from-slate-800/50 to-slate-900/50 flex items-center justify-center border-b border-white/5 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>
        
        <div className="relative text-cyan-400/40 group-hover:text-cyan-400/70 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
          {project.icon}
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>

      <div className="relative p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-amber-400 group-hover:bg-clip-text transition-all duration-500">
          {project.title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string, i: number) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-cyan-400 font-medium group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-amber-400 font-semibold pt-2 group-hover:gap-3 transition-all">
          <TrendingUp className="w-5 h-5 group-hover:animate-bounce" />
          <span className="group-hover:text-amber-300">{project.result}</span>
        </div>

        {/* Click indicator */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
          <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
            <ChevronRight className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
