// ==========================================
// DATA MATERI & KUIS (INTEGRASI DATA)
// File: data/quizData.js
// ==========================================

export const LEARNING_MATERIALS = [
  {
    id: 'hardware',
    title: 'Hardware (Perangkat Keras)',
    description: 'The physical components of a computer system that you can touch and see.',
    icon: 'Cpu',
    items: [
      {
        term: 'CPU (Central Processing Unit)',
        pronunciation: '/ˌsiː.piːˈjuː/',
        definition: 'The primary component of a computer that acts as its "brain." It performs calculations and executes instructions.',
        example: 'The CPU coordinates all activities inside the computer.',
        usage: 'The faster the CPU, the quicker the computer can process complex data.'
      },
      {
        term: 'Motherboard',
        pronunciation: '/ˈmʌð.ə.bɔːd/',
        definition: 'The main printed circuit board in a computer that connects all components together, including the CPU, RAM, and storage.',
        example: 'Make sure your RAM is compatible with the motherboard.',
        usage: 'Installing a high-quality motherboard ensures stability and future upgrade paths.'
      },
      {
        term: 'SSD (Solid State Drive)',
        pronunciation: '/ˌes.esˈdiː/',
        definition: 'A fast storage device that uses flash memory to store and retrieve data instantly, unlike older spinning hard drives.',
        example: 'Upgrading to an SSD will make your laptop boot up in seconds.',
        usage: 'SSDs are much quieter and more durable than traditional mechanical hard disk drives.'
      }
    ]
  },
  {
    id: 'software',
    title: 'Software (Perangkat Lunak)',
    description: 'The programs, applications, and operating systems that instruct the hardware on what to do.',
    icon: 'Layers',
    items: [
      {
        term: 'Operating System (OS)',
        pronunciation: '/ˈɒp.ər.eɪ.tɪŋ ˈsɪs.təm/',
        definition: 'The core software that manages the computer\'s memory and processes, as well as all of its hardware and other software.',
        example: 'Windows, macOS, and Linux are popular operating systems.',
        usage: 'An operating system acts as an intermediary between user applications and the hardware.'
      },
      {
        term: 'Device Driver',
        pronunciation: '/dɪˈvaɪs ˈdraɪ.vər/',
        definition: 'A specific type of software that allows the operating system to communicate effectively with hardware devices.',
        example: 'You need to update your graphics card driver for optimal gaming performance.',
        usage: 'Without the correct driver, the hardware component might not function at all.'
      },
      {
        term: 'Firmware',
        pronunciation: '/ˈfɜːm.weər/',
        definition: 'A specific class of computer software that provides the low-level control for a device\'s specific hardware.',
        example: 'The BIOS on your computer is a common example of firmware.',
        usage: 'Manufacturers occasionally release firmware updates to improve hardware stability and security.'
      }
    ]
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which component is widely known as the 'brain' of the computer, executing instructions and performing calculations?",
    options: [
      { text: "Solid State Drive (SSD)", isCorrect: false },
      { text: "Central Processing Unit (CPU)", isCorrect: true },
      { text: "Motherboard", isCorrect: false },
      { text: "Graphics Processing Unit (GPU)", isCorrect: false }
    ],
    difficulty: "Easy",
    points: 100,
    explanation: "The CPU coordinates and executes instructions, making it the principal 'brain' of any computer system."
  },
  {
    id: 2,
    question: "Complete this definition: '______ memory is temporary and volatile, meaning its content is lost when the power is turned off.'",
    options: [
      { text: "Read-Only Memory (ROM)", isCorrect: false },
      { text: "Solid State Drive (SSD)", isCorrect: false },
      { text: "Random Access Memory (RAM)", isCorrect: true },
      { text: "Hard Disk Drive (HDD)", isCorrect: false }
    ],
    difficulty: "Easy",
    points: 100,
    explanation: "RAM is volatile memory; it holds data temporarily while applications are running but loses everything when powered down."
  },
  {
    id: 3,
    question: "What primary technology makes an SSD significantly faster than a traditional HDD?",
    options: [
      { text: "Magnetic spinning platters", isCorrect: false },
      { text: "Optical laser reading", isCorrect: false },
      { text: "Flash-based semiconductor memory", isCorrect: true },
      { text: "Liquid cooling tubes", isCorrect: false }
    ],
    difficulty: "Medium",
    points: 150,
    explanation: "SSDs use flash memory with no moving parts, bypassing mechanical limitations and physical latency experienced by rotating HDDs."
  },
  {
    id: 4,
    question: "A client needs to connect external devices. Which term refers to physical, external auxiliary equipment like keyboards or printers?",
    options: [
      { text: "Firmware devices", isCorrect: false },
      { text: "Peripherals", isCorrect: true },
      { text: "Sub-processors", isCorrect: false },
      { text: "Integrated software", isCorrect: false }
    ],
    difficulty: "Easy",
    points: 100,
    explanation: "Peripherals are any external hardware units connected to a computer to supply input, output, or storage functionality."
  },
  {
    id: 5,
    question: "The low-level, permanent program embedded into a hardware device's ROM is known as...",
    options: [
      { text: "Application software", isCorrect: false },
      { text: "Operating system", isCorrect: false },
      { text: "Firmware", isCorrect: true },
      { text: "Defragmenter", isCorrect: false }
    ],
    difficulty: "Medium",
    points: 150,
    explanation: "Firmware provides the essential, low-level control code embedded directly on physical microchips, like the computer's BIOS."
  },
  {
    id: 6,
    question: "Which software translator reads high-level developer code and converts the entire source code into a single machine code binary before execution?",
    options: [
      { text: "Compiler", isCorrect: true },
      { text: "Interpreter", isCorrect: false },
      { text: "Operating System", isCorrect: false },
      { text: "API", isCorrect: false }
    ],
    difficulty: "Hard",
    points: 200,
    explanation: "A compiler translates the entire high-level code program at once into machine code, creating an executable file ready to run directly."
  },
  {
    id: 7,
    question: "What does the abbreviation 'OS' stand for in a software context?",
    options: [
      { text: "Open Source", isCorrect: false },
      { text: "Output System", isCorrect: false },
      { text: "Operating System", isCorrect: true },
      { text: "Operational Software", isCorrect: false }
    ],
    difficulty: "Easy",
    points: 100,
    explanation: "OS stands for Operating System, which is the foundational system software controlling hardware resources and user applications."
  },
  {
    id: 8,
    question: "A system administrator says: 'We need to upgrade our PSU.' What is the primary role of a PSU?",
    options: [
      { text: "To store database security tables", isCorrect: false },
      { text: "To convert electrical current from AC to DC", isCorrect: true },
      { text: "To sync wireless computer accessories", isCorrect: false },
      { text: "To coordinate graphics card clock speed", isCorrect: false }
    ],
    difficulty: "Medium",
    points: 150,
    explanation: "The PSU (Power Supply Unit) converts the Alternating Current (AC) from the wall socket into usable Direct Current (DC) for computer components."
  },
  {
    id: 9,
    question: "What software translates generic operating system commands into specific hardware signals for a new printer?",
    options: [
      { text: "Device Driver", isCorrect: true },
      { text: "System BIOS", isCorrect: false },
      { text: "Web Compiler", isCorrect: false },
      { text: "Hypervisor", isCorrect: false }
    ],
    difficulty: "Easy",
    points: 100,
    explanation: "A Device Driver is specialized software that enables the Operating System to communicate with and control specific external hardware."
  },
  {
    id: 10,
    question: "Which option lists only output devices?",
    options: [
      { text: "Keyboard, Mouse, Scanner", isCorrect: false },
      { text: "Monitor, Printer, Speakers", isCorrect: true },
      { text: "Hard Drive, SSD, RAM", isCorrect: false },
      { text: "Microphone, CPU, Stylus", isCorrect: false }
    ],
    difficulty: "Easy",
    points: 100,
    explanation: "Monitors (displays visual signals), printers (creates physical copies), and speakers (outputs sound) are all output peripherals."
  },
  {
    id: 11,
    question: "What specialized processor is optimized for manipulating computer graphics, rendering video, and parallel math processing?",
    options: [
      { text: "Central Processing Unit (CPU)", isCorrect: false },
      { text: "Network Interface Card (NIC)", isCorrect: false },
      { text: "Graphics Processing Unit (GPU)", isCorrect: true },
      { text: "Sound Card", isCorrect: false }
    ],
    difficulty: "Medium",
    points: 150,
    explanation: "The GPU (Graphics Processing Unit) is uniquely engineered to perform highly parallelized mathematical computations for rendering visuals."
  },
  {
    id: 12,
    question: "What does 'Volatile Memory' mean in the context of computer hardware?",
    options: [
      { text: "The memory is prone to explode under high load.", isCorrect: false },
      { text: "The stored data is permanently retained even without power.", isCorrect: false },
      { text: "The stored data is instantly erased once electric power is lost.", isCorrect: true },
      { text: "The memory has an adjustable storage layout.", isCorrect: false }
    ],
    difficulty: "Hard",
    points: 200,
    explanation: "Volatile memory, such as RAM, requires constant electrical power to maintain its stored state. When power shuts off, data is cleared."
  },
  {
    id: 13,
    question: "Which of the following describes proprietary software?",
    options: [
      { text: "Software with source code open for public alteration.", isCorrect: false },
      { text: "Software licensed under restricted intellectual property rights.", isCorrect: true },
      { text: "Free software with absolutely no copyright conditions.", isCorrect: false },
      { text: "Software developed solely to overclock system memory.", isCorrect: false }
    ],
    difficulty: "Medium",
    points: 150,
    explanation: "Proprietary software is privately owned and licensed under restricted terms, meaning users cannot freely modify or view its code."
  },
  {
    id: 14,
    question: "What is an API designed to do in modern software development?",
    options: [
      { text: "To clean the processor core from physical dust.", isCorrect: false },
      { text: "To let two separate software applications talk and share data.", isCorrect: true },
      { text: "To compile low-level firmware binary files.", isCorrect: false },
      { text: "To physically convert liquid cooling to air cooling.", isCorrect: false }
    ],
    difficulty: "Hard",
    points: 200,
    explanation: "An API (Application Programming Interface) is a set of defined rules that lets distinct software programs connect and exchange info seamlessly."
  },
  {
    id: 15,
    question: "Which board coordinates physical components and provides the power lines and data lanes between CPU, RAM, and PCIe devices?",
    options: [
      { text: "Sound Card", isCorrect: false },
      { text: "Motherboard", isCorrect: true },
      { text: "PSU modular cables", isCorrect: false },
      { text: "External dock", isCorrect: false }
    ],
    difficulty: "Easy",
    points: 100,
    explanation: "The motherboard is the primary printed circuit board that acts as the hub connecting all system components."
  },
  {
    id: 16,
    question: "What category of software is designed to harm, disrupt, or exploit computers and networks?",
    options: [
      { text: "Ad-hoc drivers", isCorrect: false },
      { text: "Firmware updates", isCorrect: false },
      { text: "Malware", isCorrect: true },
      { text: "Freeware libraries", isCorrect: false }
    ],
    difficulty: "Easy",
    points: 100,
    explanation: "Malware, short for malicious software, is any program designed with the intent of compromising or damaging hosts or servers."
  },
  {
    id: 17,
    question: "What does the term 'GUI' stand for in software UI design?",
    options: [
      { text: "General User Integration", isCorrect: false },
      { text: "Graphical User Interface", isCorrect: true },
      { text: "Graphics Unified Interface", isCorrect: false },
      { text: "Grand Utility Installer", isCorrect: false }
    ],
    difficulty: "Easy",
    points: 100,
    explanation: "GUI stands for Graphical User Interface, which allows users to interact with software through visual elements like icons and windows."
  },
  {
    id: 18,
    question: "Which program is a great example of an IDE (Integrated Development Environment)?",
    options: [
      { text: "VS Code / Visual Studio", isCorrect: true },
      { text: "Windows Media Player", isCorrect: false },
      { text: "Google Chrome browser", isCorrect: false },
      { text: "BIOS firmware menu", isCorrect: false }
    ],
    difficulty: "Easy",
    points: 100,
    explanation: "VS Code is an IDE designed specifically to provide coders with integrated tools like compilers, syntax highlighting, and debuggers."
  },
  {
    id: 19,
    question: "If you run software inside an isolated, simulated software-driven hardware environment, you are running a...",
    options: [
      { text: "Virtual Machine (VM)", isCorrect: true },
      { text: "Physical RAM partition", isCorrect: false },
      { text: "Firmware ROM bios", isCorrect: false },
      { text: "Direct Driver peripheral", isCorrect: false }
    ],
    difficulty: "Medium",
    points: 150,
    explanation: "A Virtual Machine (VM) mimics a separate, physical computer system entirely in software, isolated from the host machine's system."
  },
  {
    id: 20,
    question: "What utility processes fragmentations on standard HDDs to align pieces of files sequentially, boosting speed?",
    options: [
      { text: "Defragmenter", isCorrect: true },
      { text: "Compiler software", isCorrect: false },
      { text: "Firmware flasher", isCorrect: false },
      { text: "API router", isCorrect: false }
    ],
    difficulty: "Medium",
    points: 150,
    explanation: "Defragmentation reorganizes data stored on hard disks so file segments lie sequentially, improving mechanical retrieval speeds."
  }
];