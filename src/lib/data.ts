
import { electrostaticsQuestions } from './data/electrostatics';
import { moleConceptQuestions } from './data/mole-concept';
import { atomicStructureQuestions } from './data/atomic-structure';
import { chemicalBondingQuestions } from './data/chemical-bonding';
import { statesOfMatterQuestions } from './data/states-of-matter';
import { thermodynamicsQuestions } from './data/thermodynamics';
import { chemicalEquilibriumQuestions } from './data/chemical-equilibrium';
import { ionicEquilibriumQuestions } from './data/ionic-equilibrium';
import { solutionsQuestions } from './data/solutions';
import { redoxAndElectrochemistryQuestions } from './data/redox-and-electrochemistry';
import { generalOrganicChemistryQuestions } from './data/general-organic-chemistry';
import { lawsOfMotionQuestions } from './data/laws-of-motion';
import { coordinationCompoundQuestions } from './data/inorganic-chemistry/coordination-compounds';
import { alcoholsPhenolsEthersQuestions } from './data/alcohols-phenols-ethers';
import { workPowerEnergyQuestions } from './data/work-power-energy';
import { rotationalMotionQuestions } from './data/rotational-motion';
import { gravitationQuestions } from './data/gravitation';
import { currentElectricityQuestions } from './data/current-electricity';
import { oscillationsAndWavesQuestions } from './data/oscillations-and-waves';
import { opticsQuestions } from './data/optics';
import { rayOpticsQuestions } from './data/ray-optics';
import { modernPhysicsQuestions } from './data/modern-physics';
import { kinematicsQuestions } from './data/kinematics';
import { capacitorQuestions } from './data/capacitors';
import { magneticEffectsQuestions } from './data/magnetic-effects';
import { emiAcQuestions } from './data/electromagnetic-induction-ac';
import { electromagneticWavesQuestions } from './data/electromagnetic-waves';
import { atomsAndNucleiQuestions } from './data/atoms-and-nuclei';


export type Question = {
  id: number;
  text: string;
  options: string[];
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pageReference: number;
  concepts: string[];
  isPastPaper: boolean;
  explanation?: string;
};

export type Chapter = {
  id: number;
  name: string;
  questions: Question[];
};

export type Unit = {
    id: number;
    name: string;
    chapters: Chapter[];
}

export type Subject = {
  id: number;
  name:string;
  units: Unit[];
  chapters: Chapter[]; // Keep flat list for backward compatibility with other components
};

export type Formula = {
    name: string;
    formula: string;
    derivation: string;
}

export type FormulaTopic = {
    name: string;
    formulae: Formula[];
}

export type FormulaSubject = {
    subject: string;
    topics: FormulaTopic[];
}


