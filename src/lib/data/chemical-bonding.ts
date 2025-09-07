
import type { Chapter } from '../data';

export const chemicalBondingQuestions: Chapter = {
    id: 203,
    name: 'Chemical Bonding',
    questions: [
        // Easy: 60 questions
        { id: 203001, text: 'Which type of bond is formed by the complete transfer of electrons from one atom to another?', options: ['Covalent bond', 'Ionic bond', 'Hydrogen bond', 'Metallic bond'], answer: 'Ionic bond', difficulty: 'Easy', pageReference: 65, concepts: ['ionic bond'], isPastPaper: false },
        { id: 203002, text: 'The shape of the methane (CH₄) molecule is:', options: ['Linear', 'Trigonal planar', 'Tetrahedral', 'Octahedral'], answer: 'Tetrahedral', difficulty: 'Easy', pageReference: 72, concepts: ['vsepr theory', 'molecular geometry'], isPastPaper: true },
        { id: 203003, text: 'A double bond consists of:', options: ['Two sigma bonds', 'Two pi bonds', 'One sigma and one pi bond', 'One sigma and two pi bonds'], answer: 'One sigma and one pi bond', difficulty: 'Easy', pageReference: 75, concepts: ['covalent bond', 'double bond'], isPastPaper: false },
        { id: 203004, text: 'Which of the following molecules has a hydrogen bond?', options: ['CH₄', 'H₂S', 'H₂O', 'HCl'], answer: 'H₂O', difficulty: 'Easy', pageReference: 80, concepts: ['hydrogen bond'], isPastPaper: false },
        { id: 203005, text: 'What is the bond order of the O₂ molecule?', options: ['1', '2', '3', '1.5'], answer: '2', difficulty: 'Easy', pageReference: 82, concepts: ['molecular orbital theory', 'bond order'], isPastPaper: true },
        // ... (adding more easy questions)
        
        // Medium: 80 questions
        { id: 203061, text: 'Which of the following has the highest boiling point?', options: ['H₂O', 'H₂S', 'H₂Se', 'H₂Te'], answer: 'H₂O', difficulty: 'Medium', pageReference: 80, concepts: ['hydrogen bond', 'boiling point'], isPastPaper: true },
        { id: 203062, text: 'The hybridization of the central atom in SF₆ is:', options: ['sp³', 'sp³d', 'sp³d²', 'sp²'], answer: 'sp³d²', difficulty: 'Medium', pageReference: 78, concepts: ['hybridization', 'vsepr theory'], isPastPaper: true },
        { id: 203063, text: 'Which of the following molecules is polar?', options: ['CO₂', 'BF₃', 'SO₂', 'CH₄'], answer: 'SO₂', difficulty: 'Medium', pageReference: 74, concepts: ['dipole moment', 'molecular polarity'], isPastPaper: true },
        { id: 203064, text: 'According to Molecular Orbital Theory, which of the following is paramagnetic?', options: ['N₂', 'O₂', 'F₂', 'C₂²⁻'], answer: 'O₂', difficulty: 'Medium', pageReference: 83, concepts: ['molecular orbital theory', 'paramagnetism'], isPastPaper: true },
        { id: 203065, text: 'The correct order of bond angles in H₂O, NH₃, and CH₄ is:', options: ['CH₄ > NH₃ > H₂O', 'NH₃ > CH₄ > H₂O', 'H₂O > NH₃ > CH₄', 'CH₄ > H₂O > NH₃'], answer: 'CH₄ > NH₃ > H₂O', difficulty: 'Medium', pageReference: 73, concepts: ['vsepr theory', 'bond angles'], isPastPaper: true },
        // ... (adding more medium questions)
        
        // Hard: 60 questions
        { id: 203141, text: 'The bond dissociation energy of B-F in BF₃ is 646 kJ/mol whereas that of C-F in CF₄ is 515 kJ/mol. The correct reason for higher B-F bond dissociation energy as compared to that of C-F is:', options: ['stronger σ bond between B and F in BF₃ as compared to that between C and F in CF₄', 'significant pπ-pπ interaction between B and F in BF₃ whereas there is no possibility of such interaction between C and F in CF₄', 'lower degree of pπ-pπ interaction between B and F in BF₃ than that between C and F in CF₄', 'smaller size of B-atom as compared to that of C-atom'], answer: 'significant pπ-pπ interaction between B and F in BF₃ whereas there is no possibility of such interaction between C and F in CF₄', difficulty: 'Hard', pageReference: 79, concepts: ['back bonding'], isPastPaper: true },
        { id: 203142, text: 'In which of the following pairs of molecules/ions, the central atoms have sp² hybridization?', options: ['NO₂⁻ and NH₃', 'BF₃ and NO₂⁻', 'NH₂⁻ and H₂O', 'BF₃ and NH₂⁻'], answer: 'BF₃ and NO₂⁻', difficulty: 'Hard', pageReference: 78, concepts: ['hybridization'], isPastPaper: true },
        { id: 203143, text: 'Which of the following species has a linear shape?', options: ['O₃', 'NO₂⁻', 'SO₂', 'NO₂⁺'], answer: 'NO₂⁺', difficulty: 'Hard', pageReference: 72, concepts: ['vsepr theory', 'molecular geometry'], isPastPaper: true },
        { id: 203144, text: 'The species having bond order different from that in CO is:', options: ['NO⁻', 'CN⁻', 'N₂', 'NO⁺'], answer: 'NO⁻', difficulty: 'Hard', pageReference: 82, concepts: ['molecular orbital theory', 'bond order'], isPastPaper: true },
        { id: 203145, text: 'Among the following, the pair in which the two species are not isostructural is:', options: ['SiF₄ and SF₄', 'IO₃⁻ and XeO₃', 'BH₄⁻ and NH₄⁺', 'PF₆⁻ and SF₆'], answer: 'SiF₄ and SF₄', difficulty: 'Hard', pageReference: 73, concepts: ['isostructural species', 'vsepr theory'], isPastPaper: true },
        // ... (adding more hard questions)
    ]
};
