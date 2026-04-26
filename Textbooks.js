// ============================================================
//  RAI PORTAL — COMPLETE VTU 2022 SCHEME DATA
//  Source: VTU official circular JBOS 10.02.2023 / V5
// ============================================================

const SEMESTERS = [
  {
    num: 1, label: 'I Semester', credits: 22, color: '#1E3055', bg: '#E4E8F0',
    note: 'Common to all BE/BTech streams — Physics Cycle',
    subjects: [
      { code: 'BMAT101', name: 'Calculus & Linear Algebra', type: 'BSC' },
      { code: 'BPHYS102', name: 'Engineering Physics', type: 'BSC' },
      { code: 'BPOPS103', name: 'Problem Solving Through Programming in C', type: 'ESC' },
      { code: 'BESCK104', name: 'Engineering Science Course (ESC-I)', type: 'ESC' },
      { code: 'BCEDK105', name: 'Computer-Aided Engineering Drawing', type: 'ESC' },
      { code: 'BPHYP106', name: 'Engineering Physics Lab', type: 'Lab' },
      { code: 'BPOPSP107', name: 'C Programming Lab', type: 'Lab' },
      { code: 'BNSK159', name: 'NSS / Physical Education / Yoga', type: 'MC' }
    ],
    electives: []
  },
  {
    num: 2, label: 'II Semester', credits: 22, color: '#0D7A5F', bg: '#E0F5EF',
    note: 'Common to all BE/BTech streams — Chemistry Cycle',
    subjects: [
      { code: 'BMAT201', name: 'Advanced Calculus & Numerical Methods', type: 'BSC' },
      { code: 'BCHES202', name: 'Engineering Chemistry', type: 'BSC' },
      { code: 'BESCK204', name: 'Engineering Science Course (ESC-II)', type: 'ESC' },
      { code: 'BCEDK205', name: 'Elements of Civil Engineering & Mechanics', type: 'ESC' },
      { code: 'BKSK206',  name: 'Kannada / Constitution of India', type: 'AEC' },
      { code: 'BCHESP207', name: 'Engineering Chemistry Lab', type: 'Lab' },
      { code: 'BEWSP208', name: 'Engineering Workshop Practice', type: 'Lab' },
      { code: 'BNSK259',  name: 'NSS / Physical Education / Yoga', type: 'MC' }
    ],
    electives: []
  },
  {
    num: 3, label: 'III Semester', credits: 20, color: '#854F0B', bg: '#FDF2DC',
    note: 'Core RAI stream begins — 20 credits',
    subjects: [
      { code: 'BRA301', name: 'Fundamentals of Robotics & Applications', type: 'PCC' },
      { code: 'BRA302', name: 'Strength of Materials for Robotic Systems', type: 'IPCC' },
      { code: 'BRA303', name: 'Analog & Digital Electronic Circuits', type: 'IPCC' },
      { code: 'BRA304', name: 'Manufacturing Methods for Robotic Components', type: 'PCC' },
      { code: 'BRAL305', name: 'Computer Aided Robotic System Drawing Lab', type: 'Lab' },
      { code: 'BRA306x', name: 'Engineering Science Course (ESC/ETC/PLC)', type: 'ESC' },
      { code: 'BSCK307', name: 'Social Connect & Responsibility', type: 'UHV' },
      { code: 'BRA358x', name: 'Ability Enhancement / Skill Enhancement Course III', type: 'AEC' },
      { code: 'BNSK359', name: 'NSS / Physical Education / Yoga', type: 'MC' }
    ],
    electives: [
      'BRA306A — Introduction to MATLAB & SIMULINK',
      'BRA306B — Data Structures & Applications',
      'BRA306C — Spreadsheet for Engineering',
      'BRA306D — Numerical Methods for Engineering',
      'BRA358A — Introduction to Python Programming',
      'BRA358B — Mobile Apps Development',
      'BRA358C — Virtual Reality App Development',
      'BRA358D — Introduction to CNC Programming'
    ]
  },
  {
    num: 4, label: 'IV Semester', credits: 20, color: '#993C1D', bg: '#FAECE7',
    note: 'Kinematics, Microcontrollers, AI/ML intro — 20 credits',
    subjects: [
      { code: 'BRA401', name: 'Virtual Instrumentation', type: 'PCC' },
      { code: 'BRA402', name: 'Microcontrollers for Robotics (incl. 32-bit)', type: 'IPCC' },
      { code: 'BRA403', name: 'Introduction to Robot Kinematics & Dynamics', type: 'IPCC' },
      { code: 'BRAL404', name: 'Robot Simulation and Programming Lab', type: 'Lab' },
      { code: 'BRA405x', name: 'Engineering Science Course (ESC/ETC/PLC)', type: 'ESC' },
      { code: 'BRA456x', name: 'Ability Enhancement / Skill Enhancement Course IV', type: 'AEC' },
      { code: 'BOK407',  name: 'Biology for Engineers', type: 'BSC' },
      { code: 'BUHK408', name: 'Universal Human Values', type: 'UHV' },
      { code: 'BNSK459', name: 'NSS / Physical Education / Yoga', type: 'MC' }
    ],
    electives: [
      'BRA405A — Introduction to AI & ML',
      'BRA405B — Application of Raspberry Pi Control',
      'BRA405C — Application to OCTAVE',
      'BRA405D — Application to Arduino Uno & Types',
      'BRA456A — Sensors & Actuators',
      'BRA456B — Smart Materials',
      'BRA456C — Fuzzy Logics for Robots',
      'BRA456D — Introduction to AGVS'
    ]
  },
  {
    num: 5, label: 'V Semester', credits: 22, color: '#3C3489', bg: '#EEEDFE',
    note: 'Machine Design, Measurement, Hydraulics, Mini Project — 22 credits',
    subjects: [
      { code: 'BRA501', name: 'Design of Machine Elements', type: 'PCC' },
      { code: 'BRA502', name: 'Measurement Systems', type: 'IPCC' },
      { code: 'BRA503', name: 'Electrical Machines & Power Systems', type: 'PCC' },
      { code: 'BRAL504', name: 'Hydraulics & Pneumatics for Robotics Lab', type: 'Lab' },
      { code: 'BRA515x', name: 'Professional Elective Course I (PEC)', type: 'PEC' },
      { code: 'BRA586',  name: 'Mini Project', type: 'PROJ' },
      { code: 'BRMK557', name: 'Research Methodology & IPR', type: 'AEC' },
      { code: 'BESK508', name: 'Environmental Studies', type: 'MC' },
      { code: 'BNSK559', name: 'NSS / Physical Education / Yoga', type: 'MC' }
    ],
    electives: [
      'BRA515A — Java Programming',
      'BRA515B — Micro Robots',
      'BRA515C — Image Processing for Robotics',
      'BRA515D — Wireless Networks & Sensors for Robots'
    ]
  },
  {
    num: 6, label: 'VI Semester', credits: 18, color: '#72243E', bg: '#FBEAF0',
    note: 'IoT, PLC/SCADA, Project Phase I — 18 credits',
    subjects: [
      { code: 'BRA601', name: 'Design Automation with IoT', type: 'IPCC' },
      { code: 'BRA602', name: 'PLC and SCADA', type: 'PCC' },
      { code: 'BRA613x', name: 'Professional Elective Course II (PEC)', type: 'PEC' },
      { code: 'BRA654x', name: 'Open Elective Course I (OEC)', type: 'OEC' },
      { code: 'BRA685',  name: 'Project Phase I', type: 'PROJ' },
      { code: 'BRAL606', name: 'Computer Aided Modeling & Analysis Lab', type: 'Lab' },
      { code: 'BRA657x', name: 'AEC / Skill Development Course V', type: 'AEC' },
      { code: 'BNSK658', name: 'NSS / Physical Education / Yoga', type: 'MC' }
    ],
    electives: [
      'BRA613A — Finite Element Method',
      'BRA613B — Humanoid Robots',
      'BRA613C — 3D Printing',
      'BRA613D — Thermal Engineering',
      'BRA654A — Automotive Electronics',
      'BRA654B — Computer Integrated Machining (CIM)',
      'BRA654C — Medical Robots',
      'BRA654D — Biomedical Applications of Robots',
      'BRA657A — Space Science Engineering & Applications',
      'BRA657B — Total Quality Management',
      'BRA657C — Micro Aerial Vehicle',
      'BRA657D — Advanced Embedded Systems'
    ]
  },
  {
    num: 7, label: 'VII Semester', credits: 24, color: '#3B6D11', bg: '#EAF3DE',
    note: 'Data Science, Industrial Networks, Agriculture Robots — 24 credits (Swappable with VIII)',
    subjects: [
      { code: 'BRA701', name: 'Data Science', type: 'IPCC' },
      { code: 'BRA702', name: 'Industrial Data Network', type: 'IPCC' },
      { code: 'BRA703', name: 'Robots for Agricultural Applications', type: 'PCC' },
      { code: 'BRA714x', name: 'Professional Elective Course III (PEC)', type: 'PEC' },
      { code: 'BRA755x', name: 'Open Elective Course II (OEC)', type: 'OEC' },
      { code: 'BRA786',  name: 'Major Project Phase II', type: 'PROJ' }
    ],
    electives: [
      'BRA714A — Cloud Manufacturing',
      'BRA714B — Rehabilitation of Robots',
      'BRA714C — Micro & Nano Robots',
      'BRA714D — Design of Robot & End Effectors',
      'BRA755A — Micro & Smart System Technology',
      'BRA755B — Industry 4.0',
      'BRA755C — Smart Sensors',
      'BRA755D — Non-Destructive Testing & Evaluation'
    ]
  },
  {
    num: 8, label: 'VIII Semester', credits: 16, color: '#A32D2D', bg: '#FCEBEB',
    note: 'Online Courses (NPTEL/MOOCs) + 14-20 Week Industry/Research Internship — 16 credits',
    subjects: [
      { code: 'BRA801x', name: 'Professional Elective — Online (NPTEL/MOOCs/MEMS)', type: 'PEC' },
      { code: 'BRA802x', name: 'Open Elective — Online (NPTEL/MOOCs/MEMS)', type: 'OEC' },
      { code: 'BRA803',  name: 'Industry / Research / Rural Internship (14–20 weeks)', type: 'INT' }
    ],
    electives: [
      'BRA801A — Modern Robotics: Mechanics, Planning & Control',
      'BRA801B — Aerial Robotics',
      'BRA801C — Robotics: Computational Motion Planning',
      'BRA801D — Robotics & Mechatronics',
      'BRA802A — Artificial Intelligence & ML in Business',
      'BRA802B — Introduction to Drones',
      'BRA802C — Robotics & the Geometry of Motion',
      'BRA802D — Understanding Robotics Architecture'
    ]
  }
];

