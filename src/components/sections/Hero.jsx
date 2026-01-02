import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../../assets/logo/logo_cryo_1.png';
import backgroundImage from '../../assets/img/img_background_sentinel.JPG';
import { content } from '../../data/brands';

export default function Hero() {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
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

    // Scroll-triggered blur + grayscale effect on background
    // Start slightly blurred, increase blur and add grayscale on scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // Start at 2px blur, go to 25px
        const blur = 2 + progress * 23;
        // Start at 0% grayscale, go to 100%
        const grayscale = progress * 100;

        if (backgroundRef.current) {
          backgroundRef.current.style.filter = `blur(${blur}px) grayscale(${grayscale}%)`;
        }
      },
    });

    return () => {
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      {/* Fixed Background Image - doesn't scroll with content */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'blur(2px) grayscale(0%)',
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="fixed inset-0 z-1 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Animated Logo */}
        <div className="mb-12">
          <img
            ref={logoRef}
            src={logo}
            alt="Cryo Design"
            className="w-32 h-32 md:w-48 md:h-48 mx-auto object-contain invert"
          />
        </div>

        {/* Tagline */}
        <h1
          ref={taglineRef}
          className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6"
        >
          {content.hero.tagline}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-200 font-light"
        >
          {content.hero.subtitle}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg
          className="w-6 h-6 text-white/70"
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
