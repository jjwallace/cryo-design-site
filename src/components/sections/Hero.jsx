import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from '../../assets/logo/logo_cryo_1.png';
import { content } from '../../data/brands';

export default function Hero() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Logo mask reveal animation
    tl.fromTo(
      logoRef.current,
      {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.2,
      }
    )
      .fromTo(
        taglineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20"
    >
      <div className="text-center max-w-3xl mx-auto">
        {/* Animated Logo */}
        <div className="mb-12">
          <img
            ref={logoRef}
            src={logo}
            alt="Cryo Design"
            className="w-32 h-32 md:w-48 md:h-48 mx-auto object-contain"
          />
        </div>

        {/* Tagline */}
        <h1
          ref={taglineRef}
          className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-black mb-6"
        >
          {content.hero.tagline}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-500 font-light"
        >
          {content.hero.subtitle}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
