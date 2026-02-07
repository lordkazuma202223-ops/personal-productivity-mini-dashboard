# Architecture - Productivity Dashboard

## System Overview

The Productivity Dashboard is a single-page application (SPA) built with Next.js 15 using the App Router pattern. It provides a comprehensive productivity management suite with real-time state updates.

## Tech Stack

### Core Framework

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework

### State Management

- **React Hooks**: useState, useEffect for local state
- **localStorage**: Persistent data storage
- **Custom Hooks**: useLocalStorage for reusable storage logic

### Testing

- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **Coverage**: 80% threshold enforced

### Code Quality

- **ESLint**: Linting with TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Commitlint**: Conventional commits

## Component Architecture

### Directory Structure

```
app/
├── layout.tsx          # Root layout with ErrorBoundary
├── page.tsx            # Main dashboard (Client Component)
└── globals.css         # Global styles

components/
├── ErrorBoundary.tsx   # Error boundary for React errors
├── WebVitals.tsx      # Performance monitoring
├── SkipLink.tsx       # Accessibility skip link
├── Skeleton.tsx       # Loading states
├── AccessibleButton.tsx # Accessible button component
└── AccessibleInput.tsx  # Accessible input component

lib/
├── errorHandler.ts     # Global error handling
└── test-utils.tsx     # Test utilities

hooks/
└── useLocalStorage.ts  # localStorage abstraction
```

### Data Flow

```
User Action → React State → localStorage → Persistence
     ↓                                            ↑
     └────────── UI Update ←──────────────────────┘
```

### State Management Strategy

**Client-Side State**:

- All state managed in `app/page.tsx` using React hooks
- No external state management library (Zustand, Redux)
- Optimized for single-user, single-device use

**Data Persistence**:

- localStorage for all user data
- Auto-save on state changes
- Hydrate on component mount

## Feature Modules

### 1. Tasks Management

- **Component**: Inline in main page
- **State**: `tasks[]` array
- **Storage**: localStorage key `"tasks"`
- **Operations**: add, toggle complete, delete

### 2. Focus Timer

- **Component**: Inline in main page
- **State**: `timerRunning`, `timerSeconds`, `timerMode`
- **Storage**: Stats tracked in localStorage
- **Timer**: `setInterval` with cleanup

### 3. Habits Tracker

- **Component**: Inline in main page
- **State**: `habits[]` array
- **Storage**: localStorage key `"habits"`
- **Operations**: add, toggle, delete, streak calculation

### 4. Goals Progress

- **Component**: Inline in main page
- **State**: `goals[]` array
- **Storage**: localStorage key `"goals"`
- **Operations**: add, update progress, delete

### 5. Notes Board

- **Component**: Inline in main page
- **State**: `notes[]` array, `selectedNote`, `editingNote`
- **Storage**: localStorage key `"notes"`
- **Operations**: add, edit, delete, view details

## Performance Optimizations

### Code Splitting

- Dynamic imports for large components (when needed)
- Webpack chunk optimization
- Vendor bundle separation

### Bundle Size

- Tree shaking enabled
- Unused code elimination
- Minification via Next.js

### Loading States

- Skeleton components for better UX
- Progressive enhancement
- Graceful degradation

### Web Vitals

- CLS (Cumulative Layout Shift) tracking
- LCP (Largest Contentful Paint) tracking
- FID (First Input Delay) tracking

## Security Considerations

### Client-Side

- Input validation for all user data
- XSS prevention via React escaping
- No sensitive data in localStorage

### API Safety

- No external API calls
- No server-side rendering of user data
- No authentication (single-user app)

## Accessibility (a11y)

### WCAG 2.1 AA Compliance

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance

### Components

- `SkipLink`: Skip to main content
- `AccessibleButton`: Accessible button with ARIA
- `AccessibleInput`: Accessible input with labels
- `ErrorBoundary`: Error handling with user feedback

## Error Handling

### Error Boundary

- Catches React component errors
- User-friendly error UI
- Option to reload page
- Error details for debugging

### Global Handler

- Catches unhandled errors
- Catches unhandled rejections
- Console logging
- Sentry integration ready

## Deployment Strategy

### Development

- `npm run dev` - Local development server
- Hot module replacement
- Fast refresh

### Production

- `npm run build` - Production build
- `npm start` - Production server
- Static export capability (when needed)

### CI/CD

- GitHub Actions pipeline
- Automated testing on PR
- Vercel deployment on merge
- Preview deployments for PRs

## Future Enhancements

### Phase 3 (Pending)

- PWA with service worker
- Push notifications
- Internationalization (i18n)
- Advanced monitoring (Sentry integration)
- Server-side state management (React Query)

## Performance Targets

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s
