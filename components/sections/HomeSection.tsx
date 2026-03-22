'use client'

import { useEffect, useState } from 'react'
import { STATS } from '@/lib/data'

export default function HomeSection() {
  const [counts, setCounts] = useState(STATS.map(() => 0))

  useEffect(() => {
    const timers = STATS.map((stat, idx) => {
      let cur = 0
      const step = Math.ceil(stat.num / 60)
      return setInterval(() => {
        cur = Math.min(cur + step, stat.num)
        setCounts(prev => {
          const next = [...prev]
          next[idx] = cur
          return next
        })
        if (cur >= stat.num) clearInterval(timers[idx])
      }, 25)
    })
    return () => timers.forEach(clearInterval)
  }, [])

  return (
    <div id="page-home" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      paddingTop: 70,
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, rgba(0,132,61,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(120,190,32,0.05) 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, rgba(0,132,61,0.05) 0%, transparent 40%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(120,190,32,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(120,190,32,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        perspective: 800,
        transform: 'rotateX(20deg)',
        transformOrigin: '50% 100%',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px 20px' }}>
        {/* Eyebrow */}
        <div style={{
          fontSize: 10, letterSpacing: 5, color: '#78BE20', marginBottom: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          <span style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #78BE20)' }} />
          SYSTEMS ONLINE — AUTHORIZED ACCESS
          <span style={{ width: 60, height: 1, background: 'linear-gradient(270deg, transparent, #78BE20)' }} />
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(32px,6vw,72px)', fontWeight: 900, lineHeight: 1, marginBottom: 10, letterSpacing: 4 }}>
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'glitch 4s infinite',
          }}>IEEE IAS · PES · ISTIC</span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #78BE20, #00843D)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            fontSize: '0.6em', letterSpacing: 8, marginTop: 8,
          }}> STUDENT BRANCH JOINT CHAPTER</span>
        </h1>

        <p style={{ fontSize: 12, letterSpacing: 2, color: 'rgba(200,220,200,0.5)', margin: '20px auto 40px', maxWidth: 500, lineHeight: 1.8 }}>
          Harnessing the power of innovation — where electrical engineering<br />
          meets the future of intelligent systems and energy technology.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
          {STATS.map((stat, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '20px 30px',
              border: '1px solid rgba(120,190,32,0.15)',
              background: 'rgba(120,190,32,0.03)',
              clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
              position: 'relative',
            }}>
              <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #78BE20, transparent)' }} />
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 900, color: '#78BE20', display: 'block' }}>
                {counts[i]}
              </span>
              <div style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(120,190,32,0.5)', marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
