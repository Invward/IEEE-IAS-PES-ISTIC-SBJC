'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function LoadingBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    bar.style.transition = 'none'
    bar.style.opacity = '1'
    bar.style.width = '0%'
    requestAnimationFrame(() => {
      bar.style.transition = 'width 0.6s ease'
      bar.style.width = '100%'
      setTimeout(() => {
        bar.style.transition = 'opacity 0.3s'
        bar.style.opacity = '0'
        setTimeout(() => {
          bar.style.transition = 'none'
          bar.style.width = '0%'
          bar.style.opacity = '1'
        }, 400)
      }, 700)
    })
  }, [pathname])

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 2, zIndex: 200,
      background: 'rgba(120,190,32,0.1)',
    }}>
      <div ref={barRef} style={{
        height: '100%',
        background: 'linear-gradient(90deg, #00843D, #78BE20, #00843D)',
        width: '0%',
        boxShadow: '0 0 10px #78BE20',
      }} />
    </div>
  )
}
