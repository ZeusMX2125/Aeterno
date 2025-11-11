# Aeterno Media Landing Page - Design Guidelines (Dark Mode Edition)

## Design Approach & Philosophy

**Selected Approach:** Reference-Based (Netflix/Spotify dark premium aesthetic + Ryza template density)

**Core Principle:** Immersive scroll-driven storytelling with pure dark mode, tight spacing, oversized typography, and glass-morphism effects. Dense, image-heavy layout that feels premium and modern.

---

## Typography System

**Primary Font:** Oswald (Google Fonts)
- All headlines: UPPERCASE, Bold
- Sizes: H1 7xl-8xl (4.5rem mobile, 7rem desktop), H2 5xl-6xl (3rem mobile, 5rem desktop)
- White text (#FFFFFF) for maximum contrast

**Secondary Font:** Inter (Google Fonts)
- Body, buttons, captions: Weights 400 (body), 500 (buttons), 600 (emphasis)
- Sizes: Body 1rem, Sub-headlines 1.5rem, Captions 0.875rem
- Light gray text (#B3B3B3) for body, white for headlines

---

## Color Palette

**Backgrounds:**
- Primary Black: #0A0A0A (main sections)
- Dark Gray: #111111 (alternating sections, cards)
- Darkest: #000000 (footer, overlays)

**Text:**
- Primary: #FFFFFF (headlines, emphasis)
- Secondary: #B3B3B3 (body text, captions)

**Accent:**
- Orange: #F27A23 (CTAs, glow effects, progress indicators)

**Glass Effects:**
- Backdrop: bg-white/5 with backdrop-blur-xl
- Border: border-white/10

---

## Layout & Spacing System

**Tight Spacing Strategy (Dense Layout):**
- Section padding: py-12 (desktop), py-8 (mobile)
- Component gaps: gap-4 (desktop), gap-3 (mobile)
- Card padding: p-6 (desktop), p-4 (mobile)
- Button padding: px-6 py-3

**Container Strategy:**
- Full-width sections: w-full, no max-width constraints
- Content containers: max-w-7xl mx-auto px-4
- Dense grid layouts: Minimize gap between elements

---

## Component Design Specifications

### Hero Section
**Layout:** Full-screen (min-h-screen), centered content over dark image overlay

**Visual Structure:**
- Background: Large hero image with dark overlay (bg-black/60)
- Logo: Top-left, 250px width
- Headline: Center, white, 8xl, max-width 1200px, dramatic statement
- Sub-headline: 1.5rem, light gray, below headline
- CTA Button: Orange background (#F27A23), white text, backdrop-blur-lg, shadow-2xl, shadow-orange/20

**Glass Card (Optional Variant):** Floating glass card with bg-white/5, backdrop-blur-xl, border-white/10, containing headline and CTA

---

### Animated Marquee Scroller
**Layout:** Full-width, py-8, infinite horizontal scroll

**Content:** Repeating text/logos showcasing services or client brands
- Text: 2xl, Oswald, uppercase, white text
- Spacing: mx-12 between items
- Speed: Smooth, continuous 30s loop
- Background: #111111 or transparent over image

---

### Scroll-Lock Storytelling Sections (3 Scenes)

**Scene 1: Photography Transformation**
- Full-screen pin, before/after with vertical divider
- Before: Grayscale image, left side
- After: Full-color vibrant, right side revealed
- Orange divider (4px) animated on scroll
- Text overlay: Bottom-left, glass morphism container (bg-black/40, backdrop-blur-md), white text, orange CTA

**Scene 2: Web Development Evolution**
- Full-screen pin, centered laptop mockup
- Screen transitions: Wireframe → polished design
- Floating code snippets/cursor elements around laptop
- Text: Right side (desktop), glass card container, white headline, orange accents

**Scene 3: Social Media Growth**
- Full-screen pin, centered phone mockup
- Screen: Instagram grid with professional posts
- Floating engagement icons: hearts, likes, comments (orange glow)
- Text: Left side (desktop), glass morphism card, stats integration

---

### Statistics Display
**Layout:** Full-width, py-12, grid 4 columns (desktop), 2 columns (mobile)

**Stat Card Design:**
- Background: bg-white/5, backdrop-blur-xl, border-white/10
- Number: 7xl, white, Oswald, glowing effect (text-shadow: 0 0 20px orange/30)
- Label: 1rem, light gray, below number
- Icon: Top-right corner, orange accent

**Stats:** Clients served, projects completed, years experience, satisfaction rate

---

### Service Cards Grid
**Layout:** max-w-7xl, grid 3 columns (desktop), 1 column (mobile), gap-4

**Card Design:**
- Background: #111111, p-6, rounded-xl
- Hover: bg-white/5, shadow-xl, shadow-orange/10 (glow effect)
- Icon: 3xl, orange, top-left
- Title: 2xl, Oswald, white, uppercase
- Description: 1rem, light gray, 2 lines max

**Services:** Photography, Video Editing, Web Development, App Development, Social Media Marketing, Graphic Design, Copywriting, Branding

---

### Numbered Process Steps
**Layout:** max-w-6xl, vertical timeline, py-16

**Step Design:**
- Number: 6xl, Oswald, orange, left-aligned
- Progress bar: Vertical line connecting steps, bg-white/10, active portion orange
- Content: Glass card (bg-white/5, backdrop-blur-xl), pl-24, p-8
- Title: 3xl, white, Oswald
- Description: 1rem, light gray

**Steps:** Discovery, Strategy, Design, Development, Launch (5 steps total)

---

### Image Showcase Gallery
**Layout:** Full-width masonry grid, 3 columns (desktop), 1 column (mobile), gap-2

**Image Treatment:**
- Aspect ratio: Varied (1:1, 16:9, 4:5 mix)
- Hover: Scale 1.05, overlay with orange gradient
- Caption: Absolute bottom, glass morphism bg, white text
- Dense layout: Minimal gaps between images

**Content:** Portfolio pieces, client work examples, behind-the-scenes photography

---

### Quote Modal
**Layout:** Fixed overlay, centered, max-w-3xl

**Modal Design:**
- Background: #111111, rounded-2xl, p-12, shadow-2xl
- Backdrop: bg-black/80, backdrop-blur-sm
- Close button: Top-right, white icon

**Multi-Step Form:**
- Progress: Orange bar at top, segments for 3 steps
- Step 1: Service selection grid, 3 columns, selected state orange background
- Step 2: Budget range slider, orange track/thumb, large value display (3xl)
- Step 3: Contact form, stacked inputs, bg-white/5, border-white/10, focus:border-orange

**Buttons:** Orange primary, white/10 border secondary, full-width on mobile

---

## Images

**Hero Image:** Yes - full-screen background image showing agency workspace, creative team, or dramatic brand imagery with dark overlay

**Section Images:**
- Scene 1: Professional photography before/after comparison (landscape/portrait subject)
- Scene 2: Laptop mockup with wireframe and polished website screenshots
- Scene 3: Phone mockup with Instagram grid (9-12 professional posts)
- Gallery: 15-20 portfolio images showcasing varied work (photography, web designs, branding)

All images: High-quality, dark-treated for cohesion, WebP format, lazy-loaded

---

## Glass-Morphism Effects

**Standard Glass Pattern:**
```
background: bg-white/5 or bg-black/40
backdrop-filter: backdrop-blur-xl
border: border border-white/10
shadow: shadow-xl (for depth)
```

**Use Cases:** Floating cards over images, text overlays, navigation, modal containers

---

## Footer
**Layout:** Full-width, bg-black, py-12, border-top border-white/10

**Content:**
- Logo: Left side, 200px
- Links: Center (Services, About, Contact), light gray, hover:white
- Social icons: Right side, orange hover state
- Copyright: Bottom, center, light gray text, 0.875rem

---

## Animation Principles

**GSAP Scroll-Lock:** Each scene requires 1.5 viewport scroll to complete animation
**Marquee:** Continuous 30s loop, seamless infinite scroll
**Glow Effects:** Subtle pulsing animation (2s duration) on stat numbers and service cards
**Transitions:** All use ease-out, 0.6-0.8s duration
**Performance:** Transform and opacity only, GPU-accelerated