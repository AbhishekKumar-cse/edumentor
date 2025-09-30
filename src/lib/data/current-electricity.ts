
import type { Chapter } from '../data';

export const currentElectricityQuestions: Chapter = {
    id: 111,
    name: 'Current Electricity',
    questions: [
        { id: 111001, text: 'What is the SI unit of electric current?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], answer: 'Ampere', difficulty: 'Easy', pageReference: 1, concepts: ['electric current', 'units'], isPastPaper: false },
        { id: 111002, text: 'Ohm\'s law states that:', options: ['V = IR', 'V = I/R', 'I = VR', 'P = VI'], answer: 'V = IR', difficulty: 'Easy', pageReference: 3, concepts: ['ohms law'], isPastPaper: false },
        { id: 111003, text: 'The resistance of a conductor is inversely proportional to its:', options: ['Length', 'Area of cross-section', 'Resistivity', 'Temperature'], answer: 'Area of cross-section', difficulty: 'Easy', pageReference: 4, concepts: ['resistance', 'resistivity'], isPastPaper: false },
        { id: 111004, text: 'The SI unit of resistance is:', options: ['Siemens', 'Volt', 'Ampere', 'Ohm'], answer: 'Ohm', difficulty: 'Easy', pageReference: 3, concepts: ['resistance', 'units'], isPastPaper: false },
        { id: 111005, text: 'In a series combination of resistors, the equivalent resistance is:', options: ['The sum of individual resistances', 'The reciprocal of the sum of reciprocals', 'The average of the resistances', 'Always less than the smallest resistance'], answer: 'The sum of individual resistances', difficulty: 'Easy', pageReference: 8, concepts: ['series combination'], isPastPaper: false },
        { id: 111006, text: 'In a parallel combination of resistors, the voltage across each resistor is:', options: ['Different', 'The same', 'Zero', 'Depends on resistance'], answer: 'The same', difficulty: 'Easy', pageReference: 9, concepts: ['parallel combination'], isPastPaper: false },
        { id: 111007, text: 'What is resistivity?', options: ['The resistance of a unit cube of a material', 'The reciprocal of resistance', 'The conductance of a material', 'The force opposing current'], answer: 'The resistance of a unit cube of a material', difficulty: 'Easy', pageReference: 4, concepts: ['resistivity'], isPastPaper: false },
        { id: 111008, text: 'Kirchhoff\'s first law (Junction Rule) is based on the conservation of:', options: ['Energy', 'Charge', 'Momentum', 'Mass'], answer: 'Charge', difficulty: 'Easy', pageReference: 12, concepts: ['kirchhoffs laws'], isPastPaper: false },
        { id: 111009, text: 'Kirchhoff\'s second law (Loop Rule) is based on the conservation of:', options: ['Energy', 'Charge', 'Momentum', 'Mass'], answer: 'Energy', difficulty: 'Easy', pageReference: 12, concepts: ['kirchhoffs laws'], isPastPaper: false },
        { id: 111010, text: 'A Wheatstone bridge is used to measure an unknown:', options: ['Current', 'Voltage', 'Resistance', 'Power'], answer: 'Resistance', difficulty: 'Easy', pageReference: 15, concepts: ['wheatstone bridge'], isPastPaper: false },
    ]
};

    