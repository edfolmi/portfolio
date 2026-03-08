import { useScrollReveal } from '../hooks/customHooks';

const ContactSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36" id="contact">
      <hr className="ed-rule mb-24 md:mb-36" />

      <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="ed-label mb-6 block">Get In Touch</span>
            <h2 className="ed-title text-4xl md:text-5xl lg:text-7xl text-charcoal mb-8">
              Let&rsquo;s talk.
            </h2>
            <p className="ed-body text-lg md:text-xl max-w-xl mb-12">
              I&rsquo;m open to new roles, collaborations, and consulting engagements.
              If you&rsquo;re building something that needs reliable infrastructure,
              I&rsquo;d like to hear about it.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:edfolmi@gmail.com"
                className="ed-link text-xl md:text-2xl font-medium block"
              >
                contact@edfolmi.com
              </a>
              <a
                href="https://www.linkedin.com/in/ephraim-daniel-374103172/"
                target="_blank"
                rel="noopener noreferrer"
                className="ed-link text-xl md:text-2xl font-medium block"
              >
                LinkedIn &#8599;
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-sage inline-block" />
                <span className="text-sage font-medium text-sm">Currently available</span>
              </div>
              <p className="text-silver text-sm leading-relaxed">
                Open to full-time roles and select project engagements.
                Book a free 15-minute call to discuss your requirements.
              </p>
              <a
                href="https://calendly.com/edfolmi/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="ed-button mt-6 inline-flex"
              >
                Schedule a call
                <span className="text-xs">&#8599;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
