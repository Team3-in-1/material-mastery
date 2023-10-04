import '@mantine/core/styles.css';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MantineProvider } from '@mantine/core'
import { theme } from '@/theme'
import Header from '@/components/Header/header'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Material Mastery',
  description: 'This is our project for 3 subject',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="shortcut icon" href="/display-icon.svg" />
      </head>
      <body className={inter.className} style={{backgroundColor: 'var(--mantine-color-gray-1)'}}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Header></Header>
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
