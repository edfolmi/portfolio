import { useScrollReveal } from '../hooks/customHooks';

const Philosophy: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36">
      <hr className="ed-rule mb-24 md:mb-36" />

      <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
        <div className="max-w-3xl mx-auto lg:mx-0 lg:ml-auto">
          <span className="ed-label mb-8 block">On Building Things</span>

          <div className="space-y-8">
            <p className="ed-serif text-2xl md:text-3xl lg:text-4xl text-charcoal leading-snug font-bold">
              I believe backend engineering is invisible craftsmanship, and AI Engineering is visible craftsmanship.
            </p>

            <div className="space-y-6 ed-body text-base md:text-lg">
              <p>
              Great backend engineering is a ghost in the machine, if you notice it, something went wrong. 
              Great AI is a soul in the machine, if you notice it, something went right.
              </p>
              <p>
                That's the standard I hold.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
