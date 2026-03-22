import type { Metadata, Viewport } from 'next'
import { Orbitron, Share_Tech_Mono, Rajdhani } from 'next/font/google'
import '@/styles/globals.css'
import { AudioProvider } from '@/lib/AudioContext'
import ClientShell from '@/components/layout/ClientShell'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-orbitron'
})

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-share-tech'
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-rajdhani'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'IEEE IAS PES ITSIC SBJC — Power Core',
  description: 'Student Branch Joint Chapter — Power Systems Division. Web portal for Borj Cedria Node.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${shareTechMono.variable} ${rajdhani.variable}`}>
      <body>
        <AudioProvider>
          <ClientShell>
            {children}
          </ClientShell>
        </AudioProvider>
      </body>
    </html>
  )
}