export const subjects: Subject[] = [
  {
    id: 1,
    name: 'Physics',
    units: [
        {
            id: 10,
            name: 'Mechanics 1',
            chapters: [
              kinematicsQuestions,
              lawsOfMotionQuestions,
              workPowerEnergyQuestions,
            ]
        },
        {
            id: 11,
            name: 'Mechanics 2',
            chapters: [
                rotationalMotionQuestions,
                gravitationQuestions,
            ]
        },
        {
            id: 12,
            name: 'Thermodynamics & Gases',
            chapters: [
                thermodynamicsQuestions,
                statesOfMatterQuestions,
                { id: 108, name: 'Kinetic Theory of Gases', questions: [] },
            ]
        },
        {
            id: 13,
            name: 'Waves & Optics',
            chapters: [
                 oscillationsAndWavesQuestions,
                 rayOpticsQuestions,
                 opticsQuestions,
            ]
        },
        {
            id: 14,
            name: 'Electromagnetism',
            chapters: [
                electrostaticsQuestions,
                currentElectricityQuestions,
                capacitorQuestions,
                magneticEffectsQuestions,
                emiAcQuestions,
                electromagneticWavesQuestions,
            ]
        },
        {
            id: 15,
            name: 'Modern Physics',
            chapters: [
                 modernPhysicsQuestions,
                 atomsAndNucleiQuestions,
                 { id: 118, name: 'Electronic Devices', questions: [] },
            ]
        },
        {
            id: 16,
            name: 'Miscellaneous',
            chapters: [
                { id: 119, name: 'Communication Systems', questions: [] },
            ]
        }
    ],
    chapters: [
      kinematicsQuestions,
      lawsOfMotionQuestions,
      workPowerEnergyQuestions,
      rotationalMotionQuestions,
      gravitationQuestions,
      {
        id: 106,
        name: 'Properties of Solids and Liquids',
        questions: []
      },
      thermodynamicsQuestions,
      {
        id: 108,
        name: 'Kinetic Theory of Gases',
        questions: []
      },
      oscillationsAndWavesQuestions,
      electrostaticsQuestions,
      currentElectricityQuestions,
      capacitorQuestions,
      magneticEffectsQuestions,
      emiAcQuestions,
      electromagneticWavesQuestions,
      opticsQuestions,
      rayOpticsQuestions,
      modernPhysicsQuestions,
      atomsAndNucleiQuestions,
      {
        id: 118,
        name: 'Electronic Devices',
        questions: []
      },
      {
        id: 119,
        name: 'Communication Systems',
        questions: []
      },
    ]
  },
  {
    id: 2,
    name: 'Chemistry',
    units: [
        {
            id: 20,
            name: 'Physical Chemistry 1',
            chapters: [
                moleConceptQuestions,
                atomicStructureQuestions,
                statesOfMatterQuestions,
                thermodynamicsQuestions,
            ]
        },
        {
            id: 21,
            name: 'Physical Chemistry 2',
            chapters: [
                chemicalEquilibriumQuestions,
                ionicEquilibriumQuestions,
                solutionsQuestions,
                redoxAndElectrochemistryQuestions,
            ]
        },
        {
            id: 22,
            name: 'Inorganic Chemistry',
            chapters: [
                chemicalBondingQuestions,
                coordinationCompoundQuestions,
            ]
        },
        {
            id: 23,
            name: 'Organic Chemistry',
            chapters: [
                generalOrganicChemistryQuestions,
                alcoholsPhenolsEthersQuestions,
            ]
        },
    ],
    chapters: [
      moleConceptQuestions,
      atomicStructureQuestions,
      chemicalBondingQuestions,
      statesOfMatterQuestions,
      thermodynamicsQuestions,
      chemicalEquilibriumQuestions,
      ionicEquilibriumQuestions,
      solutionsQuestions,
      redoxAndElectrochemistryQuestions,
      generalOrganicChemistryQuestions,
      coordinationCompoundQuestions,
      alcoholsPhenolsEthersQuestions,
    ]
  },
  {
    id: 3,
    name: 'Mathematics',
    units: [
        {
            id: 30,
            name: 'Algebra & Functions',
            chapters: [
                { id: 301, name: 'Sets, Relations and Functions', questions: [] },
            ]
        },
         {
            id: 31,
            name: 'Trigonometry',
            chapters: [
                { id: 302, name: 'Trigonometry', questions: [] },
            ]
        },
         {
            id: 32,
            name: 'Calculus',
            chapters: [
                { id: 303, name: 'Calculus', questions: [] },
            ]
        }
    ],
    chapters: [
      {
        id: 301,
        name: 'Sets, Relations and Functions',
        questions: [
            { id: 301001, text: 'If A = {1, 2, 3} and B = {3, 4, 5}, find A ∪ B.', options: ['{1, 2, 3, 4, 5}', '{3}', '{1, 2, 4, 5}', '{}'], answer: '{1, 2, 3, 4, 5}', difficulty: 'Easy', pageReference: 5, concepts: ['sets', 'union'], isPastPaper: false },
            { id: 301002, text: 'Let R be a relation on the set N of natural numbers defined by nRm if n divides m. Then R is:', options: ['Reflexive and symmetric', 'Transitive and symmetric', 'Equivalence', 'Reflexive, transitive but not symmetric'], answer: 'Reflexive, transitive but not symmetric', difficulty: 'Medium', pageReference: 10, concepts: ['relations', 'equivalence relation'], isPastPaper: true },
            { id: 301003, text: 'The function f: R → R defined by f(x) = x² is:', options: ['One-one and onto', 'One-one but not onto', 'Not one-one but onto', 'Neither one-one nor onto'], answer: 'Neither one-one nor onto', difficulty: 'Easy', pageReference: 15, concepts: ['functions', 'one-one', 'onto'], isPastPaper: true },
        ]
      },
      {
        id: 302,
        name: 'Trigonometry',
        questions: [
            { id: 302001, text: 'The value of sin(75°) is:', options: ['(√3+1)/2√2', '(√3-1)/2√2', '(1-√3)/2√2', '(√3+√2)/2'], answer: '(√3+1)/2√2', difficulty: 'Easy', pageReference: 45, concepts: ['trigonometric functions'], isPastPaper: false },
            { id: 302002, text: 'If tan(A) = 3/4 and A is in the third quadrant, the value of sin(A) is:', options: ['3/5', '-3/5', '4/5', '-4/5'], answer: '-3/5', difficulty: 'Medium', pageReference: 48, concepts: ['trigonometric identities'], isPastPaper: true },
        ]
      },
       {
        id: 303,
        name: 'Calculus',
        questions: [
            { id: 303001, text: 'The derivative of x³ with respect to x is:', options: ['3x²', 'x²', '3x', 'x³/3'], answer: '3x²', difficulty: 'Easy', pageReference: 90, concepts: ['differentiation'], isPastPaper: false },
            { id: 303002, text: 'The integral of cos(x) with respect to x is:', options: ['sin(x) + C', '-sin(x) + C', 'cos(x) + C', '-cos(x) + C'], answer: 'sin(x) + C', difficulty: 'Easy', pageReference: 100, concepts: ['integration'], isPastPaper: false },
        ]
      }
    ]
  },
];

