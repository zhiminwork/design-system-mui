# Using this package in Track A / Track B

## 1. Authenticate with GitHub Packages

Create a `.npmrc` file in the root of the consuming repo:

```
@zhiminwork:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Generate a token at: GitHub → Settings → Developer settings → Personal access tokens
Required scope: `read:packages`

## 2. Install the package

```bash
npm install @zhiminwork/design-system-mui
```

## 3. Add peer dependencies

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

## 4. Import and use

```tsx
import { Button, ThemeProvider, createTheme } from '@zhiminwork/design-system-mui'

const theme = createTheme({ /* your overrides */ })

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained">Hello</Button>
    </ThemeProvider>
  )
}
```

## Updating to a newer version

```bash
npm install @zhiminwork/design-system-mui@latest
```
