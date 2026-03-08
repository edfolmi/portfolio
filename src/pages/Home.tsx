import Opening from '../components/Opening';
import Identity from '../components/Identity';
import Work from '../components/Work';
import Capabilities from '../components/Capabilities';
// import Voices from '../components/Voices';
import Philosophy from '../components/Philosophy';
import ContactSection from '../components/ContactSection';
import Colophon from '../components/Colophon';

const Home: React.FC = () => {
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
    </div>
  );
};

export default Home;
