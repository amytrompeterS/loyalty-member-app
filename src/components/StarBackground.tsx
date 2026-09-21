// Purely decorative — aria-hidden throughout, pointer-events-none
// Fixed position so it stays put while content scrolls

// 4-pointed sparkle shape (centered at origin, unit radius ~6)
const SPARKLE = 'M 0,-6 L 0.7,-0.7 L 6,0 L 0.7,0.7 L 0,6 L -0.7,0.7 L -6,0 L -0.7,-0.7 Z'

interface Dot   { x: number; y: number; r: number; o: number }
interface Spark { x: number; y: number; s: number; o: number }

// Coordinate space: 375 × 812 (iPhone-sized, SVG scales to fill any screen)
const DOTS: Dot[] = [
  { x: 18,  y: 42,  r: 0.55, o: 0.35 }, { x: 52,  y: 18,  r: 0.40, o: 0.25 },
  { x: 95,  y: 55,  r: 0.50, o: 0.30 }, { x: 140, y: 22,  r: 0.35, o: 0.22 },
  { x: 198, y: 70,  r: 0.60, o: 0.38 }, { x: 248, y: 38,  r: 0.45, o: 0.28 },
  { x: 305, y: 15,  r: 0.50, o: 0.35 }, { x: 355, y: 60,  r: 0.35, o: 0.25 },
  { x: 28,  y: 115, r: 0.45, o: 0.25 }, { x: 75,  y: 145, r: 0.55, o: 0.32 },
  { x: 128, y: 98,  r: 0.40, o: 0.22 }, { x: 185, y: 130, r: 0.50, o: 0.35 },
  { x: 238, y: 105, r: 0.35, o: 0.25 }, { x: 288, y: 155, r: 0.60, o: 0.28 },
  { x: 340, y: 120, r: 0.45, o: 0.32 }, { x: 362, y: 170, r: 0.30, o: 0.22 },
  { x: 10,  y: 200, r: 0.50, o: 0.28 }, { x: 60,  y: 235, r: 0.40, o: 0.25 },
  { x: 112, y: 195, r: 0.55, o: 0.35 }, { x: 168, y: 220, r: 0.45, o: 0.22 },
  { x: 222, y: 250, r: 0.50, o: 0.32 }, { x: 275, y: 215, r: 0.35, o: 0.25 },
  { x: 330, y: 245, r: 0.60, o: 0.28 }, { x: 358, y: 210, r: 0.40, o: 0.22 },
  { x: 22,  y: 310, r: 0.45, o: 0.25 }, { x: 78,  y: 285, r: 0.50, o: 0.32 },
  { x: 135, y: 330, r: 0.40, o: 0.28 }, { x: 190, y: 300, r: 0.55, o: 0.35 },
  { x: 245, y: 340, r: 0.35, o: 0.22 }, { x: 298, y: 295, r: 0.50, o: 0.32 },
  { x: 348, y: 325, r: 0.45, o: 0.25 }, { x: 5,   y: 375, r: 0.60, o: 0.28 },
  { x: 55,  y: 405, r: 0.40, o: 0.25 }, { x: 108, y: 370, r: 0.50, o: 0.35 },
  { x: 165, y: 410, r: 0.35, o: 0.22 }, { x: 218, y: 385, r: 0.50, o: 0.32 },
  { x: 272, y: 420, r: 0.55, o: 0.28 }, { x: 325, y: 380, r: 0.40, o: 0.25 },
  { x: 360, y: 415, r: 0.45, o: 0.22 }, { x: 30,  y: 470, r: 0.50, o: 0.32 },
  { x: 88,  y: 500, r: 0.35, o: 0.25 }, { x: 142, y: 460, r: 0.60, o: 0.35 },
  { x: 200, y: 495, r: 0.45, o: 0.28 }, { x: 255, y: 470, r: 0.50, o: 0.25 },
  { x: 310, y: 505, r: 0.40, o: 0.22 }, { x: 355, y: 465, r: 0.55, o: 0.32 },
  { x: 15,  y: 555, r: 0.45, o: 0.25 }, { x: 68,  y: 585, r: 0.50, o: 0.32 },
  { x: 122, y: 545, r: 0.40, o: 0.22 }, { x: 178, y: 575, r: 0.55, o: 0.35 },
  { x: 232, y: 555, r: 0.35, o: 0.25 }, { x: 285, y: 590, r: 0.50, o: 0.28 },
  { x: 338, y: 560, r: 0.45, o: 0.32 }, { x: 365, y: 600, r: 0.30, o: 0.22 },
  { x: 40,  y: 650, r: 0.50, o: 0.28 }, { x: 95,  y: 680, r: 0.40, o: 0.25 },
  { x: 150, y: 645, r: 0.60, o: 0.35 }, { x: 205, y: 675, r: 0.45, o: 0.22 },
  { x: 260, y: 650, r: 0.50, o: 0.32 }, { x: 315, y: 685, r: 0.35, o: 0.25 },
  { x: 358, y: 660, r: 0.55, o: 0.28 }, { x: 22,  y: 740, r: 0.40, o: 0.25 },
  { x: 80,  y: 770, r: 0.50, o: 0.32 }, { x: 135, y: 750, r: 0.45, o: 0.22 },
  { x: 192, y: 780, r: 0.50, o: 0.35 }, { x: 248, y: 760, r: 0.35, o: 0.25 },
  { x: 302, y: 790, r: 0.60, o: 0.28 }, { x: 352, y: 755, r: 0.40, o: 0.22 },
]

