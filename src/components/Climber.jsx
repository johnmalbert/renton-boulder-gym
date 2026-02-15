import { useMemo } from 'react';

/*
  Realistic-ish climber girl seen from BEHIND (facing the wall).
  Ponytail, chalk bag, tank top, climbing pants, orange shoes.
  6 poses that progress as the user scrolls up.
*/

const skin   = '#d4a574';
const skinSh = '#b8895a';   // shadow tone
const hair   = '#3b1a08';
const hairHi = '#5c2e14';   // highlight
const tank   = '#38bdf8';
const tankSh = '#0ea5e9';
const pants  = '#1e293b';
const pantSh = '#0f172a';
const shoes  = '#f97316';
const shoeSh = '#ea580c';
const chalk  = '#e2e8f0';
const strap  = '#94a3b8';
const outline= '#1a1008';

/* ----- Shared Sub-components (back view) ----- */

/* Head from behind: hair covers everything, ponytail hangs */
const HeadBack = ({ cx, cy, tilt = 0 }) => (
  <g transform={`rotate(${tilt} ${cx} ${cy})`}>
    {/* Neck */}
    <rect x={cx - 3} y={cy + 6} width="6" height="5" rx="2" fill={skin} />
    <rect x={cx - 2.5} y={cy + 6} width="5" height="4" rx="1.5" fill={skinSh} opacity="0.3" />
    {/* Head shape */}
    <ellipse cx={cx} cy={cy} rx="8" ry="9" fill={hair} stroke={outline} strokeWidth="0.6" />
    {/* Hair texture — layered arcs */}
    <path d={`M${cx - 7} ${cy + 2} Q${cx - 4} ${cy - 6} ${cx} ${cy - 8} Q${cx + 4} ${cy - 6} ${cx + 7} ${cy + 2}`}
      stroke={hairHi} strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d={`M${cx - 6} ${cy + 4} Q${cx - 2} ${cy - 3} ${cx + 2} ${cy - 4} Q${cx + 5} ${cy - 2} ${cx + 6} ${cy + 4}`}
      stroke={hairHi} strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* Ponytail — thick, flowing down the back */}
    <path d={`M${cx} ${cy + 4} Q${cx + 3} ${cy + 8} ${cx + 2} ${cy + 16}
              Q${cx + 1} ${cy + 22} ${cx - 1} ${cy + 20}
              Q${cx - 3} ${cy + 16} ${cx - 2} ${cy + 10} Z`}
      fill={hair} stroke={outline} strokeWidth="0.5" />
    <path d={`M${cx - 1} ${cy + 8} Q${cx + 1} ${cy + 12} ${cx} ${cy + 18}`}
      stroke={hairHi} strokeWidth="0.6" fill="none" opacity="0.5" />
    {/* Hair tie / scrunchie */}
    <ellipse cx={cx} cy={cy + 6} rx="3" ry="1.5" fill={shoes} stroke={outline} strokeWidth="0.4" />
    {/* Ear peeks on one side */}
    <ellipse cx={cx - 7.5} cy={cy + 1} rx="2" ry="3" fill={skin} stroke={outline} strokeWidth="0.4" />
  </g>
);

/* Torso from behind — tank top with shoulder blades hint */
const TorsoBack = ({ cx, cy, lean = 0 }) => (
  <g transform={`rotate(${lean} ${cx} ${cy})`}>
    {/* Tank top body */}
    <path d={`M${cx - 8} ${cy} L${cx - 9} ${cy + 28} Q${cx - 8} ${cy + 32} ${cx} ${cy + 32}
              Q${cx + 8} ${cy + 32} ${cx + 9} ${cy + 28} L${cx + 8} ${cy} Q${cx + 4} ${cy - 2} ${cx} ${cy - 2}
              Q${cx - 4} ${cy - 2} ${cx - 8} ${cy}Z`}
      fill={tank} stroke={outline} strokeWidth="0.6" />
    {/* Tank shadow / muscle definition */}
    <path d={`M${cx - 3} ${cy + 4} Q${cx} ${cy + 10} ${cx + 3} ${cy + 4}`}
      stroke={tankSh} strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Shoulder blade hints */}
    <path d={`M${cx - 5} ${cy + 6} Q${cx - 3} ${cy + 10} ${cx - 5} ${cy + 14}`}
      stroke={tankSh} strokeWidth="0.8" fill="none" opacity="0.3" />
    <path d={`M${cx + 5} ${cy + 6} Q${cx + 3} ${cy + 10} ${cx + 5} ${cy + 14}`}
      stroke={tankSh} strokeWidth="0.8" fill="none" opacity="0.3" />
    {/* Tank straps */}
    <line x1={cx - 5} y1={cy - 1} x2={cx - 7} y2={cy - 6} stroke={tank} strokeWidth="2.5" strokeLinecap="round" />
    <line x1={cx + 5} y1={cy - 1} x2={cx + 7} y2={cy - 6} stroke={tank} strokeWidth="2.5" strokeLinecap="round" />
  </g>
);

