'use client'

import { ThemeProvider, type ThemeProviderProps } from 'next-themes'
import { Toaster } from 'sonner'

export function Providers({
  children,
  ...props
}: { children: React.ReactNode } & ThemeProviderProps) {
  return (
    <ThemeProvider
      defaultTheme="light"
      enableColorScheme={true}
      forcedTheme="dark"
      {...props}
      attribute="class"
      disableTransitionOnChange={true}
      enableSystem={false}
      themes={['dark', 'light']}
    >
      {children}
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
