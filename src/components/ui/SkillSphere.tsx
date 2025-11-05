import React, { useEffect, useRef, useState } from 'react';
import { Globe, Sparkles, Zap } from 'lucide-react';

interface Skill {
  name: string;
  category: 'language' | 'framework' | 'database' | 'tool' | 'cloud' | 'devops';
  proficiency: number;
  icon?: string;
}

const SkillSphere3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const rotationRef = useRef({ x: 0.5, y: 0.5 });
  const velocityRef = useRef({ x: 0.4, y: 0.3 });
  const mouseRef = useRef({ x: 0, y: 0, down: false, lastX: 0, lastY: 0 });
  const momentumRef = useRef({ x: 0, y: 0 });

  const skills: Skill[] = [

    // Languages
    { name: 'Python', category: 'language', proficiency: 95, icon: '🐍' },
    { name: 'JavaScript', category: 'language', proficiency: 92, icon: '🟨' },
    { name: 'TypeScript', category: 'language', proficiency: 90, icon: '💙' },
    { name: 'SQL (PostgreSQL & MySQL)', category: 'language', proficiency: 88, icon: '🐘' },

    // Frameworks
    { name: 'Django', category: 'framework', proficiency: 94, icon: '🎸' },
    { name: 'Django REST Framework', category: 'framework', proficiency: 93, icon: '⚡' },
    { name: 'Scrapy', category: 'framework', proficiency: 85, icon: '🕷️' },
    { name: 'React', category: 'framework', proficiency: 92, icon: '⚛️' },
    { name: 'jQuery', category: 'framework', proficiency: 85, icon: '🎯' },

    // DevOps / Deployment
    { name: 'Docker', category: 'devops', proficiency: 91, icon: '🐳' },
    { name: 'Redis', category: 'devops', proficiency: 90, icon: '🔴' },
    { name: 'Celery (Task Queue / Automation)', category: 'devops', proficiency: 88, icon: '⚡' },
    { name: 'WebSockets', category: 'devops', proficiency: 86, icon: '🔗' },
    { name: 'AWS', category: 'cloud', proficiency: 89, icon: '☁️' },
    { name: 'Render & Railway', category: 'cloud', proficiency: 85, icon: '🚀' },

    // API / Automation
    { name: 'API Development', category: 'tool', proficiency: 95, icon: '🔌' },
    { name: 'Software Development', category: 'tool', proficiency: 92, icon: '💻' },
    { name: 'OOP (Object-Oriented Programming)', category: 'tool', proficiency: 90, icon: '🛠️' },

    // Other tech
    { name: 'Git & GitHub/GitLab', category: 'tool', proficiency: 93, icon: '🔧' },
    { name: 'Cryptocurrency', category: 'tool', proficiency: 85, icon: '₿' },

    // Soft Skills
    { name: 'Agile & Scrum Methodologies', category: 'framework', proficiency: 90, icon: '📋' },
    { name: 'AI', category: 'tool', proficiency: 88, icon: '🤖' },
  ];

