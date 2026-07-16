import { useEffect } from "react";
import { preloadScene } from "./lib/frameCache";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import ThreadProgress from "./components/ThreadProgress";
import VersionSwitch from "./components/VersionSwitch";
import LocationsSceneV2 from "./components/scenes/LocationsSceneV2";
import Footer from "./components/Footer";

function LocationsV2() {
  useEffect(() => {
    preloadScene("map-topdown", 97);
  }, []);

  useSmoothScroll();

  return (
    <>
      <Cursor />
      <ThreadProgress />
      <Nav variant="standalone" />
      <VersionSwitch href="/locations" label="← Back to the coded map" />
      <main id="top">
        <LocationsSceneV2 />
      </main>
      <Footer />
    </>
  );
}

export default LocationsV2;
