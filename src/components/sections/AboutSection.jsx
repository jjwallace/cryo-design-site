import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../../data/brands';
import Button from '../ui/Button';
import mugshotImage from '../../assets/img/cryo-mugshot.jpeg';

export default function AboutSection({ showTitle = false }) {
  const sectionRef = useRef(null);
  const bioRef = useRef(null);
  const philosophyRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const sections = [bioRef, philosophyRef, servicesRef];

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
    <section ref={sectionRef} className="relative z-10 py-16 md:py-24">
      {showTitle && (
        <header className="px-4 sm:px-6 md:px-8 lg:px-12 pb-12 md:pb-16">
          <div className="max-w-[1800px] mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
              About
            </h1>
          </div>
        </header>
      )}

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">
          {/* Left Column - Image */}
          <div className="md:col-span-1 lg:col-span-5">
            <div className="md:sticky md:top-32">
              <div className="aspect-[4/5] overflow-hidden max-w-md mx-auto md:max-w-none">
                <img
                  src={mugshotImage}
                  alt="CRYO Designs Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="md:col-span-1 lg:col-span-7 space-y-12 md:space-y-16 lg:space-y-20">
            {/* Bio Section */}
            <div ref={bioRef}>
              <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6">
                Background
              </h2>
              <div className="text-lg md:text-xl leading-relaxed text-gray-300 whitespace-pre-line">
                {content.about.bio}
              </div>
            </div>

            {/* Philosophy Section */}
            <div ref={philosophyRef}>
              <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6">
                The Studio
              </h2>
              <div className="text-lg md:text-xl leading-relaxed text-gray-300 whitespace-pre-line">
                {content.about.philosophy}
              </div>
            </div>

            {/* Services Section */}
            <div ref={servicesRef}>
              <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8">
                Services
              </h2>
              <div className="space-y-6">
                {content.about.services.map((service, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-700 pb-6"
                  >
                    <h3 className="text-lg font-medium text-white mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <h2 className="text-2xl md:text-3xl font-light text-white">
                Let's work together.
              </h2>
              <div className="w-16 h-px bg-gray-600 my-10" />
              <Button to="/contact" variant="primary" size="lg">
                Start a Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
