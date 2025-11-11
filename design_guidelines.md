# Aeterno Media Landing Page - Design Guidelines

## Design Approach & Philosophy

**Selected Approach:** Reference-Based (Netflix/Airbnb-inspired narrative storytelling + Apple's minimalism)

**Core Principle:** This is an "Impress-to-Quote" funnel using scroll-driven storytelling. Each scroll-locked section tells one part of the agency's story before revealing the full service catalog.

---

## Typography System

**Primary Font (Titles):** Oswald (Google Fonts)
- All H1, H2 headlines
- Bold, uppercase for maximum impact
- Sizes: Mobile 2.5rem, Desktop 4rem for H1; Mobile 2rem, Desktop 3rem for H2

**Secondary Font (Body):** Inter (Google Fonts)
- All paragraphs, buttons, UI text, lists
- Weights: Regular (400) for body, Medium (500) for buttons, SemiBold (600) for emphasis
- Sizes: Body 1rem (mobile) to 1.125rem (desktop); Buttons 1rem; Sub-headlines 1.25rem

---

## Color Palette

**Primary Orange:** #F27A23 - Used for all CTAs, accent dividers, active states
**Dark Blue:** #1E2A3A - Background for sections requiring contrast
**Light Gray:** #D9D9D9 - Borders, subtle backgrounds, dividers
**Dark Text:** #1A1A1A - All body text
**White:** #FFFFFF - Headlines on dark backgrounds, button text

---

## Layout & Spacing System

**Tailwind Units:** Consistently use 4, 8, 12, 16, 20, 24 for spacing
- Section padding: py-20 (desktop), py-12 (mobile)
- Component gaps: gap-8 (desktop), gap-6 (mobile)
- Button padding: px-8 py-4

**Container Strategy:**
- Full-screen sections: min-h-screen, flex, justify-center, items-center
- Standard sections: max-w-7xl mx-auto px-6
- Modal content: max-w-2xl

---

## Component Design Specifications

### Hook Section (Hero)
**Layout:** Full-screen, centered vertically and horizontally, dark background (#1E2A3A)

**Elements:**
- Logo: Top-center, width 200px (mobile) to 300px (desktop)
- Headline: Center, white text, Oswald, 4rem, max-width 900px
- CTA Button: Primary orange background, white text, rounded-lg, shadow-lg, px-8 py-4, hover lift effect

**Animation Entry:** Fade-in sequence (logo → headline → button) with 0.3s stagger

---

### Scene 1: Photography (Before/After Reveal)
**Layout:** Full-screen, pin on scroll, two-image overlay system

**Visual Structure:**
- Base layer: "Before" image (full-screen, slightly desaturated)
- Divider: 4px wide, orange (#F27A23), vertical line
- Top layer: "After" image (full-screen, vibrant colors, revealed via clip-path)
- Text overlay: Bottom-left positioned, white text on semi-transparent dark backdrop (bg-black/40, backdrop-blur-sm)

**Content Positioning:**
- Headline + Sub-headline: Left-aligned, bottom 20% of screen, pl-12
- CTA Button: Below text, orange background with blur backdrop

**Image Specifications:**
- Use professional photography showcase images
- Before: Raw/unedited aesthetic
- After: Color-graded, professionally edited
- Both images should be the same subject for clear comparison

---

### Scene 2: Web Development (Wireframe to Design)
**Layout:** Full-screen, pin on scroll, centered laptop mockup

**Visual Structure:**
- Laptop mockup: Center screen, width 70% viewport on desktop, 90% on mobile
- Screen content: Wireframe → Final design transition
- Cursor/interaction elements: SVG icons that traverse the screen
- Text block: Right side on desktop (50% width), below on mobile

**Content Arrangement:**
- Headline: Bold, dark text
- Sub-headline: Lighter weight, 1.25rem
- CTA Button: Orange, positioned below text

**Image Specifications:**
- Laptop mockup: Modern, sleek device (MacBook-style)
- Wireframe: Low-fidelity, gray-scale design sketch
- Final design: Polished, colorful website screenshot
- Ensure both screens fit within laptop frame

---

### Scene 3: Social Media Marketing (Engagement Animation)
**Layout:** Full-screen, pin on scroll, centered phone mockup

**Visual Structure:**
- Phone mockup: Center, width 40% viewport on desktop, 70% on mobile
- Screen content: Instagram grid with professional posts
- Floating hearts: Multiple SVG hearts (8-12) at various positions, orange color
- Text block: Left side on desktop, below on mobile

**Content Layout:**
- Headline: Oswald, impactful messaging
- Sub-headline: Benefit-focused copy
- CTA Button: Orange, clear call-to-action

**Image Specifications:**
- Phone mockup: Modern smartphone (iPhone-style)
- Screen content: Instagram-style grid (3 columns, 3-4 rows of images)
- Use professional brand content examples (photography, graphics, lifestyle shots)

---

### Other Capabilities Section
**Layout:** Standard width (max-w-6xl), grid-based, clean and organized

**Visual Structure:**
- Headline: Center-aligned, Oswald, 3rem
- Service grid: 2 columns (desktop), 1 column (mobile)
- Each service: Icon + title, clean card design with subtle border (border-light-gray)

**Card Design:**
- Background: White or very light gray
- Padding: p-8
- Border: 1px solid light-gray, rounded-lg
- Hover: Subtle lift (shadow-md transition)

**Services List:**
1. Photography
2. Video Editing
3. Image Editing
4. Website Development
5. App Development
6. Social Media Marketing
7. Graphic Design
8. Copywriting

Use icon library (Heroicons) for visual consistency

---

### Quote Intake Modal
**Layout:** Fixed overlay, centered, dark backdrop with blur

**Modal Container:**
- Width: max-w-2xl
- Background: White
- Border radius: rounded-2xl
- Padding: p-8 (mobile), p-12 (desktop)
- Shadow: shadow-2xl

**Multi-Step Structure:**
- Progress indicator: Top of modal, show current step (1/3, 2/3, 3/3)
- Step 1 (Service): Grid of service buttons (2 columns on mobile, 3 on desktop), selected service has orange background
- Step 2 (Budget): Range slider with orange track, display current value
- Step 3 (Contact): Stacked input fields, full-width, border-light-gray

**Button States:**
- Primary (Next/Submit): Orange background, white text
- Secondary (Back): Border only, dark text
- Close (X): Top-right corner, dark icon

**Form Fields:**
- Input height: h-12
- Border: 2px solid light-gray
- Focus state: Border orange, ring-orange
- Border radius: rounded-lg

---

### Footer
**Layout:** Full-width, dark background (#1E2A3A), py-12

**Content:**
- Copyright: Center or left-aligned, light gray text
- Privacy link: Underline on hover, light gray text
- Spacing: Generous padding, clean separation from main content

---

## Animation Principles

**Scroll-Lock Scenes:** User must scroll ~1.5 viewport heights to complete each animation (provides control and engagement)

**Timing:** All transitions use ease-out curves, 0.8-1.2s duration for smoothness

**Stagger:** Multi-element animations stagger by 0.15-0.2s

**Performance:** All animations use transform and opacity properties only (GPU-accelerated)

---

## Hero Images

**Large Hero Image:** Yes - The Hook section uses a full-screen background treatment (can be solid color, gradient, or subtle texture)

**Section-Specific Images:**
- Scene 1: Two full-screen images (before/after photography comparison)
- Scene 2: Laptop mockup with embedded screen images
- Scene 3: Phone mockup with embedded Instagram grid

All images should be high-quality, professionally shot/designed, and optimized for web (WebP format, responsive srcsets)

---

## Accessibility & Interaction

- All CTAs maintain 4.5:1 contrast ratio
- Focus states: 2px orange outline with offset
- Interactive elements: Minimum 44px touch target
- Modal: Trap focus, ESC key to close, click backdrop to close
- Smooth scroll: Uses reduced-motion preference detection