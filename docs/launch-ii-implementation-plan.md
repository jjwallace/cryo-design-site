# CryoDesign.com — Launch II Implementation Plan

## Overview

This document outlines the comprehensive redesign requirements for the second launch iteration of CryoDesign.com. The primary focus is transitioning from loose image grids to a project-based organizational system with horizontal scrolling galleries.

---

## 1. Global Changes

### Heading Text Styling
- All heading text requires **outlined styling** (stroke/border text effect)
- Implementation: Use CSS `text-stroke` or `-webkit-text-stroke` property
- Example: `text-stroke: 1px white; -webkit-text-stroke: 1px white; color: transparent;`

### Navigation Restructure
Current → New naming:

| Current Name | New Name |
|--------------|----------|
| Illustration | Branding |
| Brand Identity | Identity |
| Corporate | Spatial |
| Graphics | Graphics (last position) |

**New Section Order:**
1. Branding (formerly Illustration)
2. Identity (formerly Brand Identity)
3. Spatial (formerly Corporate)
4. Graphics

---

## 2. Content Removal

### From ILLUSTRATION (→ Branding)
Remove the following files:
- `CRYO_Ritual_Rosin_016`
- `CRYO_Ritual_Rosin_023`
- `CRYO_Ritual_Rosin_024`
- `CRYO_Ritual_Rosin_017`

### From CORPORATE (→ Spatial)
Remove the following files:
- `CRYO_SentinelOne_006`
- `CRYO_SentinelOne_005`
- `CRYO_SentinelOne_001`

**Note:** Alternative for SentinelOne images — center and present as digital asset mockup rather than photographed shirt.

### From GRAPHICS
Remove the following files:
- `CRYO_Pokneon_011`
- `CRYO_Hello_Wu_008`
- `CRYO_Hello_Wu_011`

### From BRAND IDENTITY (→ Identity)
Remove the following files:
- `CRYO_MJs_Market_002`
- `CRYO_MJs_Market_003`
- `CRYO_MJs_Market_004`

### From Home Page Images
- Remove selected images as needed for simplification
- Curate a focused selection for the hero/gallery area

---

## 3. Project-Based Layout System

### Core Concept
Pages should be organized by **project**, not by loose image grids.

### File Naming Convention
```
CRYO_PROJECTNAME_###
```
- `CRYO_` — Brand prefix
- `PROJECTNAME` — Project identifier (e.g., Ritual_Rosin, Aston_Martin)
- `###` — Image number within project

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  [1a] [1b] [1c] [1d]  ←── Horizontal scroll            │
├─────────────────────────────────────────────────────────┤
│  <PROJECT DESCRIPTION 1>                                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  [2a] [2b] [2c] [2d] [2e] [2f]  ←── Horizontal scroll  │
├─────────────────────────────────────────────────────────┤
│  <PROJECT DESCRIPTION 2>                                │
└─────────────────────────────────────────────────────────┘

... repeats for each project
```

### Layout Rules
1. **Projects stack vertically** — Each project is a distinct row
2. **Images scroll horizontally** — Within each project row
3. **Description below** — Project description appears beneath the image carousel
4. **No grid mixing** — Images from different projects never appear in same row

### Visual Example
```
Project Row Structure:
┌──────────────────────────────────────────────────────────────┐
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│ │ 1a  │ │ 1b  │ │ 1c  │ │ 1d  │ │ 1e  │ │ 1f  │ │ 1g  │ ─►  │
│ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘     │
│                                                              │
│ Project Name                                                 │
│ Brief description of the project, client, and scope.        │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Mobile Adjustments

### Background Images
- Reduce scale/size for mobile viewports
- Consider using smaller resolution variants
- Adjust `background-size` from `cover` to scaled percentage

### Menu Text
- Must be **brighter, pure white** (`#FFFFFF`)
- Current gray tones are too dark on mobile
- Update MenuOverlay link colors

### Image Reduction
- Reduce the number of images shown per project on mobile
- Show curated subset rather than full gallery
- Implement responsive image counts

---

## 5. Mobile Content Sets

### Branding (formerly Illustration)
Display only these images on mobile:
1. `CRYO_Ritual_Rosin_020`
2. `CRYO_Ritual_Rosin_001`
3. `CRYO_Ritual_Rosin_008`
4. `CRYO_UNI_028`
5. `CRYO_Pinky_Darby_003`
6. `CRYO_Maygun_001`
7. `CRYO_Ritual_Rosin_015`

