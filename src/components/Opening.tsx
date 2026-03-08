const Opening: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-20 py-12">
      <header className="intro-animate intro-delay-1">
        <span className="ed-label">Ephraim Daniel</span>
      </header>

      <div className="flex-1 flex items-center">
        <div className="w-full max-w-5xl">
          <h1 className="ed-headline text-charcoal text-[clamp(2.5rem,8vw,7.5rem)] intro-animate intro-delay-2">
            I build the systems
            <br />
            <span className="text-stone">that power products</span>
            <br />
            people depend on.
          </h1>
          <div className="mt-8 md:mt-12 intro-animate intro-delay-3">
            <p className="text-silver text-lg md:text-xl font-light tracking-wide">
              AI Engineer & Backend Engineer
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center intro-animate intro-delay-4">
        <div className="scroll-hint flex flex-col items-center gap-3 text-mist">
          <span className="ed-label text-[0.65rem]">Scroll</span>
          <div className="w-px h-10 bg-mist opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default Opening;
