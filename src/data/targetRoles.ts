import { TargetRole } from '../types';

export const TARGET_ROLES: TargetRole[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Engineering',
    icon: 'Code2',
    description: 'Generalist software engineering role covering data structures, algorithms, system design, and software lifecycle.',
    keySkills: ['Data Structures', 'Algorithms', 'System Design', 'Git', 'OOP', 'REST APIs', 'Unit Testing', 'CI/CD'],
    softSkills: ['Problem Solving', 'Team Collaboration', 'Code Review', 'Technical Communication']
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Engineering',
    icon: 'Layout',
    description: 'Specialized in building performant, accessible, and responsive user interfaces and modern web apps.',
    keySkills: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5/CSS3', 'Tailwind CSS', 'Redux / Zustand', 'Next.js', 'Web Performance'],
    softSkills: ['UI/UX Empathy', 'Attention to Detail', 'Cross-browser Debugging', 'Agile / Scrum']
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    category: 'Engineering',
    icon: 'Server',
    description: 'Focuses on server-side architecture, APIs, database design, scalability, microservices, and security.',
    keySkills: ['Node.js / Express', 'Python / Django', 'Java / Spring Boot', 'PostgreSQL / SQL', 'MongoDB', 'Redis', 'Docker', 'GraphQL / REST'],
    softSkills: ['Analytical Thinking', 'Systemic Planning', 'Security Awareness', 'Troubleshooting']
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'Engineering',
    icon: 'Layers',
    description: 'Handles end-to-end web software development, bridging frontend UX with backend services and infrastructure.',
    keySkills: ['React / Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'REST / GraphQL APIs', 'AWS / Cloud Run', 'Git'],
    softSkills: ['End-to-End Ownership', 'Adaptability', 'Project Management', 'Agile Execution']
  },
  {
    id: 'mobile-app-developer',
    title: 'Mobile App Developer',
    category: 'Engineering',
    icon: 'Smartphone',
    description: 'Builds native or cross-platform mobile experiences for iOS and Android platforms.',
    keySkills: ['React Native', 'Flutter', 'Swift / iOS', 'Kotlin / Android', 'Mobile UI Guidelines', 'App Store Deployment', 'Offline Storage', 'REST APIs'],
    softSkills: ['User Feedback Integration', 'Performance Tuning', 'Device Compatibility Mindset']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data',
    icon: 'BarChart3',
    description: 'Analyzes raw data sets to produce actionable business intelligence, dashboards, and statistical reports.',
    keySkills: ['SQL', 'Python (Pandas, NumPy)', 'Tableau / PowerBI', 'Excel / Spreadsheets', 'Statistical Modeling', 'A/B Testing', 'ETL Pipelines'],
    softSkills: ['Business Acumen', 'Data Storytelling', 'Critical Thinking', 'Stakeholder Management']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data',
    icon: 'BrainCircuit',
    description: 'Applies statistical methods, predictive modeling, machine learning, and data mining to solve complex challenges.',
    keySkills: ['Python', 'R', 'Scikit-Learn', 'SQL', 'Deep Learning (PyTorch/TensorFlow)', 'Feature Engineering', 'Hypothesis Testing', 'Big Data (Spark)'],
    softSkills: ['Research Rigor', 'Curiosity', 'Translating Complex Math to Business Strategy']
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design',
    icon: 'Palette',
    description: 'Creates user journeys, wireframes, high-fidelity UI prototypes, and design systems focused on user satisfaction.',
    keySkills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing', 'Information Architecture', 'Micro-interactions'],
    softSkills: ['Empathy', 'Visual Communication', 'User Advocacy', 'Design Critique Facilitation']
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Operations',
    icon: 'Terminal',
    description: 'Automates deployment pipelines, cloud infrastructure, container orchestration, and system monitoring.',
    keySkills: ['Docker', 'Kubernetes', 'AWS / GCP / Azure', 'Terraform', 'CI/CD (GitHub Actions / Jenkins)', 'Linux Administration', 'Prometheus / Grafana', 'Bash / Python'],
    softSkills: ['Incident Management', 'Automation First Mindset', 'Reliability Engineering']
  },
  {
    id: 'cybersecurity-engineer',
    title: 'Cybersecurity Engineer',
    category: 'Operations',
    icon: 'ShieldCheck',
    description: 'Protects systems, networks, and data by implementing security measures, audits, and penetration testing.',
    keySkills: ['Network Security', 'Penetration Testing', 'SIEM / Log Analysis', 'Cryptography', 'Identity & Access Management (IAM)', 'Vulnerability Assessment', 'Python / Bash', 'OWASP Top 10'],
    softSkills: ['Vigilance', 'Ethical Mindset', 'Risk Communication', 'Crisis Response']
  },
  {
    id: 'machine-learning-engineer',
    title: 'Machine Learning Engineer',
    category: 'Data',
    icon: 'Cpu',
    description: 'Designs, builds, and deploys production machine learning models and AI pipelines at scale.',
    keySkills: ['Python', 'PyTorch / TensorFlow', 'MLOps (MLflow, Kubeflow)', 'Model Deployment (FastAPI, ONNX)', 'LLMs & GenAI', 'Vector Databases', 'Data Pipelines', 'GPU Optimization'],
    softSkills: ['Experimental Mindset', 'Scalability Focus', 'Continuous Learning']
  }
];
