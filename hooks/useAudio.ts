'use client'

import { useRef, useState, useCallback } from 'react'

export function useAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null)
  const ambientNodesRef = useRef<AudioNode[]>([])
  const [muted, setMuted] = useState(false)
  const mutedRef = useRef(false)

  const getAudio = useCallback((): AudioContext => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioCtxRef.current
  }, [])

  const playTone = useCallback((
    freq: number,
    type: OscillatorType = 'sine',
    dur = 0.15,
    vol = 0.08,
    start = 0
  ) => {
    if (mutedRef.current) return
    try {
      const ctx = getAudio()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = type
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start)
      gain.gain.setValueAtTime(0, ctx.currentTime + start)
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur)
      osc.start(ctx.currentTime + start)
      osc.stop(ctx.currentTime + start + dur + 0.01)
    } catch (_) { }
  }, [getAudio])

  const playClick = useCallback(() => {
    playTone(880, 'square', 0.06, 0.06)
    playTone(1200, 'square', 0.04, 0.03, 0.04)
  }, [playTone])

  const playHover = useCallback(() => {
    playTone(660, 'sine', 0.08, 0.04)
  }, [playTone])

  const playPowerUp = useCallback(() => {
    if (mutedRef.current) return
    for (let i = 0; i < 8; i++) {
      playTone(60 + i * 40, 'sawtooth', 0.3 + i * 0.1, 0.03 + i * 0.005, i * 0.15)
    }
    setTimeout(() => {
      playTone(200, 'sawtooth', 0.8, 0.05)
      playTone(400, 'sawtooth', 0.6, 0.04, 0.1)
      playTone(800, 'sawtooth', 0.4, 0.04, 0.2)
      playTone(1600, 'sine', 0.3, 0.05, 0.35)
    }, 200)
    setTimeout(() => {
      ;[220, 330, 440, 550, 660, 880].forEach((f, i) => playTone(f, 'sine', 0.5, 0.04, i * 0.03))
        ;[110, 165, 220].forEach((f, i) => playTone(f, 'sawtooth', 0.8, 0.06, i * 0.05))
    }, 1400)
    setTimeout(() => {
      ;[440, 550, 660, 880, 1100].forEach((f, i) => playTone(f, 'square', 0.1, 0.06, i * 0.08))
    }, 2200)
  }, [playTone])

  const startAmbient = useCallback(() => {
    if (mutedRef.current || !audioCtxRef.current) return
    try {
      const ctx = audioCtxRef.current

      const osc1 = ctx.createOscillator()
      const g1 = ctx.createGain()
      osc1.connect(g1); g1.connect(ctx.destination)
      osc1.type = 'sine'; osc1.frequency.value = 50
      g1.gain.value = 0.015
      osc1.start()
      ambientNodesRef.current.push(osc1, g1)

      const osc2 = ctx.createOscillator()
      const g2 = ctx.createGain()
      osc2.connect(g2); g2.connect(ctx.destination)
      osc2.type = 'sine'; osc2.frequency.value = 100
      g2.gain.value = 0.008
      osc2.start()
      ambientNodesRef.current.push(osc2, g2)

      const osc3 = ctx.createOscillator()
      const g3 = ctx.createGain()
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.value = 0.3
      lfoGain.gain.value = 4
      lfo.connect(lfoGain); lfoGain.connect(osc3.frequency)
      osc3.connect(g3); g3.connect(ctx.destination)
      osc3.type = 'sine'; osc3.frequency.value = 440
      g3.gain.value = 0.004
      lfo.start(); osc3.start()
      ambientNodesRef.current.push(osc3, g3, lfo, lfoGain)

      const sparkTick = () => {
        if (!mutedRef.current && Math.random() > 0.6) {
          const f = 800 + Math.random() * 1200
          playTone(f, 'sawtooth', 0.05 + Math.random() * 0.1, 0.01 + Math.random() * 0.02)
        }
        setTimeout(sparkTick, 2000 + Math.random() * 5000)
      }
      sparkTick()
    } catch (_) { }
  }, [playTone])

  const stopAmbient = useCallback(() => {
    ambientNodesRef.current.forEach(n => {
      try { (n as OscillatorNode).stop?.(); n.disconnect?.() } catch (_) { }
    })
    ambientNodesRef.current = []
  }, [])

  const toggleMute = useCallback(() => {
    const next = !mutedRef.current
    mutedRef.current = next
    setMuted(next)
    if (next) {
      stopAmbient()
    } else if (audioCtxRef.current) {
      try { audioCtxRef.current.resume(); startAmbient() } catch (_) { }
    }
  }, [stopAmbient, startAmbient])

  const initAudio = useCallback(() => {
    getAudio()
  }, [getAudio])

  return {
    muted,
    initAudio,
    playClick,
    playHover,
    playPowerUp,
    startAmbient,
    stopAmbient,
    toggleMute,
  }
}
