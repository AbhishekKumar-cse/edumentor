
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
import { modernPhysicsQuestions } from './data/modern-physics';

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
              { id: 101, name: 'Kinematics', questions: [] },
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
                 opticsQuestions,
            ]
        },
        {
            id: 14,
            name: 'Electromagnetism',
            chapters: [
                electrostaticsQuestions,
                currentElectricityQuestions,
                { id: 112, name: 'Magnetic Effects of Current and Magnetism', questions: [] },
                { id: 113, name: 'Electromagnetic Induction and Alternating Currents', questions: [] },
                { id: 114, name: 'Electromagnetic Waves', questions: [] },
            ]
        },
        {
            id: 15,
            name: 'Modern Physics',
            chapters: [
                 modernPhysicsQuestions,
                 { id: 117, name: 'Atoms and Nuclei', questions: [] },
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
          { id: 101013, text: 'What is the slope of a position-time graph?', options: ['Acceleration', 'Velocity', 'Jerk', 'Displacement'], answer: 'Velocity', difficulty: 'Easy', pageReference: 20, concepts: ['x-t graph', 'velocity'], isPastPaper: false },
          { id: 101014, text: 'What is the difference between speed and velocity?', options: ['Speed is a scalar, velocity is a vector', 'Velocity is a scalar, speed is a vector', 'They are the same', 'Speed has direction, velocity does not'], answer: 'Speed is a scalar, velocity is a vector', difficulty: 'Easy', pageReference: 13, concepts: ['speed', 'velocity'], isPastPaper: false },
          { id: 101015, text: 'What is the acceleration of a projectile at its highest point?', options: ['g upwards', 'g downwards', 'Zero', 'Depends on projection angle'], answer: 'g downwards', difficulty: 'Easy', pageReference: 36, concepts: ['projectile motion', 'acceleration'], isPastPaper: true },
          { id: 101016, text: 'If a body starts from rest, its final velocity after time t is:', options: ['v = u + at', 'v = at', 'v = u - at', 'v = u'], answer: 'v = at', difficulty: 'Easy', pageReference: 23, concepts: ['equations of motion'], isPastPaper: false },
          { id: 101017, text: 'What is the path of a projectile in the absence of air resistance?', options: ['Straight line', 'Circle', 'Parabola', 'Ellipse'], answer: 'Parabola', difficulty: 'Easy', pageReference: 33, concepts: ['projectile motion'], isPastPaper: false },
          { id: 101018, text: 'What does a horizontal line on a velocity-time graph represent?', options: ['Constant acceleration', 'Constant velocity', 'Increasing acceleration', 'Decreasing acceleration'], answer: 'Constant velocity', difficulty: 'Easy', pageReference: 22, concepts: ['v-t graph'], isPastPaper: false },
          { id: 101019, text: 'What is the displacement of a particle moving in a circle of radius r after one full rotation?', options: ['2πr', 'πr', '0', 'r'], answer: '0', difficulty: 'Easy', pageReference: 11, concepts: ['displacement', 'circular motion'], isPastPaper: false },
          { id: 101020, text: 'What is the relation between time of ascent and time of descent for a vertically projected body?', options: ['Time of ascent > Time of descent', 'Time of ascent < Time of descent', 'Time of ascent = Time of descent', 'Depends on mass'], answer: 'Time of ascent = Time of descent', difficulty: 'Easy', pageReference: 28, concepts: ['motion under gravity'], isPastPaper: false },
          { id: 101021, text: 'What is relative velocity?', options: ['The sum of two velocities', 'The product of two velocities', 'The velocity of one object with respect to another', 'The average velocity'], answer: 'The velocity of one object with respect to another', difficulty: 'Easy', pageReference: 40, concepts: ['relative velocity'], isPastPaper: false },
          { id: 101022, text: 'What is the range of a projectile?', options: ['The maximum vertical distance', 'The maximum horizontal distance', 'The total distance traveled', 'The height of the projectile'], answer: 'The maximum horizontal distance', difficulty: 'Easy', pageReference: 34, concepts: ['projectile motion'], isPastPaper: false },
          { id: 101023, text: 'A car accelerates from rest at a constant rate α for some time, after which it decelerates at a constant rate β to come to rest. If the total time elapsed is t, the maximum velocity acquired by the car is:', options: ['(α^2 - β^2)t / (αβ)', '(α^2 + β^2)t / (αβ)', '(αβ)t / (α + β)', '(α + β)t / (αβ)'], answer: '(αβ)t / (α + β)', difficulty: 'Hard', pageReference: 25, concepts: ['equations of motion', 'v-t graph'], isPastPaper: true },
          { id: 101024, text: 'A ball is dropped from a high-rise platform at t = 0 starting from rest. After 6 seconds another ball is thrown downwards from the same platform with a speed v. The two balls meet at t = 18 s. What is the value of v? (take g = 10 m/s^2)', options: ['75 m/s', '55 m/s', '40 m/s', '60 m/s'], answer: '75 m/s', difficulty: 'Medium', pageReference: 29, concepts: ['motion under gravity', 'relative motion'], isPastPaper: true },
          { id: 101025, text: 'A particle is moving with speed v = b√x along the positive x-axis. The acceleration of the particle is:', options: ['b^2/2', 'b^2', '2b^2', 'b^2/4'], answer: 'b^2/2', difficulty: 'Medium', pageReference: 27, concepts: ['acceleration', 'calculus'], isPastPaper: true },
          { id: 101026, text: 'Two projectiles are fired from the same point with the same speed at angles of projection 60° and 30° respectively. Which one of the following is true?', options: ['Their range will be the same', 'Their maximum height will be the same', 'Their time of flight will be the same', 'Their landing velocity will be the same'], answer: 'Their range will be the same', difficulty: 'Medium', pageReference: 37, concepts: ['projectile motion', 'range'], isPastPaper: true },
          { id: 101027, text: 'A river is flowing from west to east at a speed of 5 m/min. A man on the south bank of the river, capable of swimming at 10 m/min in still water, wants to swim across the river in the shortest time. He should swim in a direction:', options: ['due north', '30° east of north', '30° west of north', '60° east of north'], answer: 'due north', difficulty: 'Medium', pageReference: 42, concepts: ['relative velocity', 'river-boat problems'], isPastPaper: true },
          { id: 101028, text: 'A particle moves in a straight line with a constant acceleration. It changes its velocity from 10 m/s to 20 m/s while passing through a distance of 135 m in t seconds. The value of t is:', options: ['12', '9', '10', '1.8'], answer: '9', difficulty: 'Medium', pageReference: 24, concepts: ['equations of motion'], isPastPaper: true },
          { id: 101029, text: 'A particle has an initial velocity of 3i + 4j and an acceleration of 0.4i + 0.3j. Its speed after 10 s is:', options: ['7 units', '7√2 units', '8.5 units', '10 units'], answer: '7√2 units', difficulty: 'Medium', pageReference: 32, concepts: ['vectors', 'kinematics in 2d'], isPastPaper: true },
          { id: 101030, text: 'The position of a particle as a function of time t, is given by x(t) = at + bt^2 - ct^3 where a, b, c are constants. When the particle attains zero acceleration, then its velocity will be:', options: ['a + b^2/(4c)', 'a + b^2/(c)', 'a + b^2/(2c)', 'a + b^2/(3c)'], answer: 'a + b^2/(3c)', difficulty: 'Hard', pageReference: 19, concepts: ['calculus', 'velocity', 'acceleration'], isPastPaper: true },
          { id: 101031, text: 'A projectile is given an initial velocity of (i + 2j) m/s, where i is along the ground and j is along the vertical. If g = 10 m/s^2, the equation of its trajectory is:', options: ['y = x - 5x^2', 'y = 2x - 5x^2', '4y = 2x - 5x^2', '4y = 2x - 25x^2'], answer: 'y = 2x - 5x^2', difficulty: 'Medium', pageReference: 38, concepts: ['projectile motion', 'trajectory'], isPastPaper: true },
          { id: 101032, text: 'From a building two balls A and B are thrown such that A is thrown upwards and B downwards (both vertically). If vA and vB are their respective velocities on reaching the ground, then', options: ['vB > vA', 'vA = vB', 'vA > vB', 'their velocities depend on their masses'], answer: 'vA = vB', difficulty: 'Medium', pageReference: 30, concepts: ['motion under gravity', 'conservation of energy'], isPastPaper: true },
          { id: 101033, text: 'A stone is dropped into a well of depth h. The splash is heard after a time t. If c is the velocity of sound, then:', options: ['t = √(2h/g) + h/c', 't = √(2h/g) - h/c', 't = √(h/2g) + h/c', 't = √(h/g) + h/c'], answer: 't = √(2h/g) + h/c', difficulty: 'Medium', pageReference: 29, concepts: ['motion under gravity', 'speed of sound'], isPastPaper: false },
          { id: 101034, text: 'A particle moves along the x-axis. Its position is given by the equation x = 2 + 3t - 4t^2. The initial velocity of the particle is:', options: ['2 m/s', '3 m/s', '-4 m/s', '0 m/s'], answer: '3 m/s', difficulty: 'Easy', pageReference: 18, concepts: ['velocity', 'calculus'], isPastPaper: false },
          { id: 101035, text: 'Which of the following graphs represents uniform motion?', options: ['A position-time graph that is a straight line with a non-zero slope', 'A velocity-time graph that is a horizontal line', 'An acceleration-time graph that is a horizontal line at zero', 'All of the above'], answer: 'All of the above', difficulty: 'Easy', pageReference: 22, concepts: ['uniform motion', 'graphs'], isPastPaper: false },
          { id: 101036, text: 'What is the angle between velocity and acceleration in uniform circular motion?', options: ['0°', '45°', '90°', '180°'], answer: '90°', difficulty: 'Easy', pageReference: 31, concepts: ['circular motion'], isPastPaper: true },
          { id: 101037, text: 'A particle is projected at an angle of 45° with the horizontal. The relation between range and maximum height is:', options: ['R = 4H', 'H = 4R', 'R = 2H', 'H = 2R'], answer: 'R = 4H', difficulty: 'Medium', pageReference: 37, concepts: ['projectile motion'], isPastPaper: true },
          { id: 101038, text: 'The distance travelled by a particle starting from rest and moving with an acceleration 4/3 m/s^2, in the third second is:', options: ['10/3 m', '19/3 m', '6 m', '4 m'], answer: '10/3 m', difficulty: 'Medium', pageReference: 24, concepts: ['equations of motion', 'distance in nth second'], isPastPaper: true },
          { id: 101039, text: 'A bus is moving with a speed of 10 m/s on a straight road. A scooterist wishes to overtake the bus in 100 s. If the bus is at a distance of 1 km from the scooterist, with what speed should the scooterist chase the bus?', options: ['40 m/s', '25 m/s', '10 m/s', '20 m/s'], answer: '20 m/s', difficulty: 'Medium', pageReference: 41, concepts: ['relative velocity'], isPastPaper: true },
          { id: 101040, text: 'A man throws balls with the same speed vertically upwards one after the other at an interval of 2 seconds. What should be the speed of the throw so that more than two balls are in the sky at any time? (g = 9.8 m/s^2)', options: ['At least 0.8 m/s', 'Any speed less than 19.6 m/s', 'Only with speed 19.6 m/s', 'More than 19.6 m/s'], answer: 'More than 19.6 m/s', difficulty: 'Hard', pageReference: 29, concepts: ['motion under gravity'], isPastPaper: true },
          { id: 101041, text: 'The velocity of a projectile at the initial point A is (2i + 3j) m/s. Its velocity (in m/s) at point B is:', options: ['-2i - 3j', ' -2i + 3j', '2i - 3j', '2i + 3j'], answer: '2i - 3j', difficulty: 'Medium', pageReference: 36, concepts: ['projectile motion', 'vectors'], isPastPaper: true },
          { id: 101042, text: 'A particle of mass m is projected with velocity v making an angle of 45° with the horizontal. When the particle lands on the level ground, the magnitude of the change in its momentum will be:', options: ['mv√2', 'zero', '2mv', 'mv/√2'], answer: 'mv√2', difficulty: 'Medium', pageReference: 36, concepts: ['projectile motion', 'momentum'], isPastPaper: true },
          { id: 101043, text: 'A body is moving with velocity 30 m/s towards east. After 10 seconds its velocity becomes 40 m/s towards north. The average acceleration of the body is:', options: ['1 m/s^2', '7 m/s^2', '√7 m/s^2', '5 m/s^2'], answer: '5 m/s^2', difficulty: 'Medium', pageReference: 16, concepts: ['average acceleration', 'vectors'], isPastPaper: true },
          { id: 101044, text: 'A particle moves a distance x in time t according to the equation x = (t+5)^-1. The acceleration of the particle is proportional to:', options: ['(velocity)^3/2', '(distance)^2', '(distance)^-2', '(velocity)^2/3'], answer: '(velocity)^3/2', difficulty: 'Hard', pageReference: 19, concepts: ['acceleration', 'velocity', 'calculus'], isPastPaper: true },
          { id: 101045, text: 'The motion of a particle along a straight line is described by the equation x = 8 + 12t - t^3 where x is in metres and t in seconds. The retardation of the particle when its velocity becomes zero is:', options: ['24 m/s^2', 'zero', '6 m/s^2', '12 m/s^2'], answer: '12 m/s^2', difficulty: 'Medium', pageReference: 18, concepts: ['velocity', 'acceleration', 'calculus'], isPastPaper: true },
          { id: 101046, text: 'A stone falls freely under gravity. It covers distances h1, h2 and h3 in the first 5 seconds, the next 5 seconds and the next 5 seconds respectively. The relation between h1, h2 and h3 is:', options: ['h1 = 2h2 = 3h3', 'h1 = h2/3 = h3/5', 'h2 = 3h1 and h3 = 5h1', 'h1 = h2 = h3'], answer: 'h1 = h2/3 = h3/5', difficulty: 'Medium', pageReference: 28, concepts: ['motion under gravity', 'equations of motion'], isPastPaper: true },
          { id: 101047, text: 'A boat which has a speed of 5 km/hr in still water crosses a river of width 1 km along the shortest possible path in 15 minutes. The velocity of the river water in km/hr is:', options: ['1', '3', '4', '√41'], answer: '3', difficulty: 'Medium', pageReference: 42, concepts: ['relative velocity', 'river-boat problems'], isPastPaper: true },
          { id: 101048, text: 'The x and y coordinates of the particle at any time are x = 5t - 2t^2 and y = 10t respectively, where x and y are in meters and t in seconds. The acceleration of the particle at t = 2 s is:', options: ['5 m/s^2', ' -4 m/s^2', '-8 m/s^2', '0'], answer: '-4 m/s^2', difficulty: 'Medium', pageReference: 18, concepts: ['acceleration', 'vectors', 'calculus'], isPastPaper: true },
          { id: 101049, text: 'A projectile is fired at an angle of 45° with the horizontal. Elevation angle of the projectile at its highest point as seen from the point of projection is:', options: ['45°', '60°', 'tan⁻¹(1/2)', 'tan⁻¹(√3/2)'], answer: 'tan⁻¹(1/2)', difficulty: 'Medium', pageReference: 37, concepts: ['projectile motion', 'trajectory'], isPastPaper: true },
          { id: 101050, text: 'A particle starting from the origin (0,0) moves in a straight line in the (x,y) plane. Its coordinates at a later time are (√3, 3). The path of the particle makes with the x-axis an angle of:', options: ['30°', '45°', '60°', '0°'], answer: '60°', difficulty: 'Easy', pageReference: 10, concepts: ['vectors', 'displacement'], isPastPaper: false },
          { id: 101051, text: 'If a particle moves with a constant velocity, its acceleration is:', options: ['Positive', 'Negative', 'Zero', 'Infinite'], answer: 'Zero', difficulty: 'Easy', pageReference: 15, concepts: ['acceleration', 'velocity'], isPastPaper: false },
          { id: 101052, text: 'The area under the acceleration-time graph represents:', options: ['Displacement', 'Change in velocity', 'Force', 'Work done'], answer: 'Change in velocity', difficulty: 'Easy', pageReference: 21, concepts: ['a-t graph'], isPastPaper: false },
          { id: 101053, text: 'For an object thrown vertically upwards, the velocity at the maximum height is:', options: ['Maximum', 'Minimum', 'Zero', 'Depends on mass'], answer: 'Zero', difficulty: 'Easy', pageReference: 26, concepts: ['motion under gravity'], isPastPaper: false },
          { id: 101054, text: 'Which of the following is a vector quantity?', options: ['Distance', 'Speed', 'Displacement', 'Time'], answer: 'Displacement', difficulty: 'Easy', pageReference: 10, concepts: ['vectors', 'scalars'], isPastPaper: false },
          { id: 101055, text: 'The centripetal acceleration is directed:', options: ['Away from the center', 'Towards the center', 'Tangent to the path', 'Opposite to velocity'], answer: 'Towards the center', difficulty: 'Easy', pageReference: 31, concepts: ['circular motion'], isPastPaper: false },
          { id: 101056, text: 'At what angle of projection is the range of a projectile maximum?', options: ['0°', '30°', '45°', '90°'], answer: '45°', difficulty: 'Easy', pageReference: 34, concepts: ['projectile motion'], isPastPaper: true },
          { id: 101057, text: 'What is the relationship between displacement (s) and time (t) for a body with uniform acceleration?', options: ['s ∝ t', 's ∝ t^2', 's ∝ 1/t', 's ∝ √t'], answer: 's ∝ t^2', difficulty: 'Easy', pageReference: 23, concepts: ['equations of motion'], isPastPaper: false },
          { id: 101058, text: 'Two cars are moving in the same direction with the same speed. The relative velocity of one with respect to the other is:', options: ['Zero', 'Double the speed', 'Half the speed', 'Equal to the speed'], answer: 'Zero', difficulty: 'Easy', pageReference: 40, concepts: ['relative velocity'], isPastPaper: false },
          { id: 101059, text: 'What is the dimension of acceleration?', options: ['LT⁻¹', 'LT⁻²', 'L⁻¹T', 'L⁻¹T⁻²'], answer: 'LT⁻²', difficulty: 'Easy', pageReference: 15, concepts: ['dimensions'], isPastPaper: false },
          { id: 101060, text: 'A wheel of radius 1 m rolls forward half a revolution on a horizontal ground. The magnitude of the displacement of the point of the wheel initially in contact with the ground is:', options: ['2π', '√2π', '√(π^2 + 4)', 'π'], answer: '√(π^2 + 4)', difficulty: 'Hard', pageReference: 11, concepts: ['displacement', 'rolling motion'], isPastPaper: true },
        ]
      },
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
      {
        id: 112,
        name: 'Magnetic Effects of Current and Magnetism',
        questions: []
      },
      {
        id: 113,
        name: 'Electromagnetic Induction and Alternating Currents',
        questions: []
      },
      {
        id: 114,
        name: 'Electromagnetic Waves',
        questions: []
      },
      opticsQuestions,
      modernPhysicsQuestions,
      {
        id: 117,
        name: 'Atoms and Nuclei',
        questions: []
      },
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


    