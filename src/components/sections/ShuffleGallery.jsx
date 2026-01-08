import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ImageLightbox from '../ui/ImageLightbox';

export default function ShuffleGallery({ projects }) {
  const galleryRef = useRef(null);
  const containerRef = useRef(null);
  const tilesRef = useRef([]);

  // Lightbox state (desktop only)
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxOrigin, setLightboxOrigin] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleImageClick = (e, project) => {
    if (!isDesktop) return; // Let Link handle navigation on mobile

    e.preventDefault(); // Prevent Link navigation on desktop
    const img = e.currentTarget.querySelector('img');
    const rect = img.getBoundingClientRect();
    setLightboxOrigin(rect);
    setLightboxImage({ src: project.src, alt: project.title });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxOrigin(null);
  };

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
              className={`group relative block ${isDesktop ? 'cursor-pointer' : ''}`}
              onClick={(e) => handleImageClick(e, project)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-auto"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Lightbox - Desktop only */}
      {lightboxImage && lightboxOrigin && (
        <ImageLightbox
          image={lightboxImage}
          originRect={lightboxOrigin}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
