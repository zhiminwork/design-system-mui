import { createTheme, Theme } from '@mui/material/styles'
import rawTokens from '../../tokens-source/theme.json'

type Scheme = typeof rawTokens.schemes.light

function buildPalette(scheme: Scheme) {
  return {
    primary: {
      main: scheme.primary,
      contrastText: scheme.onPrimary,
    },
    secondary: {
      main: scheme.secondary,
      contrastText: scheme.onSecondary,
    },
    error: {
      main: scheme.error,
      contrastText: scheme.onError,
    },
    background: {
      default: scheme.background,
      paper: scheme.surface,
    },
    text: {
      primary: scheme.onBackground,
      secondary: scheme.onSurfaceVariant,
    },
  }
}

export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    ...buildPalette(rawTokens.schemes.light),
  },
})

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    ...buildPalette(rawTokens.schemes.dark),
  },
})

// Default export is light theme
export const theme = lightTheme
