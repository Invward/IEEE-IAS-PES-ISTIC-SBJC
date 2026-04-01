'use client'

import Link from 'next/link'
import { NAV_LINKS } from '@/lib/data'
import Image from 'next/image'
import { useState } from 'react'

export default function Footer() {
    const textMid = 'rgba(180,210,170,0.5)'
    const borderCol = 'rgba(120,190,32,0.08)'
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = () => {
        if (email.trim()) {
            setSubscribed(true)
            setEmail('')
        }
    }

    return (
        <footer style={{
            position: 'relative',
            background: '#020602',
            borderTop: '1px solid rgba(120,190,32,0.2)',
            marginTop: 'auto',
            overflow: 'hidden',
        }}>

            {/* Top glow line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, #78BE20, #00843D, #78BE20, transparent)',
                boxShadow: '0 0 20px rgba(120,190,32,0.4)',
            }} />

            {/* Subtle grid */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(120,190,32,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(120,190,32,0.02) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
            }} />

            {/* Main footer grid */}
            <div
                style={{
                    maxWidth: 1100, margin: '0 auto',
                    padding: '48px 40px 28px',
                    display: 'grid',
                    gridTemplateColumns: '1.8fr 0.8fr 0.9fr 1.1fr',
                    gap: 40,
                    position: 'relative', zIndex: 1,
                }}
                className="footer-grid"
            >

                {/* ── Brand column ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Image
                        src="/logo.png"
                        alt="IEEE IAS PES ITSIC SBJC"
                        width={150}
                        height={105}
                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                    />
                    <p style={{ fontSize: 11, color: textMid, lineHeight: 1.8, maxWidth: 260 }}>
                        IEEE Industry Applications Society / Power & Energy Society Student Branch Joint Chapter.
                        Empowering future engineers through innovation and collaboration.
                    </p>
                    {/* Social icons */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        {[
                            { label: 'LI', href: 'https://www.linkedin.com/company/ieee-istic-ias-pes-student-branch-joint-chapter?trk=public_profile_volunteering-position_profile-section-card_subtitle-click', title: 'LinkedIn' },
                            { label: 'FB', href: 'https://www.facebook.com/ieeeiaspesisticsbjc/', title: 'Facebook' },
                            { label: 'IG', href: 'https://www.instagram.com/ieee_istic_ias_pes_sbjc/', title: 'Instagram' },
                        ].map(s => (
                            <a key={s.label} href={s.href} title={s.title} style={{
                                width: 30, height: 30,
                                border: '1px solid rgba(120,190,32,0.3)',
                                background: 'rgba(120,190,32,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: "'Orbitron', sans-serif", fontSize: 8, letterSpacing: 1,
                                color: '#78BE20', textDecoration: 'none',
                                clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLAnchorElement
                                    el.style.background = 'rgba(120,190,32,0.15)'
                                    el.style.borderColor = '#78BE20'
                                    el.style.boxShadow = '0 0 10px rgba(120,190,32,0.3)'
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLAnchorElement
                                    el.style.background = 'rgba(120,190,32,0.05)'
                                    el.style.borderColor = 'rgba(120,190,32,0.3)'
                                    el.style.boxShadow = 'none'
                                }}
                            >{s.label}</a>
                        ))}
                    </div>
                    {/* Status indicator */}
                    <div style={{
                        marginTop: 4, padding: '8px 12px',
                        background: 'rgba(120,190,32,0.04)',
                        border: '1px solid rgba(120,190,32,0.12)',
                        clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontSize: 9, letterSpacing: 1, color: textMid,
                    }}>
                        <span style={{
                            width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                            background: '#78BE20', boxShadow: '0 0 6px #78BE20',
                            animation: 'blink 2s infinite', display: 'inline-block',
                        }} />
                        CHAPTER SYSTEMS ONLINE
                    </div>
                </div>

                {/* ── Quick Links ── */}
                <div>
                    <div style={{
                        fontFamily: "'Orbitron', sans-serif", fontSize: 9,
                        letterSpacing: 3, color: '#78BE20', marginBottom: 20,
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        <span style={{ width: 16, height: 1, background: '#78BE20', display: 'inline-block', flexShrink: 0 }} />
                        QUICK LINKS
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {NAV_LINKS.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} style={{
                                    fontSize: 10, color: textMid, textDecoration: 'none',
                                    letterSpacing: 1, transition: 'color 0.2s',
                                    display: 'flex', alignItems: 'center', gap: 8,
                                }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLAnchorElement
                                        el.style.color = '#78BE20'
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLAnchorElement
                                        el.style.color = textMid
                                    }}
                                >
                                    <span style={{
                                        width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
                                        background: 'rgba(120,190,32,0.4)',
                                        display: 'inline-block',
                                    }} />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Resources ── */}
                <div>
                    <div style={{
                        fontFamily: "'Orbitron', sans-serif", fontSize: 9,
                        letterSpacing: 3, color: '#78BE20', marginBottom: 20,
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        <span style={{ width: 16, height: 1, background: '#78BE20', display: 'inline-block', flexShrink: 0 }} />
                        RESOURCES
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { label: 'IEEE Website', href: 'https://www.ieee.org' },
                            { label: 'IEEE IAS', href: 'https://ias.ieee.org' },
                            { label: 'IEEE PES', href: 'https://ieee-pes.org' },
                            { label: 'IEEE Xplore', href: 'https://ieeexplore.ieee.org' },
                            { label: 'Membership', href: 'https://www.ieee.org/membership' },
                        ].map((r, i) => (
                            <li key={i}>
                                <a href={r.href} target="_blank" rel="noopener noreferrer" style={{
                                    fontSize: 10, color: textMid, textDecoration: 'none',
                                    letterSpacing: 1, transition: 'color 0.2s',
                                    display: 'flex', alignItems: 'center', gap: 8,
                                }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLAnchorElement
                                        el.style.color = '#78BE20'
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLAnchorElement
                                        el.style.color = textMid
                                    }}
                                >
                                    <span style={{
                                        width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
                                        background: 'rgba(0,132,61,0.5)',
                                        display: 'inline-block',
                                    }} />
                                    {r.label}
                                    <span style={{ fontSize: 8, color: 'rgba(120,190,32,0.3)', marginLeft: 'auto' }}>↗</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Stay Updated (newsletter) ── */}
                <div>
                    <div style={{
                        fontFamily: "'Orbitron', sans-serif", fontSize: 9,
                        letterSpacing: 3, color: '#78BE20', marginBottom: 20,
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        <span style={{ width: 16, height: 1, background: '#78BE20', display: 'inline-block', flexShrink: 0 }} />
                        STAY UPDATED
                    </div>

                    <p style={{ fontSize: 11, color: textMid, lineHeight: 1.7, marginBottom: 16 }}>
                        Subscribe to our newsletter for the latest updates and events.
                    </p>

                    {subscribed ? (
                        <div style={{
                            padding: '12px 16px',
                            background: 'rgba(0,132,61,0.08)',
                            border: '1px solid rgba(0,132,61,0.3)',
                            clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)',
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: 10, color: '#00843D', letterSpacing: 1,
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                            <span>✓</span> TRANSMISSION RECEIVED
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{
                                position: 'relative',
                                border: '1px solid rgba(120,190,32,0.2)',
                                background: 'rgba(120,190,32,0.03)',
                                clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)',
                            }}>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                                    style={{
                                        width: '100%',
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        padding: '10px 14px',
                                        fontFamily: "'Share Tech Mono', monospace",
                                        fontSize: 10, letterSpacing: 1,
                                        color: 'rgba(180,210,170,0.8)',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>
                            <button
                                onClick={handleSubscribe}
                                style={{
                                    padding: '10px 16px',
                                    background: 'rgba(120,190,32,0.08)',
                                    border: '1px solid rgba(120,190,32,0.35)',
                                    color: '#78BE20',
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: 10, letterSpacing: 3,
                                    cursor: 'pointer',
                                    clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)',
                                    transition: 'all 0.2s',
                                    position: 'relative', overflow: 'hidden',
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLButtonElement
                                    el.style.background = 'rgba(120,190,32,0.15)'
                                    el.style.borderColor = '#78BE20'
                                    el.style.color = '#fff'
                                    el.style.boxShadow = '0 0 14px rgba(120,190,32,0.25)'
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLButtonElement
                                    el.style.background = 'rgba(120,190,32,0.08)'
                                    el.style.borderColor = 'rgba(120,190,32,0.35)'
                                    el.style.color = '#78BE20'
                                    el.style.boxShadow = 'none'
                                }}
                            >
                                ⚡ SUBSCRIBE
                            </button>
                        </div>
                    )}

                    {/* Contact info below */}
                    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { icon: '📍', label: 'LOCATION', val: 'Borj Cedria', href: '#' },
                        ].map((c, i) => (
                            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <div style={{
                                    width: 24, height: 24, flexShrink: 0,
                                    background: 'rgba(120,190,32,0.05)',
                                    border: '1px solid rgba(120,190,32,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
                                }}>{c.icon}</div>
                                <div>
                                    <div style={{ fontSize: 7, letterSpacing: 2, color: 'rgba(120,190,32,0.4)', marginBottom: 1 }}>{c.label}</div>
                                    <a href={c.href} style={{ fontSize: 10, color: textMid, textDecoration: 'none', transition: 'color 0.2s' }}
                                        onMouseEnter={e => (e.currentTarget.style.color = '#78BE20')}
                                        onMouseLeave={e => (e.currentTarget.style.color = textMid)}
                                    >{c.val}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div style={{
                borderTop: `1px solid ${borderCol}`,
                padding: '14px 40px',
                maxWidth: 1100, margin: '0 auto',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 8,
                position: 'relative', zIndex: 1,
            }}>
                <div style={{ fontSize: 9, color: textMid, letterSpacing: 1 }}>
                    © 2025 IEEE IAS PES ITSIC SBJC · All rights reserved · Designed by Andel Belgacemi
                </div>
                <div style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 9, color: 'rgba(120,190,32,0.3)', letterSpacing: 1,
                }}>
                    CORE v2.6.0 · BUILD STABLE
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; padding: 32px 20px 20px !important; }
        }
        input::placeholder { color: rgba(120,190,32,0.25) !important; }
      `}</style>
        </footer>
    )
}