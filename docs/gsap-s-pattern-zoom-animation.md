# GSAP S-Pattern Grid Animation with Zoom Focus

## Overview

This report outlines an animation concept for the hero gallery component that combines two distinct behaviors:

1. **S-Pattern Movement**: Items continuously flow through the grid in a serpentine/snake pattern
2. **Zoom Focus**: Individual images enlarge while surrounding images shrink, creating a spotlight effect

---

## S-Pattern Movement

### Concept

The S-pattern (also called serpentine or boustrophedon movement) mimics how the eye naturally scans content. Items move through the grid following this path:

```
Row 1: →  →  →  →
Row 2: ←  ←  ←  ←
Row 3: →  →  →  →
Row 4: ←  ←  ←  ←
```

### Movement Mechanics

- **Direction Alternation**: Odd rows move left-to-right, even rows move right-to-left
- **Continuous Flow**: As an item exits one end of a row, it wraps to the next row
- **Timing**: Each item follows the one before it with a stagger delay, creating a flowing chain effect
- **Speed**: Movement should be slow enough to appreciate each image (3-5 seconds per position)

### Position Calculation

For a 4-column grid:
- Row 1 positions: 0, 1, 2, 3 (left to right)
- Row 2 positions: 7, 6, 5, 4 (right to left)
- Row 3 positions: 8, 9, 10, 11 (left to right)
- Row 4 positions: 15, 14, 13, 12 (right to left)

---

## Zoom Focus Behavior

### Concept

As the "focus point" travels through the S-pattern, the currently focused image scales up while neighboring images scale down. This creates a dynamic spotlight effect that draws attention to each piece sequentially.

### Scale States

| State | Scale | Opacity | Description |
|-------|-------|---------|-------------|
| Focused | 1.15 - 1.25 | 1.0 | Currently highlighted image |
| Adjacent | 0.9 - 0.95 | 0.8 | Immediate neighbors |
| Distant | 0.85 | 0.6 | All other images |
| Default | 1.0 | 1.0 | No focus active (paused state) |

### Focus Transition

- **Duration**: 0.4 - 0.6 seconds per focus shift
- **Easing**: `power2.inOut` for smooth acceleration/deceleration
- **Overlap**: Slight overlap between outgoing and incoming focus creates fluid transitions

---

## Padding and Spacing

### Dynamic Gap Behavior

When an image is focused:
1. **Focused Image**: Gains additional margin/padding to create breathing room
2. **Surrounding Images**: Gap increases slightly to accommodate the zoom
3. **Grid Integrity**: Overall grid structure maintained despite individual scaling

### Recommended Values

- **Base Gap**: 12-16px between images
- **Focused Gap**: 20-24px around the focused image
- **Transition**: Gap changes animate alongside scale changes

---

## Animation Sequence

### Phase 1: Initial State
- All images at default scale (1.0)
- Standard grid gap applied
- No focus active

### Phase 2: Focus Activation
- First image in S-pattern receives focus
- Scales to 1.2x
- Adjacent images scale to 0.9x
- Distant images scale to 0.85x

### Phase 3: Focus Travel
- Focus moves to next position in S-pattern
- Previous focus scales down
- New focus scales up
- Movement continues in serpentine path

### Phase 4: Loop
- After completing the full S-pattern, animation loops
- Option: Pause briefly at each corner for emphasis

---

## GSAP Implementation Approach

### Recommended Plugins

1. **GSAP Core**: Timeline sequencing and tweens
2. **Flip Plugin**: Smooth position/scale transitions while maintaining layout
3. **ScrollTrigger** (optional): Pause/resume based on viewport visibility

### Timeline Structure

```
Main Timeline (infinite loop)
├── Focus Item 1 (position 0)
│   ├── Scale up item 1
│   ├── Scale down neighbors
│   └── Hold duration
├── Transition to Item 2
│   ├── Scale down item 1
│   └── Scale up item 2
├── Focus Item 2 (position 1)
│   └── ...
└── [Continue through all positions]
```

