
import type { Chapter } from '../data';

export const dAndFBlockElementsQuestions: Chapter = {
    id: 215,
    name: 'd and f-Block Elements',
    questions: [
        // Easy: 80 questions
        {
            id: 215001,
            text: 'Which elements are known as transition elements?',
            options: ['s-block elements', 'p-block elements', 'd-block elements', 'f-block elements'],
            answer: 'd-block elements',
            difficulty: 'Easy',
            pageReference: 1,
            concepts: ['transition elements definition'],
            isPastPaper: false,
            explanation: 'd-block elements are called transition elements because they are located between the s-block and p-block elements and their properties are transitional between them.'
        },
        {
            id: 215002,
            text: 'The general electronic configuration of d-block elements is:',
            options: ['(n-1)d¹⁻¹⁰ ns¹⁻²', '(n-1)d¹⁻⁵ ns¹', 'nd¹⁻¹⁰ ns²]', 'ns² np¹⁻⁶'],
            answer: '(n-1)d¹⁻¹⁰ ns¹⁻²',
            difficulty: 'Easy',
            pageReference: 2,
            concepts: ['d-block elements', 'electronic configuration'],
            isPastPaper: false,
            explanation: 'The d-block elements have their valence electrons in (n-1)d and ns orbitals. The general configuration is (n-1)d¹⁻¹⁰ ns¹⁻².'
        },
        {
            id: 215003,
            text: 'Why do transition metals exhibit variable oxidation states?',
            options: ['Because of their high reactivity', 'Because of the small energy difference between (n-1)d and ns orbitals', 'Because they are metals', 'Because they have large atomic size'],
            answer: 'Because of the small energy difference between (n-1)d and ns orbitals',
            difficulty: 'Easy',
            pageReference: 4,
            concepts: ['oxidation states', 'transition metals'],
            isPastPaper: false,
            explanation: 'The energies of the (n-1)d and ns orbitals are very close, so electrons from both orbitals can participate in bonding, leading to variable oxidation states.'
        },
        {
            id: 215004,
            text: 'Most transition metal compounds are colored. This is due to:',
            options: ['d-d transitions', 'Their high density', 'Their metallic nature', 'The presence of s-electrons'],
            answer: 'd-d transitions',
            difficulty: 'Easy',
            pageReference: 7,
            concepts: ['properties of transition metals', 'color', 'd-d transition'],
            isPastPaper: false,
            explanation: 'The color of transition metal compounds is due to the absorption of light energy to promote an electron from a lower energy d-orbital to a higher energy d-orbital, a process called d-d transition.'
        },
        {
            id: 215005,
            text: 'What are f-block elements also known as?',
            options: ['Alkali metals', 'Alkaline earth metals', 'Inner transition elements', 'Halogens'],
            answer: 'Inner transition elements',
            difficulty: 'Easy',
            pageReference: 15,
            concepts: ['f-block elements definition'],
            isPastPaper: false,
            explanation: 'The f-block elements, consisting of the lanthanides and actinides, are called inner transition elements because the last electron enters the inner (n-2)f subshell.'
        },
        {
            id: 215006,
            text: 'The phenomenon of lanthanoid contraction is due to:',
            options: ['The perfect shielding of one 4f electron by another', 'The imperfect shielding of one 4f electron by another', 'The large size of lanthanoids', 'The high reactivity of lanthanoids'],
            answer: 'The imperfect shielding of one 4f electron by another',
            difficulty: 'Easy',
            pageReference: 16,
            concepts: ['lanthanoid contraction'],
            isPastPaper: false,
            explanation: 'Lanthanoid contraction is the steady decrease in atomic and ionic radii of lanthanoids with increasing atomic number. It is caused by the poor shielding effect of the 4f electrons.'
        },
        {
            id: 215007,
            text: 'Which of the following is a characteristic property of transition metals?',
            options: ['They are all gases', 'They form colorless compounds', 'They exhibit catalytic activity', 'They are non-metals'],
            answer: 'They exhibit catalytic activity',
            difficulty: 'Easy',
            pageReference: 9,
            concepts: ['properties of transition metals', 'catalytic property'],
            isPastPaper: false,
            explanation: 'Many transition metals and their compounds are used as catalysts (e.g., iron in the Haber process) due to their ability to adopt multiple oxidation states and form complexes.'
        },
        {
            id: 215008,
            text: 'Which group of elements are called lanthanoids?',
            options: ['Elements from Ce (Z=58) to Lu (Z=71)', 'Elements from Ac (Z=89) to Lr (Z=103)', 'Elements of group 3', 'Elements of group 12'],
            answer: 'Elements from Ce (Z=58) to Lu (Z=71)',
            difficulty: 'Easy',
            pageReference: 15,
            concepts: ['lanthanoids'],
            isPastPaper: false,
            explanation: 'The 14 elements following Lanthanum (La), from Cerium to Lutetium, constitute the lanthanoid series.'
        },
        {
            id: 215009,
            text: 'What is an alloy?',
            options: ['A pure metal', 'A mixture of a metal with other elements, usually metals', 'A non-metal', 'A metalloid'],
            answer: 'A mixture of a metal with other elements, usually metals',
            difficulty: 'Easy',
            pageReference: 10,
            concepts: ['alloys'],
            isPastPaper: false,
            explanation: 'An alloy is a substance made by melting two or more elements together, at least one of them a metal. Brass (copper and zinc) is a common example.'
        },
        {
            id: 215010,
            text: 'Which of the following is a common oxidizing agent containing a transition metal?',
            options: ['KMnO₄', 'H₂S', 'FeSO₄', 'CO'],
            answer: 'KMnO₄',
            difficulty: 'Easy',
            pageReference: 12,
            concepts: ['oxidizing agent', 'potassium permanganate'],
            isPastPaper: false,
            explanation: 'Potassium permanganate (KMnO₄) is a strong oxidizing agent because the manganese is in its highest oxidation state (+7) and can be easily reduced.'
        },
        // ... (up to 80 easy questions)
        {
            id: 215080,
            text: 'Which actinoid, besides uranium, is found in significant quantities in nature?',
            options: ['Thorium', 'Plutonium', 'Americium', 'Curium'],
            answer: 'Thorium',
            difficulty: 'Easy',
            pageReference: 17,
            concepts: ['actinoids', 'abundance'],
            isPastPaper: false,
            explanation: 'Thorium (Th, Z=90) is the most abundant actinoid in the Earth\'s crust after uranium.'
        },
        // Medium: 120 questions
        {
            id: 215081,
            text: 'The reason for the greater range of oxidation states in actinoids is attributed to:',
            options: ['The comparable energies of 5f, 6d and 7s orbitals', 'The radioactive nature of actinoids', 'The larger size of actinoids compared to lanthanoids', 'The presence of more electrons'],
            answer: 'The comparable energies of 5f, 6d and 7s orbitals',
            difficulty: 'Medium',
            pageReference: 18,
            concepts: ['actinoids', 'oxidation states'],
            isPastPaper: true,
            explanation: 'The energy difference between the 5f, 6d, and 7s subshells is smaller than that for the corresponding orbitals in lanthanoids, allowing more electrons to participate in bonding.'
        },
        {
            id: 215082,
            text: 'Which of the following ions is colored?',
            options: ['Sc³⁺', 'Ti⁴⁺', 'Zn²⁺', 'V³⁺'],
            answer: 'V³⁺',
            difficulty: 'Medium',
            pageReference: 7,
            concepts: ['color of ions', 'd-d transition'],
            isPastPaper: true,
            explanation: 'Color in transition metal ions is due to d-d transitions, which requires partially filled d-orbitals. Sc³⁺ (d⁰), Ti⁴⁺ (d⁰), and Zn²⁺ (d¹⁰) do not have partially filled d-orbitals. V³⁺ is a d² ion and is colored.'
        },
        {
            id: 215083,
            text: 'Which of the following statements about interstitial compounds is incorrect?',
            options: ['They are chemically very reactive.', 'They have high melting points, higher than those of pure metals.', 'They retain metallic conductivity.', 'They are very hard.'],
            answer: 'They are chemically very reactive.',
            difficulty: 'Medium',
            pageReference: 10,
            concepts: ['interstitial compounds'],
            isPastPaper: true,
            explanation: 'Interstitial compounds, formed when small atoms like H, C, or N are trapped inside the crystal lattices of metals, are hard, have high melting points, retain conductivity, but are chemically inert.'
        },
        // ... (up to 120 medium questions)
        {
            id: 215200,
            text: 'The catalytic activity of transition metals is attributed to:',
            options: ['Their variable oxidation states and ability to form complexes', 'Their high density', 'Their magnetic properties', 'Their large atomic radii'],
            answer: 'Their variable oxidation states and ability to form complexes',
            difficulty: 'Medium',
            pageReference: 9,
            concepts: ['catalytic property'],
            isPastPaper: false
        },
        // Hard: 100 questions
        {
            id: 215201,
            text: 'The magnetic moment of a divalent ion in aqueous solution with atomic number 25 is:',
            options: ['5.92 BM', '2.84 BM', '4.90 BM', '1.73 BM'],
            answer: '5.92 BM',
            difficulty: 'Hard',
            pageReference: 8,
            concepts: ['magnetic moment'],
            isPastPaper: true,
            explanation: 'The element with Z=25 is Manganese (Mn). The divalent ion is Mn²⁺. Its configuration is [Ar]3d⁵. It has 5 unpaired electrons. Magnetic moment μ = √[n(n+2)] = √[5(5+2)] = √35 ≈ 5.92 BM.'
        },
        {
            id: 215202,
            text: 'Which pair of lanthanoids has the highest third ionization enthalpy?',
            options: ['Eu, Gd', 'La, Lu', 'Eu, Yb', 'Ce, Pr'],
            answer: 'Eu, Yb',
            difficulty: 'Hard',
            pageReference: 16,
            concepts: ['lanthanoids', 'ionization enthalpy'],
            isPastPaper: false,
            explanation: 'The third ionization enthalpy involves removing an electron from the M²⁺ ion. For Eu²⁺ ([Xe]4f⁷) and Yb²⁺ ([Xe]4f¹⁴), the electron has to be removed from a very stable half-filled or completely filled f-orbital, respectively. This requires a large amount of energy.'
        },
        {
            id: 215203,
            text: 'In the disproportionation reaction 3MnO₄²⁻ + 4H⁺ → 2MnO₄⁻ + MnO₂ + 2H₂O, the oxidation state of Mn changes from:',
            options: ['+6 to +7 and +4', '+6 to +7 only', '+7 to +6 and +4', '+6 to +5 and +4'],
            answer: '+6 to +7 and +4',
            difficulty: 'Hard',
            pageReference: 13,
            concepts: ['disproportionation', 'oxidation state'],
            isPastPaper: true,
            explanation: 'In MnO₄²⁻ (manganate ion), Mn is in the +6 state. It is oxidized to +7 in MnO₄⁻ (permanganate) and reduced to +4 in MnO₂, demonstrating a disproportionation reaction.'
        },
        // ... (up to 100 hard questions)
        {
            id: 215300,
            text: 'The correct order of ionic radii for the ions Y³⁺, La³⁺, Eu³⁺, and Lu³⁺ is:',
            options: ['Y³⁺ < La³⁺ < Eu³⁺ < Lu³⁺', 'Lu³⁺ < Eu³⁺ < La³⁺ < Y³⁺', 'Y³⁺ < Lu³⁺ < Eu³⁺ < La³⁺', 'La³⁺ < Eu³⁺ < Lu³⁺ < Y³⁺'],
            answer: 'Y³⁺ < Lu³⁺ < Eu³⁺ < La³⁺',
            difficulty: 'Hard',
            pageReference: 16,
            concepts: ['ionic radii', 'lanthanoid contraction'],
            isPastPaper: true,
            explanation: 'Due to lanthanoid contraction, ionic radii decrease across the lanthanoid series. So, Lu³⁺ is smaller than Eu³⁺, which is smaller than La³⁺. Yttrium (Y) is in the period above Lanthanum, but due to lanthanoid contraction, its ionic radius (Y³⁺) is very similar to the later lanthanoids like Holmium, making it smaller than all the given lanthanoids.'
        }
    ]
};
