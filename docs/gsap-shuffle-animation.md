# GSAP Shuffling Animation for Hero Section

## Overview

A shuffling animation creates a dynamic, card-deck-like effect where images appear to shuffle, stack, and reorder themselves. This can be achieved using GSAP's powerful animation capabilities.

## Implementation Approaches

### 1. Stacked Card Shuffle

This approach stacks images on top of each other and animates them shuffling like a deck of cards.

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function ShuffleHero({ images }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;

    // Initial stack positioning
    cards.forEach((card, index) => {
      gsap.set(card, {
        zIndex: cards.length - index,
        y: index * 2,
        x: index * 2,
        rotation: (Math.random() - 0.5) * 5,
      });
    });

    // Shuffle animation function
    const shuffleCards = () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

      cards.forEach((card, index) => {
        tl.to(card, {
          x: 300,
          rotation: 15,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(card, {
          x: 0,
          y: (cards.length - 1) * 2,
          zIndex: 0,
          rotation: (Math.random() - 0.5) * 5,
          duration: 0.4,
          ease: 'power2.inOut',
        })
        .to(cards.filter((_, i) => i !== index), {
          zIndex: '+=1',
          duration: 0,
        }, '<');
      });

      return tl;
    };

    const animation = shuffleCards();

    return () => animation.kill();
  }, []);

  return (
    <div ref={containerRef} className="relative w-96 h-96">
      {images.map((img, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className="absolute inset-0"
        >
          <img src={img} className="w-full h-full object-cover rounded-lg shadow-xl" />
        </div>
      ))}
    </div>
  );
}
```

### 2. Grid Shuffle Animation

This approach shuffles images within a grid layout, animating them to swap positions.

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

function GridShuffle({ images }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const items = container.querySelectorAll('.shuffle-item');

    const shuffleGrid = () => {
      // Capture current state
      const state = Flip.getState(items);

      // Shuffle DOM order
      const shuffled = gsap.utils.shuffle([...items]);
      shuffled.forEach((item) => container.appendChild(item));

      // Animate to new positions
      Flip.from(state, {
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05,
        absolute: true,
      });
    };

    // Shuffle every 4 seconds
    const interval = setInterval(shuffleGrid, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-4">
      {images.map((img, index) => (
        <div key={index} className="shuffle-item">
          <img src={img} className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
}
```

### 3. Cascade/Waterfall Shuffle

Images cascade down and reappear in new positions.

```jsx
const cascadeShuffle = (cards) => {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

  // All cards fall down
  tl.to(cards, {
    y: '100vh',
    opacity: 0,
    rotation: () => gsap.utils.random(-30, 30),
    stagger: {
      each: 0.1,
      from: 'random',
    },
    duration: 0.6,
    ease: 'power2.in',
  });

  // Shuffle array order
  tl.call(() => {
    gsap.utils.shuffle(cards);
  });

  // Cards rise back up in new order
  tl.fromTo(cards,
    { y: '-100vh', opacity: 0 },
    {
      y: 0,
      opacity: 1,
      rotation: 0,
      stagger: {
        each: 0.1,
        from: 'start',
      },
      duration: 0.6,
      ease: 'power2.out',
    }
  );

  return tl;
};
```

### 4. 3D Card Flip Shuffle

Creates a 3D card-flipping effect during shuffle.

```jsx
const flip3DShuffle = (cards) => {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

  cards.forEach((card, index) => {
    tl.to(card, {
      rotationY: 180,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in',
    }, index * 0.1)
    .to(card, {
      x: () => gsap.utils.random(-200, 200),
      y: () => gsap.utils.random(-100, 100),
      duration: 0.4,
      ease: 'power2.inOut',
    }, '<0.1')
    .to(card, {
      rotationY: 360,
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    }, '>');
  });

  return tl;
};
```

## Key GSAP Features for Shuffling

### 1. Flip Plugin (Recommended)
The GSAP Flip plugin is ideal for position-based shuffling. It captures element states and smoothly animates between them.

```bash
npm install gsap
```

```jsx
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(Flip);
```

### 2. Useful GSAP Utilities

- `gsap.utils.shuffle(array)` - Randomizes array order
- `gsap.utils.random(min, max)` - Random values for organic movement
- `stagger` - Sequential animations with timing offsets
- `timeline` - Sequence multiple animations

### 3. Easing Functions

- `power2.inOut` - Smooth acceleration/deceleration
- `elastic.out` - Bouncy, playful feel
- `back.out` - Slight overshoot for impact

## Performance Considerations

1. **Use `will-change`** on animated elements
2. **Limit simultaneous animations** to 10-15 items
3. **Use `transform` and `opacity`** (GPU-accelerated)
4. **Avoid animating `width`, `height`, `top`, `left`**
5. **Use `gsap.ticker`** for smooth frame timing

## Integration with Current Hero

To add shuffling to the current TileGallery:

```jsx
// In TileGallery.jsx
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(Flip);

// Add shuffle function
const shuffleTiles = () => {
  const container = galleryRef.current.querySelector('.columns-2');
  const tiles = tilesRef.current.filter(Boolean);

  const state = Flip.getState(tiles);
  gsap.utils.shuffle(tiles).forEach((tile) => {
    container.appendChild(tile);
  });

  Flip.from(state, {
    duration: 0.8,
    ease: 'power2.inOut',
    stagger: 0.03,
  });
};

// Trigger on interval or user interaction
useEffect(() => {
  const interval = setInterval(shuffleTiles, 5000);
  return () => clearInterval(interval);
}, []);
```

## Recommended Approach

For the CRYO Design hero section, I recommend the **Grid Shuffle with Flip Plugin** approach because:

1. Works with existing masonry/column layout
2. Smooth, professional animation
3. Maintains image visibility during animation
4. Low performance overhead
5. Easy to customize timing and easing
