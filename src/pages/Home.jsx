import { useMemo } from 'react';
import Hero from '../components/sections/Hero';
import TileGallery from '../components/sections/TileGallery';
import BrandBar from '../components/ui/BrandBar';
import Button from '../components/ui/Button';
import {
  logosProjects,
  packagingProjects,
  illustrationProjects,
  corporateProjects,
  threeDProjects,
} from '../data/projects';

export default function Home() {
  // Create mixed gallery for home page (first batch)
  const galleryPart1 = useMemo(() => {
    return [
      ...logosProjects.slice(0, 6),
      ...packagingProjects.slice(0, 6),
      ...illustrationProjects.slice(0, 6),
      ...corporateProjects.slice(0, 4),
    ];
  }, []);

  // Second batch for after brand bar
  const galleryPart2 = useMemo(() => {
    return [
      ...logosProjects.slice(6, 12),
      ...packagingProjects.slice(6, 12),
      ...illustrationProjects.slice(6, 12),
      ...corporateProjects.slice(4, 10),
      ...threeDProjects.slice(0, 8),
    ];
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* First Tile Gallery */}
      <TileGallery projects={galleryPart1} />

      {/* Brand Bar */}
      <BrandBar />

      {/* Second Tile Gallery */}
      <TileGallery projects={galleryPart2} />

      {/* CTA Section */}
      <section className="relative z-20 py-24 px-6 text-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900 dark:text-white">
            Ready to create something?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10">
            Let's discuss your project and see how we can bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
            <Button to="/portfolio/logos" variant="secondary" size="lg">
              View All Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