const TEXTBOOKS = [
  { id:1,  title: 'Introduction to Robotics: Mechanics & Control', author: 'John J. Craig', edition: '3rd Ed.', sem: '3-4', field: 'Robotics', icon: '🤖', color: '#0A1628', driveUrl: '#' },
  { id:2,  title: 'Robot Modeling and Control', author: 'Spong, Hutchinson & Vidyasagar', edition: '1st Ed.', sem: '4-5', field: 'Robotics', icon: '🦾', color: '#142240', driveUrl: '#' },
  { id:3,  title: 'Robotics: Modelling, Planning & Control', author: 'Siciliano, Sciavicco, Villani, Oriolo', edition: '2009', sem: '5-6', field: 'Robotics', icon: '⚙️', color: '#1E3055', driveUrl: '#' },
  { id:4,  title: 'Modern Robotics: Mechanics, Planning & Control', author: 'Lynch & Park', edition: '2017', sem: '7-8', field: 'Robotics', icon: '🔬', color: '#0A1628', driveUrl: '#' },
  { id:5,  title: 'Modern Control Engineering', author: 'Katsuhiko Ogata', edition: '5th Ed.', sem: '4-5', field: 'Control', icon: '📊', color: '#185FA5', driveUrl: '#' },
  { id:6,  title: 'Control Systems Engineering', author: 'Norman S. Nise', edition: '7th Ed.', sem: '4', field: 'Control', icon: '🎛️', color: '#378ADD', driveUrl: '#' },
  { id:7,  title: 'Analog & Digital Electronics', author: 'U. A. Bakshi & A. P. Godse', edition: '2020', sem: '3', field: 'Electronics', icon: '⚡', color: '#993C1D', driveUrl: '#' },
  { id:8,  title: 'Microcontrollers: Architecture, Programming & Applications', author: 'Muhammad Ali Mazidi', edition: '2nd Ed.', sem: '4', field: 'Electronics', icon: '💾', color: '#D85A30', driveUrl: '#' },
  { id:9,  title: 'Embedded Systems: Architecture, Programming & Design', author: 'Raj Kamal', edition: '3rd Ed.', sem: '4', field: 'Electronics', icon: '🔌', color: '#993C1D', driveUrl: '#' },
  { id:10, title: 'Strength of Materials', author: 'R. K. Bansal', edition: '5th Ed.', sem: '3', field: 'Mechanical', icon: '🔩', color: '#854F0B', driveUrl: '#' },
  { id:11, title: 'Machine Design', author: 'Shigley, Mischke & Budynas', edition: '10th Ed.', sem: '5', field: 'Mechanical', icon: '🔧', color: '#BA7517', driveUrl: '#' },
  { id:12, title: 'Manufacturing Engineering & Technology', author: 'Kalpakjian & Schmid', edition: '7th Ed.', sem: '3', field: 'Mechanical', icon: '🏭', color: '#854F0B', driveUrl: '#' },
  { id:13, title: 'Programmable Logic Controllers', author: 'Frank D. Petruzella', edition: '5th Ed.', sem: '6', field: 'Automation', icon: '🖥️', color: '#3C3489', driveUrl: '#' },
  { id:14, title: 'SCADA: Supervisory Control & Data Acquisition', author: 'David Bailey & Edwin Wright', edition: '4th Ed.', sem: '6', field: 'Automation', icon: '📡', color: '#534AB7', driveUrl: '#' },
  { id:15, title: 'Internet of Things: A Hands-On Approach', author: 'Arshdeep Bahga & Vijay Madisetti', edition: '2014', sem: '6', field: 'Automation', icon: '🌐', color: '#3C3489', driveUrl: '#' },
  { id:16, title: 'Data Science from Scratch', author: 'Joel Grus', edition: '2nd Ed.', sem: '7', field: 'Data Science', icon: '📈', color: '#3B6D11', driveUrl: '#' },
  { id:17, title: 'Hands-On Machine Learning with Scikit-Learn & TensorFlow', author: 'Aurélien Géron', edition: '3rd Ed.', sem: '7', field: 'Data Science', icon: '🧠', color: '#639922', driveUrl: '#' },
  { id:18, title: 'Digital Image Processing', author: 'Rafael C. Gonzalez & Richard E. Woods', edition: '4th Ed.', sem: '5-6', field: 'AI / ML', icon: '🖼️', color: '#72243E', driveUrl: '#' },
  { id:19, title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', edition: '4th Ed.', sem: '4-7', field: 'AI / ML', icon: '🤖', color: '#0A1628', driveUrl: '#' },
  { id:20, title: 'Fluid Power Engineering', author: 'S. R. Majumdar', edition: '2002', sem: '5', field: 'Hydraulics', icon: '💧', color: '#185FA5', driveUrl: '#' },
  { id:21, title: 'Engineering Metrology & Measurements', author: 'N. V. Raghavendra & L. Krishnamurthy', edition: '2013', sem: '5', field: 'Measurement', icon: '📏', color: '#3B6D11', driveUrl: '#' },
  { id:22, title: 'Electrical Technology', author: 'B. L. Theraja & A. K. Theraja', edition: 'Vol I & II', sem: '5', field: 'Electrical', icon: '⚡', color: '#0C447C', driveUrl: '#' }
];

const NOTES = [
  { id:1,  icon:'🤖', title:'Fundamentals of Robotics & Applications', subject:'BRA301', sem:'3', driveUrl:'#', pages:85 },
  { id:2,  icon:'🔩', title:'Strength of Materials for Robotic Systems', subject:'BRA302', sem:'3', driveUrl:'#', pages:120 },
  { id:3,  icon:'⚡', title:'Analog & Digital Electronic Circuits', subject:'BRA303', sem:'3', driveUrl:'#', pages:95 },
  { id:4,  icon:'🏭', title:'Manufacturing Methods for Robotic Components', subject:'BRA304', sem:'3', driveUrl:'#', pages:70 },
  { id:5,  icon:'🎛️', title:'Virtual Instrumentation (LabVIEW)', subject:'BRA401', sem:'4', driveUrl:'#', pages:60 },
  { id:6,  icon:'💾', title:'Microcontrollers for Robotics (8-bit & 32-bit ARM)', subject:'BRA402', sem:'4', driveUrl:'#', pages:110 },
  { id:7,  icon:'🦾', title:'Robot Kinematics & Dynamics (D-H Parameters)', subject:'BRA403', sem:'4', driveUrl:'#', pages:130 },
  { id:8,  icon:'🔧', title:'Design of Machine Elements', subject:'BRA501', sem:'5', driveUrl:'#', pages:105 },
  { id:9,  icon:'📏', title:'Measurement Systems & Transducers', subject:'BRA502', sem:'5', driveUrl:'#', pages:80 },
  { id:10, icon:'⚡', title:'Electrical Machines & Power Systems', subject:'BRA503', sem:'5', driveUrl:'#', pages:95 },
  { id:11, icon:'💧', title:'Hydraulics & Pneumatics for Robotics', subject:'BRAL504', sem:'5', driveUrl:'#', pages:75 },
  { id:12, icon:'📡', title:'Design Automation with IoT', subject:'BRA601', sem:'6', driveUrl:'#', pages:90 },
  { id:13, icon:'🖥️', title:'PLC & SCADA Programming', subject:'BRA602', sem:'6', driveUrl:'#', pages:115 },
  { id:14, icon:'📊', title:'Data Science for Robotics Engineers', subject:'BRA701', sem:'7', driveUrl:'#', pages:140 },
  { id:15, icon:'🌐', title:'Industrial Data Networks & Communication', subject:'BRA702', sem:'7', driveUrl:'#', pages:85 },
  { id:16, icon:'🌾', title:'Robots for Agricultural Applications', subject:'BRA703', sem:'7', driveUrl:'#', pages:70 }
];

const COURSES = [
  {
    id: 1,
    title: 'Robot Kinematics Masterclass',
    meta: '6 weeks · 24 lessons · Beginner–Intermediate',
    tags: ['BRA403', 'IV Sem', 'Core'],
    color: '#0A1628', icon: '🦾',
    description: 'Master forward & inverse kinematics, D-H parameters, workspace analysis, and velocity kinematics. Includes 5 simulation labs.',
    lessons: [
      'Introduction to Robot Mechanisms',
      'Spatial Descriptions & Transformations',
      'Denavit-Hartenberg Parameters',
      'Forward Kinematics — PUMA 560 Example',
      'Inverse Kinematics: Geometric & Algebraic',
      'Velocity Kinematics & Jacobians',
      'Static Forces in Manipulators',
      'Dynamics: Newton-Euler Formulation'
    ],
    quiz: [
      { q: 'What does forward kinematics solve for?', opts: ['End-effector position from joint angles', 'Joint angles from end-effector position', 'Velocity of end-effector', 'Force at end-effector'], ans: 0 },
      { q: 'How many parameters define a D-H frame?', opts: ['2', '3', '4', '6'], ans: 2 },
      { q: 'The Jacobian matrix maps:', opts: ['Joint torques to forces', 'Joint velocities to end-effector velocities', 'Configuration space to task space positions', 'None of the above'], ans: 1 },
      { q: 'A 6-DOF robot has how many D-H frames?', opts: ['5', '6', '7', '8'], ans: 1 },
      { q: 'Inverse kinematics for a 6R robot is generally:', opts: ['Always unique', 'May have multiple solutions', 'Unsolvable', 'Only solvable numerically'], ans: 1 }
    ]
  },
  {
    id: 2,
    title: 'PLC & SCADA Fundamentals',
    meta: '4 weeks · 16 lessons · Beginner',
    tags: ['BRA602', 'VI Sem', 'Core'],
    color: '#3C3489', icon: '🖥️',
    description: 'Learn Ladder Logic, Function Block Diagrams, SCADA architecture, HMI design, and industrial communication protocols.',
    lessons: [
      'Introduction to PLCs & Industrial Automation',
      'PLC Hardware Architecture',
      'Ladder Logic Programming Basics',
      'Timers, Counters & Sequencers',
      'Function Block Diagram (FBD)',
      'Structured Text Programming',
      'SCADA Systems Overview',
      'HMI Design & OPC Communication'
    ],
    quiz: [
      { q: 'PLC stands for?', opts: ['Programmable Logic Controller', 'Processed Line Circuit', 'Programmed Linear Code', 'Power Logic Control'], ans: 0 },
      { q: 'Which programming language uses rungs with contacts and coils?', opts: ['Structured Text', 'Ladder Logic', 'Function Block Diagram', 'Sequential Function Chart'], ans: 1 },
      { q: 'SCADA stands for?', opts: ['Supervisory Control and Data Acquisition', 'System Control and Data Analysis', 'Supervisory Code And Data Access', 'Sensor Control And Data Acquisition'], ans: 0 },
      { q: 'In Ladder Logic, a normally open (NO) contact is active when:', opts: ['Bit is 0', 'Bit is 1', 'Power is off', 'Timer is running'], ans: 1 },
      { q: 'OPC in SCADA refers to:', opts: ['Open Process Control', 'OLE for Process Control', 'Output Process Command', 'Operational Protocol Communication'], ans: 1 }
    ]
  },
  {
    id: 3,
    title: 'Data Science for Robotics',
    meta: '5 weeks · 20 lessons · Intermediate',
    tags: ['BRA701', 'VII Sem', 'Core'],
    color: '#0D7A5F', icon: '📊',
    description: 'Python-based data science pipeline: data wrangling, visualization, ML algorithms, neural networks, and time-series for sensor data.',
    lessons: [
      'Python for Data Science — NumPy & Pandas',
      'Data Wrangling & Cleaning',
      'Exploratory Data Analysis',
      'Data Visualization — Matplotlib & Seaborn',
      'Machine Learning Fundamentals',
      'Supervised Learning: Regression & Classification',
      'Unsupervised Learning: Clustering',
      'Neural Networks & Deep Learning Basics',
      'Time-Series Analysis for Sensor Data',
      'ML Deployment for Robotics Applications'
    ],
    quiz: [
      { q: 'Which Python library is primarily used for data manipulation?', opts: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'], ans: 1 },
      { q: 'What is overfitting in ML?', opts: ['Model is too simple for the data', 'Model fits training data too well, poor on unseen data', 'Model has low variance', 'Model has high bias'], ans: 1 },
      { q: 'K-means clustering is a type of:', opts: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Semi-supervised learning'], ans: 1 },
      { q: 'What does train_test_split do?', opts: ['Trains and tests simultaneously', 'Divides dataset into training and testing subsets', 'Normalizes the data', 'Removes outliers'], ans: 1 },
      { q: 'ROC-AUC curve measures:', opts: ['Regression accuracy', 'Classification performance across thresholds', 'Clustering quality', 'Feature importance'], ans: 1 }
    ]
  },
  {
    id: 4,
    title: 'Microcontrollers & Embedded Systems',
    meta: '6 weeks · 22 lessons · Intermediate',
    tags: ['BRA402', 'IV Sem', 'Core'],
    color: '#993C1D', icon: '💾',
    description: 'Architecture and programming of 8-bit (8051) and 32-bit ARM Cortex-M microcontrollers, peripherals, RTOS basics, and robotics interfacing.',
    lessons: [
      '8051 Architecture & Memory Organization',
      'Assembly & C Programming for 8051',
      'Timers, Counters & Serial Communication (UART)',
      'Interrupts & Interrupt Service Routines',
      'ARM Cortex-M Architecture Overview',
      'GPIO, ADC & DAC on ARM',
      'I2C, SPI & CAN Communication',
      'PWM for Motor Control',
      'RTOS Concepts & FreeRTOS',
      'Sensor Interfacing for Robots'
    ],
    quiz: [
      { q: 'The 8051 has how many I/O ports?', opts: ['2', '3', '4', '8'], ans: 2 },
      { q: 'ARM Cortex-M is primarily used for?', opts: ['Desktop computing', 'Embedded real-time applications', 'Server workloads', 'AI training'], ans: 1 },
      { q: 'UART stands for?', opts: ['Universal Array Receiver-Transmitter', 'Universal Asynchronous Receiver-Transmitter', 'Unit Async Register Transfer', 'Unified Async Receive-Transmit'], ans: 1 },
      { q: 'PWM is used to control motor speed by varying:', opts: ['Voltage amplitude', 'Current amplitude', 'Duty cycle', 'Frequency only'], ans: 2 },
      { q: 'An ISR (Interrupt Service Routine) should be:', opts: ['Long and complex', 'Short and fast', 'Blocking', 'Always use delays'], ans: 1 }
    ]
  },
  {
    id: 5,
    title: 'IoT & Design Automation',
    meta: '4 weeks · 18 lessons · Intermediate',
    tags: ['BRA601', 'VI Sem', 'Core'],
    color: '#185FA5', icon: '📡',
    description: 'IoT architecture, MQTT protocol, cloud dashboards, sensor networks, digital twin concepts, and automation with Node-RED.',
    lessons: [
      'IoT Architecture: Perception, Network, Application',
      'Communication Protocols: MQTT, CoAP, HTTP',
      'Microcontroller to Cloud: ESP32 + AWS IoT',
      'Node-RED for Visual Automation',
      'Cloud Dashboards: ThingSpeak & Grafana',
      'Digital Twins Concept',
      'Industrial IoT (IIoT) Standards',
      'Security in IoT Systems'
    ],
    quiz: [
      { q: 'MQTT is primarily used for:', opts: ['File transfers', 'IoT messaging with low bandwidth', 'Video streaming', 'Database queries'], ans: 1 },
      { q: 'Which layer of IoT handles data analytics?', opts: ['Perception', 'Network', 'Application', 'Physical'], ans: 2 },
      { q: 'A digital twin is:', opts: ['A backup server', 'A virtual replica of a physical system', 'A type of sensor', 'A cloud database'], ans: 1 },
      { q: 'QoS in MQTT stands for:', opts: ['Query of Service', 'Quality of Service', 'Queue of Subscribers', 'Queue of Servers'], ans: 1 },
      { q: 'ESP32 is commonly used in IoT because it has built-in:', opts: ['Camera', 'Wi-Fi & Bluetooth', 'GPS', 'LTE modem'], ans: 1 }
    ]
  },
  {
    id: 6,
    title: 'Image Processing & Computer Vision',
    meta: '5 weeks · 20 lessons · Advanced',
    tags: ['BRA515C', 'V Sem', 'Elective'],
    color: '#72243E', icon: '🖼️',
    description: 'Classical image processing to deep learning-based vision: filtering, segmentation, feature extraction, object detection, and OpenCV.',
    lessons: [
      'Introduction to Digital Image Processing',
      'Image Representation & Color Spaces',
      'Spatial Domain Filtering',
      'Frequency Domain: Fourier Transform',
      'Edge Detection: Canny, Sobel, Laplacian',
      'Morphological Operations',
      'Image Segmentation: Thresholding & GrabCut',
      'Feature Descriptors: SIFT, SURF, ORB',
      'Object Detection: YOLO & SSD',
      'Stereo Vision & Depth Estimation'
    ],
    quiz: [
      { q: 'What does convolution do in image processing?', opts: ['Resize the image', 'Apply a filter to detect or enhance features', 'Change color space', 'Compress the image'], ans: 1 },
      { q: 'The Canny detector is used for:', opts: ['Color correction', 'Edge detection', 'Noise amplification', 'Image rotation'], ans: 1 },
      { q: 'RGB to Grayscale conversion uses:', opts: ['Max of R, G, B', 'Weighted average of R, G, B channels', 'Average of R and B only', 'Only the G channel'], ans: 1 },
      { q: 'YOLO stands for:', opts: ['You Only Look Once', 'Your Object Lookup Order', 'Yield Optimal Layer Output', 'None'], ans: 0 },
      { q: 'Morphological erosion typically:', opts: ['Expands bright regions', 'Shrinks bright regions', 'Adds noise', 'Sharpens edges'], ans: 1 }
    ]
  }
];

const TYPE_COLORS = {
  PCC: 'pill-navy', IPCC: 'pill-teal', Lab: 'pill-gray',
  ESC: 'pill-gold', AEC: 'pill-gray', UHV: 'pill-gray',
  BSC: 'pill-teal', MC: 'pill-gray', PEC: 'pill-teal',
  OEC: 'pill-gold', PROJ: 'pill-navy', INT: 'pill-navy'
};
