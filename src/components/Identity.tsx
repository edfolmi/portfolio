import { useScrollReveal } from '../hooks/customHooks';
import me from '../assets/me.jpg';

const Identity: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36" id="about">
      <hr className="ed-rule mb-24 md:mb-36" />

      <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
        <span className="ed-label mb-12 block">About</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden bg-cream">
                <img
                  src={me}
                  alt="Ephraim Daniel"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="mt-4 flex justify-between items-baseline">
                <span className="text-sm text-silver">Abuja, Nigeria</span>
                {/* <span className="text-sm text-silver italic font-serif">est. 2020</span> */}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 xl:col-span-7 xl:col-start-6 lg:pt-8">
            <h2 className="ed-title text-3xl md:text-4xl lg:text-5xl mb-8 text-charcoal">
              I design scalable solutions
              <br className="hidden md:block" />
              <span className="text-stone"> that propel real</span>
              <br className="hidden md:block" />
              business growth.
            </h2>

            <div className="space-y-6 ed-body text-base md:text-lg max-w-2xl">
              <p>
              With 5+ years of experience designing, scaling, and maintaining
               high-performance API systems, distributed backend services, and 
               automated workflows. I specialise in Python (Django, Django REST Framework, 
               FastAPI, Flask), relational databases, asynchronous task queues, 
               performance optimisation, and modern frontend stacks (React + TypeScript).
              </p>
              <p>
              I have delivered reliable backend solutions across trading systems, 
              subscription platforms, and internal tools, with a strong focus on 
              clean architecture, TDD (Pytest, unittest), code quality (Flake8, CI/CD pipelines),
               and measurable improvements in speed, throughput, and system reliability.
              </p>
            </div>

            <div className="mt-12 flex gap-8 flex-wrap">
              <div>
                <span className="ed-title text-3xl md:text-4xl text-charcoal">30+</span>
                <p className="text-silver text-sm mt-1">Projects delivered</p>
              </div>
              <div>
                <span className="ed-title text-3xl md:text-4xl text-charcoal">5+</span>
                <p className="text-silver text-sm mt-1">Years in production</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Identity;
