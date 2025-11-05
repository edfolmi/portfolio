import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import type { Project } from '../../types';


// ============================================
// PROJECT MODAL
// ============================================
const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 max-w-4xl w-full border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/30 animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="inline-block mb-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 font-semibold text-sm">
              Case Study
            </div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-500/20 hover:border-red-500 hover:text-red-400 transition-all hover:scale-110 hover:rotate-90"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  Challenge
                </h4>
                <p className="text-gray-300 leading-relaxed">{project.details.challenge}</p>
              </div>

              <div>
                <h4 className="text-blue-400 font-bold uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Solution
                </h4>
                <p className="text-gray-300 leading-relaxed">{project.details.solution}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-amber-400 font-bold uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full" />
                  Impact & Results
                </h4>
                <p className="text-gray-300 leading-relaxed">{project.details.impact}</p>
              </div>

              <div>
                <h4 className="text-purple-400 font-bold uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.details.tech.map((tech, i) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-cyan-400 font-medium hover:bg-cyan-400/10 hover:border-cyan-400/30 transition-all"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex gap-4">
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-full font-bold hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105 transition-all text-center"
            >
              Start Similar Project
            </a>
            <Link to={project.links?.[0].href ?? "#"}>
              <button
                onClick={onClose}
                className="px-6 py-4 bg-white/5 border-2 border-white/10 text-white rounded-full font-bold hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105 transition-all"
              >
                {project.links?.[0].label ?? "Visit"}
              </button>
            </Link>

            <button
              onClick={onClose}
              className="px-6 py-4 bg-white/5 border-2 border-white/10 text-white rounded-full font-semibold hover:bg-white/10 hover:border-cyan-400/50 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
