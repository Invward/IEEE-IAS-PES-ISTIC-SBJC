'use client'

import { useEffect, useRef } from 'react'

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0
    let animId: number

    class Particle {
      x = 0; y = 0; size = 0; speed = 0
      alpha = 0; color = ''; life = 0; maxLife = 0

      constructor() { this.reset() }

      reset() {
        this.x = Math.random() * W
        this.y = H + 10
        this.size = Math.random() * 1.5 + 0.3
        this.speed = Math.random() * 0.6 + 0.2
        this.alpha = 0
        this.color = Math.random() > 0.5 ? '120,190,32'
          : Math.random() > 0.5 ? '0,132,61' : '78,160,20'
        this.life = 0
        this.maxLife = H / this.speed
      }

      update() {
        this.y -= this.speed
        this.life++
        const t = this.life / this.maxLife
        this.alpha = t < 0.1 ? t * 6 : t > 0.8 ? (1 - t) * 5 : 0.6
        if (this.life > this.maxLife) this.reset()
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha * 0.5
        ctx.fillStyle = `rgba(${this.color},1)`
        ctx.shadowBlur = 6
        ctx.shadowColor = `rgba(${this.color},1)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    let particles: Particle[] = []

    function resize() {
      W = canvas!.width = window.innerWidth
      H = canvas!.height = window.innerHeight
    }

    function init() {
      resize()
      particles = Array.from({ length: 60 }, () => {
        const p = new Particle()
        p.life = Math.random() * p.maxLife
        p.y = Math.random() * H
        return p
      })
    }

    function loop() {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)
    init()
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}
