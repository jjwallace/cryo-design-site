import { useMemo } from 'react';
import Hero from '../components/sections/Hero';
import ShuffleGallery from '../components/sections/ShuffleGallery';
import AboutSection from '../components/sections/AboutSection';
import BrandBar from '../components/ui/BrandBar';
import Button from '../components/ui/Button';
import { topProjects } from '../data/projects';

export default function Home() {
  // Top images gallery for home page (above marquee)
  const galleryPart1 = useMemo(() => {
    return [...topProjects];
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* First Gallery with Shuffle Animations */}
      <ShuffleGallery projects={galleryPart1} />

      {/* Brand Bar */}
      <BrandBar />

      {/* About Section */}
      <AboutSection />

      {/* CTA Section */}
      <section className="relative z-20 py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-center bg-black/60 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6 text-white">
            Ready to create something?
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Let's discuss your project and see how we can bring your vision to life.
          </p>
          <div className="w-12 sm:w-16 h-px bg-gray-600 mx-auto my-8 sm:my-10" />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button to="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
            <Button to="/portfolio/brand-identity" variant="secondary" size="lg">
              View All Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
