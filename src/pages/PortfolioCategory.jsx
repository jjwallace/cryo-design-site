import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getGroupedProjectsByCategory, categories } from '../data/projects';
import ProjectCarousel from '../components/sections/ProjectCarousel';

export default function PortfolioCategory() {
  const { category } = useParams();
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const countRef = useRef(null);

  // Validate category
  const validCategory = categories.find((c) => c.slug === category);
  if (!validCategory) {
    return <Navigate to="/portfolio/branding" replace />;
  }

  const groupedProjects = getGroupedProjectsByCategory(category);

  useEffect(() => {
    // Animate header on mount
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    ).fromTo(
      countRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [category]);

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <header ref={headerRef} className="pt-20 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white"
          >
            {validCategory.name}
          </h1>
          <p
            ref={countRef}
            className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest mt-3 sm:mt-4"
          >
            {groupedProjects.length} Projects
          </p>
        </div>
      </header>

      {/* Project Carousels - Full bleed for mobile swipe */}
      <section>
        <div>
          {groupedProjects.map((project, index) => (
            <ProjectCarousel
              key={`${project.name}-${index}`}
              project={project}
              images={project.images}
            />
          ))}
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-24" />
    </div>
  );
}
