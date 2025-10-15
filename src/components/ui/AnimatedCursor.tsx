import { useEffect, useState } from 'react';


// ============================================
// ANIMATED CURSOR (Desktop only)
// ============================================
const AnimatedCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .project-card, .service-card, .testimonial-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-200 ease-out hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`w-10 h-10 border-2 rounded-full transition-all duration-300 ${
          isClicking 
            ? 'scale-75 border-amber-400 bg-amber-400/30'
            : isHovering 
            ? 'scale-[2] border-cyan-400 bg-cyan-400/10' 
            : 'scale-100 border-cyan-400/50'
        }`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-1.5 h-1.5 bg-cyan-400 rounded-full ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
      </div>
    </div>
  );
};

export { AnimatedCursor };