### Identity (formerly Brand Identity)
Display only these images on mobile:
1. `CRYO_Altered_Ego_001`
2. `CRYO_Altered_Ego_004`
3. `CRYO_Ritual_Rosin_013`
4. `CRYO_SDB_003`
5. `CRYO_UNI_010`
6. `CRYO_UNI_030`

### Spatial (formerly Corporate)
Display only these images on mobile:
1. `CRYO_Aston_Martin_002`
2. `CRYO_Aston_Martin_003`
3. `CRYO_Aston_Martin_004`
4. `CRYO_Aston_Martin_005`
5. `CRYO_SentinelOne_Booth_001`
6. `CRYO_SentinelOne_Booth_002`
7. `CRYO_SentinelOne_Booth_003`

### Graphics
Display only these images on mobile:
1. `CRYO_Hello_Wu_008`
2. `CRYO_Pokneon_011`
3. `CRYO_SDB_200`
4. `CRYO_Pokneon_002`
5. `CRYO_Pokneon_006`
6. `CRYO_Pokneon_007`
7. `CRYO_Pokneon_010`
8. `CRYO_Pokneon_009`

---

## 6. Implementation Tasks

### Phase 1: Data & Structure
- [ ] Update route names in React Router (Navbar, Footer)
- [ ] Rename category slugs in projects.js
- [ ] Create project grouping logic (parse `CRYO_PROJECTNAME_###`)
- [ ] Add project descriptions data structure
- [ ] Remove flagged images from assets

### Phase 2: Component Development
- [ ] Create `ProjectRow` component (horizontal scroll gallery)
- [ ] Create `ProjectDescription` component
- [ ] Update `PortfolioCategory` to use project-based layout
- [ ] Implement horizontal scroll with touch/drag support
- [ ] Add scroll indicators for horizontal galleries

### Phase 3: Styling
- [ ] Implement outlined heading text globally
- [ ] Update heading components with stroke styling
- [ ] Adjust mobile menu colors to pure white
- [ ] Scale background images for mobile

### Phase 4: Mobile Optimization
- [ ] Create mobile content filter logic
- [ ] Implement responsive image counts per project
- [ ] Test horizontal scroll on touch devices
- [ ] Optimize image loading for mobile bandwidth

---

## 7. Component Architecture

### Proposed New Components

```
src/components/
├── sections/
│   ├── ProjectGallery.jsx      # Main project-based gallery
│   ├── ProjectRow.jsx          # Single project horizontal scroll
│   └── ProjectDescription.jsx  # Project info below images
├── ui/
│   └── HorizontalScroll.jsx    # Reusable horizontal scroll container
```

### Data Structure

```javascript
// projects.js - New structure
const projects = {
  branding: [
    {
      id: 'ritual-rosin',
      name: 'Ritual Rosin',
      description: 'Brand identity and packaging design...',
      images: [
        { id: '001', src: '...', title: '...' },
        { id: '008', src: '...', title: '...' },
        // ...
      ],
      mobileImages: ['001', '008', '015', '020'], // Subset for mobile
    },
    // More projects...
  ],
  identity: [...],
  spatial: [...],
  graphics: [...],
};
```

---

## 8. Technical Considerations

### Horizontal Scroll Implementation
- Use CSS `overflow-x: auto` with `scroll-snap-type`
- Consider GSAP Draggable for enhanced touch experience
- Add momentum scrolling for native feel
- Include scroll position indicators

### Outlined Text CSS
```css
.heading-outlined {
  -webkit-text-stroke: 1px white;
  -webkit-text-fill-color: transparent;
  /* Fallback for non-webkit */
  color: white;
}

@supports (-webkit-text-stroke: 1px white) {
  .heading-outlined {
    color: transparent;
  }
}
```

### Mobile Detection for Content
```javascript
const isMobile = window.innerWidth < 768;
const displayImages = isMobile
  ? project.mobileImages
  : project.images;
```

---

## 9. Summary

| Category | Items |
|----------|-------|
| Sections to rename | 4 |
| Images to remove | 14+ |
| New components needed | 3-4 |
| Mobile curated images | ~28 total |

**Priority Order:**
1. Content removal (cleanup)
2. Section renaming (navigation)
3. Project-based layout (major feature)
4. Outlined headings (styling)
5. Mobile optimizations (responsive)

---

## 10. Questions to Resolve

1. **Project Descriptions**: Do we have copy for each project, or should these be auto-generated/placeholder?
2. **Home Page**: Should home page also use project-based layout, or keep current gallery?
3. **Desktop vs Mobile**: Should desktop show ALL images or also use curated sets?
4. **Scroll Behavior**: Snap to images or free scroll?
5. **Project Order**: Within each category, what order should projects appear?
