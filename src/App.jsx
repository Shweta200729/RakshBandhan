import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import { ScrollTrigger } from './utils/gsap';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import CinematicTypography from './components/CinematicTypography';
import TimelineSection from './components/TimelineSection';
import RakhiSection from './components/RakhiSection';
import FestiveSceneSection from './components/FestiveSceneSection';
import ThreadSection from './components/ThreadSection';
import DistanceSection from './components/DistanceSection';
import SpecialMemories from './components/SpecialMemories';
import GallerySection from './components/GallerySection';
import InteractiveGift from './components/InteractiveGift';
import GrandFinaleSection from './components/GrandFinaleSection';
import WriteMessageSection from './components/WriteMessageSection';
import FinalCinematicSection from './components/FinalCinematicSection';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

const SILK = [0.25, 0.46, 0.45, 0.94];

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Lenis is always initialized; the hook internally handles scroll state
  useLenis();

  useEffect(() => {
    if (!isLoading) {
      // After the Framer Motion fade-in completes, refresh all ScrollTriggers
      // so they recalculate their positions correctly
      const timer = setTimeout(() => ScrollTrigger.refresh(), 1400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {/* Loading screen (exits automatically) */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* Main site – fades in after loading */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: SILK }}
            className="w-full relative overflow-x-hidden"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}
          >
            <CustomCursor />

            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 'var(--z-bg)' }} aria-hidden="true">
              <div className="absolute inset-0" style={{
                background: `
                  radial-gradient(ellipse 80% 60% at 50% 0%, rgba(109,11,47,0.35) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 40% at 100% 100%, rgba(128,0,32,0.20) 0%, transparent 60%),
                  radial-gradient(ellipse 60% 40% at 0% 80%, rgba(155,27,48,0.15) 0%, transparent 60%)
                `
              }} />
            </div>

            <Navbar />

            <main id="main-content">
              <Hero />

              <StorySection />

              <CinematicTypography />

              <TimelineSection />

              <RakhiSection />

              <FestiveSceneSection />

              <ThreadSection />

              <DistanceSection />

              <SpecialMemories />

              <GallerySection />

              <GrandFinaleSection />

              <InteractiveGift />

              <WriteMessageSection />

              {/* The Ultimate Send-off */}
              <FinalCinematicSection />

              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
