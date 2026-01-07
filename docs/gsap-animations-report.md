# GSAP Animations Report

## Overview

This document catalogs all GSAP animations in the CRYO Design Site and proposes updates to change Y-axis movement animations to scale-based animations with ease in-out tweening.

---

## Current Animations by File

### 1. App.jsx
- **Purpose:** Global GSAP configuration
- **Code:** Registers ScrollTrigger, Observer; sets defaults (power2.out, 0.8s)

### 2. MenuOverlay.jsx
- **Animations:**
  - Menu open: Clip-path reveal `inset(0% 0% 0% 0%)`
  - Links: Y-axis slide up (y: 50 → 0) with stagger
  - Menu close: Clip-path collapse

### 3. Navbar.jsx
- **Animation:** Slide down from above (y: -100 → 0)

### 4. Hero.jsx
- **Animations:**
  - Logo: Clip-path reveal
  - Tagline: Y-axis slide up (y: 40 → 0)
  - Subtitle: Y-axis slide up (y: 30 → 0)
  - Background: Scroll-linked blur/grayscale

### 5. AboutSection.jsx
- **Animation:** Scroll-triggered Y-axis slide up (y: 60 → 0) for each section

### 6. ShuffleGallery.jsx
- **Animation:** Hover scale (1 → 1.05)

### 7. TileGallery.jsx
- **Animations:**
  - Scroll batch: Y-axis slide up (y: 100 → 0) with scale (0.95 → 1)
  - Hover: Scale (1 → 1.08)

### 8. DynamicTileWall.jsx
- **Animations:** Complex depth-based animations with drift and cycling

### 9. BrandBar.jsx
- **Animation:** Infinite horizontal scroll marquee

### 10. ProjectCard.jsx
- **Animations:**
  - Scroll-triggered: Y-axis slide up (y: 60 → 0)
  - Hover: Scale (1 → 1.05)

### 11. About.jsx (page)
- **Animation:** Hero Y-axis slide up (y: 60 → 0)

### 12. Contact.jsx (page)
- **Animations:**
  - Hero: Y-axis slide up (y: 60 → 0)
  - Form: Y-axis slide up (y: 40 → 0)
  - Success: Scale (0.95 → 1)

### 13. PortfolioCategory.jsx (page)
- **Animations:**
  - Title: Y-axis slide up (y: 60 → 0)
  - Count: Y-axis slide up (y: 40 → 0)

---

## Proposed Changes

### Animation Pattern Change

**FROM (Y-axis movement):**
```javascript
gsap.fromTo(element,
  { y: 60, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
)
```

**TO (Scale-based with ease in-out):**
```javascript
gsap.fromTo(element,
  { scale: 0.9, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.inOut' }
)
```

### Files to Update

| File | Animation | Change |
|------|-----------|--------|
| MenuOverlay.jsx | Link stagger | Y → Scale |
| Navbar.jsx | Slide down | Y → Scale |
| Hero.jsx | Tagline, Subtitle | Y → Scale |
| AboutSection.jsx | Section reveals | Y → Scale |
| TileGallery.jsx | Batch entrance | Y → Scale |
| ProjectCard.jsx | Card entrance | Y → Scale |
| About.jsx | Hero | Y → Scale |
| Contact.jsx | Hero, Form | Y → Scale |
| PortfolioCategory.jsx | Title, Count | Y → Scale |

### Files to Keep Unchanged

| File | Reason |
|------|--------|
| DynamicTileWall.jsx | Complex depth simulation |
| BrandBar.jsx | Horizontal scroll marquee |
| ShuffleGallery.jsx | Already uses scale for hover |
| Hero.jsx (logo) | Clip-path reveal effect |
| Hero.jsx (background) | Scroll-linked blur effect |

---

## Implementation Details

### New Animation Values

- **Scale Start:** 0.9 (subtle zoom in)
- **Scale End:** 1
- **Opacity Start:** 0
- **Opacity End:** 1
- **Duration:** 0.6s (slightly faster for scale)
- **Easing:** `power2.inOut` (smooth acceleration and deceleration)
- **Transform Origin:** `center center` (default)

### Stagger Adjustments

For staggered animations (like menu links):
- Reduce stagger from 0.08s to 0.06s (scale feels faster)

---

## Summary

Total files with Y-axis animations to update: **9**
Total animation instances to change: **~15**

This change will create a more modern "zoom forward" feel instead of the traditional slide-up entrance, while maintaining smooth, professional transitions.