const ChalkBag = ({ cx, cy }) => (
  <g>
    {/* Belt / strap going around waist */}
    <line x1={cx - 12} y1={cy} x2={cx + 6} y2={cy} stroke={strap} strokeWidth="1" />
    {/* Bag */}
    <rect x={cx - 4} y={cy - 1} width="8" height="9" rx="2" fill={chalk} stroke={outline} strokeWidth="0.5" />
    <rect x={cx - 3} y={cy - 2} width="6" height="3" rx="1.5" fill="#cbd5e1" stroke={outline} strokeWidth="0.3" />
    {/* Chalk dust */}
    <circle cx={cx} cy={cy - 3} r="2" fill={chalk} opacity="0.2" />
  </g>
);

const Arm = ({ x1, y1, x2, y2, x3, y3 }) => (
  <g>
    {/* Upper arm */}
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={skin} strokeWidth="4.5" strokeLinecap="round" />
    {/* Forearm */}
    <line x1={x2} y1={y2} x2={x3} y2={y3} stroke={skin} strokeWidth="3.8" strokeLinecap="round" />
    {/* Muscle shadow */}
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={skinSh} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    {/* Hand / fist */}
    <circle cx={x3} cy={y3} r="3" fill={skin} stroke={outline} strokeWidth="0.5" />
    <path d={`M${x3 - 1.5} ${y3 - 1} L${x3 + 1.5} ${y3 - 1}`} stroke={outline} strokeWidth="0.4" />
  </g>
);

const Leg = ({ x1, y1, x2, y2, x3, y3, shoeAngle = 0 }) => (
  <g>
    {/* Thigh */}
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={pants} strokeWidth="5.5" strokeLinecap="round" />
    {/* Calf */}
    <line x1={x2} y1={y2} x2={x3} y2={y3} stroke={pants} strokeWidth="4.5" strokeLinecap="round" />
    {/* Pant shadow */}
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={pantSh} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    {/* Shoe */}
    <g transform={`rotate(${shoeAngle} ${x3} ${y3})`}>
      <ellipse cx={x3} cy={y3 + 1} rx="5" ry="3" fill={shoes} stroke={outline} strokeWidth="0.5" />
      <ellipse cx={x3 + 1.5} cy={y3 + 1.5} rx="2.5" ry="1.5" fill={shoeSh} opacity="0.5" />
      {/* Rubber toe */}
      <ellipse cx={x3 + 3} cy={y3 + 0.5} rx="1.5" ry="2" fill="#fbbf24" opacity="0.6" />
    </g>
  </g>
);

