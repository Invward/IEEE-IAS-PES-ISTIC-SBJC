'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useAudioContext } from '@/lib/AudioContext'
import { TEAM } from '@/lib/data'
import { HudDialog } from '@/components/ui/HudDialog'

export default function TeamSection() {
  const { playClick } = useAudioContext()
  const [selectedMember, setSelectedMember] = useState<typeof TEAM[0] | null>(null)

  const openTeamPopup = (member: typeof TEAM[0]) => {
    playClick()
    setSelectedMember(member)
  }

  return (
    <section className="section-wrap page-enter" aria-label="Meet Our Team">
      <div className="section-header">
        <div className="section-eyebrow" aria-hidden="true">CREW MANIFEST</div>
        <h1 className="section-title">MEET OUR TEAM</h1>
        <div className="section-line" aria-hidden="true" />
      </div>

      <ul className="team-grid" role="list">
        {TEAM.map((member, i) => (
          <li key={i}>
            <button
              aria-label={`View profile of ${member.name}, ${member.role}`}
              onClick={() => openTeamPopup(member)}
              className="team-card"
            >
              {/* Avatar */}
              <div className="team-avatar-wrap" aria-hidden="true">
                <Image
                  src={member.photo}
                  alt={`Photo of ${member.name}`}
                  width={80}
                  height={80}
                  className="team-avatar-img"
                  loading={i < 3 ? 'eager' : 'lazy'}
                />
                {/* Orbit ring */}
                <div
                  className="team-orbit"
                  style={{
                    animation: `orbit ${member.ringDur} linear infinite`,
                    animationDirection: member.ringDir as 'normal' | 'reverse',
                  }}
                  aria-hidden="true"
                >
                  <div className="team-orbit-dot" />
                </div>
              </div>

              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
              <div className="team-dept">{member.dept}</div>
            </button>
          </li>
        ))}
      </ul>

      {/* HudDialog substitution for Swal */}
      <HudDialog 
        open={!!selectedMember} 
        onOpenChange={(open) => !open && setSelectedMember(null)}
        width={460}
      >
        {selectedMember && (
          <div style={{ textAlign: 'left', fontFamily: "'Share Tech Mono', monospace" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{
                position: 'relative',
                width: '100px', height: '100px', borderRadius: '50%',
                border: '2px solid rgba(120,190,32,0.45)',
                overflow: 'hidden',
                boxShadow: '0 0 28px rgba(120,190,32,0.22)',
                flexShrink: 0
              }}>
                <Image
                  src={selectedMember.photo}
                  alt={`Photo of ${selectedMember.name}`}
                  width={100} height={100}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.88) saturate(0.85)' }}
                />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '17px', fontWeight: 900,
                color: '#fff', letterSpacing: '2px',
                marginBottom: '10px'
              }}>
                {selectedMember.name}
              </div>
              <div style={{
                fontSize: '9px', letterSpacing: '3px', color: '#78BE20',
                display: 'inline-block',
                padding: '4px 14px',
                border: '1px solid rgba(120,190,32,0.35)',
                clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                marginBottom: '6px'
              }}>
                {selectedMember.role}
              </div>
            </div>

            <div style={{
              width: '60px', height: '2px',
              background: 'linear-gradient(90deg,#78BE20,transparent)',
              boxShadow: '0 0 8px #78BE20',
              margin: '0 auto 18px'
            }} />

            <div style={{
              textAlign: 'center',
              fontSize: '11px', color: 'rgba(180,210,170,0.55)',
              letterSpacing: '1px'
            }}>
              {selectedMember.dept}
            </div>
          </div>
        )}
      </HudDialog>
    </section>
  )
}

