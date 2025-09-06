
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
      },
      {
        id: 104,
        name: 'Rotational Motion',
        questions: [
            { id: 104001, text: 'Define torque.', options: ['The rotational equivalent of force', 'The rotational equivalent of mass', 'The rotational equivalent of momentum', 'The rotational equivalent of energy'], answer: 'The rotational equivalent of force', difficulty: 'Easy', pageReference: 85, concepts: ['torque'], isPastPaper: false },
        ]
      },
      {
        id: 105,
        name: 'Gravitation',
        questions: [
            { id: 105001, text: 'State Newton\'s law of universal gravitation.', options: ['F = G * (m1*m2)/r^2', 'F = G * (m1+m2)/r^2', 'F = G * (m1*m2)/r', 'F = G * m1*m2*r'], answer: 'F = G * (m1*m2)/r^2', difficulty: 'Easy', pageReference: 105, concepts: ['gravitation'], isPastPaper: false },
        ]
      },
      {
        id: 106,
        name: 'Properties of Solids and Liquids',
        questions: [
            { id: 106001, text: 'What is elasticity?', options: ['The ability of a body to resist a change in its state of motion', 'The ability of a body to regain its original shape after the removal of deforming forces', 'The ability of a body to conduct heat', 'The ability of a body to conduct electricity'], answer: 'The ability of a body to regain its original shape after the removal of deforming forces', difficulty: 'Easy', pageReference: 125, concepts: ['elasticity'], isPastPaper: false },
        ]
      },
      {
        id: 107,
        name: 'Thermodynamics',
        questions: [
          { id: 107001, text: 'Which law of thermodynamics states that energy cannot be created or destroyed?', options: ['Zeroth Law', 'First Law', 'Second Law', 'Third Law'], answer: 'First Law', difficulty: 'Easy', pageReference: 150, concepts: ['first law of thermodynamics'], isPastPaper: false },
          { id: 107002, text: 'What is an isothermal process?', options: ['A process at constant pressure', 'A process at constant volume', 'A process at constant temperature', 'A process with no heat transfer'], answer: 'A process at constant temperature', difficulty: 'Easy', pageReference: 155, concepts: ['thermodynamic processes', 'isothermal'], isPastPaper: false },
          { id: 107003, text: 'The efficiency of a Carnot engine depends on:', options: ['The working substance', 'The temperatures of the source and sink', 'The volume of the cylinder', 'The pressure of the gas'], answer: 'The temperatures of the source and sink', difficulty: 'Easy', pageReference: 162, concepts: ['carnot engine', 'efficiency'], isPastPaper: true },
          { id: 107004, text: 'What is the internal energy of an ideal gas dependent on?', options: ['Pressure only', 'Volume only', 'Temperature only', 'Pressure and Volume'], answer: 'Temperature only', difficulty: 'Easy', pageReference: 152, concepts: ['internal energy', 'ideal gas'], isPastPaper: false },
          { id: 107005, text: 'An adiabatic process is one in which:', options: ['Pressure is constant', 'Volume is constant', 'Temperature is constant', 'There is no heat exchange'], answer: 'There is no heat exchange', difficulty: 'Easy', pageReference: 156, concepts: ['thermodynamic processes', 'adiabatic'], is_past_paper: true },
          { id: 107006, text: 'What does the area under a P-V diagram represent?', options: ['Work done', 'Heat supplied', 'Change in internal energy', 'Entropy change'], answer: 'Work done', difficulty: 'Easy', pageReference: 154, concepts: ['pv diagram', 'work done'], isPastPaper: false },
          { id: 107007, text: 'The Zeroth Law of Thermodynamics leads to the concept of:', options: ['Energy', 'Entropy', 'Temperature', 'Pressure'], answer: 'Temperature', difficulty: 'Easy', pageReference: 149, concepts: ['zeroth law of thermodynamics'], isPastPaper: false },
          { id: 107008, text: 'In a cyclic process, the change in internal energy is:', options: ['Positive', 'Negative', 'Zero', 'Depends on the path'], answer: 'Zero', difficulty: 'Easy', pageReference: 158, concepts: ['cyclic process', 'internal energy'], isPastPaper: false },
          { id: 107009, text: 'What is the value of specific heat capacity of a gas in an isothermal process?', options: ['Zero', 'One', 'Infinite', 'Negative'], answer: 'Infinite', difficulty: 'Easy', pageReference: 155, concepts: ['specific heat', 'isothermal'], isPastPaper: true },
          { id: 107010, text: 'The Second Law of Thermodynamics introduces the concept of:', options: ['Enthalpy', 'Entropy', 'Internal Energy', 'Work'], answer: 'Entropy', difficulty: 'Easy', pageReference: 160, concepts: ['second law of thermodynamics', 'entropy'], isPastPaper: false },
          { id: 107011, text: 'In an isobaric process, which quantity remains constant?', options: ['Pressure', 'Volume', 'Temperature', 'Heat'], answer: 'Pressure', difficulty: 'Easy', pageReference: 156, concepts: ['thermodynamic processes', 'isobaric'], isPastPaper: false },
          { id: 107012, text: 'What is the relation for an adiabatic process for an ideal gas?', options: ['PV = constant', 'PV^γ = constant', 'P^γV = constant', 'P/T = constant'], answer: 'PV^γ = constant', difficulty: 'Easy', pageReference: 157, concepts: ['adiabatic process', 'ideal gas'], isPastPaper: true },
          { id: 107013, text: 'What is a heat engine?', options: ['A device that converts heat into work', 'A device that converts work into heat', 'A device that transfers heat from a colder body to a hotter body', 'A device that measures heat'], answer: 'A device that converts heat into work', difficulty: 'Easy', pageReference: 161, concepts: ['heat engine'], isPastPaper: false },
          { id: 107014, text: 'Can the efficiency of a heat engine be 100%?', options: ['Yes', 'No', 'Only in theory', 'Depends on the fuel'], answer: 'No', difficulty: 'Easy', pageReference: 161, concepts: ['efficiency', 'second law of thermodynamics'], isPastPaper: false },
          { id: 107015, text: 'The internal energy of a diatomic gas is given by:', options: ['(3/2)nRT', '(5/2)nRT', '(7/2)nRT', 'nRT'], answer: '(5/2)nRT', difficulty: 'Easy', pageReference: 153, concepts: ['internal energy', 'diatomic gas'], isPastPaper: false },
          { id: 107016, text: 'What is the SI unit of entropy?', options: ['Joule', 'Joule/Kelvin', 'Kelvin', 'Watt'], answer: 'Joule/Kelvin', difficulty: 'Easy', pageReference: 160, concepts: ['entropy'], isPastPaper: false },
          { id: 107017, text: 'A refrigerator is an example of a:', options: ['Heat engine', 'Heat pump', 'Carnot engine', 'Electric motor'], answer: 'Heat pump', difficulty: 'Easy', pageReference: 164, concepts: ['refrigerator', 'heat pump'], isPastPaper: false },
          { id: 107018, text: 'In which process is the work done zero?', options: ['Isobaric', 'Isochoric', 'Isothermal', 'Adiabatic'], answer: 'Isochoric', difficulty: 'Easy', pageReference: 156, concepts: ['work done', 'isochoric'], isPastPaper: false },
          { id: 107019, text: 'What is the work done in a free expansion?', options: ['Positive', 'Negative', 'Zero', 'Depends on the gas'], answer: 'Zero', difficulty: 'Easy', pageReference: 155, concepts: ['free expansion', 'work done'], isPastPaper: false },
          { id: 107020, text: 'What is the main principle behind the working of a thermometer?', options: ['First Law of Thermodynamics', 'Second Law of Thermodynamics', 'Zeroth Law of Thermodynamics', 'Third Law of Thermodynamics'], answer: 'Zeroth Law of Thermodynamics', difficulty: 'Easy', pageReference: 149, concepts: ['zeroth law of thermodynamics'], isPastPaper: false },
          { id: 107021, text: 'During an isothermal expansion, the internal energy of an ideal gas:', options: ['Increases', 'Decreases', 'Remains constant', 'Becomes zero'], answer: 'Remains constant', difficulty: 'Medium', pageReference: 155, concepts: ['isothermal', 'internal energy', 'ideal gas'], isPastPaper: true },
          { id: 107022, text: 'The P-V diagram of an isochoric process is a:', options: ['Horizontal line', 'Vertical line', 'Hyperbola', 'Parabola'], answer: 'Vertical line', difficulty: 'Medium', pageReference: 156, concepts: ['isochoric', 'pv diagram'], isPastPaper: false },
          { id: 107023, text: 'For a gas, the ratio of specific heats is γ = 1.4. This gas is:', options: ['Monatomic', 'Diatomic', 'Triatomic', 'Polyatomic'], answer: 'Diatomic', difficulty: 'Medium', pageReference: 157, concepts: ['specific heat ratio', 'diatomic gas'], isPastPaper: true },
          { id: 107024, text: 'A system is taken from state A to state B along two different paths. The heat absorbed and work done are Q1, W1 and Q2, W2 respectively. Then:', options: ['Q1 = Q2', 'W1 = W2', 'Q1 - W1 = Q2 - W2', 'Q1 + W1 = Q2 + W2'], answer: 'Q1 - W1 = Q2 - W2', difficulty: 'Medium', pageReference: 151, concepts: ['first law of thermodynamics', 'path function', 'state function'], isPastPaper: true },
          { id: 107025, text: 'The slope of an adiabatic curve is steeper than the slope of an isothermal curve by a factor of:', options: ['γ', '1/γ', 'γ-1', '1'], answer: 'γ', difficulty: 'Medium', pageReference: 158, concepts: ['adiabatic process', 'isothermal process', 'pv diagram'], isPastPaper: true },
          { id: 107026, text: 'In a reversible process, the entropy of the universe:', options: ['Increases', 'Decreases', 'Remains constant', 'Can be positive or negative'], answer: 'Remains constant', difficulty: 'Medium', pageReference: 160, concepts: ['entropy', 'reversible process'], isPastPaper: false },
          { id: 107027, text: 'The coefficient of performance (COP) of a refrigerator is given by:', options: ['Q_H / W', 'Q_C / W', 'W / Q_H', 'W / Q_C'], answer: 'Q_C / W', difficulty: 'Medium', pageReference: 164, concepts: ['refrigerator', 'cop'], isPastPaper: true },
          { id: 107028, text: 'If a gas expands adiabatically, its temperature:', options: ['Increases', 'Decreases', 'Remains constant', 'First increases then decreases'], answer: 'Decreases', difficulty: 'Medium', pageReference: 157, concepts: ['adiabatic expansion'], isPastPaper: false },
          { id: 107029, text: 'The first law of thermodynamics is a consequence of the conservation of:', options: ['Mass', 'Momentum', 'Energy', 'Charge'], answer: 'Energy', difficulty: 'Medium', pageReference: 150, concepts: ['first law of thermodynamics'], isPastPaper: false },
          { id: 107030, text: 'Which of the following is not a state function?', options: ['Internal Energy', 'Entropy', 'Work', 'Enthalpy'], answer: 'Work', difficulty: 'Medium', pageReference: 151, concepts: ['state function', 'path function'], isPastPaper: true },
          { id: 107031, text: 'An ideal gas undergoes a cyclic process ABCA. The work done by the gas during the process is:', options: ['Zero', 'Equal to the area of the loop', 'Equal to heat supplied', 'Cannot be determined'], answer: 'Equal to the area of the loop', difficulty: 'Medium', pageReference: 158, concepts: ['cyclic process', 'work done', 'pv diagram'], isPastPaper: false },
          { id: 107032, text: 'The temperature of the sink of a Carnot engine is 27°C and its efficiency is 25%. The temperature of the source is:', options: ['127°C', '77°C', '227°C', '177°C'], answer: '127°C', difficulty: 'Medium', pageReference: 163, concepts: ['carnot engine', 'efficiency'], isPastPaper: true },
          { id: 107033, text: 'During melting of ice, the entropy:', options: ['Increases', 'Decreases', 'Remains constant', 'Becomes zero'], answer: 'Increases', difficulty: 'Medium', pageReference: 160, concepts: ['entropy', 'phase change'], isPastPaper: false },
          { id: 107034, text: 'Mayer\'s formula relates:', options: ['Cv and Cp', 'P and V', 'V and T', 'P and T'], answer: 'Cv and Cp', difficulty: 'Medium', pageReference: 153, concepts: ['mayers formula', 'specific heat'], isPastPaper: false },
          { id: 107035, text: 'A gas performs minimum work when it expands:', options: ['Isothermally', 'Adiabatically', 'Isobarically', 'Isochorically'], answer: 'Isochorically', difficulty: 'Medium', pageReference: 156, concepts: ['work done', 'thermodynamic processes'], isPastPaper: false },
          { id: 107036, text: 'The efficiency of an engine is η. If the temperature of the sink is reduced by T, its efficiency doubles. The temperature of the sink is:', options: ['ηT', '(1-η)T', 'T/(1-η)', 'T/η'], answer: '(1-η)T', difficulty: 'Hard', pageReference: 163, concepts: ['carnot engine', 'efficiency'], isPastPaper: true },
          { id: 107037, text: 'One mole of an ideal gas expands from volume V1 to V2. The work done is maximum when the process is:', options: ['Isobaric', 'Isothermal', 'Adiabatic', 'Isochoric'], answer: 'Isobaric', difficulty: 'Hard', pageReference: 158, concepts: ['work done', 'thermodynamic processes'], isPastPaper: true },
          { id: 107038, text: 'A diatomic gas (γ = 1.4) does 200 J of work when it is expanded isobarically. The heat given to the gas in the process is:', options: ['500 J', '600 J', '700 J', '800 J'], answer: '700 J', difficulty: 'Hard', pageReference: 156, concepts: ['isobaric process', 'work done', 'heat supplied'], isPastPaper: true },
          { id: 107039, text: 'An ideal gas is taken through the cycle A → B → C → A. If the net heat supplied to the gas in the cycle is 5 J, the work done by the gas in the process C → A is:', options: ['-5 J', '-10 J', '-15 J', '-20 J'], answer: '-5 J', difficulty: 'Hard', pageReference: 158, concepts: ['cyclic process', 'first law of thermodynamics'], isPastPaper: true },
          { id: 107040, text: 'Two moles of an ideal monatomic gas are compressed from 22.4 L to 11.2 L at 0°C. The work done on the gas is:', options: ['3138 J', '3148 J', '3158 J', '3168 J'], answer: '3158 J', difficulty: 'Hard', pageReference: 155, concepts: ['isothermal compression', 'work done'], isPastPaper: true },
        ]
      },
      {
        id: 108,
        name: 'Kinetic Theory of Gases',
        questions: [
            { id: 108001, text: 'What is the basic assumption of the kinetic theory of gases?', options: ['Gas molecules are always at rest', 'Gas molecules are point masses in random motion', 'Gas molecules have strong intermolecular forces', 'The volume of gas molecules is large compared to the container volume'], answer: 'Gas molecules are point masses in random motion', difficulty: 'Easy', pageReference: 175, concepts: ['kinetic theory'], isPastPaper: false },
        ]
      },
      {
        id: 109,
        name: 'Oscillations and Waves',
        questions: [
            { id: 109001, text: 'What is simple harmonic motion (SHM)?', options: ['Any periodic motion', 'Motion in a circle', 'Periodic motion where the restoring force is proportional to the displacement', 'Motion with constant acceleration'], answer: 'Periodic motion where the restoring force is proportional to the displacement', difficulty: 'Easy', pageReference: 195, concepts: ['shm'], isPastPaper: false },
        ]
      },
      {
        id: 110,
        name: 'Electrostatics',
        questions: [
            { id: 110001, text: 'State Coulomb\'s law.', options: ['The force between two charges is proportional to the product of the charges and inversely proportional to the square of the distance between them.', 'The force between two charges is proportional to the sum of the charges.', 'The force between two charges is independent of the distance between them.', 'The force between two charges is always attractive.'], answer: 'The force between two charges is proportional to the product of the charges and inversely proportional to the square of the distance between them.', difficulty: 'Easy', pageReference: 215, concepts: ['coulomb law'], isPastPaper: false },
        ]
      },
      {
        id: 111,
        name: 'Current Electricity',
        questions: [
            { id: 111001, text: 'What is Ohm\'s law?', options: ['V = IR', 'P = VI', 'V = I/R', 'I = V/R'], answer: 'V = IR', difficulty: 'Easy', pageReference: 235, concepts: ['ohm law'], isPastPaper: false },
        ]
      },
      {
        id: 112,
        name: 'Magnetic Effects of Current and Magnetism',
        questions: [
            { id: 112001, text: 'What is the direction of the magnetic field around a straight current-carrying wire?', options: ['Along the wire', 'Perpendicular to the wire', 'In concentric circles around the wire', 'Radially outwards'], answer: 'In concentric circles around the wire', difficulty: 'Easy', pageReference: 255, concepts: ['magnetic field'], isPastPaper: false },
        ]
      },
      {
        id: 113,
        name: 'Electromagnetic Induction and Alternating Currents',
        questions: [
            { id: 113001, text: 'What is Faraday\'s law of electromagnetic induction?', options: ['The induced emf is proportional to the rate of change of magnetic flux', 'The induced current opposes the change in magnetic flux', 'The magnetic flux is always constant', 'The induced emf is constant'], answer: 'The induced emf is proportional to the rate of change of magnetic flux', difficulty: 'Easy', pageReference: 275, concepts: ['faraday law'], isPastPaper: false },
        ]
      },
      {
        id: 114,
        name: 'Electromagnetic Waves',
        questions: [
            { id: 114001, text: 'What is the nature of electromagnetic waves?', options: ['Longitudinal', 'Transverse', 'Stationary', 'Mechanical'], answer: 'Transverse', difficulty: 'Easy', pageReference: 295, concepts: ['em waves'], isPastPaper: false },
        ]
      },
      {
        id: 115,
        name: 'Optics',
        questions: [
            { id: 115001, text: 'What is reflection of light?', options: ['The bending of light as it passes from one medium to another', 'The bouncing back of light from a surface', 'The splitting of light into its constituent colors', 'The spreading of light around corners'], answer: 'The bouncing back of light from a surface', difficulty: 'Easy', pageReference: 315, concepts: ['reflection'], isPastPaper: false },
        ]
      },
      {
        id: 116,
        name: 'Dual Nature of Matter and Radiation',
        questions: [
            { id: 116001, text: 'What is the photoelectric effect?', options: ['The emission of electrons from a metal surface when light shines on it', 'The bending of light', 'The splitting of light', 'The reflection of light'], answer: 'The emission of electrons from a metal surface when light shines on it', difficulty: 'Easy', pageReference: 335, concepts: ['photoelectric effect'], isPastPaper: false },
        ]
      },
      {
        id: 117,
        name: 'Atoms and Nuclei',
        questions: [
            { id: 117001, text: 'What is the structure of an atom according to Rutherford\'s model?', options: ['A uniform sphere of positive charge with electrons embedded in it', 'A nucleus at the center with electrons orbiting it', 'Electrons in fixed energy levels', 'A cloud of electrons'], answer: 'A nucleus at the center with electrons orbiting it', difficulty: 'Easy', pageReference: 355, concepts: ['rutherford model'], isPastPaper: false },
        ]
      },
      {
        id: 118,
        name: 'Electronic Devices',
        questions: [
            { id: 118001, text: 'What is a semiconductor?', options: ['A material with conductivity between that of a conductor and an insulator', 'A material that conducts electricity perfectly', 'A material that does not conduct electricity', 'A material that is magnetic'], answer: 'A material with conductivity between that of a conductor and an insulator', difficulty: 'Easy', pageReference: 375, concepts: ['semiconductor'], isPastPaper: false },
        ]
      },
      {
        id: 119,
        name: 'Communication Systems',
        questions: [
            { id: 119001, text: 'What is modulation?', options: ['The process of varying a carrier wave in accordance with the information signal', 'The process of filtering a signal', 'The process of amplifying a signal', 'The process of transmitting a signal'], answer: 'The process of varying a carrier wave in accordance with the information signal', difficulty: 'Easy', pageReference: 395, concepts: ['modulation'], isPastPaper: false },
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

    

    