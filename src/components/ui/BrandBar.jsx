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
      className="relative z-10 w-full overflow-hidden py-8 sm:py-10 md:py-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-6 md:mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          Featured Work
        </p>
      </div>
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-8 sm:gap-12 md:gap-16 items-center"
          style={{ width: 'fit-content' }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-6 sm:h-7 md:h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
