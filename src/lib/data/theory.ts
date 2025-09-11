
export type TheoryConcept = {
    title: string;
    explanation: string;
    formula?: string;
    derivation?: string;
}

export type TheoryChapter = {
    name: string;
    concepts: TheoryConcept[];
}

export type TheorySubject = {
    subject: string;
    chapters: TheoryChapter[];
}

export const theory: TheorySubject[] = [
    {
        subject: 'Physics',
        chapters: [
            {
                name: 'Kinematics',
                concepts: [
                    { 
                        title: 'Equations of Motion (Constant Acceleration)',
                        explanation: 'These are the fundamental equations that describe the motion of an object under constant acceleration.',
                        formula: '1. v = u + at\n2. s = ut + (1/2)at^2\n3. v^2 = u^2 + 2as',
                        derivation: '1. Derived from a = dv/dt. Integrating gives v = at + C. At t=0, v=u, so C=u. Hence v = u + at.\n2. Derived from v = ds/dt. Integrating ds = (u+at)dt gives s = ut + (1/2)at^2.\n3. Derived by eliminating time from the first two equations.'
                    },
                    {
                        title: 'Projectile Motion',
                        explanation: 'Motion of an object thrown into the air, subject only to the acceleration of gravity. It is a 2D motion with constant acceleration.',
                        formula: 'Horizontal Range (R) = (u^2 * sin(2θ)) / g\nMaximum Height (H) = (u^2 * sin^2(θ)) / (2g)\nTime of Flight (T) = (2u * sin(θ)) / g',
                        derivation: 'Derived by analyzing the horizontal (constant velocity) and vertical (constant acceleration) components of motion separately.'
                    },
                    {
                        title: 'Relative Velocity',
                        explanation: 'The velocity of an object or observer B in the rest frame of another object or observer A.',
                        formula: 'v_AB = v_A - v_B',
                        derivation: 'It is the vector difference between the velocities of the two objects.'
                    }
                ]
            },
            {
                name: 'Laws of Motion',
                concepts: [
                     {
                        title: 'Newton\'s Second Law',
                        explanation: 'The rate of change of momentum of a body is directly proportional to the force applied, and this change in momentum takes place in the direction of the applied force.',
                        formula: 'F = ma = dp/dt',
                        derivation: 'This is a fundamental law based on experimental observations. F ∝ dp/dt. The constant of proportionality is taken as 1.'
                    },
                    {
                        title: 'Friction',
                        explanation: 'A force that opposes relative motion between surfaces in contact.',
                        formula: 'Static Friction: f_s ≤ μ_s * N\nKinetic Friction: f_k = μ_k * N',
                        derivation: 'Friction is an empirical force. The formulas are approximations based on observation. The static friction adjusts itself to be equal to the applied force up to a maximum limit (limiting friction).'
                    },
                     {
                        title: 'Centripetal Force',
                        explanation: 'A force that acts on a body moving in a circular path and is directed towards the center around which the body is moving.',
                        formula: 'F_c = mv^2/r',
                        derivation: 'Derived from the centripetal acceleration a_c = v²/r, and Newton\'s Second Law, F=ma.'
                    },
                ]
            },
            {
                name: 'Work, Power, and Energy',
                concepts: [
                     {
                        title: 'Work-Energy Theorem',
                        explanation: 'The net work done by the forces on an object equals the change in its kinetic energy.',
                        formula: 'W_net = ΔK = (1/2)mv_f^2 - (1/2)mv_i^2',
                        derivation: 'Derived by integrating Newton\'s Second Law with respect to displacement. W = ∫ F dx = ∫ m(dv/dt) dx = ∫ m v dv = (1/2)mv².'
                    },
                    {
                        title: 'Conservation of Mechanical Energy',
                        explanation: 'If only conservative forces are doing work on an object, its total mechanical energy (sum of kinetic and potential energy) remains constant.',
                        formula: 'K_i + U_i = K_f + U_f',
                        derivation: 'This follows from the work-energy theorem where the work done by conservative forces is equal to the negative change in potential energy (W_c = -ΔU).'
                    },
                    {
                        title: 'Power',
                        explanation: 'The rate at which work is done or energy is transferred.',
                        formula: 'P_avg = W/Δt, P_inst = dW/dt = F · v',
                        derivation: 'Power is the time derivative of work. P = d/dt(F·s) = F · (ds/dt) = F·v for a constant force.'
                    }
                ]
            }
        ]
    }
];
