import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';

export default function MenuOverlay({ isOpen, onClose, links }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const linkElements = linksRef.current;

    if (isOpen) {
      // Open animation
      gsap.to(overlay, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.6,
        ease: 'power3.inOut',
      });

      // Stagger links with scale animation
      gsap.fromTo(
        linkElements,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.3,
          ease: 'power2.inOut',
        }
      );
    } else {
      // Close animation
      gsap.to(overlay, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 bg-black flex items-center justify-center md:hidden"
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
    >
      <nav className="flex flex-col items-center gap-8">
        {links.map((link, index) => (
          <NavLink
            key={link.to}
            ref={(el) => (linksRef.current[index] = el)}
            to={link.to}
            onClick={onClose}
            className="text-3xl font-light tracking-widest uppercase !text-white"
            style={{ color: '#ffffff' }}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
