import { Platform } from 'react-native';

export const radius = {
  sm: 7,
  md: 10,
  lg: 12,
  xl: 17,
  '2xl': 22,
  '3xl': 26,
};

export const fonts = {
  sans: Platform.select({
    web: 'Geist, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    ios: 'System',
    default: 'sans-serif',
  }),
  serif: Platform.select({
    web: '"Playfair Display", Georgia, Cambria, "Times New Roman", Times, serif',
    ios: 'Georgia',
    default: 'serif',
  }),
};

export const getTheme = (isDark = true) => ({
  // Core Surfaces
  bg: isDark ? '#121217' : '#F8FAFC',           // --background: oklch(0.17 0.012 250)
  cardBg: isDark ? '#04090e' : '#FFFFFF',       // --card: oklch(0.21 0.013 250)
  cardHeaderBg: isDark ? '#34393e' : '#F1F5F9', // --secondary: oklch(0.26 0.014 250)
  border: isDark ? '#121217' : '#E2E8F0',       // --border: oklch(0.3 0.014 250)


  // Gradients
  backgroundGradient: isDark ? ['#0C1519', '#191B20', '#121217'] : ['#E5E7EB', '#F1F3F5', '#F8FAFC'],


  // Text Contrast
  textPrimary: isDark ? '#ECEEF5' : '#0F172A',  // --foreground: oklch(0.94 0.006 250)
  textMuted: isDark ? '#9EA4B0' : '#64748B',    // --muted-foreground: oklch(0.68 0.01 250)

  // Gold Accents
  gold: '#CF9D78',                              // --gold / --primary: oklch(0.79 0.12 84)
  goldMuted: isDark ? '#A3782C' : '#B48828',    // --gold-muted: oklch(0.62 0.08 84)
  goldForeground: '#2E1E0A',                   // --primary-foreground: oklch(0.2 0.02 84)
  goldBadgeBg: isDark ? 'rgba(224, 169, 59, 0.05)' : 'rgba(224, 169, 59, 0.15)',
  goldBadgeBorder: isDark ? 'rgba(224, 169, 59, 0.35)' : 'rgba(224, 169, 59, 0.4)',

  // Buttons & Interactive States
  btnSecondaryBg: isDark ? '#252B3C' : '#E2E8F0', // --secondary: oklch(0.26 0.014 250)
  btnSecondaryText: isDark ? '#ECEEF5' : '#1E293B',// --secondary-foreground
  destructive: '#E24953',                          // --destructive: oklch(0.62 0.2 22)
  green: '#10B981',

  // Navigation & Blur Overlays
  navBg: isDark ? 'rgba(19, 23, 34)' : 'rgba(255, 255, 255)',
  statusBarStyle: isDark ? 'light-content' : 'dark-content',

  radius,
  fonts,
});