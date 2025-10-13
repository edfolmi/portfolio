import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center" style={{ color: 'var(--muted)' }}>
      <div className="container">
        © {new Date().getFullYear()} YourName — Backend & API Developer
      </div>
    </footer>
  );
};

export default Footer;
