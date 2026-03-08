import { useScrollReveal } from '../hooks/customHooks';

interface Voice {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const voices: Voice[] = [
  {
    quote:
      'Whenever our team encounters a challenging issue, Ephraim is the developer that we turn to. He is a great team player because of his backend and automation knowledge as well as his ability to handle difficult situations with composure.',
    name: 'Bright Isaac Kelechi',
    role: 'Co-developer',
    company: 'Candleweb / ShugaNetwork',
  },
  {
    quote:
      'Ephraim is incredibly reliable — I trust him like a brother. His work is always high-quality and on time, and no matter the complex requirements I have for my projects, he delivers accurately and expertly.',
    name: 'Ifeodora Ezekiel',
    role: 'Founder',
    company: 'Ifetech Digital System LTD',
  },
  {
    quote:
      'Ephraim is not just talented, but genuinely professional and trustworthy. I\'m grateful for his contributions, expertise and guidance.',
    name: 'Praise Akokomu',
    role: 'CEO',
    company: 'Coach Praise Company',
  },
  {
    quote:
      'Ephraim solved a critical issue in our project that even other experienced developers couldn\'t fix. His expertise and problem-solving skills are top-notch.',
    name: 'Engr A.P Adekanbi',
    role: 'Founder',
    company: 'SwiftLogGlobal',
  },
];

const Voices: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36" id="testimonials">
      <hr className="ed-rule mb-24 md:mb-36" />

      <div ref={headerRef} className={`reveal ${headerVisible ? 'visible' : ''} mb-16 md:mb-24`}>
        <span className="ed-label mb-6 block">Voices</span>
        <h2 className="ed-title text-4xl md:text-5xl lg:text-6xl text-charcoal max-w-3xl">
          What people say.
        </h2>
      </div>

      <div className="space-y-0">
        {voices.map((voice, i) => (
          <VoiceItem key={voice.name} voice={voice} index={i} />
        ))}
      </div>
    </section>
  );
};

const VoiceItem: React.FC<{ voice: Voice; index: number }> = ({ voice, index }) => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} border-t border-mist/50 py-12 md:py-16`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-8">
          <blockquote className="ed-quote text-xl md:text-2xl lg:text-3xl">
            &ldquo;{voice.quote}&rdquo;
          </blockquote>
        </div>
        <div className="lg:col-span-4 lg:flex lg:items-end">
          <div>
            <p className="font-medium text-charcoal">{voice.name}</p>
            <p className="text-silver text-sm">
              {voice.role}, {voice.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voices;
