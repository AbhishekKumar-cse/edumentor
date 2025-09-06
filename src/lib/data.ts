
export type Question = {
  id: number;
  text: string;
  options: string[];
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pageReference: number;
  concepts: string[];
  isPastPaper: boolean;
};

export type Chapter = {
  id: number;
  name: string;
  questions: Question[];
};

export type Subject = {
  id: number;
  name: string;
  chapters: Chapter[];
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
    chapters: [
      {
        id: 101,
        name: 'Kinematics',
        questions: [
          // Easy: 60 questions
          { id: 101001, text: 'Define instantaneous velocity.', options: ['Velocity over a long time interval', 'The velocity at a specific instant in time', 'Average velocity', 'Total distance divided by total time'], answer: 'The velocity at a specific instant in time', difficulty: 'Easy', pageReference: 12, concepts: ['velocity'], isPastPaper: false },
          { id: 101002, text: 'What does the area under a velocity-time graph represent?', options: ['Acceleration', 'Displacement', 'Jerk', 'Force'], answer: 'Displacement', difficulty: 'Easy', pageReference: 21, concepts: ['v-t graph'], isPastPaper: false },
          { id: 101003, text: 'Can an object have zero velocity and still be accelerating?', options: ['Yes', 'No', 'Only at the equator', 'Only in a vacuum'], answer: 'Yes', difficulty: 'Easy', pageReference: 26, concepts: ['acceleration', 'velocity'], isPastPaper: false },
          { id: 101004, text: 'What is uniform circular motion?', options: ['Motion in a circle with constant velocity', 'Motion in a circle with constant speed', 'Motion in a circle with constant acceleration', 'Motion with changing radius'], answer: 'Motion in a circle with constant speed', difficulty: 'Easy', pageReference: 31, concepts: ['circular motion'], isPastPaper: false },
          { id: 101005, text: 'A car travels a distance S on a straight road in time t. It then returns to the starting point. What is the displacement?', options: ['S', '2S', 'S/2', '0'], answer: '0', difficulty: 'Easy', pageReference: 10, concepts: ['displacement', 'distance'], isPastPaper: false },
          { id: 101006, text: 'What is the time of flight of a projectile?', options: ['The time it takes to reach maximum height', 'The total time the projectile is in the air', 'The time it takes to travel its range', 'Half the total time'], answer: 'The total time the projectile is in the air', difficulty: 'Easy', pageReference: 34, concepts: ['projectile motion'], isPastPaper: false },
          { id: 101007, text: 'Is it possible for the displacement to be zero but not the distance?', options: ['Yes', 'No', 'Only for circular motion', 'Depends on the speed'], answer: 'Yes', difficulty: 'Easy', pageReference: 11, concepts: ['displacement', 'distance'], isPastPaper: false },
          { id: 101008, text: 'What is the relation between linear velocity (v) and angular velocity (ω)?', options: ['v = ω / r', 'v = r / ω', 'v = ω * r', 'v = ω + r'], answer: 'v = ω * r', difficulty: 'Easy', pageReference: 30, concepts: ['circular motion'], isPastPaper: false },
          { id: 101009, text: 'What is the physical quantity that corresponds to the rate of change of displacement?', options: ['Speed', 'Velocity', 'Acceleration', 'Jerk'], answer: 'Velocity', difficulty: 'Easy', pageReference: 12, concepts: ['velocity'], isPastPaper: false },
          { id: 101010, text: 'What is the acceleration of a body moving with uniform velocity?', options: ['Zero', 'Constant', 'Increasing', 'Decreasing'], answer: 'Zero', difficulty: 'Easy', pageReference: 15, concepts: ['acceleration', 'uniform velocity'], isPastPaper: false },
        ]
      },
      {
        id: 102,
        name: 'Laws of Motion',
        questions: [
            { id: 102001, text: 'What is inertia?', options: ['The property of a body to resist changes in its state of rest or uniform motion', 'The force acting on a body', 'The acceleration of a body', 'The mass of a body'], answer: 'The property of a body to resist changes in its state of rest or uniform motion', difficulty: 'Easy', pageReference: 45, concepts: ['inertia', 'newton first law'], isPastPaper: false },
            { id: 102002, text: 'State Newton\'s first law of motion.', options: ['F=ma', 'For every action, there is an equal and opposite reaction', 'A body at rest stays at rest, a body in motion stays in motion', 'Force is the rate of change of momentum'], answer: 'A body at rest stays at rest, a body in motion stays in motion', difficulty: 'Easy', pageReference: 46, concepts: ['newton first law'], isPastPaper: false },
        ]
      },
       {
        id: 103,
        name: 'Work, Power, and Energy',
        questions: [
            { id: 103001, text: 'What is the SI unit of work?', options: ['Watt', 'Newton', 'Joule', 'Pascal'], answer: 'Joule', difficulty: 'Easy', pageReference: 65, concepts: ['work'], isPastPaper: false },
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Chemistry',
    chapters: [
      {
        id: 201,
        name: 'Some Basic Concepts of Chemistry',
        questions: [
            { id: 201001, text: 'What is matter?', options: ['Anything that has mass and occupies space', 'Anything that can be seen', 'Only solids and liquids', 'Energy'], answer: 'Anything that has mass and occupies space', difficulty: 'Easy', pageReference: 2, concepts: ['matter'], isPastPaper: false },
        ]
      },
    ]
  },
  {
    id: 3,
    name: 'Mathematics',
    chapters: [
      {
        id: 301,
        name: 'Sets, Relations and Functions',
        questions: [
            { id: 301001, text: 'If A = {1, 2, 3} and B = {3, 4, 5}, find A ∪ B.', options: ['{1, 2, 3, 4, 5}', '{3}', '{1, 2, 4, 5}', '{}'], answer: '{1, 2, 3, 4, 5}', difficulty: 'Easy', pageReference: 5, concepts: ['sets', 'union'], isPastPaper: false },
        ]
      },
    ]
  }
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
                    { name: 'Newton\'s Second Law', formula: 'F = ma = dp/dt', derivation: 'Force is directly proportional to the rate of change of momentum.' },
                    { name: 'Impulse', formula: 'J = FΔt = Δp', derivation: 'Change in momentum produced by a force acting for a short duration.' },
                    { name: 'Static Friction', formula: 'f_s ≤ μ_s * N', derivation: 'Frictional force that prevents an object from starting to move.' },
                    { name: 'Kinetic Friction', formula: 'f_k = μ_k * N', derivation: 'Frictional force that opposes motion when an object is sliding.' },
                    { name: 'Centripetal Force', formula: 'F_c = mv^2/r', derivation: 'The net force required to keep an object in uniform circular motion.' },
                    { name: 'Banking Angle', formula: 'tan(θ) = v^2 / (rg)', derivation: 'The angle at which a curved road is banked to provide necessary centripetal force.' },
                ]
            },
            {
                name: 'Work, Energy, and Power',
                formulae: [
                    { name: 'Work Done by Constant Force', formula: 'W = F · d = Fd cos(θ)', derivation: 'Dot product of force and displacement vectors.' },
                    { name: 'Kinetic Energy', formula: 'K = (1/2)mv^2', derivation: 'Energy of an object due to its motion.' },
                    { name: 'Work-Energy Theorem', formula: 'W_net = ΔK', derivation: 'The net work done on an object equals the change in its kinetic energy.' },
                    { name: 'Gravitational Potential Energy', formula: 'U = mgh', derivation: 'Energy stored by an object due to its position in a gravitational field.' },
                    { name: 'Elastic Potential Energy', formula: 'U = (1/2)kx^2', derivation: 'Energy stored in a spring when it is compressed or stretched.' },
                    { name: 'Conservation of Mechanical Energy', formula: 'K_i + U_i = K_f + U_f', derivation: 'If only conservative forces are acting, the total mechanical energy is constant.' },
                    { name: 'Power', formula: 'P = dW/dt = F · v', derivation: 'The rate at which work is done or energy is transferred.' },
                    { name: 'Coefficient of Restitution', formula: 'e = (v2 - v1) / (u1 - u2)', derivation: 'Ratio of relative velocity of separation to relative velocity of approach during a collision.' },
                ]
            },
            {
                name: 'Thermodynamics',
                formulae: [
                    { name: 'First Law of Thermodynamics', formula: 'ΔQ = ΔU + ΔW', derivation: 'A statement of the conservation of energy for thermodynamic systems.' },
                    { name: 'Work Done by Gas', formula: 'W = ∫ P dV', derivation: 'Work done during a volume change is the area under the P-V curve.' },
                    { name: 'Ideal Gas Law', formula: 'PV = nRT', derivation: 'Relates pressure, volume, and temperature for an ideal gas.' },
                    { name: 'Adiabatic Process', formula: 'PV^γ = constant', derivation: 'Describes a process with no heat exchange with the surroundings.' },
                    { name: 'Mayer\'s Relation', formula: 'Cp - Cv = R', derivation: 'Relates the two principal specific heats for an ideal gas.' },
                    { name: 'Carnot Engine Efficiency', formula: 'η = 1 - (T_cold / T_hot)', derivation: 'The maximum possible efficiency for a heat engine operating between two temperatures.' },
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

    