import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../data/brands';
import Button from '../components/ui/Button';

export default function About() {
  const heroRef = useRef(null);
  const bioRef = useRef(null);
  const philosophyRef = useRef(null);
  const servicesRef = useRef(null);
  const clientsRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Scroll-triggered sections
    const sections = [bioRef, philosophyRef, servicesRef, clientsRef];

    sections.forEach((ref) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom-=100',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <header ref={heroRef} className="pt-20 pb-16 px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-black dark:text-white">
            About
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column - Image Placeholder */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <img
                  src="https://placehold.co/600x750"
                  alt="Cryo Design Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7 space-y-20 pb-24">
            {/* Bio Section */}
            <section ref={bioRef}>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
                Who We Are
              </h2>
              <div className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {content.about.bio}
              </div>
            </section>

            {/* Philosophy Section */}
            <section ref={philosophyRef}>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
                Our Philosophy
              </h2>
              <div className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {content.about.philosophy}
              </div>
            </section>

            {/* Services Section */}
            <section ref={servicesRef}>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
                What We Do
              </h2>
              <ul className="space-y-3">
                {content.about.services.map((service, index) => (
                  <li
                    key={index}
                    className="text-lg text-gray-700 dark:text-gray-300 flex items-center gap-4"
                  >
                    <span className="w-2 h-2 bg-black dark:bg-white rounded-full flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </section>

            {/* Clients Section */}
            <section ref={clientsRef}>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
                Notable Clients
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {content.about.clients.map((client, index) => (
                  <div
                    key={index}
                    className="text-gray-600 dark:text-gray-400 py-3 border-b border-gray-100 dark:border-gray-800"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="pt-8">
              <h2 className="text-2xl md:text-3xl font-light mb-6 text-black dark:text-white">
                Let's work together.
              </h2>
              <Button to="/contact" variant="primary" size="lg">
                Start a Project
              </Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
