# Productivity Dashboard

A production-ready personal productivity management dashboard built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Tasks Management**: Add, complete, and delete tasks with priority tracking
- **Focus Timer**: Pomodoro timer (25min work / 5min break) with total time tracking
- **Habits Tracker**: Track daily habits with streak counter
- **Goals Progress**: Set goals, track progress towards targets with deadlines
- **Notes Board**: Create colorful notes with edit/delete functionality
- **Quick Stats**: Real-time overview of productivity metrics
- **Dark/Light Mode**: Toggle between themes with system preference support
- **Local Storage**: All data persists in browser

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged + Commitlint
- **CI/CD**: GitHub Actions
- **Error Tracking**: Sentry integration (optional)

Tech:

- Next.js 15, TypeScript, Tailwind CSS 4

## 📋 Prerequisites

- Node.js 20 or higher
- npm, yarn, or pnpm

## 🏃 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd productivity-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting

# Git Hooks
npm run prepare      # Initialize Husky hooks
```

## 🧪 Testing

The project uses Jest and React Testing Library with a minimum coverage threshold of 80%.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Tests are located in:

- `__tests__/` - Test files
- `lib/test-utils.tsx` - Test utilities and custom render

## 🎨 Code Quality

### ESLint

Configured with Next.js recommended rules + strict TypeScript enforcement:

- No `any` types allowed
- Unused variables error
- React hooks rules enforced

### Prettier

Consistent code formatting with:

- Single quotes
- Semicolons
- 100 character line width
- 2 space indentation

### Pre-commit Hooks

Husky runs automatically before commits:

1. **lint-staged** - Lints and formats staged files
2. **commitlint** - Enforces conventional commits

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user authentication
fix: resolve memory leak in timer
docs: update README
test: add unit tests for tasks
chore: upgrade dependencies
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically on push to `main`

### Environment Variables

Create `.env.local`:

```env
# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-ga-id
```

## 🔄 CI/CD Pipeline

GitHub Actions automatically:

1. **On push/PR**:
   - Run linter
   - Check formatting
   - Run tests with coverage
   - Build application

2. **On PR**:
   - Deploy preview to Vercel

3. **On push to main**:
   - Deploy to production

## 📊 Project Structure

```
productivity-dashboard/
├── app/                  # Next.js app directory
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with ErrorBoundary
│   └── page.tsx         # Main dashboard page
├── components/          # React components
│   └── ErrorBoundary.tsx # Error boundary component
├── lib/                 # Utilities and helpers
│   ├── errorHandler.ts   # Global error handler
│   └── test-utils.tsx   # Test utilities
├── __tests__/           # Test files
│   └── setup.test.ts    # Test configuration
├── .github/             # GitHub Actions workflows
│   └── workflows/
│       └── ci.yml       # CI/CD pipeline
└── public/              # Static assets
```

## 🛡️ Error Handling

- **Error Boundary**: Catches React component errors
- **Global Handler**: Captures unhandled errors and rejections
- **Sentry Integration**: Ready for production error tracking (optional)

## 🔒 Security Best Practices

- TypeScript strict mode for type safety
- Input validation for user data
- Environment variable management
- Security headers via Next.js defaults

## 📈 Performance

- Next.js automatic code splitting
- Dynamic imports for routes
- Image optimization
- Tree shaking
- Bundle size monitoring

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Color contrast compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

## 📝 License

[Your License Here]

## 👥 Credits

Built with ❤️ using Next.js and modern web technologies.