const SPARKLES: Spark[] = [
  { x: 32,  y: 68,  s: 1.4, o: 0.45 },
  { x: 285, y: 105, s: 1.1, o: 0.38 },
  { x: 148, y: 52,  s: 0.9, o: 0.35 },
  { x: 12,  y: 340, s: 1.6, o: 0.42 },
  { x: 355, y: 280, s: 1.0, o: 0.35 },
  { x: 188, y: 430, s: 0.8, o: 0.32 },
  { x: 60,  y: 530, s: 1.7, o: 0.45 },
  { x: 320, y: 480, s: 1.2, o: 0.38 },
  { x: 140, y: 630, s: 1.0, o: 0.35 },
  { x: 250, y: 700, s: 1.4, o: 0.42 },
  { x: 38,  y: 760, s: 0.9, o: 0.32 },
  { x: 360, y: 740, s: 1.1, o: 0.35 },
]

export default function StarBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 375 812"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft glow for larger sparkles */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Heavy blur for cloud blobs */}
          <filter id="cloud-blur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="55" />
          </filter>
        </defs>

        {/* Subtle dark cloud blobs — just slightly darker than the navy bg */}
        <ellipse cx="-20"  cy="180" rx="180" ry="140" fill="#162245" opacity="0.55" filter="url(#cloud-blur)" />
        <ellipse cx="420"  cy="520" rx="160" ry="130" fill="#162245" opacity="0.50" filter="url(#cloud-blur)" />
        <ellipse cx="80"   cy="720" rx="150" ry="110" fill="#162245" opacity="0.45" filter="url(#cloud-blur)" />
        <ellipse cx="340"  cy="80"  rx="120" ry="100" fill="#162245" opacity="0.40" filter="url(#cloud-blur)" />

        {/* Small dot stars */}
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="white" fillOpacity={d.o} />
        ))}

        {/* 4-pointed sparkle stars */}
        {SPARKLES.map((s, i) => (
          <path
            key={i}
            d={SPARKLE}
            transform={`translate(${s.x}, ${s.y}) scale(${s.s})`}
            fill="white"
            fillOpacity={s.o}
            filter={s.s >= 2.5 ? 'url(#glow)' : undefined}
          />
        ))}
      </svg>
    </div>
  )
}