const frames = [
  // 0 – Standing at base, arms at sides, looking up at wall
  <svg key="f0" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={40} cy={14} tilt={-5} />
    <TorsoBack cx={40} cy={30} />
    <ChalkBag cx={48} cy={56} />
    <Arm x1={32} y1={32} x2={26} y2={42} x3={24} y3={50} />
    <Arm x1={48} y1={32} x2={54} y2={42} x3={56} y3={50} />
    <Leg x1={36} y1={60} x2={34} y2={78} x3={32} y3={94} />
    <Leg x1={44} y1={60} x2={46} y2={78} x3={48} y3={94} />
  </svg>,

  // 1 – Both hands on low holds, crouching to start
  <svg key="f1" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={40} cy={22} tilt={-3} />
    <TorsoBack cx={40} cy={38} lean={2} />
    <ChalkBag cx={48} cy={62} />
    <Arm x1={32} y1={40} x2={22} y2={34} x3={16} y3={32} />
    <Arm x1={48} y1={40} x2={58} y2={34} x3={64} y3={32} />
    <Leg x1={36} y1={68} x2={32} y2={80} x3={28} y3={90} shoeAngle={5} />
    <Leg x1={44} y1={68} x2={48} y2={80} x3={52} y3={90} shoeAngle={-5} />
  </svg>,

  // 2 – Right hand reaching up high, left on a hold
  <svg key="f2" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={38} cy={16} tilt={8} />
    <TorsoBack cx={38} cy={32} lean={3} />
    <ChalkBag cx={46} cy={58} />
    <Arm x1={30} y1={34} x2={22} y2={30} x3={16} y3={28} />
    <Arm x1={46} y1={34} x2={52} y2={20} x3={56} y3={6} />
    <circle cx="56" cy="6" r="4" fill={chalk} opacity="0.15" />
    <Leg x1={34} y1={62} x2={30} y2={78} x3={26} y3={92} />
    <Leg x1={42} y1={62} x2={48} y2={76} x3={54} y3={82} shoeAngle={-15} />
  </svg>,

  // 3 – Flagging left leg out, right hand high, weight on right foot
  <svg key="f3" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={42} cy={14} tilt={6} />
    <TorsoBack cx={42} cy={30} lean={5} />
    <ChalkBag cx={50} cy={56} />
    <Arm x1={34} y1={32} x2={26} y2={26} x3={20} y3={22} />
    <Arm x1={50} y1={32} x2={56} y2={18} x3={60} y3={6} />
    <Leg x1={38} y1={60} x2={26} y2={68} x3={18} y3={76} shoeAngle={25} />
    <Leg x1={46} y1={60} x2={48} y2={78} x3={50} y3={92} />
  </svg>,

  // 4 – Left hand reaching up, right holding, weight shifted left
  <svg key="f4" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={42} cy={16} tilt={-8} />
    <TorsoBack cx={42} cy={32} lean={-3} />
    <ChalkBag cx={50} cy={58} />
    <Arm x1={34} y1={34} x2={28} y2={20} x3={24} y3={6} />
    <circle cx="24" cy="6" r="4" fill={chalk} opacity="0.15" />
    <Arm x1={50} y1={34} x2={58} y2={30} x3={64} y3={28} />
    <Leg x1={38} y1={62} x2={32} y2={76} x3={26} y3={82} shoeAngle={15} />
    <Leg x1={46} y1={62} x2={50} y2={78} x3={54} y3={92} />
  </svg>,

  // 5 – Matching hands on same hold, feet wide — resting
  <svg key="f5" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={40} cy={18} tilt={0} />
    <TorsoBack cx={40} cy={34} lean={0} />
    <ChalkBag cx={48} cy={60} />
    <Arm x1={32} y1={36} x2={28} y2={24} x3={36} y3={16} />
    <Arm x1={48} y1={36} x2={52} y2={24} x3={44} y3={16} />
    <Leg x1={36} y1={64} x2={26} y2={78} x3={20} y3={90} shoeAngle={10} />
    <Leg x1={44} y1={64} x2={54} y2={78} x3={60} y3={90} shoeAngle={-10} />
  </svg>,

  // 6 – Dyno! Both arms up, legs tucked, airborne
  <svg key="f6" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={40} cy={14} tilt={0} />
    <TorsoBack cx={40} cy={30} />
    <ChalkBag cx={48} cy={54} />
    <Arm x1={32} y1={32} x2={24} y2={16} x3={18} y3={4} />
    <Arm x1={48} y1={32} x2={56} y2={16} x3={62} y3={4} />
    <circle cx="18" cy="4" r="4" fill={chalk} opacity="0.2" />
    <circle cx="62" cy="4" r="4" fill={chalk} opacity="0.2" />
    <Leg x1={36} y1={58} x2={30} y2={66} x3={28} y3={74} shoeAngle={10} />
    <Leg x1={44} y1={58} x2={50} y2={66} x3={52} y3={74} shoeAngle={-10} />
    <line x1="34" y1="78" x2="34" y2="88" stroke={strap} strokeWidth="0.7" opacity="0.4" strokeDasharray="2 2" />
    <line x1="40" y1="80" x2="40" y2="92" stroke={strap} strokeWidth="0.7" opacity="0.4" strokeDasharray="2 2" />
    <line x1="46" y1="78" x2="46" y2="88" stroke={strap} strokeWidth="0.7" opacity="0.4" strokeDasharray="2 2" />
  </svg>,

  // 7 – High step — right foot up near hands, knee to chest
  <svg key="f7" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={38} cy={16} tilt={4} />
    <TorsoBack cx={38} cy={32} lean={2} />
    <ChalkBag cx={46} cy={56} />
    <Arm x1={30} y1={34} x2={22} y2={22} x3={18} y3={12} />
    <Arm x1={46} y1={34} x2={54} y2={24} x3={58} y3={14} />
    <Leg x1={34} y1={60} x2={30} y2={78} x3={26} y3={92} />
    {/* Right leg — high step, knee bent up near chest */}
    <Leg x1={42} y1={60} x2={46} y2={48} x3={50} y3={42} shoeAngle={-25} />
  </svg>,

  // 8 – Heel hook, one arm reaching back to chalk bag
  <svg key="f8" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={38} cy={18} tilt={-5} />
    <TorsoBack cx={38} cy={34} lean={-2} />
    <ChalkBag cx={46} cy={58} />
    <Arm x1={30} y1={36} x2={22} y2={20} x3={18} y3={8} />
    <Arm x1={46} y1={36} x2={50} y2={46} x3={48} y3={56} />
    <circle cx="48" cy="53" r="5" fill={chalk} opacity="0.2" />
    <Leg x1={34} y1={64} x2={30} y2={80} x3={26} y3={92} />
    <Leg x1={42} y1={64} x2={52} y2={54} x3={60} y3={42} shoeAngle={-35} />
  </svg>,

  // 9 – Drop knee — torso twisted, knees opposing directions
  <svg key="f9" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={40} cy={15} tilt={-6} />
    <TorsoBack cx={40} cy={31} lean={-4} />
    <ChalkBag cx={48} cy={56} />
    <Arm x1={32} y1={33} x2={24} y2={18} x3={20} y3={8} />
    <Arm x1={48} y1={33} x2={56} y2={28} x3={62} y3={24} />
    {/* Left leg — knee dropping inward */}
    <Leg x1={36} y1={60} x2={42} y2={74} x3={38} y3={88} shoeAngle={20} />
    {/* Right leg — pressing outward on smear */}
    <Leg x1={44} y1={60} x2={54} y2={72} x3={60} y3={84} shoeAngle={-15} />
  </svg>,

  // 10 – Mantling / topping out, arms pushing down on top
  <svg key="f10" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <HeadBack cx={40} cy={12} tilt={0} />
    <TorsoBack cx={40} cy={28} />
    <ChalkBag cx={48} cy={52} />
    <Arm x1={32} y1={30} x2={24} y2={24} x3={20} y3={18} />
    <Arm x1={48} y1={30} x2={56} y2={24} x3={60} y3={18} />
    <Leg x1={36} y1={58} x2={32} y2={72} x3={30} y3={84} />
    <Leg x1={44} y1={58} x2={48} y2={72} x3={50} y3={84} />
    {/* Achievement sparkles */}
    <circle cx="14" cy="10" r="2" fill="#fbbf24" opacity="0.7" />
    <circle cx="66" cy="10" r="2" fill="#fbbf24" opacity="0.7" />
    <circle cx="40" cy="2" r="1.5" fill="#fbbf24" opacity="0.6" />
    <line x1="12" y1="6" x2="8" y2="3" stroke="#fbbf24" strokeWidth="1" opacity="0.5" />
    <line x1="16" y1="8" x2="18" y2="4" stroke="#fbbf24" strokeWidth="1" opacity="0.5" />
    <line x1="64" y1="6" x2="68" y2="3" stroke="#fbbf24" strokeWidth="1" opacity="0.5" />
    <line x1="68" y1="8" x2="66" y2="4" stroke="#fbbf24" strokeWidth="1" opacity="0.5" />
  </svg>,
];

export default function Climber({ climb }) {
  const bottomPct = 8 + climb * 78;
  const frameIdx = useMemo(
    () => Math.min(Math.floor(climb * frames.length), frames.length - 1),
    [climb]
  );

  return (
    <div
      className="climber"
      aria-hidden="true"
      style={{ bottom: `${bottomPct}%` }}
    >
      {frames[frameIdx]}
    </div>
  );
}
