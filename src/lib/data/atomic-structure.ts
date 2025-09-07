
import type { Chapter } from '../data';

export const atomicStructureQuestions: Chapter = {
    id: 202,
    name: 'Atomic Structure',
    questions: [
        // Easy: 60 questions
        { id: 202001, text: 'Who discovered the electron?', options: ['J.J. Thomson', 'Rutherford', 'Chadwick', 'Goldstein'], answer: 'J.J. Thomson', difficulty: 'Easy', pageReference: 35, concepts: ['electron discovery'], isPastPaper: false },
        { id: 202002, text: 'The charge of an electron is:', options: ['-1.6 x 10^-19 C', '+1.6 x 10^-19 C', '-9.1 x 10^-31 C', '+9.1 x 10^-31 C'], answer: '-1.6 x 10^-19 C', difficulty: 'Easy', pageReference: 36, concepts: ['electron charge'], isPastPaper: false },
        { id: 202003, text: 'Rutherford\'s alpha-particle scattering experiment led to the discovery of the:', options: ['Electron', 'Proton', 'Neutron', 'Nucleus'], answer: 'Nucleus', difficulty: 'Easy', pageReference: 38, concepts: ['rutherford model', 'nucleus discovery'], isPastPaper: true },
        { id: 202004, text: 'What are isotopes?', options: ['Atoms with the same mass number but different atomic numbers', 'Atoms with the same number of neutrons but different number of protons', 'Atoms with the same atomic number but different mass numbers', 'Atoms with the same number of protons and neutrons'], answer: 'Atoms with the same atomic number but different mass numbers', difficulty: 'Easy', pageReference: 40, concepts: ['isotopes'], isPastPaper: false },
        { id: 202005, text: 'The mass number of an atom is the total number of:', options: ['protons and electrons', 'neutrons and electrons', 'protons and neutrons', 'protons, neutrons and electrons'], answer: 'protons and neutrons', difficulty: 'Easy', pageReference: 40, concepts: ['mass number'], isPastPaper: false },
        { id: 202006, text: 'Which model of the atom is known as the "plum pudding" model?', options: ['Rutherford\'s model', 'Bohr\'s model', 'Thomson\'s model', 'Dalton\'s model'], answer: 'Thomson\'s model', difficulty: 'Easy', pageReference: 37, concepts: ['thomson model'], isPastPaper: false },
        { id: 202007, text: 'The principal quantum number (n) describes the:', options: ['Shape of the orbital', 'Orientation of the orbital', 'Energy level and size of the orbital', 'Spin of the electron'], answer: 'Energy level and size of the orbital', difficulty: 'Easy', pageReference: 45, concepts: ['quantum numbers', 'principal quantum number'], isPastPaper: false },
        { id: 202008, text: 'The shape of an s-orbital is:', options: ['Dumbbell', 'Spherical', 'Double dumbbell', 'Complex'], answer: 'Spherical', difficulty: 'Easy', pageReference: 48, concepts: ['orbitals', 's-orbital'], isPastPaper: false },
        { id: 202009, text: 'What is the maximum number of electrons that can be accommodated in a shell with principal quantum number n?', options: ['n', 'n^2', '2n^2', '2n'], answer: '2n^2', difficulty: 'Easy', pageReference: 46, concepts: ['electron shells'], isPastPaper: false },
        { id: 202010, text: 'The photoelectric effect was explained by:', options: ['Max Planck', 'Albert Einstein', 'Niels Bohr', 'Louis de Broglie'], answer: 'Albert Einstein', difficulty: 'Easy', pageReference: 42, concepts: ['photoelectric effect'], isPastPaper: false },
        // ... (adding more easy questions)
        
        // Medium: 80 questions
        { id: 202061, text: 'Calculate the energy of one mole of photons of radiation whose frequency is 5 × 10¹⁴ Hz.', options: ['199.51 kJ/mol', '150.25 kJ/mol', '215.75 kJ/mol', '180.00 kJ/mol'], answer: '199.51 kJ/mol', difficulty: 'Medium', pageReference: 43, concepts: ['planck quantum theory', 'photon energy'], isPastPaper: true },
        { id: 202062, text: 'What is the uncertainty in the position of an electron if the uncertainty in its momentum is 1 × 10⁻⁵ kg m/s? (h = 6.626 × 10⁻³⁴ J s)', options: ['5.27 × 10⁻³⁰ m', '5.27 × 10⁻²⁹ m', '10.54 × 10⁻³⁰ m', '2.63 × 10⁻²⁹ m'], answer: '5.27 × 10⁻³⁰ m', difficulty: 'Medium', pageReference: 51, concepts: ['heisenberg uncertainty principle'], isPastPaper: true },
        { id: 202063, text: 'The number of radial nodes for a 3p orbital is:', options: ['0', '1', '2', '3'], answer: '1', difficulty: 'Medium', pageReference: 49, concepts: ['quantum nodes', 'orbitals'], isPastPaper: true },
        { id: 202064, text: 'Which of the following sets of quantum numbers is not possible?', options: ['n=3, l=2, m=-2, s=+1/2', 'n=4, l=0, m=0, s=-1/2', 'n=3, l=3, m=-3, s=+1/2', 'n=2, l=1, m=0, s=+1/2'], answer: 'n=3, l=3, m=-3, s=+1/2', difficulty: 'Medium', pageReference: 47, concepts: ['quantum numbers'], isPastPaper: false },
        { id: 202065, text: 'The energy of the second Bohr orbit of the hydrogen atom is -328 kJ/mol. Hence the energy of the fourth Bohr orbit would be:', options: ['-41 kJ/mol', '-82 kJ/mol', '-164 kJ/mol', '-1312 kJ/mol'], answer: '-82 kJ/mol', difficulty: 'Medium', pageReference: 44, concepts: ['bohr model', 'energy levels'], isPastPaper: true },
        // ... (adding more medium questions)
        
        // Hard: 60 questions
        { id: 202141, text: 'The ratio of the difference in energy between the first and second Bohr orbit to that between the second and third Bohr orbit is:', options: ['1/2', '1/3', '27/5', '5/27'], answer: '27/5', difficulty: 'Hard', pageReference: 44, concepts: ['bohr model', 'energy levels'], isPastPaper: true },
        { id: 202142, text: 'If an electron is moving with a velocity of 600 m/s which is accurate up to 0.005%, then calculate the uncertainty in its position. (h = 6.63 × 10⁻³⁴ J s, mass of electron = 9.1 × 10⁻³¹ kg)', options: ['1.92 × 10⁻³ m', '3.84 × 10⁻³ m', '5.76 × 10⁻³ m', '1.28 × 10⁻³ m'], answer: '1.92 × 10⁻³ m', difficulty: 'Hard', pageReference: 51, concepts: ['heisenberg uncertainty principle'], isPastPaper: true },
        { id: 202143, text: 'The work function for a metal is 4 eV. To eject a photoelectron of zero velocity from the surface of the metal, the wavelength of the incident light should be:', options: ['2700 Å', '1700 Å', '5900 Å', '3100 Å'], answer: '3100 Å', difficulty: 'Hard', pageReference: 42, concepts: ['photoelectric effect', 'work function'], isPastPaper: true },
        { id: 202144, text: 'What is the wavelength of the spectral line when the electron in a hydrogen atom jumps from the orbit n=4 to n=2?', options: ['486 nm', '520 nm', '380 nm', '656 nm'], answer: '486 nm', difficulty: 'Hard', pageReference: 44, concepts: ['hydrogen spectrum', 'balmer series'], isPastPaper: true },
        { id: 202145, text: 'The ionization enthalpy of He⁺ is 19.60 × 10⁻¹⁸ J/atom. The energy of the first stationary state (n=1) of Li²⁺ is:', options: ['-4.41 × 10⁻¹⁷ J/atom', '-2.20 × 10⁻¹⁷ J/atom', '-8.82 × 10⁻¹⁷ J/atom', '-1.10 × 10⁻¹⁷ J/atom'], answer: '-4.41 × 10⁻¹⁷ J/atom', difficulty: 'Hard', pageReference: 44, concepts: ['bohr model', 'ionization enthalpy'], isPastPaper: true },
        // ... (adding more hard questions)
    ]
};
