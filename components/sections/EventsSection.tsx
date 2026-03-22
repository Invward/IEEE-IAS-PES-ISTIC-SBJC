'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useAudioContext } from '@/lib/AudioContext'
import { EVENTS } from '@/lib/data'
import { HudDialog } from '@/components/ui/HudDialog'

export default function EventsSection() {
  const { playClick } = useAudioContext()
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[0] | null>(null)

  const openEventPopup = (event: typeof EVENTS[0]) => {
    playClick()
    setSelectedEvent(event)
  }

  // Compute colors for the selected event dialog
  const accentColor = selectedEvent?.upcoming ? '#00843D' : '#78BE20'
  const accentColorDim = selectedEvent?.upcoming ? 'rgba(0,132,61,0.25)' : 'rgba(120,190,32,0.25)'
  const accentColorBg = selectedEvent?.upcoming ? 'rgba(0,132,61,0.08)' : 'rgba(120,190,32,0.08)'

  return (
    <div className="section-wrap page-enter">
      <div className="section-header">
        <div className="section-eyebrow">MISSION LOG</div>
        <h2 className="section-title">EVENTS</h2>
        <div className="section-line" />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          maxHeight: '70vh',
          overflowY: 'auto',
          paddingRight: 10,
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(120,190,32,0.5) rgba(3,8,3,0.8)',
        }}
      >
        {EVENTS.map((event, i) => (
          <div
            key={i}
            onClick={() => openEventPopup(event)}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: 24,
              alignItems: 'center',
              background: 'var(--panel)',
              border: `1px solid ${event.upcoming ? 'rgba(0,132,61,0.2)' : 'rgba(120,190,32,0.1)'}`,
              padding: 24,
              clipPath: 'polygon(0 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = 'rgba(120,190,32,0.3)'
              el.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = event.upcoming ? 'rgba(0,132,61,0.2)' : 'rgba(120,190,32,0.1)'
              el.style.transform = 'translateX(0)'
            }}
          >
            {/* Date */}
            <div style={{
              textAlign: 'center',
              background: event.upcoming ? 'rgba(0,132,61,0.06)' : 'rgba(120,190,32,0.06)',
              border: `1px solid ${event.upcoming ? 'rgba(0,132,61,0.3)' : 'rgba(120,190,32,0.2)'}`,
              padding: 10,
            }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: event.upcoming ? '#00843D' : '#78BE20' }}>
                {event.month}
              </div>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1,
              }}>
                {event.day}
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: 1,
              }}>
                {event.title}
              </h3>
              <p style={{ fontSize: 11, color: 'rgba(180,210,170,0.5)', lineHeight: 1.6 }}>
                {event.desc}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                {event.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '3px 10px', fontSize: 8, letterSpacing: 2,
                    border: '1px solid rgba(120,190,32,0.2)',
                    color: '#78BE20',
                    clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 20, color: 'rgba(120,190,32,0.3)' }}>›</div>
          </div>
        ))}

        <style>{`
          div::-webkit-scrollbar { width: 4px; }
          div::-webkit-scrollbar-track {
            background: rgba(3,8,3,0.9);
            border-left: 1px solid rgba(120,190,32,0.1);
          }
          div::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #78BE20, #00843D);
            border-radius: 0;
            box-shadow: 0 0 6px rgba(120,190,32,0.6);
          }
          div::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #9ade30, #00a84e);
            box-shadow: 0 0 10px rgba(120,190,32,0.9);
          }
        `}</style>
      </div>

      {/* HudDialog substitution for Swal */}
      <HudDialog 
        open={!!selectedEvent} 
        onOpenChange={(open) => !open && setSelectedEvent(null)}
        width={620}
      >
        {selectedEvent && (
          <div style={{ textAlign: 'left', fontFamily: "'Share Tech Mono', monospace" }}>
            <div style={{
              position: 'relative',
              width: '100%',
              marginBottom: '20px',
              overflow: 'hidden',
              clipPath: 'polygon(0 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)',
              border: `1px solid ${accentColorDim}`
            }}>
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                width={620}
                height={420}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '420px',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'brightness(0.88) saturate(0.85)'
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px)',
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute', top: '12px', left: '12px',
                background: accentColorBg,
                border: `1px solid ${accentColor}`,
                padding: '8px 12px', textAlign: 'center',
                backdropFilter: 'blur(4px)'
              }}>
                <div style={{ fontSize: '8px', letterSpacing: '3px', color: accentColor }}>
                  {selectedEvent.month}
                </div>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: '22px', fontWeight: 900, color: '#fff', lineHeight: 1
                }}>
                  {selectedEvent.day}
                </div>
              </div>
            </div>

            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '17px', fontWeight: 900,
              color: '#fff', letterSpacing: '2px',
              marginBottom: '12px', textTransform: 'uppercase'
            }}>
              {selectedEvent.title}
            </h3>

            <div style={{
              width: '60px', height: '2px',
              background: `linear-gradient(90deg,${accentColor},transparent)`,
              boxShadow: `0 0 8px ${accentColor}`,
              marginBottom: '14px'
            }} />

            <p style={{
              fontSize: '12px', lineHeight: 1.8,
              color: 'rgba(180,210,170,0.7)',
              marginBottom: '16px'
            }}>
              {selectedEvent.desc}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedEvent.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    fontSize: '8px',
                    letterSpacing: '2px',
                    border: `1px solid ${accentColorDim}`,
                    color: accentColor,
                    clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
                    fontFamily: "'Share Tech Mono', monospace"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </HudDialog>
    </div>
  )
}