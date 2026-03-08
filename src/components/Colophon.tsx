const Colophon: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 lg:px-20 py-12 border-t border-mist/30">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="text-silver text-sm">
            &copy; {year} Ephraim Daniel
          </p>
        </div>

        <nav className="flex gap-8 flex-wrap">
          {[
            { label: 'About', href: '#about' },
            { label: 'Work', href: '#work' },
            { label: 'Capabilities', href: '#capabilities' },
            { label: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-silver text-sm hover:text-charcoal transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="text-mist text-xs">
          Crafted with React &amp; TypeScript
        </p>
      </div>
    </footer>
  );
};

export default Colophon;
