'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAudioContext } from '@/lib/AudioContext'
import { NAV_LINKS } from '@/lib/data'
import Image from 'next/image'

export default function HudNav() {
  const pathname = usePathname()
  const { muted, toggleMute, playClick, playHover } = useAudioContext()
  const [pwrVal, setPwrVal] = useState(100)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      setPwrVal(98 + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <nav id="hud-nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 40px', height: 70,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'linear-gradient(180deg, rgba(2,8,2,0.95), rgba(2,8,2,0.7))',
      borderBottom: '1px solid rgba(120,190,32,0.25)',
      backdropFilter: 'blur(10px)',
      animation: 'navReveal 0.8s ease forwards',
    }}>

      {/* ── Logo ── */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} onClick={playClick}>
        <Image src="/logo.png" alt="IEEE IAS PES ITSIC SBJC" width={150} height={150} style={{ objectFit: 'contain' }} />
      </Link>

      {/* ── Desktop tabs ── */}
      <ul style={{ display: 'flex', gap: 4, listStyle: 'none', margin: 0 }} className="nav-tabs-desktop">
        {NAV_LINKS.map(link => {
          const active = pathname === link.href
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={playClick}
                onMouseEnter={playHover}
                style={{
                  display: 'block',
                  padding: '8px 20px',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 9, letterSpacing: 2, textTransform: 'uppercase',
                  color: active ? '#fff' : 'rgba(120,190,32,0.6)',
                  border: `1px solid ${active ? 'rgba(120,190,32,0.4)' : 'transparent'}`,
                  background: active ? 'rgba(120,190,32,0.08)' : 'transparent',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 0 20px rgba(120,190,32,0.15), inset 0 0 10px rgba(120,190,32,0.05)' : 'none',
                  position: 'relative',
                }}
              >
                <span style={{
                  position: 'absolute', top: 3, left: 6,
                  fontSize: 7, color: 'rgba(120,190,32,0.3)',
                  fontFamily: "'Share Tech Mono', monospace",
                }}>{link.num}</span>
                {link.label}
                {active && (
                  <span style={{
                    position: 'absolute', bottom: -1, left: '20%', right: '20%',
                    height: 2, background: '#78BE20',
                    boxShadow: '0 0 10px #78BE20',
                  }} />
                )}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* ── Right controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 9, color: 'rgba(120,190,32,0.5)', letterSpacing: 1 }}>
          PWR <span style={{ color: '#78BE20' }}>{pwrVal}%</span>
        </div>

        <button
          onClick={toggleMute}
          title="Toggle sound"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 15, display: 'flex', alignItems: 'center', opacity: 0.8,
          }}
        >{muted ? '🔇' : '🔊'}</button>

        <button
          onClick={() => setMobileOpen(o => !o)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid rgba(120,190,32,0.3)',
            color: '#78BE20',
            padding: '6px 12px',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 9, letterSpacing: 2,
            cursor: 'pointer',
          }}
        >MENU</button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 70, left: 0, right: 0,
          background: 'rgba(2,8,2,0.97)',
          padding: 16,
          borderBottom: '1px solid rgba(120,190,32,0.2)',
          zIndex: 99, display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => { setMobileOpen(false); playClick() }}
              style={{
                padding: '10px 16px',
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 10, letterSpacing: 2,
                color: pathname === link.href ? '#78BE20' : 'rgba(120,190,32,0.6)',
                textDecoration: 'none',
                borderLeft: pathname === link.href ? '2px solid #78BE20' : '2px solid transparent',
              }}
            >
              {link.num} · {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-tabs-desktop { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 600px) { #hud-nav { padding: 0 20px !important; } }
      `}</style>
    </nav>
  )
}