import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Geist } from 'next/font/google'
import { Providers } from './providers'
import { cn } from '@/lib/utils'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'IconsCN - Material UI Edition',
  description:
    'Drop Material Icons straight into your project with shadcn. No bulky MUI dependencies or icon fonts needed.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          jetBrainsMono.variable,
          'antialiased'
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
