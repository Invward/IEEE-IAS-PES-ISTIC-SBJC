import type { Metadata } from 'next'
import TeamSection from '@/components/sections/TeamSection'

export const metadata: Metadata = {
  title: 'Meet Our Team — IEEE IAS PES ISTIC SBJC',
  description: 'Meet the dedicated leadership and core members of the IEEE IAS PES ITSIC Student Branch Joint Chapter powering innovation in power and energy systems.',
}

export default function TeamPage() {
  return (
    <div style={{ paddingTop: 70 }}>
      <TeamSection />
    </div>
  )
}
