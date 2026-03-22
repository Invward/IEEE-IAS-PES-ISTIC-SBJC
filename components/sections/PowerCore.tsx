'use client'

import { useState, useEffect, useRef } from 'react'
import { useAudioContext } from '@/lib/AudioContext'

interface PowerCoreProps {
  onPoweredUp: () => void
}

const BOOT_SEQUENCE = [
  '> INITIALIZING POWER MANAGEMENT UNIT...',
  '> CHECKING REACTOR INTEGRITY... OK',
  '> CALIBRATING ENERGY CONDUITS... OK',
  '> LOADING IEEE SBJC PROTOCOLS...',
  '> VERIFYING CHAPTER CREDENTIALS... OK',
  '> SYNCHRONIZING GRID NODES... OK',
  '> ALL SYSTEMS NOMINAL — READY FOR IGNITION',
]

export default function PowerCore({ onPoweredUp }: PowerCoreProps) {
  const [stage, setStage] = useState<'idle' | 'activating' | 'powered'>('idle')
  const [scroll, setScroll] = useState(0)
  const [scanLine, setScanLine] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)
  const [bootLines, setBootLines] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [bodyFilter, setBodyFilter] = useState('brightness(1)')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { initAudio, playPowerUp, startAmbient } = useAudioContext()

  const isPowered = stage === 'powered'
  const isActivating = stage === 'activating'
  const isActive = isActivating || isPowered

  // ── Mobile tracking ──
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ── Window scroll tracker ──
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Scan line ──
  useEffect(() => {
    const iv = setInterval(() => setScanLine(v => (v + 1) % 100), 16)
    return () => clearInterval(iv)
  }, [])

  // ── Glitch ──
  useEffect(() => {
    const trigger = () => {
      if (Math.random() > 0.7) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 80 + Math.random() * 120)
      }
      setTimeout(trigger, 2000 + Math.random() * 4000)
    }
    const t = setTimeout(trigger, 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (stage !== 'activating') return
    setBootLines([])
    BOOT_SEQUENCE.forEach((line, i) => {
      setTimeout(() => setBootLines(prev => [...prev, line]), i * 280)
    })
  }, [stage])

  // ── Lightning canvas ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || stage !== 'powered') return
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    let animId: number

    function lightning(x1: number, y1: number, x2: number, y2: number, depth: number) {
      if (depth === 0) return
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * 40
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * 40
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(mx, my); ctx.lineTo(x2, y2)
      ctx.strokeStyle = `rgba(120,190,32,${0.05 + Math.random() * 0.15})`
      ctx.lineWidth = depth * 0.5; ctx.stroke()
      if (Math.random() > 0.5) lightning(mx, my, mx + (Math.random() - 0.5) * 80, my + (Math.random() - 0.5) * 80, depth - 1)
    }

    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      if (Math.random() > 0.4) {
        const angle = Math.random() * Math.PI * 2
        const ex = cx + Math.cos(angle) * (canvas!.width * 0.45)
        const ey = cy + Math.sin(angle) * (canvas!.height * 0.45)
        lightning(cx + Math.cos(angle) * 80, cy + Math.sin(angle) * 80, ex, ey, 3)
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [stage])

  const handlePowerUp = () => {
    if (stage !== 'idle') return

    setStage('activating')
    window.scrollTo({ top: 0, behavior: 'instant' })
    initAudio()
    playPowerUp()
    setBodyFilter('brightness(3) saturate(2)')
    setTimeout(() => { setBodyFilter('brightness(0.5)') }, 300)
    setTimeout(() => { setBodyFilter('brightness(1)') }, 500)
    setTimeout(() => setStage('powered'), 1800)
    setTimeout(() => { startAmbient(); onPoweredUp() }, 3200)
  }

  // ── Raw scroll-driven values ──
  const s = scroll

  const titleOpacity = Math.max(0, 1 - s * 4)
  const titleY = -s * 140

  const fogOpacity = Math.min(0.92, s * 1.8)
  const fogHeight = Math.min(100, s * 200)

  const bgGreen = Math.floor(s * 14)
  const gridBrightness = 0.02 + s * 0.07

  const coreOpacity = Math.max(0, s * 3 - 0.3)
  // Scale down heavily initially on mobile so it fits
  const mobileScaleBase = isMobile ? 0.35 : 0.55
  const mobileScaleTop = isMobile ? 0.75 : 1
  const coreScale = mobileScaleBase + s * (mobileScaleTop - mobileScaleBase)

  const ring1Opacity = Math.max(0, s * 4 - 0.9)
  const ring2Opacity = Math.max(0, s * 4 - 1.3)
  const ring3Opacity = Math.max(0, s * 4 - 1.7)
  const arcOpacity = Math.max(0, s * 3 - 1)

  const hudOpacity = Math.max(0, s * 5 - 1.5)
  const hudLeftX = Math.max(0, (1 - s * 3) * -80)
  const hudRightX = Math.max(0, (1 - s * 3) * 80)

  const floorOpacity = Math.min(0.85, s * 1.4)
  const floorPerspective = 180 + (1 - s) * 500

  const deepOpacity = Math.max(0, s * 7 - 5)
  const showButton = s > 0.72

  const depthMeters = Math.floor(s * 847)

  // ── Override everything once activated ──
  const effCoreOpacity = isActive ? 1 : coreOpacity
  const effCoreScale = isActive ? mobileScaleTop : coreScale
  const effRing1 = isActive ? 1 : ring1Opacity
  const effRing2 = isActive ? 1 : ring2Opacity
  const effRing3 = isActive ? 1 : ring3Opacity
  const effArc = isActive ? 1 : arcOpacity
  const effHud = isActive ? 1 : hudOpacity
  const effDeep = isActive ? 1 : deepOpacity
  const effFog = isActive ? 0 : fogOpacity
  const effFogH = isActive ? 0 : fogHeight
  const effGrid = isActive ? 0.07 : gridBrightness
  const effBgGreen = isActive ? 14 : bgGreen
  const effFloor = isActive ? 0.85 : floorOpacity
  const effFloorP = isActive ? 180 : floorPerspective
  const effTitleOp = isActive ? 0 : titleOpacity

  return (
    <>
      {/* Spacer — creates scroll height. Collapses when activated so user can't scroll during animation */}
      <div style={{
        height: isActive ? '100vh' : '400vh',
        position: 'relative', zIndex: 0,
        transition: 'height 0.6s ease',
      }} />

      {/* Fixed visual layer */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        pointerEvents: 'none',
        overflow: 'hidden',
        filter: bodyFilter,
        transition: 'filter 0.2s',
      }}>

        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at center, #06${effBgGreen.toString(16).padStart(2, '0')}06 0%, #010301 70%, #000 100%)`,
          transition: 'background 0.5s',
        }} />

        {/* Lightning canvas */}
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          opacity: isPowered ? 1 : 0, transition: 'opacity 0.5s',
        }} />

        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(120,190,32,${effGrid}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,190,32,${effGrid}) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridShift 20s linear infinite',
          transition: 'background-image 0.5s',
        }} />

        {/* Perspective floor grid */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          backgroundImage: `
            linear-gradient(rgba(120,190,32,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,190,32,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 40px',
          transform: `perspective(${effFloorP}px) rotateX(70deg)`,
          transformOrigin: 'bottom center',
          opacity: effFloor,
          transition: 'opacity 0.5s, transform 0.5s',
        }} />

        {/* Underground fog */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: `${effFogH}%`,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
          opacity: effFog,
          transition: 'opacity 0.5s, height 0.5s',
        }} />

        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0,
          top: `${scanLine}%`, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(120,190,32,0.18), transparent)',
        }} />

        {/* Glitch */}
        {glitchActive && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(120,190,32,0.025)',
            clipPath: `polygon(0 ${20 + Math.random() * 30}%, 100% ${20 + Math.random() * 30}%, 100% ${50 + Math.random() * 20}%, 0 ${50 + Math.random() * 20}%)`,
            transform: `translateX(${(Math.random() - 0.5) * 8}px)`,
          }} />
        )}

        {/* Corner brackets */}
        {[
          { top: 20, left: 20, borderTop: true, borderLeft: true },
          { top: 20, right: 20, borderTop: true, borderRight: true },
          { bottom: 20, left: 20, borderBottom: true, borderLeft: true },
          { bottom: 20, right: 20, borderBottom: true, borderRight: true },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', width: 30, height: 30, ...c,
            borderTop: c.borderTop ? '1px solid rgba(120,190,32,0.5)' : 'none',
            borderBottom: c.borderBottom ? '1px solid rgba(120,190,32,0.5)' : 'none',
            borderLeft: c.borderLeft ? '1px solid rgba(120,190,32,0.5)' : 'none',
            borderRight: c.borderRight ? '1px solid rgba(120,190,32,0.5)' : 'none',
            opacity: effHud,
            transition: 'opacity 0.4s',
          }} />
        ))}

        {/* Depth counter */}
        <div style={{
          position: 'absolute', top: 24, left: isMobile ? 32 : 60,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: isMobile ? 7 : 9, letterSpacing: isMobile ? 2 : 3,
          color: 'rgba(120,190,32,0.6)',
          opacity: effHud,
          transform: `translateX(${hudLeftX}px)`,
          transition: 'opacity 0.4s, transform 0.4s',
        }}>
          <div style={{ color: 'rgba(120,190,32,0.4)', marginBottom: 3 }}>DEPTH</div>
          <div style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: isMobile ? 16 : 20, fontWeight: 900,
            color: '#78BE20', letterSpacing: 2,
          }}>-{isActive ? 847 : depthMeters}m</div>
          <div style={{ color: 'rgba(120,190,32,0.3)', marginTop: 2, fontSize: 8 }}>UNDERGROUND</div>
        </div>

        {/* HUD top center */}
        <div style={{
          position: 'absolute', top: 28,
          left: '50%', transform: 'translateX(-50%)',
          fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 7 : 9, letterSpacing: 2,
          color: isPowered ? '#78BE20' : 'rgba(120,190,32,0.4)',
          opacity: effHud,
          transition: 'opacity 0.4s, color 0.5s',
          display: isMobile ? 'none' : 'block'
        }}>
          {isPowered ? '● ONLINE' : isActivating ? '◌ BOOT...' : '○ STANDBY'}
        </div>

        {/* HUD top right */}
        <div style={{
          position: 'absolute', top: 28, right: isMobile ? 32 : 60,
          fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 7 : 9, letterSpacing: 2,
          color: 'rgba(120,190,32,0.4)',
          opacity: effHud,
          transform: `translateX(${hudRightX}px)`,
          transition: 'opacity 0.4s, transform 0.4s',
        }}>IEEE·IAS·PES·ISTIC</div>

        {/* ── TITLE ── */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: `translate(-50%, calc(-50% + ${titleY}px))`,
          opacity: effTitleOp,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          transition: isActive ? 'opacity 0.3s' : 'none',
        }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: 6,
            color: 'rgba(120,190,32,0.5)', marginBottom: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          }}>
            <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,rgba(120,190,32,0.5))' }} />
            SCROLL TO DESCEND
            <span style={{ width: 40, height: 1, background: 'linear-gradient(270deg,transparent,rgba(120,190,32,0.5))' }} />
          </div>
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(24px,4vw,52px)',
            fontWeight: 900, letterSpacing: 8, margin: 0,
            background: 'linear-gradient(135deg, #fff 0%, #78BE20 50%, #00843D 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: glitchActive ? 'blur(1px)' : 'none',
          }}>
            IEEE IAS · PES
          </h1>
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(24px,4vw,52px)',
            fontWeight: 900, letterSpacing: 8, margin: '4px 0 0',
            background: 'linear-gradient(135deg, #78BE20, #00843D)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: glitchActive ? 'blur(1px)' : 'none',
          }}>
            ISTIC SBJC
          </h1>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10, letterSpacing: 4,
            color: 'rgba(120,190,32,0.4)', marginTop: 10,
          }}>
            UNDERGROUND POWER CORE — BORJ CEDRIA NODE
          </div>
          {/* Scroll chevrons */}
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <div style={{ fontSize: 8, letterSpacing: 4, color: 'rgba(120,190,32,0.4)', animation: 'blink 2s infinite' }}>
              SCROLL TO DESCEND
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 4 }}>
              {[0.3, 0.5, 0.8].map((op, i) => (
                <div key={i} style={{
                  width: 8, height: 8,
                  borderRight: `1px solid rgba(120,190,32,${op})`,
                  borderBottom: `1px solid rgba(120,190,32,${op})`,
                  transform: 'rotate(45deg)',
                  animation: `blink ${1.2 + i * 0.3}s ease-in-out infinite`,
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── CORE ASSEMBLY ── */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%) scale(${effCoreScale})`,
          opacity: effCoreOpacity,
          width: 320, height: 320,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: isActive ? 'transform 0.8s cubic-bezier(0.2,0,0.2,1), opacity 0.6s' : 'none',
        }}>
          {/* Outer glow */}
          <div style={{
            position: 'absolute', inset: -40, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,132,61,0.15) 0%, transparent 70%)',
            animation: 'corePulse 2s ease-in-out infinite',
            opacity: isPowered ? 1 : Math.max(s, effCoreOpacity * 0.5),
          }} />

          {/* Energy arcs */}
          {[360, 420, 480].map((size, i) => (
            <div key={i} style={{
              position: 'absolute', width: size, height: size, borderRadius: '50%',
              border: `1px solid ${isPowered
                ? `rgba(${[120, 80, 40][i]},${[190, 150, 120][i]},32,0.5)`
                : 'rgba(120,190,32,0.12)'}`,
              animation: `arcPulse 3s ease-in-out ${i}s infinite`,
              opacity: effArc,
              boxShadow: isPowered ? `0 0 ${20 + i * 10}px rgba(0,132,61,0.2)` : 'none',
              transition: 'opacity 0.5s',
            }} />
          ))}

          {/* Orbit rings */}
          {[
            { size: 290, dur: '8s', dir: 'normal' as const, bc: 'rgba(120,190,32,0.2)', dc: '#78BE20', dotSize: 10, op: effRing1 },
            { size: 230, dur: '5s', dir: 'reverse' as const, bc: 'rgba(0,132,61,0.25)', dc: '#00843D', dotSize: 8, op: effRing2 },
            { size: 170, dur: '3.5s', dir: 'normal' as const, bc: 'rgba(0,132,61,0.2)', dc: '#00843D', dotSize: 6, op: effRing3 },
          ].map((ring, i) => (
            <div key={i} style={{
              position: 'absolute', width: ring.size, height: ring.size,
              borderRadius: '50%', border: `1px solid ${ring.bc}`,
              animation: `orbit ${ring.dur} linear infinite`,
              animationDirection: ring.dir,
              opacity: ring.op,
              boxShadow: isPowered ? `0 0 8px ${ring.dc}33` : 'none',
              transition: 'opacity 0.4s',
            }}>
              <div style={{
                position: 'absolute', width: ring.dotSize, height: ring.dotSize,
                background: ring.dc, borderRadius: '50%',
                boxShadow: `0 0 ${isPowered ? 16 : 8}px ${ring.dc}, 0 0 ${isPowered ? 32 : 16}px ${ring.dc}`,
                top: -ring.dotSize / 2, left: '50%', transform: 'translateX(-50%)',
              }} />
            </div>
          ))}

          {/* Core sphere */}
          <div
            onClick={showButton && stage === 'idle' ? handlePowerUp : undefined}
            style={{
              width: 120, height: 120, borderRadius: '50%',
              background: isPowered
                ? 'radial-gradient(circle at 30% 30%, #00c050, #00843D, #001a08)'
                : isActivating
                  ? 'radial-gradient(circle at 30% 30%, #0a2a0a, #020802)'
                  : 'radial-gradient(circle at 30% 30%, #0d1a0d, #020802)',
              border: `2px solid ${isPowered ? '#00843D' : isActivating ? 'rgba(120,190,32,0.4)' : 'rgba(120,190,32,0.15)'}`,
              boxShadow: isPowered
                ? '0 0 80px rgba(0,132,61,0.9), 0 0 160px rgba(0,100,40,0.5), inset 0 0 50px rgba(120,190,32,0.4)'
                : isActivating
                  ? '0 0 30px rgba(120,190,32,0.3), inset 0 0 20px rgba(0,0,0,0.8)'
                  : '0 0 20px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.9)',
              animation: isPowered ? 'corePulse 1.5s ease-in-out infinite' : 'none',
              position: 'relative',
              transition: 'all 1.5s ease',
              cursor: showButton && stage === 'idle' ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: showButton ? 'auto' : 'none',
            }}
          >
            <div style={{
              position: 'absolute', inset: 12, borderRadius: '50%',
              background: isPowered
                ? 'radial-gradient(circle, rgba(200,255,120,0.9) 0%, rgba(0,200,80,0.6) 40%, transparent 100%)'
                : 'transparent',
              animation: isPowered ? 'innerGlow 1s ease-in-out infinite alternate' : 'none',
              transition: 'background 1.5s',
            }} />
            <div style={{
              width: isPowered ? 20 : 8, height: isPowered ? 20 : 8, borderRadius: '50%',
              background: isPowered ? '#fff' : 'rgba(120,190,32,0.3)',
              boxShadow: isPowered ? '0 0 20px #fff, 0 0 40px #78BE20' : 'none',
              transition: 'all 1.5s', zIndex: 1,
            }} />
          </div>

          {/* Core label */}
          <div style={{
            position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
            fontFamily: "'Orbitron', sans-serif", fontSize: 9, letterSpacing: 5,
            color: isPowered ? '#78BE20' : 'rgba(120,190,32,0.4)',
            animation: 'blink 2s step-end infinite', whiteSpace: 'nowrap',
            transition: 'color 1s',
          }}>
            {isPowered ? '● CORE ACTIVE' : isActivating ? '◌ BOOTING...' : '○ CORE OFFLINE'}
          </div>
        </div>

        {/* ── BOOT LOG + BUTTON ── */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: `translate(-50%, calc(-50% + ${isMobile ? 160 : 210}px))`,
          opacity: effDeep,
          width: 'min(520px, 90vw)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          pointerEvents: showButton || isActive ? 'auto' : 'none',
          transition: 'opacity 0.4s',
        }}>
          {/* Boot log */}
          <div style={{
            height: isMobile ? 90 : 130, width: '100%', overflow: 'hidden',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: isMobile ? 8 : 10, lineHeight: 1.7,
            borderLeft: '2px solid rgba(120,190,32,0.2)',
            paddingLeft: 14,
            visibility: isActive ? 'visible' : 'hidden',
          }}>
            {bootLines.map((line, i) => (
              <div key={i} style={{
                opacity: 0,
                animation: `fadeInLine 0.3s ease ${i * 0.05}s forwards`,
                color: i === bootLines.length - 1 ? '#78BE20' : 'rgba(120,190,32,0.6)',
              }}>
                {line}
              </div>
            ))}
            {isActivating && bootLines.length < BOOT_SEQUENCE.length && (
              <span style={{ animation: 'blink 0.8s step-end infinite', color: '#78BE20' }}>█</span>
            )}
          </div>

          {/* Power button */}
          <button
            onClick={handlePowerUp}
            disabled={stage !== 'idle'}
            style={{
              padding: isMobile ? '10px 40px' : '14px 56px',
              background: 'transparent',
              border: '2px solid rgba(120,190,32,0.4)',
              color: '#78BE20',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: isMobile ? 10 : 12, letterSpacing: 5,
              cursor: stage === 'idle' ? 'pointer' : 'not-allowed',
              position: 'relative', overflow: 'hidden',
              clipPath: 'polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)',
              opacity: stage === 'idle' ? 1 : 0.5,
              transition: 'all 0.3s',
              pointerEvents: stage === 'idle' ? 'auto' : 'none',
            }}
            onMouseEnter={e => {
              if (stage !== 'idle') return
              const el = e.currentTarget
              el.style.borderColor = '#78BE20'
              el.style.color = '#fff'
              el.style.boxShadow = '0 0 40px rgba(120,190,32,0.4), inset 0 0 20px rgba(120,190,32,0.1)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(120,190,32,0.4)'
              el.style.color = '#78BE20'
              el.style.boxShadow = 'none'
            }}
          >
            <span style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(120,190,32,0.12), transparent)',
              transform: 'translateX(-100%)',
              animation: 'sweep 2.5s linear infinite',
              pointerEvents: 'none',
            }} />
            <span style={{ position: 'absolute', top: 2, left: 4, width: 6, height: 6, borderTop: '1px solid #78BE20', borderLeft: '1px solid #78BE20' }} />
            <span style={{ position: 'absolute', top: 2, right: 4, width: 6, height: 6, borderTop: '1px solid #78BE20', borderRight: '1px solid #78BE20' }} />
            <span style={{ position: 'absolute', bottom: 2, left: 4, width: 6, height: 6, borderBottom: '1px solid #78BE20', borderLeft: '1px solid #78BE20' }} />
            <span style={{ position: 'absolute', bottom: 2, right: 4, width: 6, height: 6, borderBottom: '1px solid #78BE20', borderRight: '1px solid #78BE20' }} />
            {stage === 'idle' ? '⚡ POWER UP CORE' : stage === 'activating' ? '⚡ INITIALIZING...' : '▶ ONLINE'}
          </button>
        </div>

        {/* Status bar */}
        <div style={{
          position: 'absolute', bottom: 24, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: isMobile ? 12 : 32,
          fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 7 : 9, letterSpacing: isMobile ? 1 : 2,
          color: 'rgba(120,190,32,0.3)',
          opacity: effHud, transition: 'opacity 0.4s',
          flexWrap: 'wrap',
          padding: '0 10px'
        }}>
          {[
            { label: 'REACTOR', val: isPowered ? 'ONLINE' : isActivating ? 'BOOTING' : 'STANDBY' },
            { label: 'GRID', val: 'CONNECTED' },
            { label: 'AUTH', val: isPowered ? 'GRANTED' : 'PENDING' },
            { label: 'DEPTH', val: `-${isActive ? 847 : depthMeters}m` },
          ].map((item, i) => (
            <span key={i}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: isPowered ? '#78BE20' : 'rgba(120,190,32,0.4)',
                display: 'inline-block', marginRight: 5,
                boxShadow: isPowered ? '0 0 6px #78BE20' : 'none',
                animation: `blink ${1.5 + i * 0.3}s infinite`,
                transition: 'all 1s',
              }} />
              {item.label}: {item.val}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInLine {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  )
}