export const formulas: FormulaSubject[] = [
    {
        subject: 'Physics',
        topics: [
            {
                name: 'Kinematics',
                formulae: [
                    { name: 'First Equation of Motion', formula: 'v = u + at', derivation: 'Derived from the definition of acceleration a = (v-u)/t.' },
                    { name: 'Second Equation of Motion', formula: 's = ut + (1/2)at^2', derivation: 'Derived by integrating the velocity equation with respect to time.' },
                    { name: 'Third Equation of Motion', formula: 'v^2 = u^2 + 2as', derivation: 'Derived by eliminating time from the first two equations of motion.' },
                    { name: 'Displacement in nth second', formula: 's_n = u + a(n - 1/2)', derivation: 'Calculated as the difference between displacement in n seconds and (n-1) seconds.' },
                    { name: 'Relative Velocity', formula: 'v_AB = v_A - v_B', derivation: 'Velocity of A with respect to B is the vector difference of their velocities.' },
                    { name: 'Horizontal Range of Projectile', formula: 'R = (u^2 * sin(2θ)) / g', derivation: 'Product of horizontal velocity and time of flight.' },
                    { name: 'Maximum Height of Projectile', formula: 'H = (u^2 * sin^2(θ)) / (2g)', derivation: 'Derived from the third equation of motion in the vertical direction.' },
                    { name: 'Time of Flight of Projectile', formula: 'T = (2u * sin(θ)) / g', derivation: 'Twice the time taken to reach the maximum height.' },
                    { name: 'Centripetal Acceleration', formula: 'a_c = v^2/r = rω^2', derivation: 'Rate of change of the direction of velocity in uniform circular motion.' },
                ]
            },
            {
                name: 'Laws of Motion',
                formulae: [
                     {
                        name: 'Newton\'s Second Law',
                        formula: 'F = ma = dp/dt',
                        derivation: 'This is a fundamental law based on experimental observations. F ∝ dp/dt. The constant of proportionality is taken as 1.'
                    },
                    {
                        name: 'Friction',
                        formula: 'Static Friction: f_s ≤ μ_s * N\nKinetic Friction: f_k = μ_k * N',
                        derivation: 'Friction is an empirical force. The formulas are approximations based on observation. The static friction adjusts itself to be equal to the applied force up to a maximum limit (limiting friction).'
                    },
                     {
                        name: 'Centripetal Force',
                        formula: 'F_c = mv^2/r',
                        derivation: 'Derived from the centripetal acceleration a_c = v²/r, and Newton\'s Second Law, F=ma.'
                    },
                ]
            },
            {
                name: 'Work, Power, and Energy',
                formulae: [
                     {
                        name: 'Work-Energy Theorem',
                        formula: 'W_net = ΔK = (1/2)mv_f^2 - (1/2)mv_i^2',
                        derivation: 'Derived by integrating Newton\'s Second Law with respect to displacement. W = ∫ F dx = ∫ m(dv/dt) dx = ∫ m v dv = (1/2)mv².'
                    },
                    {
                        name: 'Conservation of Mechanical Energy',
                        formula: 'K_i + U_i = K_f + U_f',
                        derivation: 'This follows from the work-energy theorem where the work done by conservative forces is equal to the negative change in potential energy (W_c = -ΔU).'
                    },
                    {
                        name: 'Power',
                        formula: 'P_avg = W/Δt, P_inst = dW/dt = F · v',
                        derivation: 'Power is the time derivative of work. P = d/dt(F·s) = F · (ds/dt) = F·v for a constant force.'
                    }
                ]
            },
            {
                name: 'Rotational Motion',
                formulae: [
                    {
                        name: 'Torque (Moment of Force)',
                        formula: 'τ = r x F = rFsin(θ)',
                        derivation: 'Defined as the cross product of the position vector (r) from the axis of rotation to the point of force application and the force vector (F).'
                    },
                    {
                        name: 'Moment of Inertia',
                        formula: 'I = Σ m_i * r_i^2 (for discrete masses)\nI = ∫ r^2 dm (for continuous bodies)',
                        derivation: 'Derived from the expression for rotational kinetic energy, K_rot = (1/2)Iω², analogous to K_trans = (1/2)mv².'
                    },
                    {
                        name: 'Angular Momentum',
                        formula: 'L = r x p = Iω',
                        derivation: 'For a single particle, L = r x p. For a rigid body rotating about an axis, this simplifies to L = Iω.'
                    },
                    {
                        name: 'Conservation of Angular Momentum',
                        formula: 'If τ_ext = 0, then L = constant (I₁ω₁ = I₂ω₂)',
                        derivation: 'Derived from Newton\'s second law for rotation, τ = dL/dt. If τ = 0, then dL/dt = 0, which means L is constant.'
                    }
                ]
            }
        ]
    },
    {
        subject: 'Chemistry',
        chapters: [
            {
                name: 'Mole Concept',
                formulae: [
                    {
                        name: 'The Mole and Avogadro\'s Number',
                        formula: '1 mole = 6.022 x 10²³ particles',
                        derivation: 'Based on the number of atoms in exactly 12 grams of Carbon-12. It serves as a bridge between the microscopic world of atoms and the macroscopic world of grams.'
                    },
                    {
                        name: 'Molar Mass',
                        formula: 'Molar Mass (M) = Mass (m) / Moles (n)',
                        derivation: 'It is a fundamental conversion factor used in stoichiometry to relate mass to moles.'
                    },
                    {
                        name: 'Empirical and Molecular Formulas',
                        formula: 'Molecular Formula = n * (Empirical Formula)\nn = Molar Mass / Empirical Formula Mass',
                        derivation: 'Determined experimentally through elemental analysis (e.g., combustion analysis) and by knowing the molar mass of the compound.'
                    }
                ]
            },
            {
                name: 'Atomic Structure',
                formulae: [
                    {
                        name: 'Bohr Model of the Atom',
                        formula: 'Energy in nth orbit: E_n = -R_H * (Z^2 / n^2)\nRadius of nth orbit: r_n = (n^2 * a_0) / Z',
                        derivation: 'Derived by combining classical mechanics for circular motion with the quantization of angular momentum (mvr = nh/2π).'
                    },
                    {
                        name: 'Quantum Numbers',
                        formula: 'Principal (n) = 1, 2, 3...\nAzimuthal (l) = 0 to n-1\nMagnetic (m_l) = -l to +l\nSpin (m_s) = +1/2, -1/2',
                        derivation: 'The first three quantum numbers arise as solutions to the Schrödinger wave equation for the hydrogen atom. The spin quantum number was added to explain experimental observations (Stern-Gerlach experiment).'
                    },
                    {
                        name: 'Heisenberg Uncertainty Principle',
                        formula: 'Δx * Δp ≥ h / 4π',
                        derivation: 'A fundamental principle of quantum mechanics, arising from the wave-particle duality of matter. It is not a limitation of measurement devices but an inherent property of nature.'
                    }
                ]
            },
            {
                name: 'Chemical Bonding',
                formulae: [
                    {
                        name: 'VSEPR Theory',
                        formula: 'Repulsion order: Lone Pair-Lone Pair > Lone Pair-Bond Pair > Bond Pair-Bond Pair',
                        derivation: 'Based on the principle that electron pairs in the valence shell of an atom repel each other and will arrange themselves to be as far apart as possible, minimizing repulsion and determining the molecular geometry.'
                    },
                    {
                        name: 'Hybridization',
                        formula: 'sp (linear), sp² (trigonal planar), sp³ (tetrahedral)',
                        derivation: 'A mathematical model proposed to explain the observed bond angles in molecules, such as the 109.5° angle in methane, which cannot be explained by the overlap of simple s and p orbitals.'
                    },
                    {
                        name: 'Molecular Orbital Theory (MOT)',
                        formula: 'Bond Order = 1/2 * (No. of bonding e⁻ - No. of antibonding e⁻)',
                        derivation: 'Based on the linear combination of atomic orbitals (LCAO) approximation. Atomic orbitals combine to form an equal number of molecular orbitals (bonding and antibonding), which are filled by electrons according to the Aufbau principle and Hund\'s rule.'
                    }
                ]
            }
        ]
    }
];

export const conceptMaps = [
    {
        subject: 'Physics',
        maps: [
            { name: 'Relationship between Force, Mass, and Acceleration', imageUrl: 'https://picsum.photos/600/400', 'data-ai-hint': 'physics flowchart' },
        ]
    },
    {
        subject: 'Chemistry',
        maps: [
            { name: 'Types of Chemical Bonds', imageUrl: 'https://picsum.photos/600/400', 'data-ai-hint': 'chemistry mindmap' },
        ]
    }
]


    

    
