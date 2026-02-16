import { useMemo } from "react";

/*
  More realistic climber (back view) using simple 2-bone IK for arms/legs
  + pose interpolation (smooth, no snapping).
*/

const skin   = "#d4a574";
const skinSh = "#b8895a";
const hair   = "#3b1a08";
const hairHi = "#5c2e14";
const tank   = "#38bdf8";
const tankSh = "#0ea5e9";
const pants  = "#1e293b";
const pantSh = "#0f172a";
const shoes  = "#f97316";
const shoeSh = "#ea580c";
const chalk  = "#e2e8f0";
const strap  = "#94a3b8";
const outline= "#1a1008";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const lerp2 = (p, q, t) => ({ x: lerp(p.x, q.x, t), y: lerp(p.y, q.y, t) });
const easeInOut = (t) => t * t * (3 - 2 * t); // smoothstep

/**
 * 2-bone IK in 2D (root->mid->target).
 * bendDir: +1 bends one way, -1 the other
 */
function solveIK2(a, c, L1, L2, bendDir = 1) {
  const dx = c.x - a.x, dy = c.y - a.y;
  const d = clamp(Math.hypot(dx, dy), 0.0001, L1 + L2 - 0.0001);

  // Law of cosines: angle at root
  const cosA = clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1);
  const angA = Math.acos(cosA);

  const base = Math.atan2(dy, dx);
  const theta = base + bendDir * angA;

  const b = { x: a.x + L1 * Math.cos(theta), y: a.y + L1 * Math.sin(theta) };
  return { a, b, c };
}

/* ----- Draw helpers ----- */

