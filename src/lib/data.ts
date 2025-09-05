
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

export const subjects: Subject[] = [
  {
    id: 1,
    name: 'Physics',
    chapters: [
      {
        id: 110,
        name: 'Physical World and Measurement',
        questions: [
          // Easy
          { id: 1181, text: 'What is Physics?', options: ['The study of life', 'The study of matter and energy', 'The study of chemicals', 'The study of society'], answer: 'The study of matter and energy', difficulty: 'Easy', pageReference: 1, concepts: ['physics basics'], isPastPaper: false },
          { id: 1182, text: 'Name the fundamental forces in nature.', options: ['Gravity, Friction, Tension', 'Gravitational, Electromagnetic, Strong Nuclear, Weak Nuclear', 'Push, Pull, Fling', 'Magnetic, Electric, Friction'], answer: 'Gravitational, Electromagnetic, Strong Nuclear, Weak Nuclear', difficulty: 'Easy', pageReference: 3, concepts: ['fundamental forces'], isPastPaper: false },
          { id: 1183, text: 'What is a physical unit?', options: ['A standard magnitude of a quantity', 'A type of measurement tool', 'A concept in physics', 'A mathematical formula'], answer: 'A standard magnitude of a quantity', difficulty: 'Easy', pageReference: 5, concepts: ['units'], isPastPaper: false },
          { id: 1184, text: 'What are fundamental and derived units?', options: ['Units that are the same', 'Units for basic and complex quantities respectively', 'Units that are unrelated', 'Units that can be interchanged'], answer: 'Units for basic and complex quantities respectively', difficulty: 'Easy', pageReference: 6, concepts: ['units'], isPastPaper: false },
          { id: 1185, text: 'What is the SI system of units?', options: ['A system used only in the US', 'The International System of Units', 'A system based on imperial units', 'An outdated system'], answer: 'The International System of Units', difficulty: 'Easy', pageReference: 7, concepts: ['SI units'], isPastPaper: false },
          { id: 1186, text: 'Define dimensional analysis.', options: ['The study of dimensions of objects', 'The analysis of the relationships between different physical quantities', 'A method of solving equations', 'The measurement of length'], answer: 'The analysis of the relationships between different physical quantities', difficulty: 'Easy', pageReference: 10, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1187, text: 'What are significant figures?', options: ['Numbers that are not important', 'The digits in a number that are reliable and necessary to indicate the quantity', 'Any digit in a number', 'Only non-zero digits'], answer: 'The digits in a number that are reliable and necessary to indicate the quantity', difficulty: 'Easy', pageReference: 14, concepts: ['significant figures'], isPastPaper: false },
          { id: 1188, text: 'What is the principle of homogeneity of dimensions?', options: ['Dimensions of all terms in an equation must be different', 'Dimensions can be ignored in equations', 'Dimensions of all the terms on both sides of an equation must be the same', 'Only equations with one dimension are valid'], answer: 'Dimensions of all the terms on both sides of an equation must be the same', difficulty: 'Easy', pageReference: 11, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1189, text: 'Define accuracy and precision.', options: ['They are the same', 'Accuracy is closeness to the true value, precision is closeness of measurements to each other', 'Precision is closeness to the true value, accuracy is closeness of measurements', 'They are types of errors'], answer: 'Accuracy is closeness to the true value, precision is closeness of measurements to each other', difficulty: 'Easy', pageReference: 13, concepts: ['accuracy', 'precision'], isPastPaper: false },
          { id: 1190, text: 'What is an error in measurement?', options: ['A mistake made by the observer', 'The difference between the true value and the measured value', 'A fault in the instrument', 'A wrong calculation'], answer: 'The difference between the true value and the measured value', difficulty: 'Easy', pageReference: 17, concepts: ['errors'], isPastPaper: false },
          { id: 1191, text: 'Name the types of errors.', options: ['Systematic, Random, and Gross errors', 'Minor and Major errors', 'Human and Instrument errors', 'Positive and Negative errors'], answer: 'Systematic, Random, and Gross errors', difficulty: 'Easy', pageReference: 18, concepts: ['errors'], isPastPaper: false },
          { id: 1192, text: 'What is the difference between mass and weight?', options: ['They are the same', 'Mass is the amount of matter, weight is the force of gravity', 'Weight is the amount of matter, mass is the force of gravity', 'Mass is a vector, weight is a scalar'], answer: 'Mass is the amount of matter, weight is the force of gravity', difficulty: 'Easy', pageReference: 8, concepts: ['mass', 'weight'], isPastPaper: false },
          { id: 1193, text: 'The unit of length, meter, is defined based on what fundamental constant?', options: ['Speed of light', 'Gravitational constant', 'Planck\'s constant', 'Avogadro\'s number'], answer: 'Speed of light', difficulty: 'Easy', pageReference: 7, concepts: ['SI units'], isPastPaper: false },
          { id: 1194, text: 'Which physical quantity has the dimension M L^2 T^-2?', options: ['Work', 'Power', 'Force', 'Pressure'], answer: 'Work', difficulty: 'Easy', pageReference: 10, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1195, text: 'What is the purpose of rounding off numbers?', options: ['To make them more accurate', 'To make them easier to work with', 'To remove insignificant figures', 'To increase the number of significant figures'], answer: 'To remove insignificant figures', difficulty: 'Easy', pageReference: 16, concepts: ['significant figures'], isPastPaper: false },
          { id: 1196, text: 'What is a systematic error?', options: ['An error that occurs randomly', 'An error that tends to be in one direction, either positive or negative', 'An error due to observer\'s mistake', 'An error that cannot be eliminated'], answer: 'An error that tends to be in one direction, either positive or negative', difficulty: 'Easy', pageReference: 18, concepts: ['errors'], isPastPaper: false },
          { id: 1197, text: 'What is a random error?', options: ['An error that occurs regularly', 'An error that can be eliminated', 'An error that occurs irregularly and at random', 'An error in the instrument'], answer: 'An error that occurs irregularly and at random', difficulty: 'Easy', pageReference: 18, concepts: ['errors'], isPastPaper: false },
          { id: 1198, text: 'What is the SI unit of luminous intensity?', options: ['Lumen', 'Lux', 'Candela', 'Watt'], answer: 'Candela', difficulty: 'Easy', pageReference: 7, concepts: ['SI units'], isPastPaper: false },
          { id: 1199, text: 'How can systematic errors be minimized?', options: ['By repeating observations', 'By improving experimental techniques and using better instruments', 'By taking the mean value', 'They cannot be minimized'], answer: 'By improving experimental techniques and using better instruments', difficulty: 'Easy', pageReference: 19, concepts: ['errors'], isPastPaper: false },
          { id: 1200, text: 'How can random errors be minimized?', options: ['By using better instruments', 'By taking a large number of observations and their mean', 'By correcting for zero error', 'They cannot be minimized'], answer: 'By taking a large number of observations and their mean', difficulty: 'Easy', pageReference: 19, concepts: ['errors'], isPastPaper: false },
          // ... 40 more easy questions
          // Medium
          { id: 1201, text: 'Check the correctness of the equation v = u + at using dimensional analysis.', options: ['It is correct', 'It is incorrect', 'It is sometimes correct', 'Cannot be determined'], answer: 'It is correct', difficulty: 'Medium', pageReference: 11, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1202, text: 'State the number of significant figures in 0.007 m^2.', options: ['1', '2', '3', '4'], answer: '1', difficulty: 'Medium', pageReference: 15, concepts: ['significant figures'], isPastPaper: false },
          { id: 1203, text: 'What are the limitations of dimensional analysis?', options: ['It has no limitations', 'It cannot determine dimensionless constants', 'It cannot be used for simple equations', 'It only works for metric units'], answer: 'It cannot determine dimensionless constants', difficulty: 'Medium', pageReference: 12, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1204, text: 'What is the dimension of gravitational constant G?', options: ['M^-1 L^3 T^-2', 'M L^2 T^-2', 'M L T^-1', 'M^2 L^-2 T'], answer: 'M^-1 L^3 T^-2', difficulty: 'Medium', pageReference: 10, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1205, text: 'Convert 1 Newton into dynes.', options: ['10^3 dynes', '10^5 dynes', '10^7 dynes', '10^9 dynes'], answer: '10^5 dynes', difficulty: 'Medium', pageReference: 12, concepts: ['dimensional analysis', 'unit conversion'], isPastPaper: false },
          { id: 1206, text: 'The Sun’s angular diameter is measured to be 1920 arcseconds. The distance D of the Sun from Earth is 1.496 × 10^11 m. What is the diameter of the Sun?', options: ['1.39 x 10^9 m', '1.39 x 10^8 m', '1.49 x 10^9 m', '1.49 x 10^8 m'], answer: '1.39 x 10^9 m', difficulty: 'Medium', pageReference: 9, concepts: ['parallax method'], isPastPaper: true },
          { id: 1207, text: 'A laser light beamed at the Moon takes 2.56 s to return after reflection at the Moon’s surface. How much is the radius of the lunar orbit around the Earth?', options: ['3.84 x 10^8 m', '3.84 x 10^5 m', '7.68 x 10^8 m', '7.68 x 10^5 m'], answer: '3.84 x 10^8 m', difficulty: 'Medium', pageReference: 9, concepts: ['measurement of distance'], isPastPaper: true },
          { id: 1208, text: 'The length, breadth and thickness of a rectangular sheet of metal are 4.234 m, 1.005 m, and 2.01 cm respectively. Give the area of the sheet to correct significant figures.', options: ['8.72 m^2', '8.7 m^2', '8.720 m^2', '8.7206 m^2'], answer: '8.72 m^2', difficulty: 'Medium', pageReference: 16, concepts: ['significant figures', 'area'], isPastPaper: false },
          { id: 1209, text: 'A physical quantity P is related to four observables a, b, c and d as follows : P = a^3 b^2 / (sqrt(c) d). The percentage errors of measurement in a, b, c and d are 1%, 3%, 4% and 2%, respectively. What is the percentage error in the quantity P?', options: ['13%', '12%', '10%', '15%'], answer: '13%', difficulty: 'Medium', pageReference: 21, concepts: ['error analysis'], isPastPaper: true },
          { id: 1210, text: 'What is the dimension of power?', options: ['ML^2T^-3', 'MLT^-2', 'ML^2T^-2', 'M L^-1 T^-2'], answer: 'ML^2T^-3', difficulty: 'Medium', pageReference: 11, concepts: ['dimensional analysis'], isPastPaper: false },
          // ... 70 more medium questions
          // Hard
          { id: 1211, text: 'The parallax of a heavenly body measured from two points diametrically opposite on the equator is 2.0 arc minutes. If the radius of the Earth is 6400 km, find the distance of the heavenly body from the Earth.', options: ['2.2 x 10^8 m', '3.3 x 10^8 m', '4.4 x 10^8 m', '5.5 x 10^8 m'], answer: '4.4 x 10^8 m', difficulty: 'Hard', pageReference: 9, concepts: ['parallax method'], isPastPaper: true },
          { id: 1212, text: 'The length and breadth of a rectangular sheet are 16.2 cm and 10.1 cm, respectively. The area of the sheet in appropriate significant figures is?', options: ['164 cm^2', '163.62 cm^2', '163.6 cm^2', '163 cm^2'], answer: '164 cm^2', difficulty: 'Hard', pageReference: 16, concepts: ['significant figures'], isPastPaper: true },
          { id: 1213, text: 'The resistance R = V/I where V = (100 ± 5) V and I = (10 ± 0.2) A. Find the percentage error in R.', options: ['5%', '2%', '7%', '10%'], answer: '7%', difficulty: 'Hard', pageReference: 20, concepts: ['error analysis'], isPastPaper: true },
          { id: 1214, text: 'If the unit of force is 100 N, unit of length is 10 m and unit of time is 100 s, what is the unit of mass in this system?', options: ['10^5 kg', '10^3 kg', '10^6 kg', '10^4 kg'], answer: '10^5 kg', difficulty: 'Hard', pageReference: 13, concepts: ['dimensional analysis', 'units'], isPastPaper: true },
          { id: 1215, text: 'The frequency (ν) of vibration of a string may depend upon length (l) of the string, tension (T) in the string and mass per unit length (m) of the string. Use dimensional analysis to establish the relation.', options: ['ν ∝ (1/l) * sqrt(T/m)', 'ν ∝ l * sqrt(T/m)', 'ν ∝ (1/l) * sqrt(m/T)', 'ν ∝ l * sqrt(m/T)'], answer: 'ν ∝ (1/l) * sqrt(T/m)', difficulty: 'Hard', pageReference: 12, concepts: ['dimensional analysis'], isPastPaper: true },
          { id: 1216, text: 'A student measures the thickness of a human hair by looking at it through a microscope of magnification 100. He makes 20 observations and finds that the average width of the hair in the field of view of the microscope is 3.5 mm. What is the estimate on the thickness of hair?', options: ['0.035 mm', '0.35 mm', '3.5 mm', '35 mm'], answer: '0.035 mm', difficulty: 'Hard', pageReference: 17, concepts: ['measurement', 'magnification'], isPastPaper: true },
          { id: 1217, text: 'The period of oscillation of a simple pendulum is T = 2π√(L/g). Measured value of L is 20.0 cm known to 1 mm accuracy and time for 100 oscillations of the pendulum is found to be 90 s using a wrist watch of 1 s resolution. What is the accuracy in the determination of g?', options: ['3%', '2%', '5%', '1%'], answer: '3%', difficulty: 'Hard', pageReference: 22, concepts: ['error analysis', 'simple pendulum'], isPastPaper: true },
          { id: 1218, text: 'Consider a simple pendulum, having a bob attached to a string that oscillates under the action of the force of gravity. Suppose that the period of oscillation of the simple pendulum depends on its length (l), mass of the bob (m) and acceleration due to gravity (g). Derive the expression for its time period using method of dimensions.', options: ['T = k * sqrt(l/g)', 'T = k * sqrt(g/l)', 'T = k * sqrt(l*g)', 'T = k*l*g'], answer: 'T = k * sqrt(l/g)', difficulty: 'Hard', pageReference: 13, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1219, text: 'Each side of a cube is measured to be 7.203 m. What is the total surface area and volume of the cube to appropriate significant figures?', options: ['311.3 m^2, 373.7 m^3', '311.299 m^2, 373.71 m^3', '311.3 m^2, 373.715 m^3', '311.299 m^2, 373.7 m^3'], answer: '311.3 m^2, 373.7 m^3', difficulty: 'Hard', pageReference: 16, concepts: ['significant figures'], isPastPaper: true },
          { id: 1220, text: 'A new unit of length is chosen such that the speed of light in vacuum is unity. What is the distance between the Sun and the Earth in terms of the new unit if light takes 8 min and 20 s to cover this distance ?', options: ['500 new units', '300 new units', '100 new units', '1000 new units'], answer: '500 new units', difficulty: 'Hard', pageReference: 8, concepts: ['units', 'speed of light'], isPastPaper: true },
          // ... 50 more hard questions
        ]
      },
      // ... and so on for every chapter of every subject
      {
        id: 101,
        name: 'Kinematics',
        questions: [
          // Easy
          { id: 1001, text: 'Define instantaneous velocity.', options: ['Velocity over a long time interval', 'The velocity at a specific instant in time', 'Average velocity', 'Total distance divided by total time'], answer: 'The velocity at a specific instant in time', difficulty: 'Easy', pageReference: 12, concepts: ['velocity'], isPastPaper: false },
          { id: 1002, text: 'What does the area under a velocity-time graph represent?', options: ['Acceleration', 'Displacement', 'Jerk', 'Force'], answer: 'Displacement', difficulty: 'Easy', pageReference: 21, concepts: ['v-t graph'], isPastPaper: false },
          { id: 1003, text: 'Can an object have zero velocity and still be accelerating?', options: ['Yes', 'No', 'Only at the equator', 'Only in a vacuum'], answer: 'Yes', difficulty: 'Easy', pageReference: 26, concepts: ['acceleration', 'velocity'], isPastPaper: false },
          { id: 1004, text: 'What is uniform circular motion?', options: ['Motion in a circle with constant velocity', 'Motion in a circle with constant speed', 'Motion in a circle with constant acceleration', 'Motion with changing radius'], answer: 'Motion in a circle with constant speed', difficulty: 'Easy', pageReference: 31, concepts: ['circular motion'], isPastPaper: false },
          { id: 1005, text: 'A car travels a distance S on a straight road in time t. It then returns to the starting point. What is the displacement?', options: ['S', '2S', 'S/2', '0'], answer: '0', difficulty: 'Easy', pageReference: 10, concepts: ['displacement', 'distance'], isPastPaper: false },
          { id: 1006, text: 'What is the time of flight of a projectile?', options: ['The time it takes to reach maximum height', 'The total time the projectile is in the air', 'The time it takes to travel its range', 'Half the total time'], answer: 'The total time the projectile is in the air', difficulty: 'Easy', pageReference: 34, concepts: ['projectile motion'], isPastPaper: false },
          { id: 1007, text: 'Is it possible for the displacement to be zero but not the distance?', options: ['Yes', 'No', 'Only for circular motion', 'Depends on the speed'], answer: 'Yes', difficulty: 'Easy', pageReference: 11, concepts: ['displacement', 'distance'], isPastPaper: false },
          { id: 1008, text: 'What is the relation between linear velocity (v) and angular velocity (ω)?', options: ['v = ω / r', 'v = r / ω', 'v = ω * r', 'v = ω + r'], answer: 'v = ω * r', difficulty: 'Easy', pageReference: 30, concepts: ['circular motion'], isPastPaper: false },
          { id: 1009, text: 'What is the physical quantity that corresponds to the rate of change of displacement?', options: ['Speed', 'Velocity', 'Acceleration', 'Jerk'], answer: 'Velocity', difficulty: 'Easy', pageReference: 12, concepts: ['velocity'], isPastPaper: false },
          { id: 1010, text: 'What is the acceleration of a body moving with uniform velocity?', options: ['Zero', 'Constant', 'Increasing', 'Decreasing'], answer: 'Zero', difficulty: 'Easy', pageReference: 15, concepts: ['acceleration', 'uniform velocity'], isPastPaper: false },
          // ... 50 more easy questions
          // Medium
          { id: 1011, text: 'A car accelerates from rest to 20 m/s in 10 seconds. What is its acceleration?', options: ['2 m/s^2', '1 m/s^2', '0.5 m/s^2', '4 m/s^2'], answer: '2 m/s^2', difficulty: 'Medium', pageReference: 15, concepts: ['acceleration', 'velocity'], isPastPaper: false },
          { id: 1012, text: 'An object is dropped from a height of 80m. How long does it take to reach the ground? (g=10m/s^2)', options: ['2 s', '4 s', '6 s', '8 s'], answer: '4 s', difficulty: 'Medium', pageReference: 25, concepts: ['free fall', 'kinematic equations'], isPastPaper: false },
          { id: 1013, text: 'A train travels at 60 km/h for 0.52 h, at 30 km/h for the next 0.24 h and then at 70 km/h for the next 0.71 h. What is the average speed of the train?', options: ['59.9 km/h', '62.1 km/h', '55.5 km/h', '65.0 km/h'], answer: '59.9 km/h', difficulty: 'Medium', pageReference: 18, concepts: ['average speed'], isPastPaper: true },
          { id: 1014, text: 'A ball is thrown vertically upwards. What is its velocity and acceleration at the highest point?', options: ['Velocity is 0, acceleration is g', 'Velocity is max, acceleration is 0', 'Both are 0', 'Both are max'], answer: 'Velocity is 0, acceleration is g', difficulty: 'Medium', pageReference: 28, concepts: ['projectile motion', 'free fall'], isPastPaper: false },
          { id: 1015, text: 'Two trains moving in opposite directions have speeds of 30 km/h and 45 km/h. What is the relative velocity of the first train with respect to the second?', options: ['15 km/h', '75 km/h', '30 km/h', '45 km/h'], answer: '75 km/h', difficulty: 'Medium', pageReference: 40, concepts: ['relative velocity'], isPastPaper: false },
          { id: 1016, text: 'A particle moves in a circle of radius 5m with a constant speed of 10 m/s. Calculate the centripetal acceleration.', options: ['2 m/s^2', '10 m/s^2', '20 m/s^2', '50 m/s^2'], answer: '20 m/s^2', difficulty: 'Medium', pageReference: 32, concepts: ['centripetal acceleration', 'circular motion'], isPastPaper: false },
          { id: 1017, text: 'A particle starts from rest and accelerates at 2 m/s^2 for 10 s. Find the distance traveled.', options: ['50 m', '100 m', '200 m', '20 m'], answer: '100 m', difficulty: 'Medium', pageReference: 16, concepts: ['kinematic equations'], isPastPaper: false },
          { id: 1018, text: 'The position of a particle is given by x = 2t^2 - 3t + 1. Find the velocity at t=2s.', options: ['5 m/s', '8 m/s', '3 m/s', '1 m/s'], answer: '5 m/s', difficulty: 'Medium', pageReference: 13, concepts: ['differentiation', 'velocity'], isPastPaper: false },
          { id: 1019, text: 'A body covers one-third of the distance with a speed of 20 km/hr, the second one-third with a speed of 30 km/hr, and the last one-third with a speed of 60 km/hr. The average speed of the body is:', options: ['30 km/hr', '36.6 km/hr', '40 km/hr', '45 km/hr'], answer: '30 km/hr', difficulty: 'Medium', pageReference: 19, concepts: ['average speed'], isPastPaper: true },
          { id: 1020, text: 'A man walks on a straight road from his home to a market 2.5 km away with a speed of 5 km/h. Finding the market closed, he instantly turns and walks back home with a speed of 7.5 km/h. What is the average velocity of the man over the interval of time 0 to 40 min?', options: ['6.25 km/h', '0 km/h', '5 km/h', '7.5 km/h'], answer: '0 km/h', difficulty: 'Medium', pageReference: 18, concepts: ['average velocity'], isPastPaper: false },
          // ... 70 more medium questions
          // Hard
          { id: 1021, text: 'Calculate the displacement of a particle whose velocity-time graph is a straight line with a positive slope.', options: ['Constant', 'Increasing linearly', 'Increasing quadratically', 'Decreasing'], answer: 'Increasing quadratically', difficulty: 'Hard', pageReference: 22, concepts: ['displacement', 'v-t graph'], isPastPaper: true },
          { id: 1022, text: 'A projectile is fired at an angle of 45 degrees with an initial velocity of 100 m/s. Find the maximum height reached. (g=10m/s^2)', options: ['250 m', '500 m', '125 m', '1000 m'], answer: '250 m', difficulty: 'Hard', pageReference: 35, concepts: ['projectile motion', 'max height'], isPastPaper: true },
          { id: 1023, text: 'Which of these is NOT one of the three equations of motion for uniform acceleration?', options: ['v = u + at', 's = ut + (1/2)at^2', 'v^2 = u^2 + 2as', 'F = ma'], answer: 'F = ma', difficulty: 'Hard', pageReference: 20, concepts: ['kinematic equations', 'calculus'], isPastPaper: true },
          { id: 1024, text: 'What is the range of a projectile fired at an angle of 30 degrees with an initial velocity of 50 m/s? (g=10m/s^2)', options: ['125 m', '216.5 m', '250 m', '100 m'], answer: '216.5 m', difficulty: 'Hard', pageReference: 36, concepts: ['projectile motion', 'range'], isPastPaper: true },
          { id: 1025, text: 'A boat is sent across a river with a velocity of 8 km/h. If the resultant velocity of the boat is 10 km/h, what is the velocity of the river flow?', options: ['2 km/h', '6 km/h', '18 km/h', '12 km/h'], answer: '6 km/h', difficulty: 'Hard', pageReference: 42, concepts: ['relative velocity', 'vectors'], isPastPaper: true },
          { id: 1026, text: 'A stone tied to the end of a string 80 cm long is whirled in a horizontal circle with a constant speed. If the stone makes 14 revolutions in 25 s, what is the magnitude of acceleration of the stone?', options: ['9.9 m/s^2', '8.9 m/s^2', '7.9 m/s^2', '6.9 m/s^2'], answer: '9.9 m/s^2', difficulty: 'Hard', pageReference: 33, concepts: ['centripetal acceleration', 'circular motion'], isPastPaper: true },
          { id: 1027, text: 'The ceiling of a long hall is 25 m high. What is the maximum horizontal distance that a ball thrown with a speed of 40 m/s can go without hitting the ceiling of the hall?', options: ['150.5 m', '165.5 m', '145.5 m', '170.5 m'], answer: '150.5 m', difficulty: 'Hard', pageReference: 38, concepts: ['projectile motion'], isPastPaper: true },
          { id: 1028, text: 'The position of a particle is given by r = 3.0t i - 2.0t^2 j + 4.0 k m where t is in seconds and the coefficients have the proper units for r to be in metres. Find the magnitude of velocity of the particle at t = 2.0 s.', options: ['8.54 m/s', '7.54 m/s', '9.54 m/s', '6.54 m/s'], answer: '8.54 m/s', difficulty: 'Hard', pageReference: 14, concepts: ['velocity', 'vectors', 'calculus'], isPastPaper: false },
          { id: 1029, text: 'Two balls are thrown simultaneously, A vertically upwards with a speed of 20 m/s from the ground, and B vertically downwards from a height of 40 m with the same speed and along the same line of motion. At what point do they meet?', options: ['15.1 m from the ground', '20.1 m from the ground', '10.1 m from the ground', '25.1 m from the ground'], answer: '15.1 m from the ground', difficulty: 'Hard', pageReference: 27, concepts: ['relative motion', 'kinematic equations'], isPastPaper: true },
          { id: 1030, text: 'A motorboat is racing towards north at 25 km/h and the water current in that region is 10 km/h in the direction of 60° east of south. Find the resultant velocity of the boat.', options: ['21.8 km/h', '25 km/h', '18.2 km/h', '15 km/h'], answer: '21.8 km/h', difficulty: 'Hard', pageReference: 43, concepts: ['relative velocity', 'vectors'], isPastPaper: true },
          // ... 50 more hard questions
        ],
      },
      // ... and so on for every chapter of every subject
    ],
  },
  {
    id: 2,
    name: 'Chemistry',
    chapters: [
      {
        id: 201,
        name: 'Some Basic Concepts of Chemistry',
        questions: [
          // Easy
          { id: 2001, text: 'What is the molar mass of H2O?', options: ['18 g/mol', '16 g/mol', '2 g/mol', '20 g/mol'], answer: '18 g/mol', difficulty: 'Easy', pageReference: 10, concepts: ['molar mass'], isPastPaper: false },
          { id: 2002, text: 'Define stoichiometry.', options: ['The calculation of reactants and products in chemical reactions', 'The study of reaction rates', 'The study of chemical equilibrium', 'The study of atomic structure'], answer: 'The calculation of reactants and products in chemical reactions', difficulty: 'Easy', pageReference: 15, concepts: ['stoichiometry'], isPastPaper: false },
          { id: 2003, text: 'How many moles are in 44g of CO2?', options: ['1 mole', '2 moles', '0.5 moles', '44 moles'], answer: '1 mole', difficulty: 'Easy', pageReference: 12, concepts: ['moles', 'molar mass'], isPastPaper: false },
          { id: 2004, text: "What is Avogadro's number?", options: ['6.022 x 10^23', '6.022 x 10^-23', '3.0 x 10^8', '1.6 x 10^-19'], answer: '6.022 x 10^23', difficulty: 'Easy', pageReference: 8, concepts: ["Avogadro's number"], isPastPaper: false },
          { id: 2005, text: 'Define molality.', options: ['Moles of solute per kg of solvent', 'Moles of solute per liter of solution', 'Grams of solute per liter of solution', 'Moles of solvent per kg of solute'], answer: 'Moles of solute per kg of solvent', difficulty: 'Easy', pageReference: 21, concepts: ['molality'], isPastPaper: false },
          { id: 2006, text: 'What is the relationship between empirical formula and molecular formula?', options: ['Molecular Formula = n x Empirical Formula', 'Empirical Formula = n x Molecular Formula', 'They are always the same', 'They are unrelated'], answer: 'Molecular Formula = n x Empirical Formula', difficulty: 'Easy', pageReference: 23, concepts: ['empirical formula', 'molecular formula'], isPastPaper: false },
          { id: 2007, text: 'Differentiate between a mixture and a compound.', options: ['Mixtures have variable composition, compounds have fixed composition', 'Compounds have variable composition, mixtures have fixed composition', 'Mixtures are pure substances, compounds are not', 'There is no difference'], answer: 'Mixtures have variable composition, compounds have fixed composition', difficulty: 'Easy', pageReference: 3, concepts: ['mixture', 'compound'], isPastPaper: false },
          { id: 2008, text: 'What is one atomic mass unit (amu)?', options: ['Mass of one hydrogen atom', '1/12th the mass of a carbon-12 atom', 'Mass of one proton', 'Mass of one neutron'], answer: '1/12th the mass of a carbon-12 atom', difficulty: 'Easy', pageReference: 9, concepts: ['atomic mass unit'], isPastPaper: false },
          { id: 2009, text: 'How many significant figures are in 0.0025?', options: ['2', '3', '4', '5'], answer: '2', difficulty: 'Easy', pageReference: 6, concepts: ['significant figures'], isPastPaper: false },
          { id: 2010, text: 'Define mole fraction.', options: ['Moles of component / Total moles of all components', 'Moles of solute / kg of solvent', 'Moles of solute / L of solution', 'Grams of component / Total grams'], answer: 'Moles of component / Total moles of all components', difficulty: 'Easy', pageReference: 21, concepts: ['mole fraction'], isPastPaper: false },
          // ... 50 more easy questions
          // Medium
          { id: 2011, text: 'What is a limiting reagent?', options: ['The reactant that is completely consumed in a reaction', 'The reactant that is in excess', 'The product of a reaction', 'The catalyst in a reaction'], answer: 'The reactant that is completely consumed in a reaction', difficulty: 'Medium', pageReference: 18, concepts: ['limiting reagent'], isPastPaper: true },
          { id: 2012, text: 'Calculate the molarity of a solution containing 4g of NaOH in 250 mL of solution.', options: ['0.4 M', '0.1 M', '1 M', '0.25 M'], answer: '0.4 M', difficulty: 'Medium', pageReference: 20, concepts: ['molarity'], isPastPaper: false },
          { id: 2013, text: 'Balance the equation: C3H8 + O2 -> CO2 + H2O', options: ['C3H8 + 5O2 -> 3CO2 + 4H2O', 'C3H8 + 3O2 -> 3CO2 + 4H2O', '2C3H8 + 7O2 -> 6CO2 + 8H2O', 'C3H8 + O2 -> CO2 + H2O'], answer: 'C3H8 + 5O2 -> 3CO2 + 4H2O', difficulty: 'Medium', pageReference: 16, concepts: ['balancing equations'], isPastPaper: false },
          { id: 2014, text: 'What is the mass percentage of carbon in CO2?', options: ['27.3%', '72.7%', '40%', '60%'], answer: '27.3%', difficulty: 'Medium', pageReference: 14, concepts: ['mass percentage'], isPastPaper: false },
          { id: 2015, text: "State the law of multiple proportions.", options: ['Elements combine in fixed ratios by mass', 'If two elements form more than one compound, the masses of one element that combine with a fixed mass of the other are in a ratio of small whole numbers', 'Matter can neither be created nor destroyed', 'Gases combine in simple ratios by volume'], answer: 'If two elements form more than one compound, the masses of one element that combine with a fixed mass of the other are in a ratio of small whole numbers', difficulty: 'Medium', pageReference: 7, concepts: ['chemical laws'], isPastPaper: false },
          { id: 2016, text: 'A solution is prepared by adding 2 g of a substance A to 18 g of water. Calculate the mass percent of the solute.', options: ['10%', '11.1%', '20%', '90%'], answer: '10%', difficulty: 'Medium', pageReference: 14, concepts: ['mass percentage'], isPastPaper: false },
          { id: 2017, text: 'What is the molarity of pure water (density = 1 g/mL)?', options: ['55.5 M', '18 M', '1 M', '100 M'], answer: '55.5 M', difficulty: 'Medium', pageReference: 20, concepts: ['molarity'], isPastPaper: true },
          { id: 2018, text: 'How much CO2 is produced when 1 mole of carbon is burnt in 16 g of dioxygen?', options: ['22 g', '44 g', '11 g', '32 g'], answer: '22 g', difficulty: 'Medium', pageReference: 19, concepts: ['limiting reagent'], isPastPaper: true },
          { id: 2019, text: 'What is the mass of one atom of carbon?', options: ['1.99 x 10^-23 g', '12 g', '6.022 x 10^23 g', '1 amu'], answer: '1.99 x 10^-23 g', difficulty: 'Medium', pageReference: 9, concepts: ['atomic mass'], isPastPaper: false },
          { id: 2020, text: 'Calculate the number of atoms in 52 u of He.', options: ['13', '4', '52', '1'], answer: '13', difficulty: 'Medium', pageReference: 11, concepts: ['moles', 'atoms'], isPastPaper: false },
          // ... 70 more medium questions
          // Hard
          { id: 2021, text: 'What is the empirical formula of a compound with 40% C, 6.7% H, and 53.3% O?', options: ['CH2O', 'C2H4O2', 'CHO', 'CH3O'], answer: 'CH2O', difficulty: 'Hard', pageReference: 22, concepts: ['empirical formula'], isPastPaper: true },
          { id: 2022, text: 'What are the seven fundamental SI units?', options: ['meter, kg, sec, A, K, mol, cd', 'cm, g, sec, V, C, mol, lux', 'foot, pound, sec, A, F, mol, cd', 'meter, kg, min, V, C, mol, lux'], answer: 'meter, kg, sec, A, K, mol, cd', difficulty: 'Hard', pageReference: 5, concepts: ['SI units'], isPastPaper: false },
          { id: 2023, text: 'If 20 g of CaCO3 is treated with 20 g of HCl, how many grams of CO2 can be generated?', options: ['8.8 g', '11 g', '22 g', '4.4 g'], answer: '8.8 g', difficulty: 'Hard', pageReference: 19, concepts: ['stoichiometry', 'limiting reagent'], isPastPaper: true },
          { id: 2024, text: 'What volume of 10 M HCl and 3 M HCl should be mixed to obtain 1 L of 6 M HCl solution?', options: ['0.43 L of 10 M, 0.57 L of 3 M', '0.5 L of 10 M, 0.5 L of 3 M', '0.3 L of 10 M, 0.7 L of 3 M', '0.7 L of 10 M, 0.3 L of 3 M'], answer: '0.43 L of 10 M, 0.57 L of 3 M', difficulty: 'Hard', pageReference: 25, concepts: ['molarity', 'mixing solutions'], isPastPaper: true },
          { id: 2025, text: 'A compound contains 4.07 % hydrogen, 24.27 % carbon and 71.65 % chlorine. Its molar mass is 98.96 g. What are its empirical and molecular formulas?', options: ['Empirical: CH2Cl, Molecular: C2H4Cl2', 'Empirical: CHCl, Molecular: C2H2Cl2', 'Empirical: CH3Cl, Molecular: CH3Cl', 'Empirical: C2H4Cl2, Molecular: C2H4Cl2'], answer: 'Empirical: CH2Cl, Molecular: C2H4Cl2', difficulty: 'Hard', pageReference: 24, concepts: ['empirical formula', 'molecular formula'], isPastPaper: true },
          { id: 2026, text: 'Density of a gas is found to be 5.46 g/dm^3 at 27 °C at 2 bar pressure. What will be its density at STP?', options: ['3 g/dm^3', '4 g/dm^3', '5 g/dm^3', '2 g/dm^3'], answer: '3 g/dm^3', difficulty: 'Hard', pageReference: 17, concepts: ['gas density', 'ideal gas'], isPastPaper: true },
          { id: 2027, text: '3 g of H2 react with 29 g of O2 to yield H2O. Which is the limiting reactant?', options: ['H2', 'O2', 'Both', 'Cannot be determined'], answer: 'O2', difficulty: 'Hard', pageReference: 19, concepts: ['limiting reagent'], isPastPaper: true },
          { id: 2028, text: 'A solution of glucose in water is labelled as 10% w/w. What would be the molality of the solution?', options: ['0.617 m', '0.5 m', '1 m', '0.1 m'], answer: '0.617 m', difficulty: 'Hard', pageReference: 21, concepts: ['molality', 'concentration'], isPastPaper: true },
          { id: 2029, text: 'In a reaction A + B2 -> AB2, identify the limiting reagent, if any, in a mixture of 300 atoms of A + 200 molecules of B2.', options: ['B2 is the limiting reagent', 'A is the limiting reagent', 'No limiting reagent', 'Cannot be determined'], answer: 'B2 is the limiting reagent', difficulty: 'Hard', pageReference: 18, concepts: ['limiting reagent'], isPastPaper: false },
          { id: 2030, text: 'How many grams of NaOH should be dissolved to make 100 ml of 0.15 M NaOH solution?', options: ['0.6 g', '6 g', '0.06 g', '1.5 g'], answer: '0.6 g', difficulty: 'Hard', pageReference: 20, concepts: ['molarity'], isPastPaper: false },
          // ... 50 more hard questions
        ]
      },
      // ... and so on for every chapter of every subject
    ],
  },
  {
    id: 3,
    name: 'Mathematics',
    chapters: [
      {
        id: 301,
        name: 'Sets, Relations and Functions',
        questions: [
          // Easy
          { id: 3001, text: 'If A = {1, 2, 3} and B = {3, 4, 5}, find A ∪ B.', options: ['{1, 2, 3, 4, 5}', '{3}', '{1, 2, 4, 5}', '{}'], answer: '{1, 2, 3, 4, 5}', difficulty: 'Easy', pageReference: 5, concepts: ['sets', 'union'], isPastPaper: false },
          { id: 3002, text: 'If A = {1, 2, 3} and B = {3, 4, 5}, find A ∩ B.', options: ['{1, 2, 3, 4, 5}', '{3}', '{1, 2, 4, 5}', '{}'], answer: '{3}', difficulty: 'Easy', pageReference: 6, concepts: ['sets', 'intersection'], isPastPaper: false },
          { id: 3003, text: 'What is a relation R from a set A to a set B?', options: ['A subset of A x B', 'A subset of A', 'A subset of B', 'A function from A to B'], answer: 'A subset of A x B', difficulty: 'Easy', pageReference: 10, concepts: ['relations'], isPastPaper: false },
          { id: 3004, text: 'What is a function?', options: ['A relation where each element in the domain is related to exactly one element in the codomain', 'A subset of A x B', 'A graph', 'An equation'], answer: 'A relation where each element in the domain is related to exactly one element in the codomain', difficulty: 'Easy', pageReference: 12, concepts: ['functions'], isPastPaper: false },
          { id: 3005, text: 'What is an identity function?', options: ['f(x) = x', 'f(x) = 1', 'f(x) = 0', 'f(x) = c'], answer: 'f(x) = x', difficulty: 'Easy', pageReference: 13, concepts: ['types of functions'], isPastPaper: false },
          { id: 3006, text: 'What is a one-to-one function?', options: ['A function where different elements in the domain have different images', 'A function where all elements in the domain have the same image', 'A function where the range equals the codomain', 'A function that is a straight line'], answer: 'A function where different elements in the domain have different images', difficulty: 'Easy', pageReference: 14, concepts: ['types of functions'], isPastPaper: false },
          { id: 3007, text: 'What is an onto function?', options: ['A function where different elements in the domain have different images', 'A function where all elements in the domain have the same image', 'A function where the range equals the codomain', 'A function that is a straight line'], answer: 'A function where the range equals the codomain', difficulty: 'Easy', pageReference: 14, concepts: ['types of functions'], isPastPaper: false },
          { id: 3008, text: 'Let A = {1, 2} and B = {a, b}. What is A x B?', options: ['{(1,a), (1,b), (2,a), (2,b)}', '{(a,1), (a,2), (b,1), (b,2)}', '{1,2,a,b}', '{(1,a), (2,b)}'], answer: '{(1,a), (1,b), (2,a), (2,b)}', difficulty: 'Easy', pageReference: 9, concepts: ['cartesian product'], isPastPaper: false },
          { id: 3009, text: 'A relation R on a set A is reflexive if:', options: ['(a,a) ∈ R for all a ∈ A', '(b,a) ∈ R whenever (a,b) ∈ R', '(a,c) ∈ R whenever (a,b) ∈ R and (b,c) ∈ R', 'None of the above'], answer: '(a,a) ∈ R for all a ∈ A', difficulty: 'Easy', pageReference: 11, concepts: ['types of relations'], isPastPaper: false },
          { id: 3010, text: 'A relation R on a set A is symmetric if:', options: ['(a,a) ∈ R for all a ∈ A', '(b,a) ∈ R whenever (a,b) ∈ R', '(a,c) ∈ R whenever (a,b) ∈ R and (b,c) ∈ R', 'None of the above'], answer: '(b,a) ∈ R whenever (a,b) ∈ R', difficulty: 'Easy', pageReference: 11, concepts: ['types of relations'], isPastPaper: false },
          // ... 50 more easy questions
          // Medium
          { id: 3011, text: 'If f(x) = x^2 and g(x) = x + 1, find f(g(x)).', options: ['(x+1)^2', 'x^2 + 1', 'x^2 + x', 'x^2 + 2x + 1'], answer: '(x+1)^2', difficulty: 'Medium', pageReference: 15, concepts: ['composite functions'], isPastPaper: false },
          { id: 3012, text: 'What is the domain of the function f(x) = sqrt(x-2)?', options: ['x >= 2', 'x > 2', 'x <= 2', 'x < 2'], answer: 'x >= 2', difficulty: 'Medium', pageReference: 12, concepts: ['domain of a function'], isPastPaper: false },
          { id: 3013, text: 'What is the range of the function f(x) = x^2?', options: ['All real numbers', 'All positive real numbers', 'All positive real numbers and zero', 'All negative real numbers'], answer: 'All positive real numbers and zero', difficulty: 'Medium', pageReference: 13, concepts: ['range of a function'], isPastPaper: false },
          { id: 3014, text: 'If a set A has n elements, how many subsets does it have?', options: ['2^n', 'n^2', '2n', 'n+2'], answer: '2^n', difficulty: 'Medium', pageReference: 8, concepts: ['sets', 'subsets'], isPastPaper: false },
          { id: 3015, text: 'Let A = {1, 2, 3}. Which of the following is an equivalence relation on A?', options: ['{(1,1), (2,2), (3,3)}', '{(1,2), (2,1)}', '{(1,1), (1,2), (2,2)}', '{(1,2), (2,3), (1,3)}'], answer: '{(1,1), (2,2), (3,3)}', difficulty: 'Medium', pageReference: 11, concepts: ['equivalence relation'], isPastPaper: false },
          { id: 3016, text: 'The function f: R -> R, f(x) = |x| is:', options: ['One-to-one but not onto', 'Onto but not one-to-one', 'Neither one-to-one nor onto', 'Both one-to-one and onto'], answer: 'Neither one-to-one nor onto', difficulty: 'Medium', pageReference: 14, concepts: ['types of functions'], isPastPaper: false },
          { id: 3017, text: 'If A and B are two sets such that n(A) = 20, n(B) = 25 and n(A ∪ B) = 40, then find n(A ∩ B).', options: ['5', '10', '15', '0'], answer: '5', difficulty: 'Medium', pageReference: 7, concepts: ['sets'], isPastPaper: true },
          { id: 3018, text: 'Let f: R -> R be defined as f(x) = 3x. Choose the correct answer.', options: ['f is one-one onto', 'f is many-one onto', 'f is one-one but not onto', 'f is neither one-one nor onto'], answer: 'f is one-one onto', difficulty: 'Medium', pageReference: 14, concepts: ['types of functions'], isPastPaper: true },
          { id: 3019, text: 'If A has 3 elements and B has 4 elements, then the number of injective functions from A to B is', options: ['24', '12', '64', '81'], answer: '24', difficulty: 'Medium', pageReference: 15, concepts: ['functions', 'permutations'], isPastPaper: true },
          { id: 3020, text: 'What is the domain of the function f(x) = 1/(x^2-1)?', options: ['R - {1, -1}', 'R', 'R - {1}', 'R - {-1}'], answer: 'R - {1, -1}', difficulty: 'Medium', pageReference: 12, concepts: ['domain of a function'], isPastPaper: false },
          // ... 70 more medium questions
          // Hard
          { id: 3021, text: 'If f(x) = 2x+3, find the inverse function f^-1(x).', options: ['(x-3)/2', '(x+3)/2', '2x-3', 'x/2 - 3'], answer: '(x-3)/2', difficulty: 'Hard', pageReference: 16, concepts: ['inverse functions'], isPastPaper: true },
          { id: 3022, text: 'In a class of 60 students, 25 play cricket and 20 play tennis, and 10 play both. How many students play neither?', options: ['25', '35', '15', '45'], answer: '25', difficulty: 'Hard', pageReference: 7, concepts: ['sets', 'Venn diagrams'], isPastPaper: true },
          { id: 3023, text: 'Let R be a relation on the set N of natural numbers defined by nRm if n divides m. Then R is', options: ['Reflexive and transitive', 'Reflexive and symmetric', 'Symmetric and transitive', 'Equivalence relation'], answer: 'Reflexive and transitive', difficulty: 'Hard', pageReference: 11, concepts: ['types of relations'], isPastPaper: true },
          { id: 3024, text: 'Let f(x) = (x-1)/(x+1). Then f(f(x)) is', options: ['-1/x', '1/x', 'x', '-x'], answer: '-1/x', difficulty: 'Hard', pageReference: 15, concepts: ['composite functions'], isPastPaper: true },
          { id: 3025, text: 'Let a set A have 5 elements. The number of non-empty proper subsets of A is', options: ['30', '31', '32', '25'], answer: '30', difficulty: 'Hard', pageReference: 8, concepts: ['subsets', 'power set'], isPastPaper: true },
          { id: 3026, text: 'Let A = {x: x is a multiple of 3} and B = {x: x is a multiple of 5}. Then A ∩ B is given by', options: ['{x: x is a multiple of 15}', '{x: x is a multiple of 3 or 5}', '{x: x is a multiple of 8}', '{}'], answer: '{x: x is a multiple of 15}', difficulty: 'Hard', pageReference: 6, concepts: ['sets'], isPastPaper: false },
          { id: 3027, text: 'The function f: R -> R, f(x) = x^2 + x is', options: ['Neither one-one nor onto', 'One-one and onto', 'One-one but not onto', 'Onto but not one-one'], answer: 'Neither one-one nor onto', difficulty: 'Hard', pageReference: 14, concepts: ['types of functions'], isPastPaper: true },
          { id: 3028, text: 'In a survey of 600 students in a school, 150 students were found to be taking tea and 225 taking coffee, 100 were taking both tea and coffee. Find how many students were taking neither tea nor coffee.', options: ['325', '275', '125', '225'], answer: '325', difficulty: 'Hard', pageReference: 7, concepts: ['sets', 'Venn diagrams'], isPastPaper: true },
          { id: 3029, text: 'The number of bijective functions from a set of 10 elements to itself is', options: ['10!', '10^2', '2^10', '100'], answer: '10!', difficulty: 'Hard', pageReference: 15, concepts: ['bijective functions', 'permutations'], isPastPaper: true },
          { id: 3030, text: 'If f(x) = sin^2(x) and g(x) = sqrt(x), find g(f(x)).', options: ['|sin(x)|', 'sin(x)', 'cos(x)', 'sqrt(sin^2(x))'], answer: '|sin(x)|', difficulty: 'Hard', pageReference: 15, concepts: ['composite functions'], isPastPaper: false },
          // ... 50 more hard questions
        ]
      },
      // ... and so on for every chapter of every subject
    ]
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
