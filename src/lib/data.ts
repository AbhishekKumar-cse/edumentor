
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
          { id: 101011, text: 'A particle moves along a straight line such that its position x at time t is given by x = 3t^2 - 6t. The average velocity of the particle between t=1s and t=4s is:', options: ['9 m/s', '12 m/s', '15 m/s', '6 m/s'], answer: '9 m/s', difficulty: 'Medium', pageReference: 18, concepts: ['average velocity', 'calculus'], isPastPaper: true },
          { id: 101012, text: 'A body is projected with a velocity of 20 m/s at an angle of 30° with the horizontal. The time of flight is (g=10 m/s^2):', options: ['1 s', '2 s', '3 s', '4 s'], answer: '2 s', difficulty: 'Medium', pageReference: 35, concepts: ['projectile motion', 'time of flight'], isPastPaper: true },
        ]
      },
      {
        id: 102,
        name: 'Laws of Motion',
        questions: [
            { id: 102001, text: 'What is inertia?', options: ['The property of a body to resist changes in its state of rest or uniform motion', 'The force acting on a body', 'The acceleration of a body', 'The mass of a body'], answer: 'The property of a body to resist changes in its state of rest or uniform motion', difficulty: 'Easy', pageReference: 45, concepts: ['inertia', 'newton first law'], isPastPaper: false },
            { id: 102002, text: 'State Newton\'s first law of motion.', options: ['F=ma', 'For every action, there is an equal and opposite reaction', 'A body at rest stays at rest, a body in motion stays in motion', 'Force is the rate of change of momentum'], answer: 'A body at rest stays at rest, a body in motion stays in motion', difficulty: 'Easy', pageReference: 46, concepts: ['newton first law'], isPastPaper: false },
            { id: 102003, text: 'A block of mass 5 kg is pulled along a rough horizontal surface by a force of 20 N. If the coefficient of kinetic friction is 0.2, the acceleration of the block is (g=10 m/s^2):', options: ['1 m/s^2', '2 m/s^2', '3 m/s^2', '4 m/s^2'], answer: '2 m/s^2', difficulty: 'Medium', pageReference: 52, concepts: ['friction', 'newton second law'], isPastPaper: true },
            { id: 102004, text: 'A lift is moving up with an acceleration of g/3. The apparent weight of a person of mass m will be:', options: ['mg', '4mg/3', '2mg/3', 'mg/3'], answer: '4mg/3', difficulty: 'Medium', pageReference: 50, concepts: ['apparent weight', 'newton second law'], isPastPaper: true },
            { id: 102005, text: 'A cricketer catches a ball of mass 150 g moving at a speed of 20 m/s. If the catching process is completed in 0.1 s, the force of the blow exerted by the ball on the hand of the cricketer is:', options: ['3 N', '30 N', '300 N', '0.3 N'], answer: '30 N', difficulty: 'Medium', pageReference: 48, concepts: ['impulse', 'newton second law'], isPastPaper: true },
        ]
      },
       {
        id: 103,
        name: 'Work, Power, and Energy',
        questions: [
            { id: 103001, text: 'What is the SI unit of work?', options: ['Watt', 'Newton', 'Joule', 'Pascal'], answer: 'Joule', difficulty: 'Easy', pageReference: 65, concepts: ['work'], isPastPaper: false },
            { id: 103002, text: 'A body of mass 2 kg is thrown upwards with an initial velocity of 20 m/s. The work done by gravity until it reaches its maximum height is (g=10 m/s^2):', options: ['-400 J', '-200 J', '400 J', '200 J'], answer: '-400 J', difficulty: 'Medium', pageReference: 68, concepts: ['work done by gravity', 'kinetic energy'], isPastPaper: true },
            { id: 103003, text: 'The potential energy of a spring when stretched by 2 cm is U. If it is stretched by 10 cm, the potential energy stored in it will be:', options: ['U', '5U', '25U', 'U/5'], answer: '25U', difficulty: 'Medium', pageReference: 72, concepts: ['elastic potential energy'], isPastPaper: true },
            { id: 103004, text: 'A pump is used to lift 500 kg of water from a depth of 80 m in 10 s. The power of the pump is (g = 10 m/s^2):', options: ['40 kW', '4 kW', '400 kW', '0.4 kW'], answer: '40 kW', difficulty: 'Medium', pageReference: 75, concepts: ['power', 'work'], isPastPaper: true },
        ]
      },
      {
        id: 104,
        name: 'Rotational Motion',
        questions: [
            { id: 104001, text: 'Define torque.', options: ['The rotational equivalent of force', 'The rotational equivalent of mass', 'The rotational equivalent of momentum', 'The rotational equivalent of energy'], answer: 'The rotational equivalent of force', difficulty: 'Easy', pageReference: 85, concepts: ['torque'], isPastPaper: false },
            { id: 104002, text: 'A solid sphere rolls on a horizontal surface. The ratio of its translational kinetic energy to its total kinetic energy is:', options: ['2/7', '5/7', '1/2', '7/5'], answer: '5/7', difficulty: 'Medium', pageReference: 95, concepts: ['rolling motion', 'kinetic energy'], isPastPaper: true },
            { id: 104003, text: 'The moment of inertia of a thin rod of mass M and length L about an axis perpendicular to the rod at its center is:', options: ['ML^2/12', 'ML^2/3', 'ML^2/2', 'ML^2'], answer: 'ML^2/12', difficulty: 'Easy', pageReference: 90, concepts: ['moment of inertia'], isPastPaper: true },
            { id: 104004, text: 'A flywheel rotating at 300 rpm slows down to 180 rpm in 6 seconds. Its angular retardation is:', options: ['2π rad/s^2', 'π rad/s^2', '4π rad/s^2', '0.5π rad/s^2'], answer: '2π rad/s^2', difficulty: 'Medium', pageReference: 88, concepts: ['angular acceleration'], isPastPaper: true },
        ]
      },
      {
        id: 105,
        name: 'Gravitation',
        questions: [
            { id: 105001, text: 'State Newton\'s law of universal gravitation.', options: ['F = G * (m1*m2)/r^2', 'F = G * (m1+m2)/r^2', 'F = G * (m1*m2)/r', 'F = G * m1*m2*r'], answer: 'F = G * (m1*m2)/r^2', difficulty: 'Easy', pageReference: 105, concepts: ['gravitation'], isPastPaper: false },
            { id: 105002, text: 'The escape velocity from the surface of the earth is approximately:', options: ['7.9 km/s', '11.2 km/s', '9.8 km/s', '1.6 km/s'], answer: '11.2 km/s', difficulty: 'Easy', pageReference: 115, concepts: ['escape velocity'], isPastPaper: true },
            { id: 105003, text: 'The height at which the acceleration due to gravity becomes g/9 (where g is the acceleration due to gravity on the surface of the Earth) in terms of R, the radius of the Earth, is:', options: ['2R', 'R/2', 'R', '3R'], answer: '2R', difficulty: 'Medium', pageReference: 110, concepts: ['acceleration due to gravity'], isPastPaper: true },
            { id: 105004, text: 'The time period of a satellite of earth is 5 hours. If the separation between the earth and the satellite is increased to 4 times the previous value, the new time period will become:', options: ['10 hours', '20 hours', '40 hours', '80 hours'], answer: '40 hours', difficulty: 'Hard', pageReference: 118, concepts: ['kepler laws', 'time period of satellite'], isPastPaper: true },
        ]
      },
      {
        id: 106,
        name: 'Properties of Solids and Liquids',
        questions: [
            { id: 106001, text: 'What is elasticity?', options: ['The ability of a body to resist a change in its state of motion', 'The ability of a body to regain its original shape after the removal of deforming forces', 'The ability of a body to conduct heat', 'The ability of a body to conduct electricity'], answer: 'The ability of a body to regain its original shape after the removal of deforming forces', difficulty: 'Easy', pageReference: 125, concepts: ['elasticity'], isPastPaper: false },
            { id: 106002, text: 'A wire of length L and cross-sectional area A is made of a material of Young\'s modulus Y. If the wire is stretched by an amount x, the work done is:', options: ['(YAx^2)/L', '(YAx^2)/(2L)', '(2YAx^2)/L', '(YAL^2)/x'], answer: '(YAx^2)/(2L)', difficulty: 'Medium', pageReference: 128, concepts: ['young modulus', 'work done'], isPastPaper: true },
            { id: 106003, text: 'The excess pressure inside a soap bubble of radius R is proportional to:', options: ['R', '1/R', 'R^2', '1/R^2'], answer: '1/R', difficulty: 'Easy', pageReference: 135, concepts: ['surface tension', 'excess pressure'], isPastPaper: true },
            { id: 106004, text: 'Water rises in a capillary tube of radius r to a height h. The mass of water in the capillary is m. The mass of water that will rise in a capillary of radius 2r is:', options: ['m', '2m', 'm/2', '4m'], answer: '2m', difficulty: 'Medium', pageReference: 138, concepts: ['capillarity'], isPastPaper: true },
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
          { id: 107005, text: 'An adiabatic process is one in which:', options: ['Pressure is constant', 'Volume is constant', 'Temperature is constant', 'There is no heat exchange'], answer: 'There is no heat exchange', difficulty: 'Easy', pageReference: 156, concepts: ['thermodynamic processes', 'adiabatic'], isPastPaper: true },
          { id: 107006, text: 'What does the area under a P-V diagram represent?', options: ['Work done', 'Heat supplied', 'Change in internal energy', 'Entropy change'], answer: 'Work done', difficulty: 'Easy', pageReference: 154, concepts: ['pv diagram', 'work done'], isPastPaper: false },
          { id: 107007, text: 'The Zeroth Law of Thermodynamics leads to the concept of:', options: ['Energy', 'Entropy', 'Temperature', 'Pressure'], answer: 'Temperature', difficulty: 'Easy', pageReference: 149, concepts: ['zeroth law of thermodynamics'], isPastPaper: false },
          { id: 107008, text: 'In a cyclic process, the change in internal energy is:', options: ['Positive', 'Negative', 'Zero', 'Depends on the path'], answer: 'Zero', difficulty: 'Easy', pageReference: 158, concepts: ['cyclic process', 'internal energy'], isPastPaper: false },
          { id: 107009, text: 'What is the value of specific heat capacity of a gas in an isothermal process?', options: ['Zero', 'One', 'Infinite', 'Negative'], answer: 'Infinite', difficulty: 'Easy', pageReference: 155, concepts: ['specific heat', 'isothermal'], isPastPaper: true },
          { id: 107010, text: 'The Second Law of Thermodynamics introduces the concept of:', options: ['Enthalpy', 'Entropy', 'Internal Energy', 'Work'], answer: 'Entropy', difficulty: 'Easy', pageReference: 160, concepts: ['second law of thermodynamics', 'entropy'], isPastPaper: false },
        ]
      },
      {
        id: 108,
        name: 'Kinetic Theory of Gases',
        questions: [
            { id: 108001, text: 'What is the basic assumption of the kinetic theory of gases?', options: ['Gas molecules are always at rest', 'Gas molecules are point masses in random motion', 'Gas molecules have strong intermolecular forces', 'The volume of gas molecules is large compared to the container volume'], answer: 'Gas molecules are point masses in random motion', difficulty: 'Easy', pageReference: 175, concepts: ['kinetic theory'], isPastPaper: false },
            { id: 108002, text: 'The average kinetic energy of a gas molecule is directly proportional to:', options: ['The pressure of the gas', 'The volume of the gas', 'The absolute temperature of the gas', 'The mass of the gas molecule'], answer: 'The absolute temperature of the gas', difficulty: 'Easy', pageReference: 178, concepts: ['kinetic energy', 'temperature'], isPastPaper: true },
            { id: 108003, text: 'The root mean square speed of the molecules of a gas is proportional to:', options: ['√T', '1/√T', 'T', 'T^2'], answer: '√T', difficulty: 'Medium', pageReference: 180, concepts: ['rms speed'], isPastPaper: true },
        ]
      },
      {
        id: 109,
        name: 'Oscillations and Waves',
        questions: [
            { id: 109001, text: 'What is simple harmonic motion (SHM)?', options: ['Any periodic motion', 'Motion in a circle', 'Periodic motion where the restoring force is proportional to the displacement', 'Motion with constant acceleration'], answer: 'Periodic motion where the restoring force is proportional to the displacement', difficulty: 'Easy', pageReference: 195, concepts: ['shm'], isPastPaper: false },
            { id: 109002, text: 'The time period of a simple pendulum of length L is given by T = 2π√(L/g). If the length is increased by a factor of 4, the new time period will be:', options: ['T', '2T', 'T/2', '4T'], answer: '2T', difficulty: 'Easy', pageReference: 200, concepts: ['simple pendulum', 'time period'], isPastPaper: true },
            { id: 109003, text: 'The phenomenon of beats is produced by the superposition of two waves of:', options: ['Same frequency and same amplitude', 'Slightly different frequencies and same amplitude', 'Same frequency and different amplitudes', 'Slightly different frequencies and different amplitudes'], answer: 'Slightly different frequencies and same amplitude', difficulty: 'Medium', pageReference: 210, concepts: ['beats', 'superposition'], isPastPaper: true },
        ]
      },
      {
        id: 110,
        name: 'Electrostatics',
        questions: [
            { id: 110001, text: 'State Coulomb\'s law.', options: ['The force between two charges is proportional to the product of the charges and inversely proportional to the square of the distance between them.', 'The force between two charges is proportional to the sum of the charges.', 'The force between two charges is independent of the distance between them.', 'The force between two charges is always attractive.'], answer: 'The force between two charges is proportional to the product of the charges and inversely proportional to the square of the distance between them.', difficulty: 'Easy', pageReference: 215, concepts: ['coulomb law'], isPastPaper: false },
            { id: 110002, text: 'The electric field inside a charged hollow spherical conductor is:', options: ['σ/ε₀', 'Zero', 'Constant, but not zero', 'Varies with distance from the center'], answer: 'Zero', difficulty: 'Easy', pageReference: 225, concepts: ['electric field', 'conductors'], isPastPaper: true },
            { id: 110003, text: 'An electric dipole is placed in a uniform electric field. The net force on it is:', options: ['Always zero', 'Never zero', 'Depends on the orientation of the dipole', 'Depends on the strength of the field'], answer: 'Always zero', difficulty: 'Medium', pageReference: 220, concepts: ['electric dipole', 'uniform field'], isPastPaper: true },
        ]
      },
      {
        id: 111,
        name: 'Current Electricity',
        questions: [
            { id: 111001, text: 'What is Ohm\'s law?', options: ['V = IR', 'P = VI', 'V = I/R', 'I = V/R'], answer: 'V = IR', difficulty: 'Easy', pageReference: 235, concepts: ['ohm law'], isPastPaper: false },
            { id: 111002, text: 'Kirchhoff\'s junction rule is a statement of:', options: ['Conservation of energy', 'Conservation of charge', 'Conservation of momentum', 'Conservation of angular momentum'], answer: 'Conservation of charge', difficulty: 'Easy', pageReference: 240, concepts: ['kirchhoff laws'], isPastPaper: true },
            { id: 111003, text: 'In a Wheatstone bridge, if the bridge is balanced, the ratio of resistances is:', options: ['P/Q = R/S', 'P/R = Q/S', 'P/S = Q/R', 'P+Q = R+S'], answer: 'P/Q = R/S', difficulty: 'Medium', pageReference: 245, concepts: ['wheatstone bridge'], isPastPaper: true },
        ]
      },
      {
        id: 112,
        name: 'Magnetic Effects of Current and Magnetism',
        questions: [
            { id: 112001, text: 'What is the direction of the magnetic field around a straight current-carrying wire?', options: ['Along the wire', 'Perpendicular to the wire', 'In concentric circles around the wire', 'Radially outwards'], answer: 'In concentric circles around the wire', difficulty: 'Easy', pageReference: 255, concepts: ['magnetic field'], isPastPaper: false },
            { id: 112002, text: 'The force experienced by a charge q moving with velocity v in a magnetic field B is given by:', options: ['F = q(v x B)', 'F = q(B x v)', 'F = qvB', 'F = qv/B'], answer: 'F = q(v x B)', difficulty: 'Easy', pageReference: 260, concepts: ['lorentz force'], isPastPaper: true },
            { id: 112003, text: 'A cyclotron is used to accelerate:', options: ['Electrons', 'Neutrons', 'Positive ions', 'Negative ions'], answer: 'Positive ions', difficulty: 'Medium', pageReference: 265, concepts: ['cyclotron'], isPastPaper: true },
        ]
      },
      {
        id: 113,
        name: 'Electromagnetic Induction and Alternating Currents',
        questions: [
            { id: 113001, text: 'What is Faraday\'s law of electromagnetic induction?', options: ['The induced emf is proportional to the rate of change of magnetic flux', 'The induced current opposes the change in magnetic flux', 'The magnetic flux is always constant', 'The induced emf is constant'], answer: 'The induced emf is proportional to the rate of change of magnetic flux', difficulty: 'Easy', pageReference: 275, concepts: ['faraday law'], isPastPaper: false },
            { id: 113002, text: 'The peak value of an AC voltage is E₀. Its RMS value is:', options: ['E₀', 'E₀/√2', 'E₀/2', '√2 E₀'], answer: 'E₀/√2', difficulty: 'Easy', pageReference: 285, concepts: ['rms value', 'ac voltage'], isPastPaper: true },
            { id: 113003, text: 'In a purely inductive circuit, the current:', options: ['Lags behind the voltage by π/2', 'Leads the voltage by π/2', 'Is in phase with the voltage', 'Lags behind the voltage by π'], answer: 'Lags behind the voltage by π/2', difficulty: 'Medium', pageReference: 288, concepts: ['inductive circuit', 'phase difference'], isPastPaper: true },
        ]
      },
      {
        id: 114,
        name: 'Electromagnetic Waves',
        questions: [
            { id: 114001, text: 'What is the nature of electromagnetic waves?', options: ['Longitudinal', 'Transverse', 'Stationary', 'Mechanical'], answer: 'Transverse', difficulty: 'Easy', pageReference: 295, concepts: ['em waves'], isPastPaper: false },
            { id: 114002, text: 'Which of the following has the highest frequency?', options: ['Gamma rays', 'X-rays', 'UV rays', 'Microwaves'], answer: 'Gamma rays', difficulty: 'Easy', pageReference: 300, concepts: ['em spectrum'], isPastPaper: true },
            { id: 114003, text: 'The speed of electromagnetic waves in vacuum is given by:', options: ['1/√(ε₀μ₀)', '√(ε₀/μ₀)', '√(μ₀/ε₀)', 'ε₀μ₀'], answer: '1/√(ε₀μ₀)', difficulty: 'Medium', pageReference: 298, concepts: ['speed of light'], isPastPaper: true },
        ]
      },
      {
        id: 115,
        name: 'Optics',
        questions: [
            { id: 115001, text: 'What is reflection of light?', options: ['The bending of light as it passes from one medium to another', 'The bouncing back of light from a surface', 'The splitting of light into its constituent colors', 'The spreading of light around corners'], answer: 'The bouncing back of light from a surface', difficulty: 'Easy', pageReference: 315, concepts: ['reflection'], isPastPaper: false },
            { id: 115002, text: 'For a total internal reflection, which of the following is correct?', options: ['Light travels from rarer to denser medium', 'Light travels from denser to rarer medium', 'Angle of incidence must be less than critical angle', 'Angle of incidence can be any value'], answer: 'Light travels from denser to rarer medium', difficulty: 'Easy', pageReference: 325, concepts: ['total internal reflection'], isPastPaper: true },
            { id: 115003, text: 'In Young\'s double-slit experiment, the fringe width is given by:', options: ['λD/d', 'λd/D', 'Dd/λ', 'λ/Dd'], answer: 'λD/d', difficulty: 'Medium', pageReference: 330, concepts: ['interference', 'ydse'], isPastPaper: true },
        ]
      },
      {
        id: 116,
        name: 'Dual Nature of Matter and Radiation',
        questions: [
            { id: 116001, text: 'What is the photoelectric effect?', options: ['The emission of electrons from a metal surface when light shines on it', 'The bending of light', 'The splitting of light', 'The reflection of light'], answer: 'The emission of electrons from a metal surface when light shines on it', difficulty: 'Easy', pageReference: 335, concepts: ['photoelectric effect'], isPastPaper: false },
            { id: 116002, text: 'The de-Broglie wavelength of a particle of mass m moving with velocity v is:', options: ['h/mv', 'mv/h', 'hmv', 'h/m'], answer: 'h/mv', difficulty: 'Easy', pageReference: 340, concepts: ['de-broglie wavelength'], isPastPaper: true },
            { id: 116003, text: 'The work function of a metal is 2.1 eV. The threshold wavelength for this metal is:', options: ['590 nm', '490 nm', '690 nm', '390 nm'], answer: '590 nm', difficulty: 'Medium', pageReference: 338, concepts: ['work function', 'threshold wavelength'], isPastPaper: true },
        ]
      },
      {
        id: 117,
        name: 'Atoms and Nuclei',
        questions: [
            { id: 117001, text: 'What is the structure of an atom according to Rutherford\'s model?', options: ['A uniform sphere of positive charge with electrons embedded in it', 'A nucleus at the center with electrons orbiting it', 'Electrons in fixed energy levels', 'A cloud of electrons'], answer: 'A nucleus at the center with electrons orbiting it', difficulty: 'Easy', pageReference: 355, concepts: ['rutherford model'], isPastPaper: false },
            { id: 117002, text: 'The energy of an electron in the nth orbit of a hydrogen atom is proportional to:', options: ['n^2', '1/n^2', 'n', '1/n'], answer: '1/n^2', difficulty: 'Easy', pageReference: 360, concepts: ['bohr model', 'energy levels'], isPastPaper: true },
            { id: 117003, text: 'The half-life of a radioactive substance is 30 days. The time taken for 3/4 of its original mass to disintegrate is:', options: ['30 days', '60 days', '90 days', '120 days'], answer: '60 days', difficulty: 'Medium', pageReference: 365, concepts: ['radioactivity', 'half-life'], isPastPaper: true },
        ]
      },
      {
        id: 118,
        name: 'Electronic Devices',
        questions: [
            { id: 118001, text: 'What is a semiconductor?', options: ['A material with conductivity between that of a conductor and an insulator', 'A material that conducts electricity perfectly', 'A material that does not conduct electricity', 'A material that is magnetic'], answer: 'A material with conductivity between that of a conductor and an insulator', difficulty: 'Easy', pageReference: 375, concepts: ['semiconductor'], isPastPaper: false },
            { id: 118002, text: 'In a p-n junction diode, the depletion region is created by:', options: ['Diffusion of majority carriers', 'Drift of minority carriers', 'Recombination of electrons and holes', 'Applied forward bias'], answer: 'Recombination of electrons and holes', difficulty: 'Easy', pageReference: 380, concepts: ['p-n junction', 'depletion region'], isPastPaper: true },
            { id: 118003, text: 'A Zener diode is used as a:', options: ['Rectifier', 'Amplifier', 'Voltage regulator', 'Oscillator'], answer: 'Voltage regulator', difficulty: 'Medium', pageReference: 385, concepts: ['zener diode'], isPastPaper: true },
        ]
      },
      {
        id: 119,
        name: 'Communication Systems',
        questions: [
            { id: 119001, text: 'What is modulation?', options: ['The process of varying a carrier wave in accordance with the information signal', 'The process of filtering a signal', 'The process of amplifying a signal', 'The process of transmitting a signal'], answer: 'The process of varying a carrier wave in accordance with the information signal', difficulty: 'Easy', pageReference: 395, concepts: ['modulation'], isPastPaper: false },
            { id: 119002, text: 'The process of recovering the information signal from the carrier wave at the receiver is called:', options: ['Modulation', 'Demodulation', 'Amplification', 'Attenuation'], answer: 'Demodulation', difficulty: 'Easy', pageReference: 400, concepts: ['demodulation'], isPastPaper: true },
            { id: 119003, text: 'Sky wave propagation is used for frequencies in the range:', options: ['VHF', 'UHF', 'HF', 'Microwave'], answer: 'HF', difficulty: 'Medium', pageReference: 405, concepts: ['propagation of em waves'], isPastPaper: true },
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

    

    
