import { RapidRevisionItem } from '../types';

export const RAPID_REVISION_ITEMS: RapidRevisionItem[] = [
  // Red - Must Memorize
  {
    category: 'Thin Lens',
    topic: 'Two-Position Equal Size Images',
    latex: 'f = \\frac{u_1 + u_2}{2}',
    oneLineRule: 'Arithmetic mean of object distances when images have equal size $|m_1| = |m_2|$.',
    mustType: 'RED_MEMORIZE',
  },
  {
    category: 'Thin Lens',
    topic: 'Bessel Displacement Formula',
    latex: 'f = \\frac{D^2 - d^2}{4D}, \\quad O = \\sqrt{I_1 I_2}',
    oneLineRule: 'Screen separation $D > 4f$; lens shift $d$ between two sharp real images.',
    mustType: 'RED_MEMORIZE',
  },
  {
    category: 'Lens Maker',
    topic: 'Medium Immersion Ratio',
    latex: '\\frac{f_m}{f_a} = \\frac{(\\mu_L - 1)\\mu_m}{\\mu_L - \\mu_m} \\implies f_{water} = 4 f_{air} \\text{ ONLY when } \\mu_L = 1.5, \\mu_m = 4/3',
    oneLineRule: 'For the specific values $\\mu_g = 1.5$ and $\\mu_w = 4/3$, focal length becomes $4f_{air}$; for all other media, evaluate the general relative-index ratio.',
    mustType: 'RED_MEMORIZE',
  },
  {
    category: 'Separated Lenses',
    topic: 'Power with Separation d',
    latex: 'P_{eq} = P_1 + P_2 - d P_1 P_2',
    oneLineRule: 'SI dimensional consistency: $d$ MUST be in METRES when $P$ is in Dioptres ($1\\text{ D} = 1\\text{ m}^{-1}$). If using cm with focal lengths: $\\frac{1}{F_{eq}} = \\frac{1}{f_1} + \\frac{1}{f_2} - \\frac{d}{f_1 f_2}$.',
    mustType: 'RED_MEMORIZE',
  },
  {
    category: 'Silvered Lens',
    topic: 'Equivalent Power and Focal Length',
    latex: 'P_{eq} = 2P_L + P_M, \\quad F_{eq} = -\\frac{1}{P_{eq}}',
    oneLineRule: 'Equivalent system is always a MIRROR. Converging mirror has $P_{eq} > 0$ and $F_{eq} < 0$; diverging mirror has $P_{eq} < 0$ and $F_{eq} > 0$.',
    mustType: 'RED_MEMORIZE',
  },
  {
    category: 'Prisms',
    topic: 'Condition for Total Internal Reflection at Second Face (No Emergence)',
    latex: 'A > 2\\theta_c \\implies A > 2\\sin^{-1}(1/\\mu)',
    oneLineRule: 'When prism angle $A > 2\\theta_c$, TIR occurs at the second surface for ALL angles of incidence $i \\in [0, 90^\\circ]$. Ray can emerge only if $A \\le 2\\theta_c$.',
    mustType: 'RED_MEMORIZE',
  },
  {
    category: 'Prisms',
    topic: 'Dispersion without Deviation',
    latex: 'A\' = -\\frac{\\mu_y - 1}{\\mu\'_y - 1}A',
    oneLineRule: 'Direct-vision prism pair: net mean yellow deviation $(\\mu_y - 1)A + (\\mu\'_y - 1)A\' = 0$; net angular dispersion $(\\mu_v - \\mu_r)A + (\\mu\'_v - \\mu\'_r)A\' \\ne 0$.',
    mustType: 'RED_MEMORIZE',
  },
  {
    category: 'Plane Refraction',
    topic: 'Multi-layer Apparent Depth (Near-Normal Viewing)',
    latex: 'd_{app} = \\sum_{i=1}^n \\frac{d_i}{\\mu_i} \\quad (\\text{Paraxial / Near-Normal Observation})',
    oneLineRule: 'Valid strictly for paraxial rays viewed near-normally through parallel planar layers; average refractive index is invalid.',
    mustType: 'RED_MEMORIZE',
  },
  {
    category: 'Optical Instruments',
    topic: 'Astronomical Telescope Normal Adjustment',
    latex: 'M = -\\frac{f_o}{f_e} \\quad (|M| = f_o/f_e), \\quad L = f_o + f_e',
    oneLineRule: 'Objective focal length is large ($f_o \\gg f_e$); image at infinity; negative sign signifies inverted final image.',
    mustType: 'RED_MEMORIZE',
  },
  {
    category: 'Spherical Mirrors',
    topic: 'Newton\'s Formula',
    latex: 'x_1 \\cdot x_2 = f^2',
    oneLineRule: '$x_1, x_2$ are distances measured strictly from the FOCUS $F$, not the pole.',
    mustType: 'RED_MEMORIZE',
  },

  // Yellow - Must Understand
  {
    category: 'Lens Cutting',
    topic: 'Horizontal vs Vertical Split Mechanism',
    latex: '\\text{Vertical: } R_2 \\to \\infty \\implies f\'=2f, I\'=I; \\quad \\text{Horizontal: Curvature intact} \\implies f\'=f, I\'=I/2',
    oneLineRule: 'Vertical transverse cut halves curvature ($f\'=2f$, single half keeps full aperture diameter so $I\'=I$). Horizontal longitudinal cut preserves curvature ($f\'=f$), but halves area ($I\'=I/2$).',
    mustType: 'YELLOW_UNDERSTAND',
  },
  {
    category: 'Curved Surfaces',
    topic: 'Lateral Magnification Index Ratio',
    latex: 'm = \\frac{\\mu_1 v}{\\mu_2 u}',
    oneLineRule: 'Snell\'s law at curved boundary links ray angles to object and image heights with refractive indices.',
    mustType: 'YELLOW_UNDERSTAND',
  },
  {
    category: 'Medium Immersion',
    topic: 'Nature Reversal in Denser Liquid',
    latex: '\\frac{1}{f_m} \\propto \\left(\\frac{\\mu_L}{\\mu_m} - 1\\right)',
    oneLineRule: 'If surrounding medium is denser than lens ($\\mu_m > \\mu_L$), bracket flips sign; convex diverges.',
    mustType: 'YELLOW_UNDERSTAND',
  },
  {
    category: 'Achromatic Doublet',
    topic: 'Contact Achromatism Condition',
    latex: '\\frac{\\omega_1}{f_1} + \\frac{\\omega_2}{f_2} = 0',
    oneLineRule: 'Because $\\omega > 0$ always, $f_1$ and $f_2$ must have opposite signs (one convex, one concave).',
    mustType: 'YELLOW_UNDERSTAND',
  },
  {
    category: 'Plane Mirrors',
    topic: 'Ray Rotation & Mirror Translation',
    latex: '\\Delta \\theta_{ray} = 2\\theta_{mirror}, \\quad \\Delta x_{image} = 2\\Delta x_{mirror}',
    oneLineRule: 'Reflection symmetry doubles both angular rotation of mirror and axial translation.',
    mustType: 'YELLOW_UNDERSTAND',
  },

  // Green - Must Recognize
  {
    category: 'Question Trigger',
    topic: '“Object at two positions gives same size images”',
    latex: 'f = \\frac{u_1 + u_2}{2}',
    oneLineRule: 'Instant trigger: one image is real ($m=-k$), other is virtual ($m=+k$). Average the distances.',
    mustType: 'GREEN_RECOGNIZE',
  },
  {
    category: 'Question Trigger',
    topic: '“One face of lens is silvered”',
    latex: 'P_{eq} = 2P_L + P_M, \\quad F_{eq} = -1/P_{eq}',
    oneLineRule: 'Instant trigger: solve as concave/convex MIRROR using $\\frac{1}{v}+\\frac{1}{u}=\\frac{1}{F_{eq}}$.',
    mustType: 'GREEN_RECOGNIZE',
  },
  {
    category: 'Question Trigger',
    topic: '“Ray emerges tangentially / Grazing emergence”',
    latex: 'e = 90^\\circ \\implies r_2 = C = \\sin^{-1}(1/\\mu)',
    oneLineRule: 'Instant trigger: pin $r_2$ to critical angle $C$; then $r_1 = A - C$ and $\\sin i = \\mu \\sin(A - C)$.',
    mustType: 'GREEN_RECOGNIZE',
  },
  {
    category: 'Question Trigger',
    topic: '“Speeds of light in two media given as $v_1, v_2$”',
    latex: '\\sin C = \\frac{v_{smaller}}{v_{larger}}',
    oneLineRule: 'Instant trigger: smaller velocity over larger velocity. Sine can never exceed 1.',
    mustType: 'GREEN_RECOGNIZE',
  },
];
