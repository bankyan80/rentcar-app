import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#2563EB',
    secondary: '#1E40AF',
    accent: '#F59E0B',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#64748B',
    success: '#10B981',
    error: '#EF4444',
    border: '#E2E8F0',
  },
  dark: {
    primary: '#3B82F6',
    secondary: '#2563EB',
    accent: '#FBBF24',
    background: '#0F172A',
    card: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    success: '#10B981',
    error: '#EF4444',
    border: '#334155',
  },
};

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 480;