import { useEffect, useRef, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

// Size states with depth simulation
const SIZE_STATES = [
  { name: 'far', scale: 0.5, opacity: 0.6, blur: 1 },
  { name: 'back', scale: 0.7, opacity: 0.75, blur: 0.5 },
  { name: 'mid', scale: 0.9, opacity: 0.9, blur: 0 },
  { name: 'front', scale: 1.1, opacity: 1, blur: 0 },
  { name: 'focus', scale: 1.3, opacity: 1, blur: 0 },
];

// Utility functions
const random = (min, max) => min + Math.random() * (max - min);
const randomInt = (min, max) => Math.floor(random(min, max + 1));

export default function DynamicTileWall({ projects, className = '' }) {
  const containerRef = useRef(null);
  const tilesRef = useRef([]);
  const animationsRef = useRef({ drift: [], depth: [], timeouts: [] });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Create tile array with enough items to fill the wall
  const tiles = useMemo(() => {
    const targetCount = 36; // Dense grid
    const result = [];
    for (let i = 0; i < targetCount; i++) {
      const project = projects[i % projects.length];
      result.push({
        ...project,
        uid: `tile-${i}`,
        initialDepth: randomInt(0, 2), // Start mostly in back/mid
      });
    }
    return result;
  }, [projects]);

  // Handle container resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Main animation effect
  useEffect(() => {
    const tileElements = tilesRef.current.filter(Boolean);
    if (tileElements.length === 0) return;

    // Cleanup function
    const cleanup = () => {
      animationsRef.current.drift.forEach((a) => a?.kill());
      animationsRef.current.depth.forEach((a) => a?.kill());
      animationsRef.current.timeouts.forEach((t) => clearTimeout(t));
      animationsRef.current = { drift: [], depth: [], timeouts: [] };
    };

    cleanup();

    // Initialize and animate each tile
    tileElements.forEach((tile, index) => {
      const tileData = tiles[index];
      const initialState = SIZE_STATES[tileData.initialDepth];

      // Set initial state
      gsap.set(tile, {
        scale: initialState.scale,
        opacity: initialState.opacity,
        filter: `blur(${initialState.blur}px)`,
        x: random(-30, 30),
        y: random(-20, 20),
      });

      // Continuous horizontal drift
      const driftX = gsap.to(tile, {
        x: `+=${random(-50, 50)}`,
        duration: random(18, 30),
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
      animationsRef.current.drift.push(driftX);

      // Subtle vertical movement
      const driftY = gsap.to(tile, {
        y: `+=${random(-25, 25)}`,
        duration: random(15, 25),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: random(0, 5),
      });
      animationsRef.current.drift.push(driftY);

      // Depth cycling function
      const cycleDepth = () => {
        // Weighted random - favor back/mid positions, occasionally come forward
        const rand = Math.random();
        let depthIndex;
        if (rand < 0.3) depthIndex = 0; // far
        else if (rand < 0.55) depthIndex = 1; // back
        else if (rand < 0.8) depthIndex = 2; // mid
        else if (rand < 0.95) depthIndex = 3; // front
        else depthIndex = 4; // focus (rare)

        const targetState = SIZE_STATES[depthIndex];

        const depthAnim = gsap.to(tile, {
          scale: targetState.scale,
          opacity: targetState.opacity,
          filter: `blur(${targetState.blur}px)`,
          duration: random(2.5, 5),
          ease: 'power2.inOut',
        });
        animationsRef.current.depth.push(depthAnim);

        // Schedule next depth change
        const holdTime = random(5, 15) * 1000;
        const timeout = setTimeout(cycleDepth, holdTime);
        animationsRef.current.timeouts.push(timeout);
      };

      // Start depth cycling with staggered delays
      const startDelay = random(0, 10) * 1000;
      const startTimeout = setTimeout(cycleDepth, startDelay);
      animationsRef.current.timeouts.push(startTimeout);
    });

    return cleanup;
  }, [tiles, containerSize]);

  return (
    <section
      ref={containerRef}
      className={`relative z-10 w-full min-h-screen overflow-hidden bg-black/20 ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Tile grid with CSS Grid for dense packing */}
      <div
        className="grid gap-2 sm:gap-3 p-4 sm:p-6 md:p-8 lg:p-12"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gridAutoRows: '120px',
        }}
      >
        {tiles.map((tile, index) => (
          <Link
            key={tile.uid}
            ref={(el) => (tilesRef.current[index] = el)}
            to={`/portfolio/${tile.category}`}
            className="relative block overflow-hidden will-change-transform"
            style={{ transformOrigin: 'center center' }}
          >
            <img
              src={tile.src}
              alt={tile.title}
              className="w-full h-full object-cover"
              loading={index < 12 ? 'eager' : 'lazy'}
            />
          </Link>
        ))}
      </div>

      {/* Gradient overlays for depth effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />
    </section>
  );
}
