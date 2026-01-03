import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import logo from '../../assets/logo/logo_cryo_1.png';
import MenuOverlay from './MenuOverlay';

const navLinks = [
  { to: '/portfolio/brand-identity', label: 'Brand Identity' },
  { to: '/portfolio/corporate', label: 'Corporate' },
  { to: '/portfolio/graphics', label: 'Graphics' },
  { to: '/portfolio/illustration', label: 'Illustration' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // Close menu on route change - use location.key to reset
  const locationKey = location.key;
  if (menuOpen && locationKey) {
    // Menu will close via the onClose callback in MenuOverlay
  }

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate navbar on mount
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="Cryo Design"
                className="h-12 w-12 object-contain invert"
              />
            </Link>

            {/* Desktop Navigation - Inline links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  style={{ color: '#ffffff' }}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide uppercase transition-colors duration-200 hover:opacity-70 ${
                      isActive ? 'underline underline-offset-4' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                aria-label="Toggle menu"
              >
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </>
  );
}
