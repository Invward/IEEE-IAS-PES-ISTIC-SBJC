'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useAudioContext } from '@/lib/AudioContext'
import { MEMBERS_OF_MONTH } from '@/lib/data'
import { HudDialog } from '@/components/ui/HudDialog'

export default function MembersOfMonthSection() {
  const { playClick } = useAudioContext()
  const [selectedMember, setSelectedMember] = useState<typeof MEMBERS_OF_MONTH[0] | null>(null)

  const openMemberPopup = (member: typeof MEMBERS_OF_MONTH[0]) => {
    playClick()
    setSelectedMember(member)
  }

  return (
    <section className="section-wrap page-enter" aria-label="Members of the Month">
      <div className="section-header">
        <div className="section-eyebrow" aria-hidden="true">ELITE OPERATIVES</div>
        <h1 className="section-title">MEMBERS OF THE MONTH</h1>
        <div className="section-line" aria-hidden="true" />
      </div>

      <ul className="mom-grid" role="list">
        {MEMBERS_OF_MONTH.map((member, i) => (
          <li key={i}>
            <button
              aria-label={`View profile of ${member.name}, ${member.role}, ${member.badge}`}
              onClick={() => openMemberPopup(member)}
              className="mom-card"
            >
              {/* Top gradient */}
              <div className="mom-card-glow" aria-hidden="true" />

              {/* Badge */}
              <div className="mom-badge" aria-label={`Award month: ${member.badge}`}>
                {member.badge}
              </div>

              {/* Avatar */}
              <div className="mom-avatar-wrap" aria-hidden="true">
                <Image
                  src={member.photo}
                  alt={`Photo of ${member.name}`}
                  width={70}
                  height={70}
                  className="mom-avatar-img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>

              <div className="mom-name">{member.name}</div>
              <div className="mom-role">{member.role}</div>
              <p className="mom-quote">&quot;{member.quote}&quot;</p>
              <div className="mom-stars" aria-label="5 stars rating" role="img">
                {'★★★★★'.split('').map((s, j) => (
                  <span key={j} aria-hidden="true">{s}</span>
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* HudDialog substitution for Swal */}
      <HudDialog 
        open={!!selectedMember} 
        onOpenChange={(open) => !open && setSelectedMember(null)}
        width={520}
      >
        {selectedMember && (
          <div style={{ textAlign: 'left', fontFamily: "'Share Tech Mono', monospace" }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '22px' }}>
              <div style={{
                flexShrink: 0,
                width: '80px', height: '80px', borderRadius: '50%',
                border: '2px solid rgba(120,190,32,0.4)',
                overflow: 'hidden',
                boxShadow: '0 0 24px rgba(120,190,32,0.2)'
              }}>
                <Image
                  src={selectedMember.photo}
                  alt={`Photo of ${selectedMember.name}`}
                  width={80} height={80}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.88) saturate(0.85)' }}
                />
              </div>
              <div>
                <div style={{
                  display: 'inline-block',
                  fontSize: '9px', letterSpacing: '2px', color: '#78BE20',
                  padding: '4px 10px',
                  border: '1px solid rgba(120,190,32,0.35)',
                  clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
                  marginBottom: '8px'
                }}>
                  {selectedMember.badge}
                </div>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '16px', fontWeight: 900,
                  color: '#fff', letterSpacing: '2px'
                }}>
                  {selectedMember.name}
                </div>
                <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#78BE20', marginTop: '4px' }}>
                  {selectedMember.role}
                </div>
              </div>
            </div>

            <div style={{
              width: '60px', height: '2px',
              background: 'linear-gradient(90deg,#78BE20,transparent)',
              boxShadow: '0 0 8px #78BE20',
              marginBottom: '16px'
            }} />

            <p style={{
              fontSize: '12px', lineHeight: 1.9,
              color: 'rgba(180,210,170,0.72)',
              fontStyle: 'italic'
            }}>
              &quot;{selectedMember.quote}&quot;
            </p>

            <div style={{ display: 'flex', gap: '4px', marginTop: '18px', color: '#78BE20', fontSize: '16px' }}>
              {'★★★★★'.split('').map((s, idx) => <span key={idx} aria-hidden="true">{s}</span>)}
            </div>
          </div>
        )}
      </HudDialog>
    </section>
  )
}

