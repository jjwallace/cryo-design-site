import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TileGallery({ projects, showOverlay = true }) {
  const galleryRef = useRef(null);
  const tilesRef = useRef([]);

  // Projects displayed in original order (shuffle can be done at data level if needed)
  const displayProjects = projects;

  useEffect(() => {
    const tiles = tilesRef.current.filter(Boolean);

    // Batch animation for performance
    ScrollTrigger.batch(tiles, {
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          }
        );
      },
      start: 'top bottom-=50',
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [displayProjects]);

  // Handle hover
  const handleMouseEnter = (index) => {
    const tile = tilesRef.current[index];
    if (tile) {
      gsap.to(tile.querySelector('img'), {
        scale: 1.08,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (index) => {
    const tile = tilesRef.current[index];
    if (tile) {
      gsap.to(tile.querySelector('img'), {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  // Get grid classes based on size
  const getGridClasses = (size, index) => {
    // Create visual variety in the masonry layout
    const patterns = [
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-2 row-span-1',
      'col-span-1 row-span-2',
      'col-span-1 row-span-1',
      'col-span-2 row-span-2',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
    ];

    switch (size) {
      case 'xl-landscape':
        return 'col-span-2 md:col-span-2 row-span-1';
      case 'lg-landscape':
        return 'col-span-2 md:col-span-2 row-span-1';
      case 'lg-portrait':
        return 'col-span-1 row-span-2';
      case 'lg-square':
        return index % 5 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1';
      case 'med-landscape':
        return 'col-span-2 md:col-span-1 row-span-1';
      case 'med-portrait':
        return 'col-span-1 row-span-2 md:row-span-1';
      case 'med-square':
        return 'col-span-1 row-span-1';
      default:
        return patterns[index % patterns.length];
    }
  };

  return (
    <section ref={galleryRef} className="relative z-10 px-4 md:px-6 lg:px-12 py-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
          {displayProjects.map((project, index) => (
            <Link
              key={`${project.category}-${project.id}-${index}`}
              ref={(el) => (tilesRef.current[index] = el)}
              to={`/portfolio/${project.category}`}
              className="group relative block mb-3 md:mb-4 break-inside-avoid"
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
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end p-4 md:p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white font-medium text-sm md:text-base">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-xs md:text-sm mt-1">
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
