# Swiper.js Carousel Implementation Report

## Overview

This document outlines the implementation of Swiper.js carousels for category pages, organizing images by client/project name.

---

## File Naming Convention

Images follow the pattern: `CRYO_ClientName_###`

| Part | Description | Example |
|------|-------------|---------|
| `CRYO_` | Brand prefix | CRYO_ |
| `ClientName` | Client/project identifier | Altered_Ego |
| `_###` | Image number | _002 |

**Full example:** `CRYO_Altered_Ego_002.png`

---

## Grouping Logic

Images are grouped by client name (the middle section):

```
CRYO_Altered_Ego_001.png  ─┐
CRYO_Altered_Ego_002.png   ├─► "Altered Ego" carousel
CRYO_Altered_Ego_003.png  ─┘

CRYO_Ritual_Rosin_001.png ─┐
CRYO_Ritual_Rosin_008.png  ├─► "Ritual Rosin" carousel
CRYO_Ritual_Rosin_015.png ─┘
```

The existing `getGroupedProjectsByCategory()` function in `projects.js` already handles this grouping.

---

## Swiper.js Configuration

### Package
- **Library:** Swiper.js v11+
- **Install:** `npm install swiper`

### Modules Used
1. **Navigation** - Previous/Next arrow buttons
2. **FreeMode** - Smooth free-scroll behavior (optional)

### Key Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| `loop` | `true` | Infinite loop back to first slide |
| `slidesPerView` | `"auto"` | Width based on image content |
| `spaceBetween` | Responsive | Gap between slides |
| `navigation` | Custom refs | External prev/next buttons |
| `freeMode` | `true` | Smooth dragging without snapping |

### Responsive Breakpoints

```javascript
breakpoints: {
  320: { spaceBetween: 8 },   // Mobile
  640: { spaceBetween: 12 },  // Tablet
  1024: { spaceBetween: 16 }, // Desktop
}
```

---

## Component Structure

### ProjectCarousel Component

```
<div className="project-carousel">
  ├── <h3> Client/Project Title
  ├── <div className="relative group">
  │   ├── <Swiper>
  │   │   └── <SwiperSlide> × N images
  │   ├── <button> Previous Arrow (left)
  │   └── <button> Next Arrow (right)
  └── <p> Optional Description
</div>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `project` | Object | `{ name: string, description?: string }` |
| `images` | Array | `[{ src: string, filename: string, number: string }]` |

---

## Category Page Layout

Each category page displays multiple carousels stacked vertically:

```
┌─────────────────────────────────────────────────────┐
│  BRANDING                                           │
│  12 Projects                                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Altered Ego                                        │
│  ◄ [img1] [img2] [img3] [img4] [img5] ... ►        │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Ritual Rosin                                       │
│  ◄ [img1] [img2] [img3] [img4] [img5] ... ►        │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  UNI                                                │
│  ◄ [img1] [img2] [img3] [img4] ... ►               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Navigation Arrows

### Behavior
- Hidden by default
- Appear on hover (desktop)
- Always visible on touch devices (optional)
- Positioned at vertical center of carousel

### Styling
```css
/* Arrow buttons */
- Position: absolute, left/right edges
- Size: 40px mobile, 48px desktop
- Background: black/60 → black/80 on hover
- Border-radius: full (circle)
- Opacity: 0 → 1 on group hover
```

---

## Image Sizing

### Slide Dimensions
- **Height:** Fixed per breakpoint
  - Mobile: 192px (h-48)
  - Tablet: 256px (h-64)
  - Desktop: 320px (h-80)
  - Large: 384px (h-96)
- **Width:** Auto (based on image aspect ratio)

### Image Fit
- `object-contain` - Preserve aspect ratio, show full image
- No cropping

---

## Files to Modify

### New Files
1. `src/components/sections/ProjectCarousel.jsx` - Swiper carousel component

### Modified Files
1. `src/pages/PortfolioCategory.jsx` - Use ProjectCarousel instead of TileGallery

### Unchanged
- `src/pages/Home.jsx` - Keeps DynamicTileWall
- `src/data/projects.js` - Already has grouping logic

---

## Implementation Steps

1. ✅ Install Swiper.js (`npm install swiper`)
2. ✅ Create ProjectCarousel component
3. ✅ Update PortfolioCategory to use carousels
4. ✅ Import Swiper CSS in component
5. Test infinite loop behavior
6. Test responsive slidesPerView
7. Test navigation arrows

---

## CSS Imports Required

```javascript
// In ProjectCarousel.jsx
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
```

---

## Accessibility

- Arrow buttons have `aria-label`
- Images have descriptive `alt` text
- Keyboard navigation supported via Swiper

---

## Performance Considerations

- First 4 images: `loading="eager"`
- Remaining images: `loading="lazy"`
- `will-change-transform` for smooth animations
- Consider limiting images per carousel on mobile

---

## Summary

| Feature | Implementation |
|---------|----------------|
| Grouping | By client name from filename |
| Carousel | Swiper.js with Navigation module |
| Loop | Infinite (`loop: true`) |
| Width | Auto based on viewport (`slidesPerView: "auto"`) |
| Navigation | Custom prev/next arrow buttons |
| Location | Category pages only (not homepage) |
