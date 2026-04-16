import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { consumeAgentRouteEntry } from '../agent/agentRouteEntry';
import { PortfolioAgent } from '../agent/PortfolioAgent';
import { useAgentStore } from '../agent/state/agentStore';
import Opening from '../components/Opening';
import Identity from '../components/Identity';
import Work from '../components/Work';
import Capabilities from '../components/Capabilities';
// import Voices from '../components/Voices';
import Philosophy from '../components/Philosophy';
import ContactSection from '../components/ContactSection';
import Colophon from '../components/Colophon';

const Home: React.FC = () => {
  const location = useLocation();
  const openFromEntry = useAgentStore((s) => s.openFromEntry);

  useEffect(() => {
    const mode = consumeAgentRouteEntry(location.pathname, location.search);
    if (mode) {
      window.scrollTo(0, 0);
      openFromEntry(mode);
    }
  }, [location.pathname, location.search, openFromEntry]);

  return (
    <div className="bg-ivory text-charcoal min-h-screen">
      <Opening />
      <Identity />
      <Work />
      <Capabilities />
      {/* <Voices /> */}
      <Philosophy />
      <ContactSection />
      <Colophon />
      <PortfolioAgent />
    </div>
  );
};

export default Home;
