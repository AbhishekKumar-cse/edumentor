export type Question = {
  id: number;
  text: string;
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

export const subjects: Subject[] = [
  {
    id: 1,
    name: 'Physics',
    chapters: [
      {
        id: 101,
        name: 'Kinematics',
        questions: [
          { id: 1001, text: 'A car accelerates from rest to 20 m/s in 10 seconds. What is its acceleration?', difficulty: 'Easy', pageReference: 15, concepts: ['acceleration', 'velocity'], isPastPaper: false },
          { id: 1002, text: 'Calculate the displacement of a particle whose velocity-time graph is a straight line with a positive slope.', difficulty: 'Medium', pageReference: 22, concepts: ['displacement', 'v-t graph'], isPastPaper: true },
          { id: 1003, text: 'A projectile is fired at an angle of 45 degrees with an initial velocity of 100 m/s. Find the maximum height reached.', difficulty: 'Hard', pageReference: 35, concepts: ['projectile motion', 'max height'], isPastPaper: true },
          { id: 1004, text: 'An object is dropped from a height of 80m. How long does it take to reach the ground? (g=10m/s^2)', difficulty: 'Medium', pageReference: 25, concepts: ['free fall', 'kinematic equations'], isPastPaper: false },
        ],
      },
      {
        id: 102,
        name: 'Laws of Motion',
        questions: [
          { id: 1005, text: "State Newton's First Law of Motion.", difficulty: 'Easy', pageReference: 45, concepts: ["Newton's laws"], isPastPaper: false },
          { id: 1006, text: 'A 5kg block is pulled by a 20N force on a frictionless surface. What is the acceleration?', difficulty: 'Medium', pageReference: 52, concepts: ["Newton's second law", 'force'], isPastPaper: false },
          { id: 1007, text: 'What is the net force on a car traveling at a constant velocity of 60 km/h?', difficulty: 'Easy', pageReference: 48, concepts: ["Newton's first law", 'net force'], isPastPaper: false },
        ],
      },
      {
        id: 103,
        name: 'Work, Energy, and Power',
        questions: [
            { id: 1008, text: 'Define kinetic energy and potential energy.', difficulty: 'Easy', pageReference: 70, concepts: ['kinetic energy', 'potential energy'], isPastPaper: false },
            { id: 1009, text: 'A 2kg object is lifted to a height of 5m. Calculate the work done against gravity. (g=10m/s^2)', difficulty: 'Medium', pageReference: 75, concepts: ['work done', 'potential energy'], isPastPaper: true },
        ]
      }
    ],
  },
  {
    id: 2,
    name: 'Chemistry',
    chapters: [
      {
        id: 201,
        name: 'Atomic Structure',
        questions: [
          { id: 2001, text: 'What are the three main subatomic particles?', difficulty: 'Easy', pageReference: 12, concepts: ['atom', 'subatomic particles'], isPastPaper: false },
          { id: 2002, text: 'Explain the difference between an isotope and an ion.', difficulty: 'Medium', pageReference: 18, concepts: ['isotope', 'ion'], isPastPaper: true },
          { id: 2003, text: 'How many neutrons are in an atom of Carbon-14?', difficulty: 'Medium', pageReference: 19, concepts: ['isotope', 'atomic mass'], isPastPaper: false },
        ],
      },
      {
        id: 202,
        name: 'Chemical Bonding',
        questions: [
            { id: 2004, text: 'Describe the formation of an ionic bond.', difficulty: 'Easy', pageReference: 30, concepts: ['ionic bond'], isPastPaper: false },
            { id: 2005, text: 'Draw the Lewis structure for a water molecule (H2O).', difficulty: 'Medium', pageReference: 41, concepts: ['lewis structure', 'covalent bond'], isPastPaper: false },
            { id: 2006, text: 'Compare and contrast sigma and pi bonds.', difficulty: 'Hard', pageReference: 55, concepts: ['sigma bond', 'pi bond'], isPastPaper: true },
            { id: 2007, text: 'What type of bond is formed between two non-metal atoms?', difficulty: 'Easy', pageReference: 35, concepts: ['covalent bond'], isPastPaper: false },
        ],
      },
      {
        id: 203,
        name: 'The Periodic Table',
        questions: [
            { id: 2008, text: 'What is the trend for atomic radius across a period?', difficulty: 'Medium', pageReference: 65, concepts: ['periodic trends', 'atomic radius'], isPastPaper: true },
            { id: 2009, text: 'Which group of elements is known as the noble gases?', difficulty: 'Easy', pageReference: 62, concepts: ['periodic table groups', 'noble gases'], isPastPaper: false },
        ]
      }
    ],
  },
    {
    id: 3,
    name: 'Mathematics',
    chapters: [
      {
        id: 301,
        name: 'Calculus',
        questions: [
          { id: 3001, text: 'Find the derivative of f(x) = 3x^2 + 2x - 1.', difficulty: 'Easy', pageReference: 60, concepts: ['differentiation'], isPastPaper: false },
          { id: 3002, text: 'Evaluate the definite integral of f(x) = x^2 from 0 to 2.', difficulty: 'Medium', pageReference: 75, concepts: ['integration', 'definite integral'], isPastPaper: true },
          { id: 3003, text: 'What is the limit of (sin x)/x as x approaches 0?', difficulty: 'Medium', pageReference: 90, concepts: ['limits', 'trigonometry'], isPastPaper: true },
        ],
      },
      {
        id: 302,
        name: 'Algebra',
        questions: [
            { id: 3004, text: 'Solve the quadratic equation: x^2 - 5x + 6 = 0.', difficulty: 'Easy', pageReference: 101, concepts: ['quadratic equations'], isPastPaper: false },
            { id: 3005, text: 'Factorize the expression: x^3 - 8.', difficulty: 'Hard', pageReference: 115, concepts: ['factorization', 'cubic expressions'], isPastPaper: true },
        ]
      }
    ],
  },
];

export const formulas = [
    {
        subject: 'Physics',
        topics: [
            {
                name: 'Kinematics',
                formulae: [
                    { name: 'Velocity', formula: 'v = u + at', derivation: 'Derived from the definition of acceleration a = (v-u)/t.' },
                    { name: 'Displacement', formula: 's = ut + 0.5at^2', derivation: 'Derived by integrating the velocity equation.' },
                ]
            }
        ]
    },
    {
        subject: 'Chemistry',
        topics: [
            {
                name: 'Gas Laws',
                formulae: [
                    { name: 'Ideal Gas Law', formula: 'PV = nRT', derivation: 'Combines Boyle\'s Law, Charles\'s Law, and Avogadro\'s Law.' },
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
