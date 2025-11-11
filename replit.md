# Aeterno Media Landing Page

## Overview

Aeterno Media is a single-page, narrative-driven creative agency landing page built as an "Impress-to-Quote" conversion funnel. The application uses scroll-locked animations to tell a three-part visual story showcasing the agency's core services (Photography, Web Development, and Social Media Marketing), followed by a comprehensive service catalog and an interactive multi-step quote intake modal. The primary business goal is lead generation through an immersive, story-driven user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server

**Routing**: Client-side routing via Wouter (lightweight alternative to React Router)

**State Management**: React hooks for local state, TanStack Query for server state management

**UI Component Library**: Shadcn/ui components built on Radix UI primitives with full TypeScript support

**Styling System**: Tailwind CSS with custom brand colors and design tokens configured in `tailwind.config.ts`. Custom CSS variables define light mode theming with elevation shadows and button outline styles.

**Typography**: 
- Primary (headings): Oswald from Google Fonts
- Secondary (body): Inter from Google Fonts
- Configured as font-title and font-body in Tailwind

**Animation Strategy**: GSAP (GreenSock Animation Platform) with ScrollTrigger plugin for scroll-locked, narrative storytelling animations. Each "scene" component pins content while scrolling to create cinematic transitions.

### Design Philosophy

The application follows a reference-based design approach inspired by Netflix/Airbnb narrative storytelling combined with Apple's minimalism. The core principle is "scroll-driven storytelling" where each scroll-locked section reveals one part of the agency's story before presenting the full service catalog.

**Brand Colors**:
- Primary Orange: #F27A23 (CTAs, accents)
- Dark Blue: #1E2A3A (contrast backgrounds)
- Light Gray: #D9D9D9 (borders, subtle backgrounds)
- Dark Text: #1A1A1A (body text)
- White: #FFFFFF (headlines on dark backgrounds)

**Component Structure**:
1. **Hook Section**: Initial hero with logo and headline, animated entrance
2. **Scene 1 - Photography**: Before/after image reveal with horizontal divider animation
3. **Scene 2 - Web Development**: Laptop mockup with wireframe-to-final design transition and animated cursor
4. **Scene 3 - Social Media Marketing**: Phone mockup with animated heart/engagement icons
5. **Other Capabilities**: Grid showcase of remaining 8 services
6. **Quote Intake Modal**: Multi-step form (service selection → budget slider → contact info)
7. **Footer**: Simple footer with privacy policy link

### Backend Architecture

**Server Framework**: Express.js running on Node.js

**Development Setup**: Vite middleware mode for hot module replacement during development

**Production Build**: 
- Frontend: Vite builds React application to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`

**API Structure**: RESTful endpoints prefixed with `/api` (currently scaffolded but not implemented)

**Storage Layer**: Abstract storage interface (`IStorage`) with in-memory implementation (`MemStorage`). Designed to be replaced with database-backed storage without changing API contracts.

### Data Storage

**ORM**: Drizzle ORM configured for PostgreSQL (via `@neondatabase/serverless` driver)

**Schema**: Currently defines a basic users table with id, username, and password fields. Schema validation via Zod through `drizzle-zod` integration.

**Database Configuration**: Connection via `DATABASE_URL` environment variable, migrations output to `./migrations` directory

**Current State**: Database schema defined but not actively used. The application currently uses in-memory storage for user data.

### Authentication & Authorization

Not currently implemented. The codebase includes user schema and storage interfaces as scaffolding for future authentication implementation.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (@radix-ui/react-*)
- **Shadcn/ui**: Pre-built accessible components combining Radix UI with Tailwind styling
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component for potential image galleries

### Animation & Interaction
- **GSAP**: Primary animation library with ScrollTrigger plugin for scroll-based animations
- **Class Variance Authority (CVA)**: Variant-based component styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration

### Forms & Validation
- **React Hook Form**: Form state management and validation
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries
- **Zod**: TypeScript-first schema validation

### Data Fetching & State
- **TanStack Query (React Query)**: Server state management with caching and synchronization

### Development Tools
- **TypeScript**: Type safety across client and server
- **Vite**: Fast development server and build tool
- **esbuild**: Fast JavaScript bundler for production builds
- **Wouter**: Lightweight client-side routing
- **PostCSS**: CSS processing with Autoprefixer

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for database operations
- **@neondatabase/serverless**: PostgreSQL driver optimized for serverless environments
- **Drizzle Kit**: Migration tool for Drizzle ORM
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used)

### Utility Libraries
- **clsx & tailwind-merge**: Conditional className composition
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation

### Asset Management
Custom Vite alias configuration resolves `@assets` to `attached_assets` directory for generated images used in scene components.