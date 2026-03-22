'use client'

import { useState } from 'react'
import PowerCore from '@/components/sections/PowerCore'
import HudNav from '@/components/layout/HudNav'
import Footer from '@/components/layout/Footer'
import ParticlesCanvas from '@/components/ui/ParticlesCanvas'
import LoadingBar from '@/components/ui/LoadingBar'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [powered, setPowered] = useState(false)
  const [visible, setVisible] = useState(false)

  const handlePoweredUp = () => {
    setVisible(true)
    setTimeout(() => setPowered(true), 400)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ParticlesCanvas />

      {!powered && (
        <div style={{
          opacity: visible ? 0 : 1,
          visibility: visible ? 'hidden' : 'visible',
          transition: 'opacity 1.2s ease, visibility 1.2s',
          pointerEvents: visible ? 'none' : 'auto',
        }}>
          <PowerCore onPoweredUp={handlePoweredUp} />
        </div>
      )}

      <div style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#030803',
      }}>
        <LoadingBar />
        <div className="corner-tl" />
        <div className="corner-br" />
        <HudNav />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}