useEffect(() => {
  // Detect mobile
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);

  return () => window.removeEventListener('resize', checkMobile);
}, []);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // High DPI support
  const setCanvasSize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  };

  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  // Create 3D points using Fibonacci sphere algorithm
  const points = skills.map((skill, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    return {
      x: Math.cos(theta) * Math.sin(phi),
      y: Math.sin(theta) * Math.sin(phi),
      z: Math.cos(phi),
      skill,
      originalIndex: i,
    };
  });

  // Enhanced particles with depth and movement
  const particles = Array.from({ length: isMobile ? 30 : 80 }, () => ({
    x: (Math.random() - 0.5) * 4,
    y: (Math.random() - 0.5) * 4,
    z: (Math.random() - 0.5) * 4,
    size: Math.random() * 2.5 + 0.5,
    speed: Math.random() * 0.0005 + 0.0002,
    twinkle: Math.random() * Math.PI * 2,
  }));

  let animationFrame: number;
  let startTime = Date.now();
  // let lastFrameTime = Date.now();

  const animate = () => {
    const now = Date.now();
    // const deltaTime = now - lastFrameTime;
    // lastFrameTime = now;

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * (isMobile ? 0.32 : 0.38);

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Apply momentum for smooth deceleration
    if (!isInteracting) {
      rotationRef.current.x += velocityRef.current.x * 0.01;
      rotationRef.current.y += velocityRef.current.y * 0.01;

      // Apply momentum
      rotationRef.current.x += momentumRef.current.x;
      rotationRef.current.y += momentumRef.current.y;

      // Decay momentum
      momentumRef.current.x *= 0.95;
      momentumRef.current.y *= 0.95;
    }

    const rx = rotationRef.current.x;
    const ry = rotationRef.current.y;

    // Animate and draw particles with twinkling
    particles.forEach((p) => {
      p.twinkle += 0.05;
      const twinkleIntensity = (Math.sin(p.twinkle) + 1) / 2;

      let z = p.z * Math.cos(rx) - p.y * Math.sin(rx);
      let y = p.z * Math.sin(rx) + p.y * Math.cos(rx);
      let x = p.x * Math.cos(ry) - z * Math.sin(ry);
      z = p.x * Math.sin(ry) + z * Math.cos(ry);

      // Slow rotation of particles
      p.x += p.speed * Math.sin(now * 0.001);
      p.y += p.speed * Math.cos(now * 0.001);

      if (z > -2) {
        const scale = 400 / (400 + z);
        const x2d = centerX + x * radius * scale;
        const y2d = centerY + y * radius * scale;
        const size = p.size * scale;
        const opacity = ((z + 2) / 4) * twinkleIntensity;

        // Gradient for particles
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size);
        gradient.addColorStop(0, `rgba(34, 211, 238, ${opacity * 0.9})`);
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(34, 211, 238, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Sort points by z-depth for proper rendering
    const projectedPoints = points.map((p) => {
      let z = p.z * Math.cos(rx) - p.y * Math.sin(rx);
      let y = p.z * Math.sin(rx) + p.y * Math.cos(rx);
      let x = p.x * Math.cos(ry) - z * Math.sin(ry);
      z = p.x * Math.sin(ry) + z * Math.cos(ry);

      const scale = 400 / (400 + z);
      const x2d = centerX + x * radius * scale;
      const y2d = centerY + y * radius * scale;

      return { ...p, x2d, y2d, z, scale };
    }).sort((a, b) => a.z - b.z);

    // Draw skill labels with enhanced effects
    projectedPoints.forEach((point, index) => {
      const { x2d, y2d, z, scale, skill } = point;
      const depth = (z + 1) / 2;
      // const fadeIn = Math.min(1, (now - startTime - index * 40) / 800);
      const fadeIn = 0.9 + Math.min(0.1, (now - startTime - index * 40) / 800 * 0.1);

      if (depth > 0 && fadeIn > 0) {
        const categoryColors: Record<string, { primary: string; secondary: string; glow: string }> = {
          language: { primary: '#22d3ee', secondary: '#06b6d4', glow: 'rgba(34, 211, 238, 0.4)' },
          framework: { primary: '#a78bfa', secondary: '#8b5cf6', glow: 'rgba(167, 139, 250, 0.4)' },
          database: { primary: '#34d399', secondary: '#10b981', glow: 'rgba(52, 211, 153, 0.4)' },
          tool: { primary: '#fbbf24', secondary: '#f59e0b', glow: 'rgba(251, 191, 36, 0.4)' },
          cloud: { primary: '#f472b6', secondary: '#ec4899', glow: 'rgba(244, 114, 182, 0.4)' },
          devops: { primary: '#fb923c', secondary: '#f97316', glow: 'rgba(251, 146, 60, 0.4)' },
        };

        const colors = categoryColors[skill.category];
        const isHovered = hoveredSkill === skill.name;
        const hoverScale = isHovered ? 1.3 : 1;

        // Enhanced glow effect
        const glowSize = (20 + skill.proficiency / 5) * scale * fadeIn * hoverScale;
        ctx.shadowBlur = glowSize;
        ctx.shadowColor = colors.glow;

        // Background bubble for skill
        const bubbleRadius = (isMobile ? 35 : 40) * scale * hoverScale;
        const bubbleGradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, bubbleRadius);
        bubbleGradient.addColorStop(0, `${colors.primary}20`);
        bubbleGradient.addColorStop(1, `${colors.primary}00`);

        ctx.fillStyle = bubbleGradient;
        ctx.globalAlpha = depth * 0.6 * fadeIn;
        ctx.beginPath();
        ctx.arc(x2d, y2d, bubbleRadius, 0, Math.PI * 2);
        ctx.fill();

        // Skill icon (emoji)
        if (skill.icon) {
          const iconSize = (isMobile ? 18 : 22) * scale * hoverScale;
          ctx.globalAlpha = depth * fadeIn;
          ctx.font = `${iconSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(skill.icon, x2d, y2d - (isMobile ? 12 : 15) * scale * hoverScale);
        }

        // Skill name with gradient
        const fontSize = (isMobile ? 11 : 14) * scale * hoverScale;
        ctx.font = `bold ${fontSize}px 'Inter', system-ui, sans-serif`;

        // Create text gradient
        const textGradient = ctx.createLinearGradient(
          x2d - 50, y2d,
          x2d + 50, y2d
        );
        textGradient.addColorStop(0, colors.secondary);
        textGradient.addColorStop(0.5, colors.primary);
        textGradient.addColorStop(1, colors.secondary);

        ctx.fillStyle = textGradient;
        ctx.globalAlpha = depth * 0.95 * fadeIn;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.name, x2d, y2d + (isMobile ? 8 : 10) * scale * hoverScale);

        // Proficiency indicator (subtle ring)
        if (isHovered) {
          ctx.globalAlpha = depth * 0.5 * fadeIn;
          ctx.strokeStyle = colors.primary;
          ctx.lineWidth = 2 * scale;
          ctx.beginPath();
          ctx.arc(x2d, y2d, bubbleRadius * 1.2, 0, (skill.proficiency / 100) * Math.PI * 2);
          ctx.stroke();
        }

        // Connection line to center (very subtle)
        ctx.globalAlpha = depth * 0.08 * fadeIn;
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x2d, y2d);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    });

    // Central glow effect
    const centralGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.3);
    centralGlow.addColorStop(0, 'rgba(34, 211, 238, 0.15)');
    centralGlow.addColorStop(0.5, 'rgba(147, 51, 234, 0.08)');
    centralGlow.addColorStop(1, 'rgba(34, 211, 238, 0)');
    ctx.fillStyle = centralGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();

    animationFrame = requestAnimationFrame(animate);
  };

  animate();

  // Mouse/Touch interaction handlers
  const handleStart = (clientX: number, clientY: number) => {
    mouseRef.current.down = true;
    mouseRef.current.x = clientX;
    mouseRef.current.y = clientY;
    mouseRef.current.lastX = clientX;
    mouseRef.current.lastY = clientY;
    setIsInteracting(true);
    momentumRef.current = { x: 0, y: 0 };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (mouseRef.current.down) {
      const dx = clientX - mouseRef.current.x;
      const dy = clientY - mouseRef.current.y;

      const sensitivity = isMobile ? 0.008 : 0.006;
      rotationRef.current.y += dx * sensitivity;
      rotationRef.current.x += dy * sensitivity;

      // Calculate momentum
      momentumRef.current.x = (clientY - mouseRef.current.lastY) * sensitivity * 0.1;
      momentumRef.current.y = (clientX - mouseRef.current.lastX) * sensitivity * 0.1;

      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
      mouseRef.current.lastX = clientX;
      mouseRef.current.lastY = clientY;
    }

    // Hover detection
    const rect = canvas.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    // Check if hovering over any skill (simplified)
    let foundHover = null;
    for (const point of points) {
      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;
      let z = point.z * Math.cos(rx) - point.y * Math.sin(rx);
      let y = point.z * Math.sin(rx) + point.y * Math.cos(rx);
      let x = point.x * Math.cos(ry) - z * Math.sin(ry);
      z = point.x * Math.sin(ry) + z * Math.cos(ry);

      const radius = Math.min(rect.width, rect.height) * (isMobile ? 0.32 : 0.38);
      const scale = 400 / (400 + z);
      const x2d = rect.width / 2 + x * radius * scale;
      const y2d = rect.height / 2 + y * radius * scale;

      const distance = Math.sqrt((mouseX - x2d) ** 2 + (mouseY - y2d) ** 2);
      const hoverThreshold = 50 * scale; // slightly larger than 40
      if (distance < hoverThreshold) {
        foundHover = point.skill.name;
        break;
      }
    }
    if (foundHover !== hoveredSkill) {
      setHoveredSkill(foundHover);
    }
  };

  const handleEnd = () => {
    mouseRef.current.down = false;
    setTimeout(() => setIsInteracting(false), 200);
  };

  // Mouse events
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => handleEnd();

  // Touch events with proper prevention
  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleEnd();
  };

  // Attach mouse events
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseleave', handleMouseUp);

  // Attach touch events with proper options
  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
  canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });

  return () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', setCanvasSize);
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    canvas.removeEventListener('touchstart', handleTouchStart);
    canvas.removeEventListener('touchmove', handleTouchMove);
    canvas.removeEventListener('touchend', handleTouchEnd);
  };
}, [isInteracting, hoveredSkill, isMobile, skills]);

return (
  <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
    <div
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-cyan-400/20 shadow-2xl shadow-cyan-400/10"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse-slow pointer-events-none" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      />

      {/* Info overlay */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 space-y-2">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/80 backdrop-blur-xl rounded-full border border-cyan-400/30">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-cyan-400 font-semibold text-sm">25 Core Skills</span>
        </div>
        {hoveredSkill && (
          <div className="px-4 py-2 bg-slate-950/90 backdrop-blur-xl rounded-full border border-purple-400/30 animate-scale-in">
            <span className="text-purple-400 font-semibold text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {hoveredSkill}
            </span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-slate-950/80 backdrop-blur-xl rounded-full border border-cyan-400/30">
          <Globe className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold text-xs md:text-sm text-center">
            {isMobile ? 'Swipe to explore' : 'Click & drag to explore my tech universe'}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 space-y-1.5 hidden md:block">
        {[
          { label: 'Languages', color: 'bg-cyan-400' },
          { label: 'Frameworks', color: 'bg-purple-400' },
          { label: 'Databases', color: 'bg-emerald-400' },
          { label: 'DevOps', color: 'bg-orange-400' },
          { label: 'Cloud', color: 'bg-pink-400' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 px-3 py-1 bg-slate-950/60 backdrop-blur-sm rounded-full border border-white/10">
            <div className={`w-2 h-2 rounded-full ${item.color}`} />
            <span className="text-gray-400 text-xs">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Performance indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30">
        <span className="text-emerald-400 text-xs font-semibold">60 FPS</span>
      </div>
    </div>

    <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.8); opacity: 1; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        canvas {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }
      `}</style>
  </div>
);
};

export default SkillSphere3D;
