'use client'

import React, { createContext, useContext } from 'react'
import { useAudio } from '@/hooks/useAudio'

type AudioContextType = ReturnType<typeof useAudio>

const AudioCtx = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audio = useAudio()
  return <AudioCtx.Provider value={audio}>{children}</AudioCtx.Provider>
}

export function useAudioContext() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudioContext must be used within AudioProvider')
  return ctx
}
