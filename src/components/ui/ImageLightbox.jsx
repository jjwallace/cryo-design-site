import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ImageLightbox({ image, originRect, onClose }) {
  const overlayRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!originRect) return;

    const overlay = overlayRef.current;
    const img = imageRef.current;

    // Calculate center position for final state
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Set initial position (from clicked image)
    gsap.set(img, {
      position: 'fixed',
      left: originRect.left,
      top: originRect.top,
      width: originRect.width,
      height: originRect.height,
      zIndex: 1001,
    });

    gsap.set(overlay, {
      opacity: 0,
    });

    // Animate to center
    const tl = gsap.timeline();

    tl.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    }, 0);

    // Calculate final size (max 90% of viewport, maintain aspect ratio)
    const maxWidth = viewportWidth * 0.9;
    const maxHeight = viewportHeight * 0.9;

    // Wait for image to load to get natural dimensions
    const naturalWidth = img.naturalWidth || originRect.width;
    const naturalHeight = img.naturalHeight || originRect.height;

    let finalWidth = naturalWidth;
    let finalHeight = naturalHeight;

    // Scale down if needed
    if (finalWidth > maxWidth) {
      const scale = maxWidth / finalWidth;
      finalWidth = maxWidth;
      finalHeight = finalHeight * scale;
    }
    if (finalHeight > maxHeight) {
      const scale = maxHeight / finalHeight;
      finalHeight = finalHeight * scale;
      finalWidth = finalWidth * scale;
    }

    const finalLeft = (viewportWidth - finalWidth) / 2;
    const finalTop = (viewportHeight - finalHeight) / 2;

    tl.to(img, {
      left: finalLeft,
      top: finalTop,
      width: finalWidth,
      height: finalHeight,
      duration: 0.4,
      ease: 'power3.out',
    }, 0);

    // Handle scroll to close
    const handleScroll = () => {
      closeWithAnimation();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [originRect]);

  const closeWithAnimation = () => {
    const overlay = overlayRef.current;
    const img = imageRef.current;

    if (!overlay || !img || !originRect) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    // Animate back to original position
    tl.to(img, {
      left: originRect.left,
      top: originRect.top,
      width: originRect.width,
      height: originRect.height,
      duration: 0.35,
      ease: 'power3.inOut',
    }, 0);

    tl.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 0);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      closeWithAnimation();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className="fixed inset-0 bg-black/90 z-[1000] cursor-pointer"
      />
      {/* Image */}
      <img
        ref={imageRef}
        src={image.src}
        alt={image.alt || 'Lightbox image'}
        className="fixed z-[1001] object-contain cursor-pointer"
        onClick={closeWithAnimation}
      />
    </>
  );
}
