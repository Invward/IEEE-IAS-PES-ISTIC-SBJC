import type { Metadata } from 'next'
import MembersOfMonthSection from '@/components/sections/MembersOfMonthSection'

export const metadata: Metadata = {
  title: 'Members of the Month — IEEE IAS PES ISTIC SBJC',
  description: 'Recognizing the outstanding IEEE student members whose dedication, research, and leadership define excellence in power and energy engineering.',
}

export default function MembersOfMonthPage() {
  return (
    <div style={{ paddingTop: 70 }}>
      <MembersOfMonthSection />
    </div>
  )
}
