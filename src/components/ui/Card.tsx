import React from "react";

interface LinkItem {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
}

interface CardProps {
  title: string;
  subtitle?: string;
  techBadge?: string;
  result?: string;
  tags?: string[];
  links?: LinkItem[];
  children?: React.ReactNode;
}

export const Card = ({
  title,
  subtitle,
  techBadge,
  result,
  tags = [],
  links = [],
  children,
}: CardProps) => {
  return (
    <article className="project-card bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl p-4">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="project-title text-lg font-semibold">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-300">{subtitle}</p>}
        </div>

        {techBadge && (
          <div className="text-[0.7rem] px-3 py-1 bg-white/6 rounded-full">{techBadge}</div>
        )}
      </div>

      {result && (
        <p className="result-badge mt-3 text-sm text-gray-200 bg-white/3 p-3 rounded-md">
          {result}
        </p>
      )}

      {children}

      {tags.length > 0 && (
        <div className="flex gap-3 flex-wrap mt-3">
          {tags.map((t) => (
            <span key={t} className="pill text-sm bg-white/6 px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="project-links flex gap-3 mt-4">
          {links.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              className={
                l.variant === "ghost"
                  ? "text-sm px-3 py-2 bg-white/6 rounded-md"
                  : "btn text-sm px-3 py-2 bg-blue-600 text-white rounded-md"
              }
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
};