### Key GSAP Features

- **gsap.timeline({ repeat: -1 })**: Infinite loop
- **stagger**: Sequential item animations
- **ease: "power2.inOut"**: Smooth transitions
- **onUpdate callback**: Dynamic gap calculations
- **paused state**: Stop on hover or scroll away

---

## Interaction Considerations

### Hover Behavior

- **On Hover**: Pause the S-pattern animation
- **Hovered Image**: Immediately becomes focused (scale 1.2x)
- **On Mouse Leave**: Resume S-pattern from current position

### Mobile/Touch

- **Touch Devices**: Consider disabling constant movement
- **Tap to Focus**: Allow users to tap individual images
- **Performance**: Reduce animation complexity on lower-end devices

### Accessibility

- **prefers-reduced-motion**: Disable animations entirely or reduce to subtle fades
- **Focus Order**: Maintain logical tab order regardless of visual position

---

## Performance Considerations

### Optimization Strategies

1. **GPU Acceleration**: Use `transform` and `opacity` only
2. **will-change**: Apply to animated elements sparingly
3. **Visibility Culling**: Pause animations when section is off-screen
4. **Image Count**: Limit to 8-16 images for smooth performance
5. **Debounce**: Throttle resize recalculations

### Memory Management

- Clear timelines on component unmount
- Kill ScrollTrigger instances properly
- Avoid creating new timelines on each render

---

## Visual Examples

### S-Pattern Path Visualization

```
┌─────────────────────────────────┐
│  [1] ──► [2] ──► [3] ──► [4]   │
│                           │     │
│  [8] ◄── [7] ◄── [6] ◄── [5]   │
│   │                             │
│  [9] ──► [10] ─► [11] ─► [12]  │
│                           │     │
│  [16] ◄─ [15] ◄─ [14] ◄─ [13]  │
└─────────────────────────────────┘
```

### Focus State Visualization

```
Normal State:        Focused State (item 6):
┌───┬───┬───┬───┐   ┌───┬───┬───┬───┐
│ ■ │ ■ │ ■ │ ■ │   │ · │ · │ · │ · │
├───┼───┼───┼───┤   ├───┼───┼───┼───┤
│ ■ │ ■ │ ■ │ ■ │   │ · │ ○ │ █ │ ○ │
├───┼───┼───┼───┤   ├───┼───┼───┼───┤
│ ■ │ ■ │ ■ │ ■ │   │ · │ ○ │ · │ · │
├───┼───┼───┼───┤   ├───┼───┼───┼───┤
│ ■ │ ■ │ ■ │ ■ │   │ · │ · │ · │ · │
└───┴───┴───┴───┘   └───┴───┴───┴───┘

█ = Focused (1.2x scale)
○ = Adjacent (0.9x scale)
· = Distant (0.85x scale)
```

---

## Recommended Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Focus Duration | 2-3s | Time each image stays focused |
| Transition Duration | 0.5s | Time to move focus between images |
| Focused Scale | 1.2 | Scale multiplier for focused image |
| Adjacent Scale | 0.9 | Scale for neighboring images |
| Distant Scale | 0.85 | Scale for all other images |
| Base Gap | 16px | Normal spacing between images |
| Focused Gap | 24px | Spacing around focused image |
| Loop Delay | 0s | No pause between loops |
| Easing | power2.inOut | Smooth in/out transitions |

---

## Summary

This animation creates a mesmerizing, continuous flow through the portfolio grid that:

1. Guides the viewer's eye in a natural reading pattern (S-shape)
2. Highlights each piece individually through zoom focus
3. Maintains visual hierarchy with scale differentiation
4. Creates breathing room through dynamic padding
5. Loops infinitely for an engaging, living gallery experience

The combination of movement and focus creates a gallery that feels alive and curated, drawing attention to each piece while maintaining the overall grid aesthetic.
