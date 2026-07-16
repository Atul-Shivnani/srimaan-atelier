import { useEffect } from "react";
import { preloadAllScenes } from "./lib/frameCache";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import ThreadProgress from "./components/ThreadProgress";
import VersionSwitch from "./components/VersionSwitch";
import Hero from "./components/Hero";
import AboutScene from "./components/scenes/AboutScene";
import ServicesScene from "./components/scenes/ServicesScene";
import StatsScene from "./components/scenes/StatsScene";
import ContactScene from "./components/scenes/ContactScene";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Preload every scene's frame sequence in narrative order, ahead of scroll
    // reaching it, so canvases never scrub against a half-loaded sequence.
    preloadAllScenes(121);
  }, []);

  useSmoothScroll();

  return (
    <>
      <Cursor />
      <ThreadProgress />
      <Nav />
      <VersionSwitch href="/v2" label="Try the continuous-scroll cut →" />
      <main>
        <Hero />
        <AboutScene />
        <ServicesScene />
        <StatsScene />
        <ContactScene />
      </main>
      <Footer />
    </>
  );
}

export default App;
