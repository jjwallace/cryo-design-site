import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AboutSection from '../components/sections/AboutSection';

export default function About() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header ref={heroRef} className="pt-20 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
            About
          </h1>
        </div>
      </header>

      {/* About Content */}
      <AboutSection />
    </div>
  );
}
