import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ProjectCard({ project, index = 0 }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    // Scroll-triggered fade in
    gsap.fromTo(
      card,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Handle hover effects
  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  // Determine grid span based on size
  const getSizeClasses = () => {
    switch (project.size) {
      case 'xl-landscape':
        return 'col-span-2 row-span-1 aspect-[5/3]';
      case 'lg-landscape':
        return 'col-span-2 row-span-1 aspect-[8/5]';
      case 'lg-portrait':
        return 'col-span-1 row-span-2 aspect-[5/8]';
      case 'lg-square':
        return 'col-span-1 row-span-1 aspect-square';
      case 'med-landscape':
        return 'col-span-1 row-span-1 aspect-[3/2]';
      case 'med-portrait':
        return 'col-span-1 row-span-1 aspect-[2/3]';
      case 'med-square':
        return 'col-span-1 row-span-1 aspect-square';
      case 'sm-landscape':
        return 'col-span-1 row-span-1 aspect-[4/3]';
      case 'sm-portrait':
        return 'col-span-1 row-span-1 aspect-[3/4]';
      case 'sm-square':
      default:
        return 'col-span-1 row-span-1 aspect-square';
    }
  };

  return (
    <Link
      ref={cardRef}
      to={`/portfolio/${project.category}`}
      className={`group relative overflow-hidden bg-gray-100 ${getSizeClasses()}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <img
        ref={imageRef}
        src={project.src}
        alt={project.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end p-6">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-white font-medium text-lg">{project.title}</h3>
          <p className="text-gray-300 text-sm mt-1">
            {project.client} — {project.year}
          </p>
        </div>
      </div>
    </Link>
  );
}
