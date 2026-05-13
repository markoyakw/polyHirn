// Design System Tokens
// Single source of truth for all design tokens.
// Consumed by:
// - app/layout.tsx (injected as CSS custom properties into <head>)
// - scripts/generate-tokens.ts (generates tokens.generated.css at build time)
// - components directly (via TS imports for type-safe access)

export type TokenValue = string;

export interface ThemeTokens {
    // Allow use as Record<string, string> (e.g. in tokensToCssVars)
    [key: string]: TokenValue;

    // Colors that change between light/dark
    'color-brand-primary': TokenValue;
    'color-brand-secondary': TokenValue;
    'color-brand-accent': TokenValue;

    'color-bg-page': TokenValue;
    'color-bg-card-1': TokenValue;
    'color-bg-card-2': TokenValue;
    'color-bg-card-3': TokenValue;
    'color-bg-card-4': TokenValue;
    'color-bg-subtle': TokenValue;
    'color-bg-overlay': TokenValue;

    'color-text-primary': TokenValue;
    'color-text-secondary': TokenValue;
    'color-text-disabled': TokenValue;
    'color-text-link': TokenValue;

    'color-success': TokenValue;
    'color-success-bg': TokenValue;
    'color-warning': TokenValue;
    'color-warning-bg': TokenValue;
    'color-error': TokenValue;
    'color-error-bg': TokenValue;
    'color-info': TokenValue;
    'color-info-dark': TokenValue;
    'color-info-bg': TokenValue;

    'box-shadow-border-color': TokenValue;
    'box-shadow': TokenValue;
    'box-shadow-border': TokenValue;
    'box-shadow-down': TokenValue;

    'border-dark': TokenValue;
}

// Base tokens — never change between themes
// (typography, spacing, radius, z-index, duration, easing, etc.)

export const baseTokens = {
    // Font sizes
    'font-size-xs': '0.75rem',
    'font-size-s': '0.875rem',
    'font-size-m': '1rem',
    'font-size-l': '1.125rem',
    'font-size-xl': '1.5rem',
    'font-size-xxl': '2rem',
    'font-size-xxxl': '3rem',

    // Font weights
    'font-weight-regular': '400',
    'font-weight-medium': '500',
    'font-weight-bold': '700',

    // Line heights
    'line-height-tight': '1.25',
    'line-height-normal': '1.5',
    'line-height-loose': '1.75',

    // Spacing
    'spacing-xxs': '0.125rem',
    'spacing-xs': '0.25rem',
    'spacing-s': '0.5rem',
    'spacing-m': '1rem',
    'spacing-l': '2rem',
    'spacing-xl': '4rem',

    // Border radius
    'radius-s': '4px',
    'radius-m': '8px',
    'radius-l': '12px',
    'radius-xl': '16px',

    // Animation durations
    'duration-fast': '100ms',
    'duration-normal': '200ms',
    'duration-slow': '400ms',

    // Easing curves
    'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-spring': 'cubic-bezier(0.34, 1.76, 0.74, 1)',

    // Z-index scale
    'z-base': '0',
    'z-dropdown': '100',
    'z-sticky': '200',
    'z-overlay': '300',
    'z-modal': '400',
    'z-toast': '500',

    // Drag and drop
    'opacity-is-dragging': '50%',
    'box-shadow-is-dragging': '0 0 0 2px var(--color-brand-accent)',

    // Test/Quiz values
    'max-question-width': '500px',
} as const satisfies Record<string, TokenValue>;

// Dark theme tokens (default / only theme for now)
// Override these in `lightTokens` below when light mode is needed.

export const darkTokens: ThemeTokens = {
    // Brand colors
    // buttons, links, accents etc.
    'color-brand-primary': '#000000',
    // secondary brand color - gradients, hovers etc.
    'color-brand-secondary': '#D9D9D9',
    // contrast - notifications etc.
    'color-brand-accent': '#694ea8',

    // Background colors
    'color-bg-page': '#000000',
    'color-bg-card-1': '#1C1B1B',
    'color-bg-card-2': '#313030',
    'color-bg-card-3': '#474746',
    'color-bg-card-4': '#5F5E5E',
    // lighter for tables/inputs
    'color-bg-subtle': '#F3F4F6',
    // darkening behind modals
    'color-bg-overlay': 'rgba(0, 0, 0, 0.45)',

    // Text colors
    // main one - titles, body
    'color-text-primary': '#E7E5E5',
    // secondary text - placeholders, labels
    'color-text-secondary': '#ACABAB',
    'color-text-disabled': '#9CA3AF',
    'color-text-link': '#4F46E5',

    // Semantic colors
    'color-success': '#10B981',
    'color-success-bg': 'rgba(10, 119, 83, 0.858)',
    'color-warning': '#F59E0B',
    'color-warning-bg': '#FFFBEB',
    'color-error': '#EF4444',
    'color-error-bg': '#FEF2F2',
    'color-info': '#3B82F6',
    'color-info-dark': '#11336a',
    'color-info-bg': '#EFF6FF',

    // Shadows & borders
    'box-shadow-border-color': 'rgba(229, 229, 229, 0.232)',
    'box-shadow': [
        '0 0 0 1px var(--box-shadow-border-color)',
        '0px 1px 3px rgba(0, 0, 0, 0.7)',
        '0px 2px 4px rgba(0, 0, 0, 0.4)',
        '0px 4px 8px rgba(0, 0, 0, 0.2)',
    ].join(', '),
    'box-shadow-border': [
        '0 0 0 1px var(--box-shadow-border-color)',
        '0 0 0 1px rgba(0, 0, 0, 0.4)',
    ].join(', '),
    'box-shadow-down': [
        '0 1px 0 0 var(--box-shadow-border-color)',
        '0px 1px 0px rgba(0, 0, 0, 0.9)',
    ].join(', '),

    'border-dark': 'rgb(58, 58, 58)',
};

// Light theme tokens
// Only override tokens that actually differ from dark theme.

export const lightTokens: ThemeTokens = {
  ...darkTokens,

  'color-bg-page':    '#0F172A',  // was: #000000
  'color-bg-card-1':  '#1E293B',  // was: #1C1B1B
  'color-bg-subtle':  '#334155',  // was: #F3F4F6

  'color-text-primary':   '#F1F5F9',  // was: #E7E5E5
  'color-text-secondary': '#94A3B8',  // was: #ACABAB
  'color-text-disabled':  '#475569',  // was: #9CA3AF

  'border-dark': '#334155',  // was: rgb(58, 58, 58)

  'box-shadow-border-color': 'rgba(229, 229, 229, 0.1)',
  'box-shadow': [
    '0 0 0 1px var(--box-shadow-border-color)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 2px 4px rgba(0, 0, 0, 0.06)',
  ].join(', '),
  'box-shadow-border': '0 0 0 1px var(--box-shadow-border-color)',
  'box-shadow-down': '0 1px 0 0 var(--box-shadow-border-color)',
};