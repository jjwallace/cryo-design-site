import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function ShuffleGallery({ projects, showOverlay = true }) {
  const galleryRef = useRef(null);
  const containerRef = useRef(null);
  const tilesRef = useRef([]);

  // Handle hover animations
  const handleMouseEnter = (index) => {
    const tile = tilesRef.current[index];
    if (tile) {
      gsap.to(tile.querySelector('img'), {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (index) => {
    const tile = tilesRef.current[index];
    if (tile) {
      gsap.to(tile.querySelector('img'), {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section ref={galleryRef} className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-12 py-8 sm:py-10 md:py-12">
      <div className="max-w-[1800px] mx-auto">
        <div
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
        >
          {projects.map((project, index) => (
            <Link
              key={`${project.category}-${project.id}-${index}`}
              ref={(el) => (tilesRef.current[index] = el)}
              to={`/portfolio/${project.category}`}
              className="group relative block"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-auto"
                loading="lazy"
              />

              {showOverlay && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end p-2 sm:p-4 md:p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white font-medium text-xs sm:text-sm md:text-base">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-xs mt-0.5 sm:mt-1 hidden sm:block">
                      {project.client}
                    </p>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
