# Mobile Carousel Margin Cut-off Issue

## Problem

On mobile view, the carousel images are being cut off on both sides due to horizontal padding on the parent container.

---

## Current Layout Structure

```
PortfolioCategory.jsx
└── <section className="px-4 sm:px-6 md:px-8 lg:px-12">  ← PROBLEM: padding
    └── <div className="max-w-[1800px] mx-auto">
        └── <ProjectCarousel>
            └── <Swiper className="overflow-hidden">  ← Carousel clipped
```

### Problematic CSS

| Breakpoint | Padding | Effect |
|------------|---------|--------|
| Mobile (default) | `px-4` (16px) | 32px total width lost |
| sm (640px+) | `px-6` (24px) | 48px total width lost |
| md (768px+) | `px-8` (32px) | 64px total width lost |
| lg (1024px+) | `px-12` (48px) | 96px total width lost |

---

## Visual Representation

### Current (Broken)
```
┌─────────────────────────────────┐
│ ░░ [IMG1] [IMG2] [IMG3] [IMG4 ░░│  ← Images cut off by padding
│ ░░                          ░░ │
│    ░░ = padding area (px-4)    │
└─────────────────────────────────┘
```

### Desired (Fixed)
```
┌─────────────────────────────────┐
│[IMG1] [IMG2] [IMG3] [IMG4] [IMG5│  ← Full bleed, edge-to-edge
│                                 │
│  Title stays centered with pad  │
└─────────────────────────────────┘
```

---

## Root Cause

The `<section>` wrapper in PortfolioCategory.jsx applies horizontal padding (`px-4`) that constrains the carousel width. Since carousels are designed to be full-width scrollable areas, this padding clips the content.

---

## Proposed Solutions

### Option A: Remove padding from carousel section only (Recommended)

**File:** `src/pages/PortfolioCategory.jsx`

Remove padding from the carousel section, keep it only for the header:

```jsx
{/* Project Carousels - No horizontal padding for full bleed */}
<section>
  <div className="max-w-[1800px] mx-auto">
    {groupedProjects.map((project, index) => (
      <ProjectCarousel ... />
    ))}
  </div>
</section>
```

Then add padding inside ProjectCarousel for the title only:

```jsx
{/* Title wrapper with padding */}
<div className="pt-4 sm:pt-5 md:pt-6 px-4 sm:px-6 md:px-8 lg:px-12">
  <h3>...</h3>
</div>
```

### Option B: Negative margins on carousel

**File:** `src/components/sections/ProjectCarousel.jsx`

Use negative margins to break out of the padding:

```jsx
<div className="relative group -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
  <Swiper>...</Swiper>
</div>
```

### Option C: Overflow visible with clip control

Allow overflow on the section but clip only the page:

```jsx
<section className="px-4 sm:px-6 overflow-x-clip">
  ...
</section>
```

---

## Recommendation

**Option A** is the cleanest solution because:

1. Carousel goes edge-to-edge (proper UX for swipeable content)
2. Title/text maintains proper margins
3. No negative margin hacks
4. Consistent with mobile design patterns

---

## Implementation Steps

1. Remove `px-4 sm:px-6 md:px-8 lg:px-12` from carousel section in PortfolioCategory.jsx
2. Add padding to the title wrapper inside ProjectCarousel.jsx
3. Test on mobile to verify full-bleed carousel
4. Verify title centering is maintained

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/PortfolioCategory.jsx` | Remove padding from carousel section |
| `src/components/sections/ProjectCarousel.jsx` | Add padding to title wrapper |
