# Accessibility Guide - Productivity Dashboard

## Overview

This guide documents the accessibility (a11y) features and best practices implemented in the Productivity Dashboard.

## WCAG 2.1 AA Compliance

The dashboard is designed to meet WCAG 2.1 Level AA success criteria:

### Perceivable

- Text alternatives for non-text content
- Time-based media alternatives
- Adaptable content
- Distinguishable content

### Operable

- Keyboard functionality
- Enough time to read and use content
- Seizures and physical reactions
- Navigable content

### Understandable

- Readable content
- Predictable functionality
- Input assistance

### Robust

- Compatible with assistive technologies
- Accessible APIs

## Keyboard Navigation

### Tab Order

- Logical tab order follows visual layout
- Focus indicators visible on all interactive elements
- Skip link to main content

### Keyboard Shortcuts

- `Tab` / `Shift+Tab`: Navigate between focusable elements
- `Enter` / `Space`: Activate buttons and links
- `Escape`: Close modals and dialogs (when implemented)
- `Arrow Keys`: Navigate within components (when applicable)

## Screen Reader Support

### ARIA Labels

- All interactive elements have accessible names
- Icon-only buttons have `aria-label` or `aria-labelledby`
- Form fields have associated labels
- Error messages have `role="alert"`

### Semantic HTML

- Proper heading hierarchy (h1-h6)
- Landmark regions (header, main, footer)
- Lists for grouped content
- Buttons for actions, links for navigation

## Focus Management

### Visible Focus

- Custom focus styles: `focus:ring-2` and `focus:ring-offset-2`
- High contrast focus indicators
- Consistent focus behavior across components

### Focus Trapping

- Implemented in modals (when added)
- Escape key to close
- Focus returned to trigger element

## Color and Contrast

### Contrast Ratios

- Normal text: 4.5:1 (AA)
- Large text: 3:1 (AA)
- Interactive elements: 3:1 (AA)
- Graphics: 3:1 (AA)

### Color Independence

- Information not conveyed by color alone
- Status indicated by icons/text in addition to color
- Error states have explicit error messages

## Components

### AccessibleButton

**Features:**

- ARIA attributes: `aria-busy`, `aria-disabled`
- Loading state support
- Focus-visible styles
- Keyboard accessible

**Usage:**

```tsx
<AccessibleButton variant="primary" icon={<Plus />} aria-label="Add new task">
  Add Task
</AccessibleButton>
```

### AccessibleInput

**Features:**

- Required label association
- Error message with `role="alert"`
- Hint text with `aria-describedby`
- Invalid state with `aria-invalid`

**Usage:**

```tsx
<AccessibleInput
  label="Task name"
  error="Task name is required"
  hint="Be specific and actionable"
  required
/>
```

### SkipLink

**Features:**

- Hidden until focused
- Skips to main content
- Keyboard accessible

**Location:** Added to root layout

### ErrorBoundary

**Features:**

- User-friendly error messages
- Keyboard-accessible reload button
- Semantic error container
- ARIA live region for errors

## Loading States

### Skeleton Components

- Placeholder content while loading
- Maintains layout stability
- Reduces Cumulative Layout Shift (CLS)
- Accessible to screen readers

**Components:**

- `CardSkeleton`
- `TaskListSkeleton`
- `StatsSkeleton`

## Forms and Inputs

### Label Association

- All inputs have visible labels
- `htmlFor` attribute links label to input
- Unique IDs for label-input pairing

### Error Handling

- Error messages announced via `role="alert"`
- Inline error text for sighted users
- Input marked as `aria-invalid`

### Validation

- Client-side validation with feedback
- Clear error messages
- Help text for complex inputs

## Testing

### Automated Testing

- Jest + React Testing Library
- `toHaveAccessibleName()` matcher
- `toHaveAccessibleDescription()` matcher
- `toHaveAttribute()` for ARIA

### Manual Testing Checklist

- [ ] Tab through entire interface
- [ ] All interactive elements receive focus
- [ ] Focus indicators visible
- [ ] Use with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test with keyboard only
- [ ] Test at 200% zoom
- [ ] Test with high contrast mode
- [ ] Test colorblind simulators

## Tools Used

### Development

- **axe DevTools**: Browser extension for a11y testing
- **React DevTools**: Component inspection
- **WAVE**: Web Accessibility Evaluation Tool

### CI/CD

- **Jest**: Automated a11y tests
- **GitHub Actions**: Linting and testing pipeline

## Browser Support

- Chrome/Edge: Latest + 2 versions
- Firefox: Latest + 2 versions
- Safari: Latest + 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Mobile

## Known Limitations

### Current

- No modal components (yet)
- No drag-and-drop functionality
- No advanced focus trapping

### Future Improvements

- Add modal dialogs with proper focus trapping
- Implement drag-and-drop for notes/tasks
- Add live regions for dynamic content updates
- Implement ARIA live regions for notifications

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [React A11y Checklist](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Contact

For accessibility issues or feedback, please create an issue or contact the development team.
