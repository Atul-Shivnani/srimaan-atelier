import { useSmoothScroll } from "./lib/useSmoothScroll";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import ThreadProgress from "./components/ThreadProgress";
import VersionSwitch from "./components/VersionSwitch";
import LocationsScene from "./components/scenes/LocationsScene";
import Footer from "./components/Footer";

function Locations() {
  useSmoothScroll();

  return (
    <>
      <Cursor />
      <ThreadProgress />
      <Nav variant="standalone" />
      <VersionSwitch href="/locations-v2" label="Try the video-map cut →" />
      <main id="top">
        <LocationsScene />
      </main>
      <Footer />
    </>
  );
}

export default Locations;
