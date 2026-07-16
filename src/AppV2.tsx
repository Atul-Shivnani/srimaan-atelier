import { useEffect } from "react";
import { preloadScene } from "./lib/frameCache";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import ThreadProgress from "./components/ThreadProgress";
import VersionSwitch from "./components/VersionSwitch";
import Hero from "./components/Hero";
import StoryScene from "./components/scenes/StoryScene";
import Footer from "./components/Footer";

function AppV2() {
  useEffect(() => {
    // One continuous 484-frame (~20s) sequence — cloth, scissor, stitch and
    // shirt concatenated into a single video the whole page scrubs through.
    preloadScene("story", 484);
  }, []);

  useSmoothScroll();

  return (
    <>
      <Cursor />
      <ThreadProgress />
      <Nav />
      <VersionSwitch href="/" label="← Back to the classic cut" />
      <main>
        <Hero frameSrc="/frames/story/frame_0001.jpg" />
        <StoryScene />
      </main>
      <Footer />
    </>
  );
}

export default AppV2;
