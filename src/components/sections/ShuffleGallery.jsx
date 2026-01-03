import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export default function ShuffleGallery({ projects, showOverlay = true }) {
  const galleryRef = useRef(null);
  const containerRef = useRef(null);
  const tilesRef = useRef([]);
  const isAnimatingRef = useRef(false);
  const intervalRef = useRef(null);

  // Grid Shuffle using Flip plugin
  const gridShuffle = useCallback(() => {
    const container = containerRef.current;
    const tiles = tilesRef.current.filter(Boolean);

    if (!container || tiles.length === 0 || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    // Capture current state
    const state = Flip.getState(tiles);

    // Shuffle and reorder DOM
    const shuffled = gsap.utils.shuffle([...tiles]);
    shuffled.forEach((tile) => container.appendChild(tile));

    // Animate to new positions
    Flip.from(state, {
      duration: 0.8,
      ease: 'power2.inOut',
      stagger: 0.02,
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }, []);

  // Setup animation interval
  useEffect(() => {
    // Start shuffling after initial delay
    const timeout = setTimeout(() => {
      gridShuffle();
      intervalRef.current = setInterval(gridShuffle, 5000);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gridShuffle]);

  // Handle hover animations
  const handleMouseEnter = (index) => {
    const tile = tilesRef.current[index];
    if (tile && !isAnimatingRef.current) {
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
    <section ref={galleryRef} className="relative z-10 px-4 md:px-6 lg:px-12 py-12">
      <div className="max-w-[1800px] mx-auto">
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
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
