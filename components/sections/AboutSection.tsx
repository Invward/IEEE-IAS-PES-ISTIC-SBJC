import Image from "next/image"
export default function AboutSection() {
  return (
    <div className="section-wrap page-enter">

      {/* Header */}
      <div className="section-header">
        <div className="section-eyebrow">CHAPTER BRIEFING</div>
        <h2 className="section-title">ABOUT US</h2>
        <div className="section-line" />
      </div>

      {/* Centered Content */}
      <div className="about-grid">
        <div className="about-text">
          {[
            <>The <strong style={{ color: '#78BE20', fontWeight: 'normal' }}>IEEE IAS PES ISTIC Student Branch Joint Chapter</strong> is a multidisciplinary hub at the intersection of industrial applications, power engineering, and intelligent systems.</>,

            <>We bring together students passionate about <strong style={{ color: '#78BE20', fontWeight: 'normal' }}>electrical engineering, energy systems</strong>, and emerging technologies — building bridges between academic research and real-world impact.</>,

            <>Our chapter provides members with access to <strong style={{ color: '#78BE20', fontWeight: 'normal' }}>technical workshops, hackathons, research collaborations</strong>, and a global network of IEEE professionals shaping the future of energy and transportation.</>,

            <>Whether you&apos;re interested in power electronics, smart grids, EV infrastructure, or industrial automation — this is your command center.</>,
          ].map((para, i) => (
            <p key={i} className="about-paragraph">
              {para}
            </p>
          ))}
        </div>
      </div>

      <style>{`
        /* Layout */
        .about-grid{
          display:flex;
          justify-content:center;
        }

        .about-text{
          max-width:720px;
          text-align:center;
        }

        .about-paragraph{
          color:rgba(180,210,170,0.7);
          line-height:1.9;
          font-size:14px;
          margin-bottom:18px;
        }

        /* Mobile */
        @media (max-width:768px){

          .about-banner{
            height:180px;
          }

          .about-banner-overlay h1{
            font-size:22px;
          }

          .about-text{
            padding:0 10px;
          }

        }

      `}</style>

    </div>
  )
}
