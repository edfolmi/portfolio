import React from 'react';
import type { Project } from '../types';

type Props = { project: Project };

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <article className="project-card">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="project-title font-semibold">{project.title}</h3>
          <p className="text-sm mt-1">{project.description}</p>
        </div>
        {project.badge && <div className="text-xs px-2 py-1 bg-white/5 rounded-full">{project.badge}</div>}
      </div>

      {project.result && <p className="result-badge text-sm">{project.result}</p>}

      <div className="flex gap-2 flex-wrap">
        {project.stack.map((s) => (
          <span key={s} className="pill text-xs">{s}</span>
        ))}
      </div>

      <div className="project-links mt-3 flex gap-2">
        {(project.links ?? []).map((l) => (
          <a key={l.label} href={l.href} className="btn text-xs px-3 py-2">{l.label}</a>
        ))}
      </div>
    </article>
  );
};

export default ProjectCard;
