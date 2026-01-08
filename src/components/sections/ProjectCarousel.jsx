import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import ImageLightbox from '../ui/ImageLightbox';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

export default function ProjectCarousel({ project, images }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const mouseStartRef = useRef({ x: 0, y: 0 });

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

  const handleMouseDown = (e) => {
    mouseStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleImageClick = (e, image, index) => {
    if (!isDesktop) return;

    // Check if this was a drag (moved more than 5px) or a true click
    const dx = Math.abs(e.clientX - mouseStartRef.current.x);
    const dy = Math.abs(e.clientY - mouseStartRef.current.y);
    if (dx > 5 || dy > 5) return; // Was a drag, not a click

    const rect = e.currentTarget.getBoundingClientRect();
    setLightboxOrigin(rect);
    setLightboxImage({ src: image.src, alt: `${project.name} - ${index + 1}` });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxOrigin(null);
  };

  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      {/* Swiper Carousel */}
      <div className={`relative group ${images.length <= 4 ? 'flex justify-center' : ''}`}>
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={12}
          slidesPerView="auto"
          freeMode={true}
          loop={false}
          centeredSlides={images.length <= 4}
          centeredSlidesBounds={images.length > 1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            320: {
              spaceBetween: 8,
            },
            640: {
              spaceBetween: 12,
            },
            1024: {
              spaceBetween: 16,
            },
          }}
          className={`overflow-hidden ${images.length <= 4 ? 'w-auto' : 'w-full'}`}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={`${project.name}-${index}`}
              className="!w-auto"
            >
              <div
                className={`h-48 sm:h-56 md:h-64 lg:h-80 flex items-center ${isDesktop ? 'cursor-pointer' : ''}`}
                onMouseDown={handleMouseDown}
                onClick={(e) => handleImageClick(e, image, index)}
              >
                <img
                  src={image.src}
                  alt={`${project.name} - ${index + 1}`}
                  className="max-h-full max-w-full object-contain"
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          ref={prevRef}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          ref={nextRef}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Project/Client Title - Centered below carousel */}
      <div className="pt-4 sm:pt-5 md:pt-6 px-4 sm:px-6 md:px-8 lg:px-12">
        <h3 className="text-xs sm:text-sm font-light text-gray-400 text-center tracking-widest uppercase">
          {project.name}
        </h3>

        {/* Optional Project Description */}
        {project.description && (
          <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center max-w-xl mx-auto">
            {project.description}
          </p>
        )}
      </div>

      {/* Lightbox - Desktop only */}
      {lightboxImage && lightboxOrigin && (
        <ImageLightbox
          image={lightboxImage}
          originRect={lightboxOrigin}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
