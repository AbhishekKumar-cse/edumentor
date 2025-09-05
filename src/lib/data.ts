
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
        id: 110,
        name: 'Physical World and Measurement',
        questions: [
          { id: 1181, text: 'What is Physics?', difficulty: 'Easy', pageReference: 1, concepts: ['physics basics'], isPastPaper: false },
          { id: 1182, text: 'Name the fundamental forces in nature.', difficulty: 'Easy', pageReference: 3, concepts: ['fundamental forces'], isPastPaper: false },
          { id: 1183, text: 'What is a physical unit?', difficulty: 'Easy', pageReference: 5, concepts: ['units'], isPastPaper: false },
          { id: 1184, text: 'What are fundamental and derived units?', difficulty: 'Easy', pageReference: 6, concepts: ['units'], isPastPaper: false },
          { id: 1185, text: 'What is the SI system of units?', difficulty: 'Easy', pageReference: 7, concepts: ['SI units'], isPastPaper: false },
          { id: 1186, text: 'Define dimensional analysis.', difficulty: 'Easy', pageReference: 10, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1187, text: 'Check the correctness of the equation v = u + at using dimensional analysis.', difficulty: 'Medium', pageReference: 11, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1188, text: 'What are significant figures?', difficulty: 'Easy', pageReference: 14, concepts: ['significant figures'], isPastPaper: false },
          { id: 1189, text: 'State the number of significant figures in 0.007 m^2.', difficulty: 'Medium', pageReference: 15, concepts: ['significant figures'], isPastPaper: false },
          { id: 1190, text: 'What are the limitations of dimensional analysis?', difficulty: 'Medium', pageReference: 12, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1191, text: 'The parallax of a heavenly body measured from two points diametrically opposite on the equator is 2.0 arc minutes. If the radius of the Earth is 6400 km, find the distance of the heavenly body from the Earth.', difficulty: 'Hard', pageReference: 9, concepts: ['parallax method'], isPastPaper: true },
          { id: 1192, text: 'What is the principle of homogeneity of dimensions?', difficulty: 'Easy', pageReference: 11, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1193, text: 'Define accuracy and precision.', difficulty: 'Easy', pageReference: 13, concepts: ['accuracy', 'precision'], isPastPaper: false },
          { id: 1194, text: 'The length and breadth of a rectangular sheet are 16.2 cm and 10.1 cm, respectively. The area of the sheet in appropriate significant figures is?', difficulty: 'Hard', pageReference: 16, concepts: ['significant figures'], isPastPaper: true },
          { id: 1195, text: 'What is an error in measurement?', difficulty: 'Easy', pageReference: 17, concepts: ['errors'], isPastPaper: false },
          { id: 1196, text: 'Name the types of errors.', difficulty: 'Easy', pageReference: 18, concepts: ['errors'], isPastPaper: false },
          { id: 1197, text: 'The resistance R = V/I where V = (100 ± 5) V and I = (10 ± 0.2) A. Find the percentage error in R.', difficulty: 'Hard', pageReference: 20, concepts: ['error analysis'], isPastPaper: true },
          { id: 1198, text: 'What is the dimension of gravitational constant G?', difficulty: 'Medium', pageReference: 10, concepts: ['dimensional analysis'], isPastPaper: false },
          { id: 1199, text: 'What is the difference between mass and weight?', difficulty: 'Easy', pageReference: 8, concepts: ['mass', 'weight'], isPastPaper: false },
          { id: 1200, text: 'Convert 1 Newton into dynes.', difficulty: 'Medium', pageReference: 12, concepts: ['dimensional analysis', 'unit conversion'], isPastPaper: false },
        ]
      },
      {
        id: 101,
        name: 'Kinematics',
        questions: [
          { id: 1001, text: 'A car accelerates from rest to 20 m/s in 10 seconds. What is its acceleration?', difficulty: 'Easy', pageReference: 15, concepts: ['acceleration', 'velocity'], isPastPaper: false },
          { id: 1002, text: 'Calculate the displacement of a particle whose velocity-time graph is a straight line with a positive slope.', difficulty: 'Medium', pageReference: 22, concepts: ['displacement', 'v-t graph'], isPastPaper: true },
          { id: 1003, text: 'A projectile is fired at an angle of 45 degrees with an initial velocity of 100 m/s. Find the maximum height reached.', difficulty: 'Hard', pageReference: 35, concepts: ['projectile motion', 'max height'], isPastPaper: true },
          { id: 1004, text: 'An object is dropped from a height of 80m. How long does it take to reach the ground? (g=10m/s^2)', difficulty: 'Medium', pageReference: 25, concepts: ['free fall', 'kinematic equations'], isPastPaper: false },
          { id: 1005, text: 'Define instantaneous velocity.', difficulty: 'Easy', pageReference: 12, concepts: ['velocity'], isPastPaper: false },
          { id: 1006, text: 'A train travels at 60 km/h for 0.52 h, at 30 km/h for the next 0.24 h and then at 70 km/h for the next 0.71 h. What is the average speed of the train?', difficulty: 'Medium', pageReference: 18, concepts: ['average speed'], isPastPaper: true },
          { id: 1007, text: 'What is the relation between linear velocity and angular velocity?', difficulty: 'Easy', pageReference: 30, concepts: ['circular motion'], isPastPaper: false },
          { id: 1008, text: 'A ball is thrown vertically upwards. What is its velocity and acceleration at the highest point?', difficulty: 'Medium', pageReference: 28, concepts: ['projectile motion', 'free fall'], isPastPaper: false },
          { id: 1009, text: 'Derive the three equations of motion by the calculus method.', difficulty: 'Hard', pageReference: 20, concepts: ['kinematic equations', 'calculus'], isPastPaper: true },
          { id: 1010, text: 'What does the area under a velocity-time graph represent?', difficulty: 'Easy', pageReference: 21, concepts: ['v-t graph'], isPastPaper: false },
          { id: 1011, text: 'Two trains moving in opposite directions have speeds of 30 km/h and 45 km/h. What is the relative velocity of the first train with respect to the second?', difficulty: 'Medium', pageReference: 40, concepts: ['relative velocity'], isPastPaper: false },
          { id: 1012, text: 'A particle moves in a circle of radius 5m with a constant speed of 10 m/s. Calculate the centripetal acceleration.', difficulty: 'Medium', pageReference: 32, concepts: ['centripetal acceleration', 'circular motion'], isPastPaper: false },
          { id: 1013, text: 'What is the range of a projectile fired at an angle of 30 degrees with an initial velocity of 50 m/s?', difficulty: 'Hard', pageReference: 36, concepts: ['projectile motion', 'range'], isPastPaper: true },
          { id: 1014, text: 'Can an object have zero velocity and still be accelerating?', difficulty: 'Easy', pageReference: 26, concepts: ['acceleration', 'velocity'], isPastPaper: false },
          { id: 1015, text: 'What is uniform circular motion?', difficulty: 'Easy', pageReference: 31, concepts: ['circular motion'], isPastPaper: false },
          { id: 1016, text: 'A car travels a distance S on a straight road in time t. It then returns to the starting point. What is the displacement?', difficulty: 'Easy', pageReference: 10, concepts: ['displacement', 'distance'], isPastPaper: false },
          { id: 1017, text: 'A particle starts from rest and accelerates at 2 m/s^2 for 10 s. Find the distance traveled.', difficulty: 'Medium', pageReference: 16, concepts: ['kinematic equations'], isPastPaper: false },
          { id: 1018, text: 'What is the time of flight of a projectile?', difficulty: 'Easy', pageReference: 34, concepts: ['projectile motion'], isPastPaper: false },
          { id: 1019, text: 'Is it possible for the displacement to be zero but not the distance?', difficulty: 'Easy', pageReference: 11, concepts: ['displacement', 'distance'], isPastPaper: false },
          { id: 1020, text: 'A boat is sent across a river with a velocity of 8 km/h. If the resultant velocity of the boat is 10 km/h, what is the velocity of the river flow?', difficulty: 'Hard', pageReference: 42, concepts: ['relative velocity', 'vectors'], isPastPaper: true },
        ],
      },
      {
        id: 102,
        name: 'Laws of Motion',
        questions: [
          { id: 1021, text: "State Newton's First Law of Motion.", difficulty: 'Easy', pageReference: 45, concepts: ["Newton's laws"], isPastPaper: false },
          { id: 1022, text: 'A 5kg block is pulled by a 20N force on a frictionless surface. What is the acceleration?', difficulty: 'Medium', pageReference: 52, concepts: ["Newton's second law", 'force'], isPastPaper: false },
          { id: 1023, text: 'What is the net force on a car traveling at a constant velocity of 60 km/h?', difficulty: 'Easy', pageReference: 48, concepts: ["Newton's first law", 'net force'], isPastPaper: false },
          { id: 1024, text: "Define momentum and state its SI unit.", difficulty: 'Easy', pageReference: 58, concepts: ['momentum'], isPastPaper: false },
          { id: 1025, text: 'Explain the principle of conservation of linear momentum.', difficulty: 'Medium', pageReference: 60, concepts: ['conservation of momentum'], isPastPaper: true },
          { id: 1026, text: "State Newton's Third Law of Motion with an example.", difficulty: 'Easy', pageReference: 55, concepts: ["Newton's laws"], isPastPaper: false },
          { id: 1027, text: 'A 10kg mass is hanging from a rope. What is the tension in the rope? (g=10m/s^2)', difficulty: 'Medium', pageReference: 53, concepts: ['tension', 'force'], isPastPaper: false },
          { id: 1028, text: 'What is friction? Name the types of friction.', difficulty: 'Easy', pageReference: 65, concepts: ['friction'], isPastPaper: false },
          { id: 1029, text: 'A bullet of mass 20g is fired from a gun of mass 10kg with a velocity of 150 m/s. What is the recoil velocity of the gun?', difficulty: 'Hard', pageReference: 62, concepts: ['conservation of momentum', 'recoil'], isPastPaper: true },
          { id: 1030, text: 'What is inertia?', difficulty: 'Easy', pageReference: 46, concepts: ['inertia'], isPastPaper: false },
          { id: 1031, text: 'Calculate the force required to stop a car of mass 1000 kg moving at a velocity of 72 km/h in 10 seconds.', difficulty: 'Medium', pageReference: 54, concepts: ["Newton's second law"], isPastPaper: false },
          { id: 1032, text: 'What is an impulse?', difficulty: 'Easy', pageReference: 59, concepts: ['impulse'], isPastPaper: false },
          { id: 1033, text: 'Explain why it is difficult to walk on a slippery road.', difficulty: 'Medium', pageReference: 66, concepts: ['friction'], isPastPaper: false },
          { id: 1034, text: 'What is the angle of friction?', difficulty: 'Easy', pageReference: 68, concepts: ['friction'], isPastPaper: false },
          { id: 1035, text: 'A block of mass 2 kg is placed on a rough horizontal plane. The coefficient of static friction is 0.4. Find the frictional force.', difficulty: 'Hard', pageReference: 67, concepts: ['friction', 'force'], isPastPaper: true },
          { id: 1036, text: 'Define equilibrium of a particle.', difficulty: 'Easy', pageReference: 50, concepts: ['equilibrium', 'force'], isPastPaper: false },
          { id: 1037, text: 'What is the role of a lubricant?', difficulty: 'Easy', pageReference: 70, concepts: ['friction'], isPastPaper: false },
          { id: 1038, text: 'A man of mass 70 kg stands on a weighing scale in a lift which is moving upwards with a uniform speed of 10 m/s. What would be the reading on the scale?', difficulty: 'Medium', pageReference: 56, concepts: ['apparent weight', "Newton's laws"], isPastPaper: false },
          { id: 1039, text: 'Can action and reaction forces cancel each other out?', difficulty: 'Easy', pageReference: 55, concepts: ["Newton's laws"], isPastPaper: false },
          { id: 1040, text: 'A cricket ball of mass 150 g moving with a speed of 12 m/s is hit by a bat so that the ball is turned back with a velocity of 20 m/s. Calculate the impulse received by the ball.', difficulty: 'Hard', pageReference: 61, concepts: ['impulse', 'momentum'], isPastPaper: true },
        ],
      },
      {
        id: 103,
        name: 'Work, Energy, and Power',
        questions: [
            { id: 1041, text: 'Define kinetic energy and potential energy.', difficulty: 'Easy', pageReference: 70, concepts: ['kinetic energy', 'potential energy'], isPastPaper: false },
            { id: 1042, text: 'A 2kg object is lifted to a height of 5m. Calculate the work done against gravity. (g=10m/s^2)', difficulty: 'Medium', pageReference: 75, concepts: ['work done', 'potential energy'], isPastPaper: true },
            { id: 1043, text: 'State the work-energy theorem.', difficulty: 'Easy', pageReference: 78, concepts: ['work-energy theorem'], isPastPaper: false },
            { id: 1044, text: 'Define power and its SI unit.', difficulty: 'Easy', pageReference: 85, concepts: ['power'], isPastPaper: false },
            { id: 1045, text: 'A body of mass 10 kg is at rest. A force of 20 N is applied on it for 5 s. Calculate the kinetic energy acquired by the body.', difficulty: 'Hard', pageReference: 80, concepts: ['kinetic energy', 'work-energy theorem'], isPastPaper: true },
            { id: 1046, text: 'What is a conservative force?', difficulty: 'Easy', pageReference: 72, concepts: ['conservative force'], isPastPaper: false },
            { id: 1047, text: 'Explain the law of conservation of energy.', difficulty: 'Medium', pageReference: 82, concepts: ['conservation of energy'], isPastPaper: false },
            { id: 1048, text: 'A pump is required to lift 600 kg of water per minute from a well 25 m deep and to eject it with a speed of 50 m/s. Calculate the power required.', difficulty: 'Hard', pageReference: 88, concepts: ['power', 'work', 'energy'], isPastPaper: true },
            { id: 1049, text: 'What is elastic potential energy?', difficulty: 'Easy', pageReference: 74, concepts: ['potential energy'], isPastPaper: false },
            { id: 1050, text: 'A spring with a spring constant of 500 N/m is stretched by 10 cm. Calculate the potential energy stored in the spring.', difficulty: 'Medium', pageReference: 76, concepts: ['elastic potential energy'], isPastPaper: false },
            { id: 1051, text: 'What is a non-conservative force? Give an example.', difficulty: 'Easy', pageReference: 73, concepts: ['non-conservative force'], isPastPaper: false },
            { id: 1052, text: 'An engine pulls a train of mass 2000 kg with a constant velocity of 36 km/h. The coefficient of friction is 0.2. Calculate the power of the engine.', difficulty: 'Hard', pageReference: 89, concepts: ['power', 'friction'], isPastPaper: true },
            { id: 1053, text: 'What is a collision? Differentiate between elastic and inelastic collisions.', difficulty: 'Medium', pageReference: 90, concepts: ['collision'], isPastPaper: false },
            { id: 1054, text: 'A ball dropped from a height of 10 m rebounds to a height of 8 m. What is the coefficient of restitution?', difficulty: 'Medium', pageReference: 92, concepts: ['collision', 'restitution'], isPastPaper: false },
            { id: 1055, text: 'The momentum of a body is increased by 50%. What is the percentage increase in its kinetic energy?', difficulty: 'Hard', pageReference: 81, concepts: ['momentum', 'kinetic energy'], isPastPaper: true },
            { id: 1056, text: 'Can kinetic energy be negative?', difficulty: 'Easy', pageReference: 71, concepts: ['kinetic energy'], isPastPaper: false },
            { id: 1057, text: 'What is the work done by the centripetal force in a uniform circular motion?', difficulty: 'Easy', pageReference: 77, concepts: ['work', 'centripetal force'], isPastPaper: false },
            { id: 1058, text: 'A man weighs 60 kg. Calculate the work done by him in climbing a staircase of height 10 m.', difficulty: 'Medium', pageReference: 75, concepts: ['work done'], isPastPaper: false },
            { id: 1059, text: 'What is the unit of power in the CGS system?', difficulty: 'Easy', pageReference: 86, concepts: ['power'], isPastPaper: false },
            { id: 1060, text: 'A car and a truck have the same kinetic energy. Which one has greater momentum?', difficulty: 'Hard', pageReference: 83, concepts: ['kinetic energy', 'momentum'], isPastPaper: true },
        ]
      },
      {
        id: 104,
        name: 'Rotational Motion',
        questions: [
            { id: 1061, text: 'Define moment of inertia.', difficulty: 'Easy', pageReference: 95, concepts: ['moment of inertia'], isPastPaper: false },
            { id: 1062, text: 'What is the radius of gyration?', difficulty: 'Easy', pageReference: 98, concepts: ['radius of gyration'], isPastPaper: false },
            { id: 1063, text: 'State the theorem of perpendicular axes.', difficulty: 'Medium', pageReference: 100, concepts: ['moment of inertia theorems'], isPastPaper: false },
            { id: 1064, text: 'State the theorem of parallel axes.', difficulty: 'Medium', pageReference: 101, concepts: ['moment of inertia theorems'], isPastPaper: false },
            { id: 1065, text: 'Define torque.', difficulty: 'Easy', pageReference: 105, concepts: ['torque'], isPastPaper: false },
            { id: 1066, text: 'What is angular momentum?', difficulty: 'Easy', pageReference: 108, concepts: ['angular momentum'], isPastPaper: false },
            { id: 1067, text: 'State the law of conservation of angular momentum.', difficulty: 'Medium', pageReference: 110, concepts: ['conservation of angular momentum'], isPastPaper: true },
            { id: 1068, text: 'Calculate the moment of inertia of a thin rod of mass M and length L about an axis passing through its center and perpendicular to its length.', difficulty: 'Hard', pageReference: 99, concepts: ['moment of inertia'], isPastPaper: true },
            { id: 1069, text: 'A solid sphere is rolling on a horizontal surface. What is the ratio of its translational kinetic energy to its rotational kinetic energy?', difficulty: 'Hard', pageReference: 115, concepts: ['rolling motion', 'kinetic energy'], isPastPaper: true },
            { id: 1070, text: 'Define center of mass.', difficulty: 'Easy', pageReference: 93, concepts: ['center of mass'], isPastPaper: false },
            { id: 1071, text: 'A force of (2i + 3j) N is applied on a body at a point (i - j) m from the origin. Find the torque.', difficulty: 'Hard', pageReference: 106, concepts: ['torque', 'vectors'], isPastPaper: true },
            { id: 1072, text: 'What is the relation between torque and angular acceleration?', difficulty: 'Medium', pageReference: 107, concepts: ['torque', 'angular acceleration'], isPastPaper: false },
            { id: 1073, text: 'Why does a spinning dancer pull her arms in to spin faster?', difficulty: 'Medium', pageReference: 111, concepts: ['conservation of angular momentum'], isPastPaper: false },
            { id: 1074, text: 'What is a rigid body?', difficulty: 'Easy', pageReference: 94, concepts: ['rigid body'], isPastPaper: false },
            { id: 1075, text: 'Find the center of mass of three particles at the vertices of an equilateral triangle.', difficulty: 'Hard', pageReference: 94, concepts: ['center of mass'], isPastPaper: true },
            { id: 1076, text: 'What is the condition for a body to be in rotational equilibrium?', difficulty: 'Easy', pageReference: 109, concepts: ['rotational equilibrium'], isPastPaper: false },
            { id: 1077, text: 'A flywheel of mass 25 kg has a radius of 0.2 m. It is making 240 rpm. What is its angular momentum?', difficulty: 'Hard', pageReference: 112, concepts: ['angular momentum'], isPastPaper: true },
            { id: 1078, text: 'Define angular velocity.', difficulty: 'Easy', pageReference: 96, concepts: ['angular velocity'], isPastPaper: false },
            { id: 1079, text: 'What is the moment of inertia of a circular ring of mass M and radius R about an axis passing through its diameter?', difficulty: 'Medium', pageReference: 102, concepts: ['moment of inertia'], isPastPaper: false },
            { id: 1080, text: 'Explain the concept of slipping, sliding and rolling.', difficulty: 'Medium', pageReference: 114, concepts: ['rolling motion'], isPastPaper: false },
        ]
      },
      {
        id: 105,
        name: 'Gravitation',
        questions: [
          { id: 1081, text: "State Newton's law of gravitation.", difficulty: 'Easy', pageReference: 120, concepts: ['gravitation'], isPastPaper: false },
          { id: 1082, text: 'Define gravitational potential energy.', difficulty: 'Easy', pageReference: 125, concepts: ['gravitational potential energy'], isPastPaper: false },
          { id: 1083, text: 'What is escape velocity?', difficulty: 'Easy', pageReference: 128, concepts: ['escape velocity'], isPastPaper: false },
          { id: 1084, text: "What is the value of 'g' at the center of the Earth?", difficulty: 'Easy', pageReference: 123, concepts: ['acceleration due to gravity'], isPastPaper: false },
          { id: 1085, text: "State Kepler's laws of planetary motion.", difficulty: 'Medium', pageReference: 130, concepts: ["Kepler's laws"], isPastPaper: false },
          { id: 1086, text: 'Calculate the escape velocity on the surface of the moon.', difficulty: 'Hard', pageReference: 129, concepts: ['escape velocity'], isPastPaper: true },
          { id: 1087, text: 'What is a geostationary satellite?', difficulty: 'Easy', pageReference: 132, concepts: ['satellites'], isPastPaper: false },
          { id: 1088, text: 'How does the acceleration due to gravity vary with altitude and depth?', difficulty: 'Medium', pageReference: 124, concepts: ['acceleration due to gravity'], isPastPaper: false },
          { id: 1089, text: 'Define gravitational field.', difficulty: 'Easy', pageReference: 122, concepts: ['gravitational field'], isPastPaper: false },
          { id: 1090, text: 'Two masses 10 kg and 20 kg are 1 m apart. Calculate the gravitational force between them.', difficulty: 'Medium', pageReference: 121, concepts: ['gravitational force'], isPastPaper: false },
          { id: 1091, text: 'What is orbital velocity?', difficulty: 'Easy', pageReference: 127, concepts: ['orbital velocity'], isPastPaper: false },
          { id: 1092, text: 'A satellite is revolving around the Earth. What is the work done by the gravitational force?', difficulty: 'Medium', pageReference: 126, concepts: ['work done', 'gravitation'], isPastPaper: false },
          { id: 1093, text: 'What is the time period of a geostationary satellite?', difficulty: 'Easy', pageReference: 133, concepts: ['satellites'], isPastPaper: false },
          { id: 1094, text: 'The radius of the Earth is 6400 km. What is the height of a geostationary satellite from the surface of the Earth?', difficulty: 'Hard', pageReference: 134, concepts: ['satellites'], isPastPaper: true },
          { id: 1095, text: 'What is weightlessness?', difficulty: 'Easy', pageReference: 135, concepts: ['weightlessness'], isPastPaper: false },
          { id: 1096, text: 'Derive the expression for escape velocity.', difficulty: 'Hard', pageReference: 128, concepts: ['escape velocity'], isPastPaper: true },
          { id: 1097, text: 'What is the relation between G and g?', difficulty: 'Medium', pageReference: 122, concepts: ['gravitation constant', 'acceleration due to gravity'], isPastPaper: false },
          { id: 1098, text: 'Why is the gravitational potential energy negative?', difficulty: 'Medium', pageReference: 125, concepts: ['gravitational potential energy'], isPastPaper: false },
          { id: 1099, text: 'Does the escape velocity depend on the mass of the object?', difficulty: 'Easy', pageReference: 129, concepts: ['escape velocity'], isPastPaper: false },
          { id: 1100, text: 'What would happen if gravity suddenly disappears?', difficulty: 'Hard', pageReference: 136, concepts: ['gravitation'], isPastPaper: false },
        ]
      },
      {
        id: 106,
        name: 'Properties of Bulk Matter',
        questions: [
            { id: 1101, text: 'Define elasticity.', difficulty: 'Easy', pageReference: 140, concepts: ['elasticity'], isPastPaper: false },
            { id: 1102, text: "State Hooke's law.", difficulty: 'Easy', pageReference: 142, concepts: ["Hooke's law"], isPastPaper: false },
            { id: 1103, text: 'Define stress and strain.', difficulty: 'Easy', pageReference: 141, concepts: ['stress', 'strain'], isPastPaper: false },
            { id: 1104, text: "What is Young's modulus?", difficulty: 'Easy', pageReference: 143, concepts: ["Young's modulus"], isPastPaper: false },
            { id: 1105, text: 'A wire of length L and radius r is stretched by a force F. The elongation produced is l. What is the Young\'s modulus of the material of the wire?', difficulty: 'Medium', pageReference: 144, concepts: ["Young's modulus"], isPastPaper: false },
            { id: 1106, text: 'Define pressure. What is its SI unit?', difficulty: 'Easy', pageReference: 150, concepts: ['pressure'], isPastPaper: false },
            { id: 1107, text: "State Pascal's law.", difficulty: 'Easy', pageReference: 152, concepts: ["Pascal's law"], isPastPaper: false },
            { id: 1108, text: 'What is viscosity?', difficulty: 'Easy', pageReference: 155, concepts: ['viscosity'], isPastPaper: false },
            { id: 1109, text: 'What is surface tension?', difficulty: 'Easy', pageReference: 160, concepts: ['surface tension'], isPastPaper: false },
            { id: 1110, text: "State Bernoulli's principle.", difficulty: 'Medium', pageReference: 158, concepts: ["Bernoulli's principle"], isPastPaper: false },
            { id: 1111, text: 'Why are raindrops spherical?', difficulty: 'Medium', pageReference: 161, concepts: ['surface tension'], isPastPaper: false },
            { id: 1112, text: 'A steel wire of length 4.7 m and cross-sectional area 3.0 x 10^-5 m^2 stretches by the same amount as a copper wire of length 3.5 m and cross-sectional area 4.0 x 10^-5 m^2 under a given load. What is the ratio of the Young\'s modulus of steel to that of copper?', difficulty: 'Hard', pageReference: 145, concepts: ["Young's modulus"], isPastPaper: true },
            { id: 1113, text: 'What is terminal velocity?', difficulty: 'Easy', pageReference: 157, concepts: ['terminal velocity'], isPastPaper: false },
            { id: 1114, text: 'Explain the working of a hydraulic lift.', difficulty: 'Medium', pageReference: 153, concepts: ["Pascal's law"], isPastPaper: false },
            { id: 1115, text: 'What is capillary action?', difficulty: 'Easy', pageReference: 162, concepts: ['capillarity'], isPastPaper: false },
            { id: 1116, text: 'Define coefficient of viscosity.', difficulty: 'Easy', pageReference: 156, concepts: ['viscosity'], isPastPaper: false },
            { id: 1117, text: 'What is the angle of contact?', difficulty: 'Easy', pageReference: 163, concepts: ['angle of contact'], isPastPaper: false },
            { id: 1118, text: "Derive an expression for the excess pressure inside a liquid drop.", difficulty: 'Hard', pageReference: 164, concepts: ['surface tension', 'pressure'], isPastPaper: true },
            { id: 1119, text: 'Why is it easier to swim in sea water than in river water?', difficulty: 'Medium', pageReference: 151, concepts: ['density', 'buoyancy'], isPastPaper: false },
            { id: 1120, text: 'What happens to the surface tension of a liquid when temperature increases?', difficulty: 'Easy', pageReference: 165, concepts: ['surface tension'], isPastPaper: false },
        ]
      },
      {
        id: 107,
        name: 'Thermodynamics',
        questions: [
          { id: 1121, text: 'Define thermal equilibrium.', difficulty: 'Easy', pageReference: 170, concepts: ['thermal equilibrium'], isPastPaper: false },
          { id: 1122, text: 'State the zeroth law of thermodynamics.', difficulty: 'Easy', pageReference: 171, concepts: ['zeroth law'], isPastPaper: false },
          { id: 1123, text: 'State the first law of thermodynamics.', difficulty: 'Easy', pageReference: 175, concepts: ['first law'], isPastPaper: false },
          { id: 1124, text: 'What is an isothermal process?', difficulty: 'Easy', pageReference: 178, concepts: ['thermodynamic processes'], isPastPaper: false },
          { id: 1125, text: 'What is an adiabatic process?', difficulty: 'Easy', pageReference: 179, concepts: ['thermodynamic processes'], isPastPaper: false },
          { id: 1126, text: 'What is a heat engine?', difficulty: 'Easy', pageReference: 185, concepts: ['heat engine'], isPastPaper: false },
          { id: 1127, text: 'State the second law of thermodynamics (Kelvin-Planck and Clausius statements).', difficulty: 'Medium', pageReference: 188, concepts: ['second law'], isPastPaper: false },
          { id: 1128, text: 'What is entropy?', difficulty: 'Easy', pageReference: 190, concepts: ['entropy'], isPastPaper: false },
          { id: 1129, text: 'In an isothermal expansion, a gas absorbs 1000 J of heat. What is the work done by the gas?', difficulty: 'Medium', pageReference: 176, concepts: ['first law', 'isothermal process'], isPastPaper: false },
          { id: 1130, text: 'What is a refrigerator or heat pump?', difficulty: 'Easy', pageReference: 187, concepts: ['heat pump'], isPastPaper: false },
          { id: 1131, text: "What is the efficiency of a Carnot engine working between 127°C and 27°C?", difficulty: 'Hard', pageReference: 186, concepts: ['Carnot engine', 'efficiency'], isPastPaper: true },
          { id: 1132, text: 'What is an isobaric process?', difficulty: 'Easy', pageReference: 180, concepts: ['thermodynamic processes'], isPastPaper: false },
          { id: 1133, text: 'What is an isochoric process?', difficulty: 'Easy', pageReference: 181, concepts: ['thermodynamic processes'], isPastPaper: false },
          { id: 1134, text: 'Derive the relation Cp - Cv = R.', difficulty: 'Hard', pageReference: 183, concepts: ['specific heat'], isPastPaper: true },
          { id: 1135, text: 'What is the internal energy of a system?', difficulty: 'Easy', pageReference: 174, concepts: ['internal energy'], isPastPaper: false },
          { id: 1136, text: 'A gas expands from a volume of 2.0 L to 6.0 L at a constant pressure of 1.5 atm. Calculate the work done by the gas.', difficulty: 'Medium', pageReference: 177, concepts: ['work done'], isPastPaper: false },
          { id: 1137, text: 'Is it possible to design a heat engine with 100% efficiency?', difficulty: 'Medium', pageReference: 189, concepts: ['second law', 'efficiency'], isPastPaper: false },
          { id: 1138, text: 'What is a cyclic process?', difficulty: 'Easy', pageReference: 182, concepts: ['thermodynamic processes'], isPastPaper: false },
          { id: 1139, text: 'What is the coefficient of performance of a refrigerator?', difficulty: 'Easy', pageReference: 187, concepts: ['refrigerator'], isPastPaper: false },
          { id: 1140, text: 'The efficiency of a Carnot engine is 1/6. If on reducing the temperature of the sink by 65°C, the efficiency becomes 1/3, find the initial and final temperatures between which the engine is working.', difficulty: 'Hard', pageReference: 187, concepts: ['Carnot engine'], isPastPaper: true },
        ]
      },
      {
        id: 108,
        name: 'Kinetic Theory of Gases',
        questions: [
            { id: 1141, text: 'State the postulates of the kinetic theory of gases.', difficulty: 'Medium', pageReference: 195, concepts: ['kinetic theory'], isPastPaper: false },
            { id: 1142, text: 'What is an ideal gas?', difficulty: 'Easy', pageReference: 194, concepts: ['ideal gas'], isPastPaper: false },
            { id: 1143, text: 'Derive the expression for the pressure exerted by a gas.', difficulty: 'Hard', pageReference: 196, concepts: ['pressure', 'kinetic theory'], isPastPaper: true },
            { id: 1144, text: 'What is the root mean square (rms) speed of gas molecules?', difficulty: 'Easy', pageReference: 198, concepts: ['rms speed'], isPastPaper: false },
            { id: 1145, text: 'State the law of equipartition of energy.', difficulty: 'Medium', pageReference: 200, concepts: ['equipartition of energy'], isPastPaper: false },
            { id: 1146, text: 'What is the average kinetic energy of a gas molecule?', difficulty: 'Easy', pageReference: 199, concepts: ['kinetic energy'], isPastPaper: false },
            { id: 1147, text: 'Define degrees of freedom.', difficulty: 'Easy', pageReference: 201, concepts: ['degrees of freedom'], isPastPaper: false },
            { id: 1148, text: 'Calculate the rms speed of oxygen molecules at 27°C.', difficulty: 'Hard', pageReference: 199, concepts: ['rms speed'], isPastPaper: true },
            { id: 1149, text: 'What are the specific heat capacities for a monatomic gas?', difficulty: 'Medium', pageReference: 202, concepts: ['specific heat', 'monatomic gas'], isPastPaper: false },
            { id: 1150, text: 'What is mean free path?', difficulty: 'Easy', pageReference: 205, concepts: ['mean free path'], isPastPaper: false },
            { id: 1151, text: 'How does the rms speed of gas molecules depend on temperature?', difficulty: 'Easy', pageReference: 198, concepts: ['rms speed'], isPastPaper: false },
            { id: 1152, text: 'At what temperature is the rms speed of hydrogen molecules equal to that of oxygen molecules at 47°C?', difficulty: 'Hard', pageReference: 200, concepts: ['rms speed'], isPastPaper: true },
            { id: 1153, text: 'What are the degrees of freedom for a diatomic gas?', difficulty: 'Medium', pageReference: 202, concepts: ['degrees of freedom', 'diatomic gas'], isPastPaper: false },
            { id: 1154, text: 'Explain Brownian motion.', difficulty: 'Medium', pageReference: 206, concepts: ['Brownian motion'], isPastPaper: false },
            { id: 1155, text: 'What is Avogadro\'s number?', difficulty: 'Easy', pageReference: 194, concepts: ["Avogadro's number"], isPastPaper: false },
            { id: 1156, text: "State Boyle's law and Charles' law.", difficulty: 'Easy', pageReference: 193, concepts: ['gas laws'], isPastPaper: false },
            { id: 1157, text: "Derive the ideal gas equation.", difficulty: 'Hard', pageReference: 194, concepts: ['ideal gas equation'], isPastPaper: true },
            { id: 1158, text: 'Why does the pressure of a gas in a container increase when it is heated?', difficulty: 'Medium', pageReference: 197, concepts: ['pressure', 'kinetic theory'], isPastPaper: false },
            { id: 1159, text: 'What is the specific heat capacity for a polyatomic gas?', difficulty: 'Medium', pageReference: 203, concepts: ['specific heat', 'polyatomic gas'], isPastPaper: false },
            { id: 1160, text: 'A gas mixture consists of 2 moles of oxygen and 4 moles of argon at temperature T. Find the total internal energy of the system.', difficulty: 'Hard', pageReference: 204, concepts: ['internal energy', 'degrees of freedom'], isPastPaper: true },
        ]
      },
      {
        id: 109,
        name: 'Oscillations and Waves',
        questions: [
          { id: 1161, text: 'What is simple harmonic motion (SHM)?', difficulty: 'Easy', pageReference: 210, concepts: ['SHM'], isPastPaper: false },
          { id: 1162, text: 'Write the differential equation for SHM.', difficulty: 'Medium', pageReference: 212, concepts: ['SHM'], isPastPaper: false },
          { id: 1163, text: 'What is the time period of a simple pendulum?', difficulty: 'Easy', pageReference: 215, concepts: ['simple pendulum'], isPastPaper: false },
          { id: 1164, text: 'What is a wave?', difficulty: 'Easy', pageReference: 220, concepts: ['wave'], isPastPaper: false },
          { id: 1165, text: 'Differentiate between transverse and longitudinal waves.', difficulty: 'Easy', pageReference: 221, concepts: ['types of waves'], isPastPaper: false },
          { id: 1166, text: 'What is the principle of superposition of waves?', difficulty: 'Medium', pageReference: 225, concepts: ['superposition'], isPastPaper: false },
          { id: 1167, text: 'What are standing waves or stationary waves?', difficulty: 'Easy', pageReference: 228, concepts: ['standing waves'], isPastPaper: false },
          { id: 1168, text: 'What are beats?', difficulty: 'Easy', pageReference: 232, concepts: ['beats'], isPastPaper: false },
          { id: 1169, text: 'What is the Doppler effect?', difficulty: 'Easy', pageReference: 235, concepts: ['Doppler effect'], isPastPaper: false },
          { id: 1170, text: 'A particle executes SHM with an amplitude of 5 cm and a time period of 2 s. Find the maximum velocity.', difficulty: 'Hard', pageReference: 214, concepts: ['SHM', 'velocity'], isPastPaper: true },
          { id: 1171, text: 'What are nodes and antinodes?', difficulty: 'Easy', pageReference: 229, concepts: ['standing waves'], isPastPaper: false },
          { id: 1172, text: 'A wave is represented by y = 10 sin(0.02x - 2t). Find the wavelength and frequency.', difficulty: 'Hard', pageReference: 223, concepts: ['wave equation'], isPastPaper: true },
          { id: 1173, text: 'What is resonance?', difficulty: 'Easy', pageReference: 230, concepts: ['resonance'], isPastPaper: false },
          { id: 1174, text: 'A tuning fork produces 4 beats per second with another tuning fork of frequency 256 Hz. What are the possible frequencies of the first tuning fork?', difficulty: 'Medium', pageReference: 233, concepts: ['beats'], isPastPaper: false },
          { id: 1175, text: 'A train moving at a speed of 30 m/s sounds a whistle of frequency 500 Hz. What is the frequency heard by a stationary observer when the train is approaching?', difficulty: 'Hard', pageReference: 236, concepts: ['Doppler effect'], isPastPaper: true },
          { id: 1176, text: 'What is damping?', difficulty: 'Easy', pageReference: 218, concepts: ['damping'], isPastPaper: false },
          { id: 1177, text: 'The length of a simple pendulum is quadrupled. What is the change in its time period?', difficulty: 'Medium', pageReference: 216, concepts: ['simple pendulum'], isPastPaper: false },
          { id: 1178, text: 'Define wave speed.', difficulty: 'Easy', pageReference: 222, concepts: ['wave speed'], isPastPaper: false },
          { id: 1179, text: 'What are harmonics and overtones?', difficulty: 'Easy', pageReference: 231, concepts: ['harmonics', 'overtones'], isPastPaper: false },
          { id: 1180, text: 'The displacement of a particle is given by x = 3 sin(5πt) + 4 cos(5πt). What is the amplitude of the motion?', difficulty: 'Hard', pageReference: 213, concepts: ['SHM', 'amplitude'], isPastPaper: true },
        ]
      },
      {
        id: 111,
        name: 'Electrostatics',
        questions: [
            { id: 1201, text: "State Coulomb's law in electrostatics.", difficulty: 'Easy', pageReference: 240, concepts: ["Coulomb's law"], isPastPaper: false },
            { id: 1202, text: 'Define electric field.', difficulty: 'Easy', pageReference: 245, concepts: ['electric field'], isPastPaper: false },
            { id: 1203, text: 'What is an electric dipole?', difficulty: 'Easy', pageReference: 250, concepts: ['electric dipole'], isPastPaper: false },
            { id: 1204, text: 'Define electric potential.', difficulty: 'Easy', pageReference: 255, concepts: ['electric potential'], isPastPaper: false },
            { id: 1205, text: "State Gauss's law in electrostatics.", difficulty: 'Medium', pageReference: 260, concepts: ["Gauss's law"], isPastPaper: false },
            { id: 1206, text: 'What is capacitance?', difficulty: 'Easy', pageReference: 265, concepts: ['capacitance'], isPastPaper: false },
            { id: 1207, text: 'Derive the expression for the capacitance of a parallel plate capacitor.', difficulty: 'Hard', pageReference: 266, concepts: ['capacitance'], isPastPaper: true },
            { id: 1208, text: 'Two point charges +q and -2q are placed at the vertices of an equilateral triangle of side a. Find the net electric field at the third vertex.', difficulty: 'Hard', pageReference: 248, concepts: ['electric field', 'superposition'], isPastPaper: true },
            { id: 1209, text: 'What is an equipotential surface?', difficulty: 'Easy', pageReference: 256, concepts: ['equipotential surface'], isPastPaper: false },
            { id: 1210, text: 'Three capacitors of capacitances 2 pF, 3 pF and 4 pF are connected in parallel. What is the total capacitance?', difficulty: 'Medium', pageReference: 270, concepts: ['capacitors in parallel'], isPastPaper: false },
            { id: 1211, text: 'Define electric flux.', difficulty: 'Easy', pageReference: 259, concepts: ['electric flux'], isPastPaper: false },
            { id: 1212, text: 'What is the work done in moving a charge of 10 C between two points having a potential difference of 5 V?', difficulty: 'Medium', pageReference: 257, concepts: ['work done', 'potential difference'], isPastPaper: false },
            { id: 1213, text: 'What is a dielectric?', difficulty: 'Easy', pageReference: 275, concepts: ['dielectric'], isPastPaper: false },
            { id: 1214, text: 'What happens to the capacitance of a capacitor when a dielectric slab is inserted between its plates?', difficulty: 'Medium', pageReference: 276, concepts: ['capacitance', 'dielectric'], isPastPaper: false },
            { id: 1215, text: 'Find the electric field due to an infinitely long straight uniformly charged wire.', difficulty: 'Hard', pageReference: 262, concepts: ['electric field', "Gauss's law"], isPastPaper: true },
            { id: 1216, text: 'What is electrostatic shielding?', difficulty: 'Easy', pageReference: 264, concepts: ['electrostatic shielding'], isPastPaper: false },
            { id: 1217, text: 'The electric potential at a point (x, y, z) is given by V = -x^2y - xz^3 + 4. Find the electric field at that point.', difficulty: 'Hard', pageReference: 258, concepts: ['electric potential', 'electric field'], isPastPaper: true },
            { id: 1218, text: 'What is the SI unit of capacitance?', difficulty: 'Easy', pageReference: 265, concepts: ['capacitance'], isPastPaper: false },
            { id: 1219, text: 'Two capacitors of 2 uF and 4 uF are connected in series. What is the equivalent capacitance?', difficulty: 'Medium', pageReference: 271, concepts: ['capacitors in series'], isPastPaper: false },
            { id: 1220, text: 'What is polarization of a dielectric?', difficulty: 'Easy', pageReference: 275, concepts: ['dielectric', 'polarization'], isPastPaper: false },
        ]
      },
      {
        id: 112,
        name: 'Current Electricity',
        questions: [
            { id: 1221, text: 'Define electric current.', difficulty: 'Easy', pageReference: 280, concepts: ['electric current'], isPastPaper: false },
            { id: 1222, text: "State Ohm's law.", difficulty: 'Easy', pageReference: 282, concepts: ["Ohm's law"], isPastPaper: false },
            { id: 1223, text: 'What is resistance?', difficulty: 'Easy', pageReference: 283, concepts: ['resistance'], isPastPaper: false },
            { id: 1224, text: 'What is resistivity?', difficulty: 'Easy', pageReference: 284, concepts: ['resistivity'], isPastPaper: false },
            { id: 1225, text: 'State Kirchhoff\'s laws.', difficulty: 'Medium', pageReference: 290, concepts: ["Kirchhoff's laws"], isPastPaper: false },
            { id: 1226, text: 'What is a Wheatstone bridge?', difficulty: 'Easy', pageReference: 295, concepts: ['Wheatstone bridge'], isPastPaper: false },
            { id: 1227, text: 'A wire of resistance 4 R is bent in the form of a circle. What is the effective resistance between the ends of a diameter?', difficulty: 'Hard', pageReference: 288, concepts: ['resistance combination'], isPastPaper: true },
            { id: 1228, text: 'What is a potentiometer?', difficulty: 'Easy', pageReference: 300, concepts: ['potentiometer'], isPastPaper: false },
            { id: 1229, text: 'Define emf of a cell.', difficulty: 'Easy', pageReference: 289, concepts: ['emf'], isPastPaper: false },
            { id: 1230, text: 'What is the principle of a potentiometer?', difficulty: 'Medium', pageReference: 301, concepts: ['potentiometer'], isPastPaper: false },
            { id: 1231, text: 'A battery of emf 10 V and internal resistance 3 ohm is connected to a resistor. If the current in the circuit is 0.5 A, what is the resistance of the resistor?', difficulty: 'Hard', pageReference: 292, concepts: ['emf', 'internal resistance'], isPastPaper: true },
            { id: 1232, text: 'What is a meter bridge?', difficulty: 'Easy', pageReference: 298, concepts: ['meter bridge'], isPastPaper: false },
            { id: 1233, text: 'How does the resistance of a conductor vary with temperature?', difficulty: 'Medium', pageReference: 285, concepts: ['resistance', 'temperature dependence'], isPastPaper: false },
            { id: 1234, text: 'What is drift velocity?', difficulty: 'Easy', pageReference: 281, concepts: ['drift velocity'], isPastPaper: false },
            { id: 1235, text: 'Derive the relation between current and drift velocity.', difficulty: 'Hard', pageReference: 282, concepts: ['current', 'drift velocity'], isPastPaper: true },
            { id: 1236, text: 'What are the factors on which the resistance of a conductor depends?', difficulty: 'Easy', pageReference: 283, concepts: ['resistance'], isPastPaper: false },
            { id: 1237, text: 'What is the color code for a resistor of 47 k ohm?', difficulty: 'Medium', pageReference: 286, concepts: ['resistor color code'], isPastPaper: false },
            { id: 1238, text: 'What is the heating effect of current?', difficulty: 'Easy', pageReference: 305, concepts: ['heating effect'], isPastPaper: false },
            { id: 1239, text: 'Two resistors of resistances 2 ohm and 4 ohm are connected in series. What is the equivalent resistance?', difficulty: 'Easy', pageReference: 287, concepts: ['resistors in series'], isPastPaper: false },
            { id: 1240, text: 'State the applications of a potentiometer.', difficulty: 'Medium', pageReference: 302, concepts: ['potentiometer'], isPastPaper: false },
        ]
      },
      {
        id: 113,
        name: 'Magnetic Effects of Current and Magnetism',
        questions: [
            { id: 1241, text: "What is Biot-Savart's law?", difficulty: 'Easy', pageReference: 310, concepts: ["Biot-Savart's law"], isPastPaper: false },
            { id: 1242, text: 'Define magnetic field.', difficulty: 'Easy', pageReference: 312, concepts: ['magnetic field'], isPastPaper: false },
            { id: 1243, text: "State Ampere's circuital law.", difficulty: 'Medium', pageReference: 315, concepts: ["Ampere's law"], isPastPaper: false },
            { id: 1244, text: 'What is a solenoid?', difficulty: 'Easy', pageReference: 318, concepts: ['solenoid'], isPastPaper: false },
            { id: 1245, text: 'What is Lorentz force?', difficulty: 'Easy', pageReference: 320, concepts: ['Lorentz force'], isPastPaper: false },
            { id: 1246, text: 'A long straight wire carries a current of 35 A. What is the magnitude of the field B at a point 20 cm from the wire?', difficulty: 'Hard', pageReference: 316, concepts: ['magnetic field', "Ampere's law"], isPastPaper: true },
            { id: 1247, text: 'What is a cyclotron?', difficulty: 'Easy', pageReference: 325, concepts: ['cyclotron'], isPastPaper: false },
            { id: 1248, text: 'What is a galvanometer?', difficulty: 'Easy', pageReference: 330, concepts: ['galvanometer'], isPastPaper: false },
            { id: 1249, text: 'How can you convert a galvanometer into an ammeter?', difficulty: 'Medium', pageReference: 332, concepts: ['ammeter', 'galvanometer'], isPastPaper: false },
            { id: 1250, text: 'How can you convert a galvanometer into a voltmeter?', difficulty: 'Medium', pageReference: 333, concepts: ['voltmeter', 'galvanometer'], isPastPaper: false },
            { id: 1251, text: 'What are magnetic field lines?', difficulty: 'Easy', pageReference: 340, concepts: ['magnetic field lines'], isPastPaper: false },
            { id: 1252, text: 'What is a magnetic dipole?', difficulty: 'Easy', pageReference: 345, concepts: ['magnetic dipole'], isPastPaper: false },
            { id: 1253, text: "What is Gauss's law for magnetism?", difficulty: 'Medium', pageReference: 348, concepts: ["Gauss's law for magnetism"], isPastPaper: false },
            { id: 1254, text: 'Differentiate between diamagnetic, paramagnetic and ferromagnetic substances.', difficulty: 'Hard', pageReference: 350, concepts: ['magnetic materials'], isPastPaper: true },
            { id: 1255, text: 'What is hysteresis?', difficulty: 'Easy', pageReference: 355, concepts: ['hysteresis'], isPastPaper: false },
            { id: 1256, text: 'A circular coil of wire consisting of 100 turns, each of radius 8.0 cm carries a current of 0.40 A. What is the magnitude of the magnetic field B at the centre of the coil?', difficulty: 'Hard', pageReference: 314, concepts: ['magnetic field', 'circular coil'], isPastPaper: true },
            { id: 1257, text: 'What is the force on a current-carrying conductor in a magnetic field?', difficulty: 'Medium', pageReference: 322, concepts: ['force on conductor'], isPastPaper: false },
            { id: 1258, text: 'What is magnetic susceptibility?', difficulty: 'Easy', pageReference: 351, concepts: ['magnetic susceptibility'], isPastPaper: false },
            { id: 1259, text: 'What are permanent magnets and electromagnets?', difficulty: 'Easy', pageReference: 358, concepts: ['magnets'], isPastPaper: false },
            { id: 1260, text: 'Explain the working of a cyclotron.', difficulty: 'Hard', pageReference: 326, concepts: ['cyclotron'], isPastPaper: false },
        ]
      },
      {
        id: 114,
        name: 'Electromagnetic Induction and Alternating Currents',
        questions: [
            { id: 1261, text: "What is electromagnetic induction? State Faraday's laws.", difficulty: 'Easy', pageReference: 360, concepts: ['electromagnetic induction', "Faraday's laws"], isPastPaper: false },
            { id: 1262, text: "State Lenz's law.", difficulty: 'Easy', pageReference: 362, concepts: ["Lenz's law"], isPastPaper: false },
            { id: 1263, text: 'What are eddy currents?', difficulty: 'Easy', pageReference: 365, concepts: ['eddy currents'], isPastPaper: false },
            { id: 1264, text: 'What is self-induction?', difficulty: 'Easy', pageReference: 368, concepts: ['self-induction'], isPastPaper: false },
            { id: 1265, text: 'What is mutual induction?', difficulty: 'Easy', pageReference: 370, concepts: ['mutual induction'], isPastPaper: false },
            { id: 1266, text: 'What is an AC generator?', difficulty: 'Easy', pageReference: 375, concepts: ['AC generator'], isPastPaper: false },
            { id: 1267, text: 'What is alternating current (AC)?', difficulty: 'Easy', pageReference: 380, concepts: ['alternating current'], isPastPaper: false },
            { id: 1268, text: 'What is the rms value of an AC current?', difficulty: 'Easy', pageReference: 382, concepts: ['rms value'], isPastPaper: false },
            { id: 1269, text: 'What is reactance?', difficulty: 'Easy', pageReference: 385, concepts: ['reactance'], isPastPaper: false },
            { id: 1270, text: 'What is impedance?', difficulty: 'Easy', pageReference: 388, concepts: ['impedance'], isPastPaper: false },
            { id: 1271, text: 'What is a series LCR circuit?', difficulty: 'Medium', pageReference: 390, concepts: ['LCR circuit'], isPastPaper: false },
            { id: 1272, text: 'What is resonance in an LCR circuit?', difficulty: 'Medium', pageReference: 392, concepts: ['resonance'], isPastPaper: false },
            { id: 1273, text: 'What is a transformer?', difficulty: 'Easy', pageReference: 400, concepts: ['transformer'], isPastPaper: false },
            { id: 1274, text: 'A 100 ohm resistor is connected to a 220 V, 50 Hz AC supply. What is the rms value of current in the circuit?', difficulty: 'Medium', pageReference: 383, concepts: ['rms current', "Ohm's law"], isPastPaper: false },
            { id: 1275, text: 'A coil of self-inductance 0.50 H is connected to a 100 V, 50 Hz AC supply. Find the maximum current in the coil.', difficulty: 'Hard', pageReference: 386, concepts: ['inductive reactance', 'AC circuit'], isPastPaper: true },
            { id: 1276, text: 'What is a choke coil?', difficulty: 'Easy', pageReference: 395, concepts: ['choke coil'], isPastPaper: false },
            { id: 1277, text: 'What is the power factor of an AC circuit?', difficulty: 'Easy', pageReference: 398, concepts: ['power factor'], isPastPaper: false },
            { id: 1278, text: 'Explain the working of a transformer.', difficulty: 'Hard', pageReference: 401, concepts: ['transformer'], isPastPaper: false },
            { id: 1279, text: 'The peak voltage of an AC supply is 300 V. What is the rms voltage?', difficulty: 'Medium', pageReference: 382, concepts: ['rms voltage'], isPastPaper: false },
            { id: 1280, text: 'What are the energy losses in a transformer?', difficulty: 'Medium', pageReference: 403, concepts: ['transformer losses'], isPastPaper: false },
        ]
      },
      {
        id: 115,
        name: 'Electromagnetic Waves',
        questions: [
            { id: 1281, text: 'What are electromagnetic waves?', difficulty: 'Easy', pageReference: 410, concepts: ['electromagnetic waves'], isPastPaper: false },
            { id: 1282, text: 'What is displacement current?', difficulty: 'Medium', pageReference: 412, concepts: ['displacement current'], isPastPaper: false },
            { id: 1283, text: 'Write down Maxwell\'s equations.', difficulty: 'Hard', pageReference: 415, concepts: ["Maxwell's equations"], isPastPaper: true },
            { id: 1284, text: 'What are the properties of electromagnetic waves?', difficulty: 'Easy', pageReference: 418, concepts: ['EM wave properties'], isPastPaper: false },
            { id: 1285, text: 'What is the electromagnetic spectrum?', difficulty: 'Easy', pageReference: 420, concepts: ['electromagnetic spectrum'], isPastPaper: false },
            { id: 1286, text: 'Name the electromagnetic waves in the order of increasing frequency.', difficulty: 'Medium', pageReference: 421, concepts: ['electromagnetic spectrum'], isPastPaper: false },
            { id: 1287, text: 'Give one use of microwaves.', difficulty: 'Easy', pageReference: 423, concepts: ['microwaves'], isPastPaper: false },
            { id: 1288, text: 'Give one use of X-rays.', difficulty: 'Easy', pageReference: 425, concepts: ['X-rays'], isPastPaper: false },
            { id: 1289, text: 'The magnetic field in a plane electromagnetic wave is given by By = 2 × 10^–7 sin (0.5 × 10^3 x + 1.5 × 10^11 t) T. What is the wavelength and frequency of the wave?', difficulty: 'Hard', pageReference: 419, concepts: ['EM wave equation'], isPastPaper: true },
            { id: 1290, text: 'Who experimentally confirmed the existence of electromagnetic waves?', difficulty: 'Easy', pageReference: 416, concepts: ['history of EM waves'], isPastPaper: false },
            { id: 1291, text: 'What is the speed of electromagnetic waves in vacuum?', difficulty: 'Easy', pageReference: 417, concepts: ['speed of light'], isPastPaper: false },
            { id: 1292, text: 'How are electromagnetic waves produced?', difficulty: 'Medium', pageReference: 411, concepts: ['production of EM waves'], isPastPaper: false },
            { id: 1293, text: 'What is the relation between the speed of light, permittivity and permeability of free space?', difficulty: 'Medium', pageReference: 417, concepts: ['speed of light'], isPastPaper: false },
            { id: 1294, text: 'Give one use of infrared waves.', difficulty: 'Easy', pageReference: 424, concepts: ['infrared'], isPastPaper: false },
            { id: 1295, text: 'Give one use of ultraviolet rays.', difficulty: 'Easy', pageReference: 424, concepts: ['ultraviolet'], isPastPaper: false },
            { id: 1296, text: 'Give one use of gamma rays.', difficulty: 'Easy', pageReference: 426, concepts: ['gamma rays'], isPastPaper: false },
            { id: 1297, text: 'What is the source of electromagnetic waves?', difficulty: 'Easy', pageReference: 411, concepts: ['source of EM waves'], isPastPaper: false },
            { id: 1298, text: 'Are electromagnetic waves transverse or longitudinal?', difficulty: 'Easy', pageReference: 418, concepts: ['nature of EM waves'], isPastPaper: false },
            { id: 1299, text: 'What is Poynting vector?', difficulty: 'Hard', pageReference: 428, concepts: ['Poynting vector'], isPastPaper: false },
            { id: 1300, text: 'The amplitude of the electric field in an electromagnetic wave is 120 N/C. What is the amplitude of the magnetic field?', difficulty: 'Hard', pageReference: 419, concepts: ['EM wave properties'], isPastPaper: true },
        ]
      },
      {
        id: 116,
        name: 'Optics',
        questions: [
            { id: 1301, text: 'What is reflection of light?', difficulty: 'Easy', pageReference: 430, concepts: ['reflection'], isPastPaper: false },
            { id: 1302, text: 'What is refraction of light?', difficulty: 'Easy', pageReference: 435, concepts: ['refraction'], isPastPaper: false },
            { id: 1303, text: "State Snell's law.", difficulty: 'Easy', pageReference: 436, concepts: ["Snell's law"], isPastPaper: false },
            { id: 1304, text: 'What is total internal reflection?', difficulty: 'Medium', pageReference: 440, concepts: ['total internal reflection'], isPastPaper: false },
            { id: 1305, text: 'What is a lens? What are the types of lenses?', difficulty: 'Easy', pageReference: 445, concepts: ['lens'], isPastPaper: false },
            { id: 1306, text: 'What is the lens maker\'s formula?', difficulty: 'Hard', pageReference: 448, concepts: ["lens maker's formula"], isPastPaper: true },
            { id: 1307, 'text': "What is Huygens' principle?", difficulty: 'Medium', pageReference: 455, concepts: ["Huygens' principle"], isPastPaper: false },
            { id: 1308, text: 'What is interference of light?', difficulty: 'Easy', pageReference: 460, concepts: ['interference'], isPastPaper: false },
            { id: 1309, text: 'What is diffraction of light?', difficulty: 'Easy', pageReference: 465, concepts: ['diffraction'], isPastPaper: false },
            { id: 1310, text: 'What is polarization of light?', difficulty: 'Easy', pageReference: 470, concepts: ['polarization'], isPastPaper: false },
            { id: 1311, text: 'An object is placed at a distance of 10 cm from a convex mirror of focal length 15 cm. Find the position and nature of the image.', difficulty: 'Hard', pageReference: 433, concepts: ['mirror formula'], isPastPaper: true },
            { id: 1312, text: 'What is a wavefront?', difficulty: 'Easy', pageReference: 454, concepts: ['wavefront'], isPastPaper: false },
            { id: 1313, text: "Explain Young's double slit experiment.", difficulty: 'Hard', pageReference: 461, concepts: ['interference', "Young's experiment"], isPastPaper: false },
            { id: 1314, text: 'What is resolving power of an optical instrument?', difficulty: 'Easy', pageReference: 475, concepts: ['resolving power'], isPastPaper: false },
            { id: 1315, text: "State Brewster's law.", difficulty: 'Medium', pageReference: 472, concepts: ["Brewster's law"], isPastPaper: false },
            { id: 1316, text: 'What is a prism?', difficulty: 'Easy', pageReference: 450, concepts: ['prism'], isPastPaper: false },
            { id: 1317, text: 'Derive the prism formula.', difficulty: 'Hard', pageReference: 451, concepts: ['prism formula'], isPastPaper: true },
            { id: 1318, text: 'What is dispersion of light?', difficulty: 'Easy', pageReference: 452, concepts: ['dispersion'], isPastPaper: false },
            { id: 1319, text: 'What is a compound microscope?', difficulty: 'Easy', pageReference: 480, concepts: ['microscope'], isPastPaper: false },
            { id: 1320, text: 'What is a telescope?', difficulty: 'Easy', pageReference: 482, concepts: ['telescope'], isPastPaper: false },
        ]
      },
      {
        id: 117,
        name: 'Dual Nature of Matter and Radiation',
        questions: [
            { id: 1321, text: 'What is photoelectric effect?', difficulty: 'Easy', pageReference: 490, concepts: ['photoelectric effect'], isPastPaper: false },
            { id: 1322, text: 'What are photons?', difficulty: 'Easy', pageReference: 492, concepts: ['photons'], isPastPaper: false },
            { id: 1323, text: "What is Einstein's photoelectric equation?", difficulty: 'Medium', pageReference: 495, concepts: ['photoelectric equation'], isPastPaper: false },
            { id: 1324, text: 'What is work function?', difficulty: 'Easy', pageReference: 494, concepts: ['work function'], isPastPaper: false },
            { id: 1325, text: 'What is threshold frequency?', difficulty: 'Easy', pageReference: 493, concepts: ['threshold frequency'], isPastPaper: false },
            { id: 1326, text: 'What are matter waves?', difficulty: 'Easy', pageReference: 500, concepts: ['matter waves'], isPastPaper: false },
            { id: 1327, text: "What is de Broglie's hypothesis?", difficulty: 'Medium', pageReference: 501, concepts: ["de Broglie hypothesis"], isPastPaper: false },
            { id: 1328, text: 'The work function of a metal is 2.1 eV. Light of wavelength 4000 Å is incident on it. Find the maximum kinetic energy of the emitted photoelectrons.', difficulty: 'Hard', pageReference: 496, concepts: ['photoelectric effect'], isPastPaper: true },
            { id: 1329, text: "What is Heisenberg's uncertainty principle?", difficulty: 'Medium', pageReference: 505, concepts: ['uncertainty principle'], isPastPaper: false },
            { id: 1330, text: 'Explain the Davisson and Germer experiment.', difficulty: 'Hard', pageReference: 503, concepts: ['Davisson-Germer experiment'], isPastPaper: false },
            { id: 1331, text: 'Calculate the de Broglie wavelength of an electron moving with a velocity of 10^6 m/s.', difficulty: 'Hard', pageReference: 502, concepts: ['de Broglie wavelength'], isPastPaper: true },
            { id: 1332, text: 'What is stopping potential?', difficulty: 'Easy', pageReference: 491, concepts: ['stopping potential'], isPastPaper: false },
            { id: 1333, text: 'Does the stopping potential depend on the intensity of incident radiation?', difficulty: 'Medium', pageReference: 491, concepts: ['photoelectric effect'], isPastPaper: false },
            { id: 1334, text: 'What is the rest mass of a photon?', difficulty: 'Easy', pageReference: 492, concepts: ['photon'], isPastPaper: false },
            { id: 1335, text: 'If the momentum of a particle is doubled, what happens to its de Broglie wavelength?', difficulty: 'Medium', pageReference: 501, concepts: ['de Broglie wavelength'], isPastPaper: false },
            { id: 1336, text: 'What is a photocell?', difficulty: 'Easy', pageReference: 498, concepts: ['photocell'], isPastPaper: false },
            { id: 1337, text: 'What are the applications of photocells?', difficulty: 'Easy', pageReference: 499, concepts: ['photocell'], isPastPaper: false },
            { id: 1338, text: 'What is the energy of a photon of wavelength 6000 Å?', difficulty: 'Medium', pageReference: 492, concepts: ['photon energy'], isPastPaper: false },
            { id: 1339, text: 'Why can we not observe the wave nature of a cricket ball?', difficulty: 'Hard', pageReference: 502, concepts: ['de Broglie wavelength'], isPastPaper: false },
            { id: 1340, text: 'An electron and a proton have the same de Broglie wavelength. Which one has higher kinetic energy?', difficulty: 'Hard', pageReference: 504, concepts: ['de Broglie wavelength', 'kinetic energy'], isPastPaper: true },
        ]
      },
      {
        id: 118,
        name: 'Atoms and Nuclei',
        questions: [
            { id: 1341, text: "Describe Rutherford's alpha-scattering experiment.", difficulty: 'Medium', pageReference: 510, concepts: ["Rutherford's model"], isPastPaper: false },
            { id: 1342, text: "What are the postulates of Bohr's model of the atom?", difficulty: 'Medium', pageReference: 515, concepts: ["Bohr's model"], isPastPaper: false },
            { id: 1343, text: 'What is a nucleus?', difficulty: 'Easy', pageReference: 520, concepts: ['nucleus'], isPastPaper: false },
            { id: 1344, text: 'What are isotopes, isobars and isotones?', difficulty: 'Easy', pageReference: 522, concepts: ['isotopes', 'isobars', 'isotones'], isPastPaper: false },
            { id: 1345, text: 'What is radioactivity?', difficulty: 'Easy', pageReference: 525, concepts: ['radioactivity'], isPastPaper: false },
            { id: 1346, text: 'State the law of radioactive decay.', difficulty: 'Medium', pageReference: 526, concepts: ['radioactive decay'], isPastPaper: false },
            { id: 1347, text: 'What is half-life?', difficulty: 'Easy', pageReference: 528, concepts: ['half-life'], isPastPaper: false },
            { id: 1348, text: 'What is nuclear fission?', difficulty: 'Easy', pageReference: 530, concepts: ['nuclear fission'], isPastPaper: false },
            { id: 1349, text: 'What is nuclear fusion?', difficulty: 'Easy', pageReference: 532, concepts: ['nuclear fusion'], isPastPaper: false },
            { id: 1350, text: 'The half-life of a radioactive substance is 30 days. What is the time taken for 3/4 of its original mass to disintegrate?', difficulty: 'Hard', pageReference: 529, concepts: ['half-life', 'radioactive decay'], isPastPaper: true },
            { id: 1351, text: 'What is mass defect?', difficulty: 'Easy', pageReference: 524, concepts: ['mass defect'], isPastPaper: false },
            { id: 1352, text: 'What is binding energy?', difficulty: 'Easy', pageReference: 524, concepts: ['binding energy'], isPastPaper: false },
            { id: 1353, text: 'Derive the expression for the radius of the nth orbit in Bohr\'s model.', difficulty: 'Hard', pageReference: 516, concepts: ["Bohr's model"], isPastPaper: true },
            { id: 1354, text: 'What are alpha, beta and gamma rays?', difficulty: 'Easy', pageReference: 525, concepts: ['radioactivity'], isPastPaper: false },
            { id: 1355, text: 'What is a nuclear reactor?', difficulty: 'Easy', pageReference: 531, concepts: ['nuclear reactor'], isPastPaper: false },
            { id: 1356, text: 'Calculate the energy equivalent of 1 g of substance.', difficulty: 'Medium', pageReference: 523, concepts: ['mass-energy equivalence'], isPastPaper: false },
            { id: 1357, text: 'What is the source of energy in the sun?', difficulty: 'Easy', pageReference: 533, concepts: ['nuclear fusion'], isPastPaper: false },
            { id: 1358, text: 'What are the limitations of Bohr\'s model?', difficulty: 'Medium', pageReference: 518, concepts: ["Bohr's model"], isPastPaper: false },
            { id: 1359, text: 'What is the relation between half-life and decay constant?', difficulty: 'Easy', pageReference: 528, concepts: ['half-life', 'decay constant'], isPastPaper: false },
            { id: 1360, text: 'A radioactive nucleus decays as follows: A -> A1 (alpha emission), A1 -> A2 (beta emission). What are the atomic and mass numbers of A2?', difficulty: 'Hard', pageReference: 527, concepts: ['radioactive decay'], isPastPaper: true },
        ]
      },
      {
        id: 119,
        name: 'Electronic Devices',
        questions: [
            { id: 1361, text: 'What are semiconductors?', difficulty: 'Easy', pageReference: 540, concepts: ['semiconductors'], isPastPaper: false },
            { id: 1362, text: 'Differentiate between intrinsic and extrinsic semiconductors.', difficulty: 'Easy', pageReference: 542, concepts: ['semiconductors'], isPastPaper: false },
            { id: 1363, text: 'What is a p-n junction?', difficulty: 'Easy', pageReference: 545, concepts: ['p-n junction'], isPastPaper: false },
            { id: 1364, text: 'What is a diode?', difficulty: 'Easy', pageReference: 546, concepts: ['diode'], isPastPaper: false },
            { id: 1365, text: 'What is a rectifier?', difficulty: 'Easy', pageReference: 550, concepts: ['rectifier'], isPastPaper: false },
            { id: 1366, text: 'Explain the working of a half-wave rectifier.', difficulty: 'Medium', pageReference: 551, concepts: ['rectifier'], isPastPaper: false },
            { id: 1367, text: 'Explain the working of a full-wave rectifier.', difficulty: 'Medium', pageReference: 552, concepts: ['rectifier'], isPastPaper: false },
            { id: 1368, text: 'What is a Zener diode?', difficulty: 'Easy', pageReference: 555, concepts: ['Zener diode'], isPastPaper: false },
            { id: 1369, text: 'What is a transistor?', difficulty: 'Easy', pageReference: 560, concepts: ['transistor'], isPastPaper: false },
            { id: 1370, text: 'What are the different configurations of a transistor?', difficulty: 'Easy', pageReference: 562, concepts: ['transistor configurations'], isPastPaper: false },
            { id: 1371, text: 'Explain the working of a transistor as an amplifier.', difficulty: 'Hard', pageReference: 565, concepts: ['transistor amplifier'], isPastPaper: false },
            { id: 1372, text: 'What is a logic gate?', difficulty: 'Easy', pageReference: 570, concepts: ['logic gates'], isPastPaper: false },
            { id: 1373, text: 'What are the basic logic gates?', difficulty: 'Easy', pageReference: 571, concepts: ['logic gates'], isPastPaper: false },
            { id: 1374, text: 'What is a NAND gate?', difficulty: 'Easy', pageReference: 573, concepts: ['NAND gate'], isPastPaper: false },
            { id: 1375, text: 'What is a NOR gate?', difficulty: 'Easy', pageReference: 574, concepts: ['NOR gate'], isPastPaper: false },
            { id: 1376, text: 'What is an integrated circuit (IC)?', difficulty: 'Easy', pageReference: 580, concepts: ['integrated circuit'], isPastPaper: false },
            { id: 1377, text: 'In a p-n junction diode, the forward bias voltage is 0.5 V and the reverse bias voltage is 1.5 V. What is the current in the diode?', difficulty: 'Hard', pageReference: 548, concepts: ['p-n junction', 'I-V characteristics'], isPastPaper: true },
            { id: 1378, text: 'What is doping?', difficulty: 'Easy', pageReference: 542, concepts: ['doping'], isPastPaper: false },
            { id: 1379, text: 'What is the depletion region in a p-n junction?', difficulty: 'Easy', pageReference: 545, concepts: ['depletion region'], isPastPaper: false },
            { id: 1380, text: 'The input resistance of a transistor is 1000 ohm. On changing its base current by 10 uA, the collector current increases by 2 mA. What is the current gain?', difficulty: 'Hard', pageReference: 564, concepts: ['transistor', 'current gain'], isPastPaper: true },
        ]
      },
      {
        id: 120,
        name: 'Communication Systems',
        questions: [
            { id: 1381, text: 'What is a communication system?', difficulty: 'Easy', pageReference: 590, concepts: ['communication system'], isPastPaper: false },
            { id: 1382, text: 'What are the basic elements of a communication system?', difficulty: 'Easy', pageReference: 591, concepts: ['communication system'], isPastPaper: false },
            { id: 1383, text: 'What is modulation?', difficulty: 'Easy', pageReference: 595, concepts: ['modulation'], isPastPaper: false },
            { id: 1384, text: 'What are the types of modulation?', difficulty: 'Easy', pageReference: 596, concepts: ['modulation'], isPastPaper: false },
            { id: 1385, text: 'What is amplitude modulation (AM)?', difficulty: 'Easy', pageReference: 597, concepts: ['amplitude modulation'], isPastPaper: false },
            { id: 1386, text: 'What is frequency modulation (FM)?', difficulty: 'Easy', pageReference: 598, concepts: ['frequency modulation'], isPastPaper: false },
            { id: 1387, text: 'What is phase modulation (PM)?', difficulty: 'Easy', pageReference: 599, concepts: ['phase modulation'], isPastPaper: false },
            { id: 1388, text: 'What is bandwidth?', difficulty: 'Easy', pageReference: 592, concepts: ['bandwidth'], isPastPaper: false },
            { id: 1389, text: 'What is a transmitter?', difficulty: 'Easy', pageReference: 600, concepts: ['transmitter'], isPastPaper: false },
            { id: 1390, text: 'What is a receiver?', difficulty: 'Easy', pageReference: 601, concepts: ['receiver'], isPastPaper: false },
            { id: 1391, text: 'What is an antenna?', difficulty: 'Easy', pageReference: 605, concepts: ['antenna'], isPastPaper: false },
            { id: 1392, text: 'What is propagation of electromagnetic waves?', difficulty: 'Easy', pageReference: 610, concepts: ['wave propagation'], isPastPaper: false },
            { id: 1393, text: 'What are the different modes of wave propagation?', difficulty: 'Medium', pageReference: 611, concepts: ['wave propagation'], isPastPaper: false },
            { id: 1394, text: 'What is ground wave propagation?', difficulty: 'Easy', pageReference: 612, concepts: ['ground wave'], isPastPaper: false },
            { id: 1395, text: 'What is sky wave propagation?', difficulty: 'Easy', pageReference: 613, concepts: ['sky wave'], isPastPaper: false },
            { id: 1396, text: 'What is space wave propagation?', difficulty: 'Easy', pageReference: 614, concepts: ['space wave'], isPastPaper: false },
            { id: 1397, text: 'A carrier wave of frequency 1.5 MHz and amplitude 50 V is modulated by a sinusoidal wave of frequency 10 kHz producing 50% modulation. Calculate the amplitude of the AM wave.', difficulty: 'Hard', pageReference: 597, concepts: ['amplitude modulation'], isPastPaper: true },
            { id: 1398, text: 'What is demodulation or detection?', difficulty: 'Easy', pageReference: 602, concepts: ['demodulation'], isPastPaper: false },
            { id: 1399, text: 'What is a modem?', difficulty: 'Easy', pageReference: 620, concepts: ['modem'], isPastPaper: false },
            { id: 1400, text: 'A TV tower has a height of 100 m. What is the maximum distance up to which the TV transmission can be received?', difficulty: 'Hard', pageReference: 615, concepts: ['space wave propagation'], isPastPaper: true },
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
