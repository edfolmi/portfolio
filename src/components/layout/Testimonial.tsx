import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { FloatingParticles } from '../ui/FloatingParticles';
import { useScrollReveal } from '../../hooks/customHooks';
import type { Testimonial } from '../../types/index';


// ============================================
// ENHANCED TESTIMONIALS CAROUSEL
// ============================================
const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote: 'Whenever our team encounters a challenging issue, Ephraim is the developer that we turn to. He is a great team player because of his backend and automation knowledge as well as his ability to handle difficult situations with composure.',
      author: 'Bright Isaac Kelechi',
      role: 'Co-developer',
      company: 'Candleweb/ShugaNetwork',
      avatar: 'SE',
      rating: 5,
    },
    {
      id: '2',
      quote: 'Ephraim is incredibly reliable, I trust him like a brother. His work is always high-quality and on time, and no matter the complex requirements I have for my projects, he delivers accurately and expertly.',
      author: 'Ifeodora Ezekiel',
      role: 'Founder',
      company: 'Ifetech Digital System LTD',
      avatar: 'AM',
      rating: 5,
    },
    {
      id: '3',
      quote: 'Ephraim is not just talented, but genuinely professional and trustworthy. I’m grateful for his contributions, expertise and guidance.',
      author: 'Praise Akokomu',
      role: 'CEO',
      company: 'Coach Praise Company',
      avatar: 'CO',
      rating: 5,
    },
    {
      id: '4',
      quote: 'Ephraim solved a critical issue in our project that even other experienced developers couldn’t fix. His expertise and problem-solving skills are top-notch.',
      author: 'Engr A.P Adekanbi',
      role: 'Founder',
      company: 'SwiftLogGlobal',
      avatar: 'IB',
      rating: 5,
    },
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((curr) => (curr - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
      <FloatingParticles />
      
      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-amber-400/10 to-orange-500/10 border border-amber-400/30 rounded-full text-amber-400 font-semibold text-sm animate-pulse-slow">
            ⭐ 5.0 Average Rating
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400 bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-400">What clients say about working with me</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="testimonial-card bg-gradient-to-br from-slate-900/80 to-slate-900/40 rounded-3xl p-10 md:p-14 border border-white/5 hover:border-cyan-400/30 transition-all duration-500">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-2xl md:text-3xl text-gray-300 italic mb-10 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center gap-5">
                      {/* <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 font-bold text-2xl shadow-lg">
                        {testimonial.avatar}
                      </div> */}
                      <div>
                        <div className="font-bold text-white text-xl mb-1">{testimonial.author}</div>
                        <div className="text-gray-400 text-lg">
                          {testimonial.role} <span className="text-cyan-400">@</span> {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-14 h-14 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:border-transparent hover:text-slate-950 transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={next}
              className="w-14 h-14 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:border-transparent hover:text-slate-950 transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 w-12' 
                    : 'bg-white/20 w-2 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
