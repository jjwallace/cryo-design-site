import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { brands } from '../../data/brands';

export default function BrandBar() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;

    // Create infinite scroll animation
    animationRef.current = gsap.to(track, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Pause on hover
  const handleMouseEnter = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (animationRef.current) {
      animationRef.current.resume();
    }
  };

  // Double the brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-gray-50 py-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Trusted by
        </p>
      </div>
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-16 items-center"
          style={{ width: 'fit-content' }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