const LimbStroke = ({ a, b, c, baseColor, shadowColor, w1, w2 }) => (
  <g>
    <path
      d={`M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`}
      fill="none"
      stroke={baseColor}
      strokeWidth={w1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d={`M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`}
      fill="none"
      stroke={shadowColor}
      strokeWidth={w2}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.28"
    />
    <circle cx={b.x} cy={b.y} r={w2 * 0.7} fill={shadowColor} opacity="0.18" />
  </g>
);

const Hand = ({ p }) => (
  <g>
    <circle cx={p.x} cy={p.y} r="3" fill={skin} stroke={outline} strokeWidth="0.5" />
    <path
      d={`M${p.x - 1.6} ${p.y - 0.8} L${p.x + 1.6} ${p.y - 0.8}`}
      stroke={outline}
      strokeWidth="0.4"
    />
  </g>
);

const Shoe = ({ p, angle = 0 }) => (
  <g transform={`rotate(${angle} ${p.x} ${p.y})`}>
    <ellipse cx={p.x} cy={p.y + 1} rx="5" ry="3" fill={shoes} stroke={outline} strokeWidth="0.5" />
    <ellipse cx={p.x + 1.5} cy={p.y + 1.5} rx="2.5" ry="1.5" fill={shoeSh} opacity="0.5" />
    <ellipse cx={p.x + 3} cy={p.y + 0.5} rx="1.5" ry="2" fill="#fbbf24" opacity="0.6" />
  </g>
);

const HeadBack = ({ cx, cy, tilt = 0 }) => (
  <g transform={`rotate(${tilt} ${cx} ${cy})`}>
    {/* Neck */}
    <rect x={cx - 3} y={cy + 7} width="6" height="5" rx="2" fill={skin} />
    <rect x={cx - 2.5} y={cy + 7} width="5" height="4" rx="1.5" fill={skinSh} opacity="0.28" />

    {/* Head/hair */}
    <ellipse cx={cx} cy={cy} rx="8" ry="9" fill={hair} stroke={outline} strokeWidth="0.6" />

    {/* Hair texture */}
    <path
      d={`M${cx - 7} ${cy + 2} Q${cx - 4} ${cy - 6} ${cx} ${cy - 8} Q${cx + 4} ${cy - 6} ${cx + 7} ${cy + 2}`}
      stroke={hairHi}
      strokeWidth="0.8"
      fill="none"
      opacity="0.6"
    />
    <path
      d={`M${cx - 6} ${cy + 4} Q${cx - 2} ${cy - 3} ${cx + 2} ${cy - 4} Q${cx + 5} ${cy - 2} ${cx + 6} ${cy + 4}`}
      stroke={hairHi}
      strokeWidth="0.5"
      fill="none"
      opacity="0.4"
    />

    {/* Ponytail */}
    <path
      d={`M${cx} ${cy + 4} Q${cx + 3} ${cy + 8} ${cx + 2} ${cy + 16}
         Q${cx + 1} ${cy + 22} ${cx - 1} ${cy + 20}
         Q${cx - 3} ${cy + 16} ${cx - 2} ${cy + 10} Z`}
      fill={hair}
      stroke={outline}
      strokeWidth="0.5"
    />
    <path
      d={`M${cx - 1} ${cy + 8} Q${cx + 1} ${cy + 12} ${cx} ${cy + 18}`}
      stroke={hairHi}
      strokeWidth="0.6"
      fill="none"
      opacity="0.5"
    />

    {/* Tie + ear */}
    <ellipse cx={cx} cy={cy + 6} rx="3" ry="1.5" fill={shoes} stroke={outline} strokeWidth="0.4" />
    <ellipse cx={cx - 7.5} cy={cy + 1} rx="2" ry="3" fill={skin} stroke={outline} strokeWidth="0.4" />
  </g>
);

const TorsoBack = ({ cx, cy, lean = 0 }) => (
  <g transform={`rotate(${lean} ${cx} ${cy})`}>
    <path
      d={`M${cx - 10} ${cy}
         Q${cx - 12} ${cy + 16} ${cx - 9} ${cy + 30}
         Q${cx - 5} ${cy + 36} ${cx} ${cy + 36}
         Q${cx + 5} ${cy + 36} ${cx + 9} ${cy + 30}
         Q${cx + 12} ${cy + 16} ${cx + 10} ${cy}
         Q${cx + 5} ${cy - 3} ${cx} ${cy - 3}
         Q${cx - 5} ${cy - 3} ${cx - 10} ${cy} Z`}
      fill={tank}
      stroke={outline}
      strokeWidth="0.6"
    />
    <path
      d={`M${cx - 6} ${cy + 8} Q${cx - 3} ${cy + 14} ${cx - 6} ${cy + 20}`}
      stroke={tankSh}
      strokeWidth="0.9"
      fill="none"
      opacity="0.25"
    />
    <path
      d={`M${cx + 6} ${cy + 8} Q${cx + 3} ${cy + 14} ${cx + 6} ${cy + 20}`}
      stroke={tankSh}
      strokeWidth="0.9"
      fill="none"
      opacity="0.25"
    />
    <path
      d={`M${cx - 3} ${cy + 6} Q${cx} ${cy + 13} ${cx + 3} ${cy + 6}`}
      stroke={tankSh}
      strokeWidth="1.4"
      fill="none"
      opacity="0.35"
      strokeLinecap="round"
    />
    <line x1={cx - 6} y1={cy - 1} x2={cx - 8} y2={cy - 7} stroke={tank} strokeWidth="2.6" strokeLinecap="round" />
    <line x1={cx + 6} y1={cy - 1} x2={cx + 8} y2={cy - 7} stroke={tank} strokeWidth="2.6" strokeLinecap="round" />
  </g>
);

const Pelvis = ({ cx, cy, twist = 0 }) => (
  <g transform={`rotate(${twist} ${cx} ${cy})`}>
    <ellipse cx={cx} cy={cy} rx="10" ry="6.5" fill={pants} stroke={outline} strokeWidth="0.55" />
    <path
      d={`M${cx - 8} ${cy} Q${cx} ${cy + 3} ${cx + 8} ${cy}`}
      stroke={pantSh}
      strokeWidth="1.2"
      opacity="0.28"
      fill="none"
      strokeLinecap="round"
    />
  </g>
);

const ChalkBag = ({ cx, cy }) => (
  <g>
    <path d={`M${cx - 14} ${cy} Q${cx - 4} ${cy - 2} ${cx + 8} ${cy}`} stroke={strap} strokeWidth="1.1" fill="none" />
    <rect x={cx - 4} y={cy - 1} width="8" height="9" rx="2" fill={chalk} stroke={outline} strokeWidth="0.5" />
    <rect x={cx - 3} y={cy - 2} width="6" height="3" rx="1.5" fill="#cbd5e1" stroke={outline} strokeWidth="0.3" />
    <circle cx={cx} cy={cy - 3} r="2" fill={chalk} opacity="0.2" />
  </g>
);

/* ----- Pose definitions ----- */
const POSES = [
  // 0 base
  {
    root: { x: 40, y: 34 }, headTilt: -5, torsoLean: 0, pelvisTwist: 0,
    handL: { x: 24, y: 50 }, handR: { x: 56, y: 50 },
    footL: { x: 32, y: 94 }, footR: { x: 48, y: 94 },
    bendArmL: 1, bendArmR: -1, bendLegL: -1, bendLegR: 1,
  },
  // 1 crouch / hands low holds
  {
    root: { x: 40, y: 42 }, headTilt: -3, torsoLean: 2, pelvisTwist: 1,
    handL: { x: 16, y: 32 }, handR: { x: 64, y: 32 },
    footL: { x: 28, y: 92 }, footR: { x: 52, y: 92 },
    bendArmL: 1, bendArmR: -1, bendLegL: -1, bendLegR: 1,
  },
  // 2 right hand high
  {
    root: { x: 38, y: 36 }, headTilt: 8, torsoLean: 3, pelvisTwist: 3,
    handL: { x: 16, y: 28 }, handR: { x: 56, y: 6 },
    footL: { x: 26, y: 92 }, footR: { x: 54, y: 82 },
    bendArmL: 1, bendArmR: -1, bendLegL: -1, bendLegR: 1,
  },
  // 3 flag left
  {
    root: { x: 42, y: 34 }, headTilt: 6, torsoLean: 5, pelvisTwist: 6,
    handL: { x: 20, y: 22 }, handR: { x: 60, y: 6 },
    footL: { x: 18, y: 76 }, footR: { x: 50, y: 92 },
    bendArmL: 1, bendArmR: -1, bendLegL: 1, bendLegR: 1,
  },
  // 4 left hand high
  {
    root: { x: 42, y: 36 }, headTilt: -8, torsoLean: -3, pelvisTwist: -3,
    handL: { x: 24, y: 6 }, handR: { x: 64, y: 28 },
    footL: { x: 26, y: 82 }, footR: { x: 54, y: 92 },
    bendArmL: 1, bendArmR: -1, bendLegL: -1, bendLegR: 1,
  },
  // 5 match / rest
  {
    root: { x: 40, y: 38 }, headTilt: 0, torsoLean: 0, pelvisTwist: 0,
    handL: { x: 36, y: 16 }, handR: { x: 44, y: 16 },
    footL: { x: 20, y: 90 }, footR: { x: 60, y: 90 },
    bendArmL: 1, bendArmR: -1, bendLegL: -1, bendLegR: 1,
  },
  // 6 dyno
  {
    root: { x: 40, y: 34 }, headTilt: 0, torsoLean: 0, pelvisTwist: 0,
    handL: { x: 18, y: 4 }, handR: { x: 62, y: 4 },
    footL: { x: 28, y: 74 }, footR: { x: 52, y: 74 },
    bendArmL: 1, bendArmR: -1, bendLegL: -1, bendLegR: 1,
  },
];

function blendPose(p0, p1, t) {
  return {
    root: lerp2(p0.root, p1.root, t),
    headTilt: lerp(p0.headTilt, p1.headTilt, t),
    torsoLean: lerp(p0.torsoLean, p1.torsoLean, t),
    pelvisTwist: lerp(p0.pelvisTwist, p1.pelvisTwist, t),

    handL: lerp2(p0.handL, p1.handL, t),
    handR: lerp2(p0.handR, p1.handR, t),
    footL: lerp2(p0.footL, p1.footL, t),
    footR: lerp2(p0.footR, p1.footR, t),

    // Keep bend directions discrete (avoid elbow flipping mid-blend)
    bendArmL: t < 0.5 ? p0.bendArmL : p1.bendArmL,
    bendArmR: t < 0.5 ? p0.bendArmR : p1.bendArmR,
    bendLegL: t < 0.5 ? p0.bendLegL : p1.bendLegL,
    bendLegR: t < 0.5 ? p0.bendLegR : p1.bendLegR,
  };
}

/* ----- Main rig renderer ----- */
function ClimberRig({ pose }) {
  const L_UPPER_ARM = 14;
  const L_FOREARM   = 14;
  const L_THIGH     = 16;
  const L_CALF      = 16;

  const root = pose.root;
  const shoulders = { x: root.x, y: root.y };
  const pelvis = { x: root.x, y: root.y + 26 };

  const shoulderL = { x: shoulders.x - 8, y: shoulders.y + 2 };
  const shoulderR = { x: shoulders.x + 8, y: shoulders.y + 2 };
  const hipL = { x: pelvis.x - 5, y: pelvis.y + 2 };
  const hipR = { x: pelvis.x + 5, y: pelvis.y + 2 };

  const armL = solveIK2(shoulderL, pose.handL, L_UPPER_ARM, L_FOREARM, pose.bendArmL);
  const armR = solveIK2(shoulderR, pose.handR, L_UPPER_ARM, L_FOREARM, pose.bendArmR);
  const legL = solveIK2(hipL, pose.footL, L_THIGH, L_CALF, pose.bendLegL);
  const legR = solveIK2(hipR, pose.footR, L_THIGH, L_CALF, pose.bendLegR);

  const shoeAngL = (Math.atan2(pose.footL.y - legL.b.y, pose.footL.x - legL.b.x) * 180) / Math.PI;
  const shoeAngR = (Math.atan2(pose.footR.y - legR.b.y, pose.footR.x - legR.b.x) * 180) / Math.PI;

  return (
    <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Legs behind torso */}
      <g>
        <LimbStroke a={legL.a} b={legL.b} c={legL.c} baseColor={pants} shadowColor={pantSh} w1={5.6} w2={1.7} />
        <LimbStroke a={legR.a} b={legR.b} c={legR.c} baseColor={pants} shadowColor={pantSh} w1={5.6} w2={1.7} />
        <Shoe p={legL.c} angle={shoeAngL} />
        <Shoe p={legR.c} angle={shoeAngR} />
      </g>

      {/* Torso + pelvis */}
      <TorsoBack cx={root.x} cy={root.y} lean={pose.torsoLean} />
      <Pelvis cx={pelvis.x} cy={pelvis.y} twist={pose.pelvisTwist} />
      <ChalkBag cx={pelvis.x + 8} cy={pelvis.y + 6} />

      {/* Arms on top */}
      <g>
        <LimbStroke a={armL.a} b={armL.b} c={armL.c} baseColor={skin} shadowColor={skinSh} w1={4.6} w2={1.6} />
        <LimbStroke a={armR.a} b={armR.b} c={armR.c} baseColor={skin} shadowColor={skinSh} w1={4.6} w2={1.6} />
        <Hand p={armL.c} />
        <Hand p={armR.c} />
      </g>

      {/* Head */}
      <HeadBack cx={root.x} cy={root.y - 18} tilt={pose.headTilt} />

      {/* Chalk puffs when hands are high */}
      {pose.handL.y < 10 && <circle cx={pose.handL.x} cy={pose.handL.y} r="4" fill={chalk} opacity="0.15" />}
      {pose.handR.y < 10 && <circle cx={pose.handR.x} cy={pose.handR.y} r="4" fill={chalk} opacity="0.15" />}
    </svg>
  );
}

/* ----- Public component (same API) ----- */
export default function Climber({ climb }) {
  const bottomPct = 8 + climb * 78;

  const pose = useMemo(() => {
    const n = POSES.length;
    const idxFloat = clamp(climb, 0, 0.999999) * (n - 1);
    const i0 = Math.floor(idxFloat);
    const i1 = Math.min(i0 + 1, n - 1);
    const t = easeInOut(idxFloat - i0);
    return blendPose(POSES[i0], POSES[i1], t);
  }, [climb]);

  return (
    <div
      className="climber"
      aria-hidden="true"
      style={{
        bottom: `${bottomPct}%`,
        willChange: "transform",
        pointerEvents: "none",
      }}
    >
      <ClimberRig pose={pose} />
    </div>
  );
}