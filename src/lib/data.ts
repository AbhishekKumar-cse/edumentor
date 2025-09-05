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
        ],
      },
      {
        id: 102,
        name: 'Laws of Motion',
        questions: [
          { id: 1004, text: "State Newton's First Law of Motion.", difficulty: 'Easy', pageReference: 45, concepts: ["Newton's laws"], isPastPaper: false },
          { id: 1005, text: 'A 5kg block is pulled by a 20N force on a frictionless surface. What is the acceleration?', difficulty: 'Medium', pageReference: 52, concepts: ["Newton's second law", 'force'], isPastPaper: false },
        ],
      },
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
        ],
      },
      {
        id: 202,
        name: 'Chemical Bonding',
        questions: [
            { id: 2003, text: 'Describe the formation of an ionic bond.', difficulty: 'Easy', pageReference: 30, concepts: ['ionic bond'], isPastPaper: false },
            { id: 2004, text: 'Draw the Lewis structure for a water molecule (H2O).', difficulty: 'Medium', pageReference: 41, concepts: ['lewis structure', 'covalent bond'], isPastPaper: false },
            { id: 2005, text: 'Compare and contrast sigma and pi bonds.', difficulty: 'Hard', pageReference: 55, concepts: ['sigma bond', 'pi bond'], isPastPaper: true },
        ],
      },
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
        ],
      },
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
