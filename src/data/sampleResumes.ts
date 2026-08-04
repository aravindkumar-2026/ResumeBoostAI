export interface SampleResume {
  id: string;
  roleId: string;
  roleTitle: string;
  name: string;
  filename: string;
  content: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'sample-swe',
    roleId: 'software-engineer',
    roleTitle: 'Software Engineer',
    name: 'Alex Johnson',
    filename: 'Alex_Johnson_SWE_Resume.pdf',
    content: `ALEX JOHNSON
San Francisco, CA | (555) 019-2834 | alex.johnson@email.com | linkedin.com/in/alexjohnson-dev | github.com/alexjohnson-dev

OBJECTIVE
Motivated Computer Science graduate seeking a Full Time Software Engineer position. Passionate about building scalable cloud apps, efficient algorithms, and responsive user experiences.

EDUCATION
University of California, Berkeley — B.S. in Computer Science
Graduated May 2025 | GPA: 3.8 / 4.0
Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Systems, Computer Networks, Software Engineering Principles, Machine Learning.

TECHNICAL SKILLS
- Programming Languages: JavaScript, TypeScript, Python, Java, C++, SQL, HTML/CSS
- Frameworks & Libraries: React, Node.js, Express, Next.js, Tailwind CSS, Jest
- Tools & Databases: Git, GitHub, Docker, PostgreSQL, MongoDB, Redis, AWS (S3, EC2), REST APIs

EXPERIENCE
Software Engineer Intern | TechScale Inc., San Francisco, CA
June 2024 – August 2024
- Engineered a high-throughput RESTful microservice in Node.js & Express, reducing API latency by 32% for over 50,000 active daily users.
- Optimized PostgreSQL database queries with indexed joins and caching via Redis, cutting response times from 450ms to 95ms.
- Collaborated with a cross-functional team of 6 engineers using Agile/Scrum methodologies, participating in daily standups and sprint planning.
- Wrote automated unit tests with Jest and integration tests achieving 88% code coverage.

Undergraduate Teaching Assistant | UC Berkeley EECS Department
January 2024 – May 2024
- Held office hours for 120+ students in Data Structures and Algorithms, assisting with debugging C++ and Python assignments.
- Graded assignments and exams while leading weekly lab discussion sections.

PROJECTS
TaskCraft - Real-Time Collaborative Task Management App (TypeScript, React, Node.js, Socket.io, MongoDB)
- Built a web application supporting multi-user live task updates, drag-and-drop boards, and role-based permissions.
- Implemented real-time WebSockets synchronization supporting 100+ concurrent user sessions without state conflicts.
- Deployed on AWS Elastic Beanstalk with GitHub Actions CI/CD pipeline for automated testing and deployment.

CodeQuery - AI Powered Code Search & Documentation Engine (Python, FastAPI, OpenAI API, Vector DB)
- Created an open-source tool parsing code repositories to generate semantic embeddings stored in ChromaDB.
- Reduced manual documentation search time for developers by an estimated 40%.

CERTIFICATIONS & HONORS
- AWS Certified Cloud Practitioner (2024)
- UC Berkeley Dean's Honor List (4 semesters)
- Hackathon 1st Place Winner - CalHacks 2024
`
  },
  {
    id: 'sample-frontend',
    roleId: 'frontend-developer',
    roleTitle: 'Frontend Developer',
    name: 'Maya Patel',
    filename: 'Maya_Patel_Frontend_Resume.pdf',
    content: `MAYA PATEL
Seattle, WA | maya.patel@webdev.io | github.com/mayapatel-ui | linkedin.com/in/mayapatel-frontend

SUMMARY
Creative Frontend Developer with 2+ years of experience crafting accessible, responsive, and high-performance web applications using React, TypeScript, and modern CSS frameworks.

SKILLS
- Core: React, TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS
- Libraries & Tools: Next.js, Redux Toolkit, Tailwind CSS, Framer Motion, Vite, Webpack, Web Vitals, Cypress, Jest
- UI/UX & Workflow: Figma, Responsive Web Design, WCAG 2.1 Accessibility, Git, GitHub Actions

WORK EXPERIENCE
Frontend Developer Intern | CraftUI Studios, Seattle, WA
Jan 2024 – Present
- Rebuilt company core SaaS dashboard UI using React 18, TypeScript, and Tailwind CSS, improving Lighthouse performance score from 62 to 94.
- Implemented accessible UI components following WCAG 2.1 AA standards, ensuring complete keyboard navigation and screen reader compatibility.
- Decreased initial bundle payload size by 28% through code splitting, dynamic imports, and image lazy loading.

Web Development Freelancer | Self-Employed
May 2023 – Dec 2023
- Designed and built 5+ custom web applications for small businesses utilizing React and Tailwind CSS.

EDUCATION
University of Washington — B.S. in Human-Computer Interaction & Informatics
Sept 2021 – May 2025
`
  },
  {
    id: 'sample-data',
    roleId: 'data-analyst',
    roleTitle: 'Data Analyst',
    name: 'David Chen',
    filename: 'David_Chen_DataAnalyst_Resume.pdf',
    content: `DAVID CHEN
New York, NY | d.chen@data.org | linkedin.com/in/davidchen-data

SUMMARY
Detail-oriented Data Analyst with expertise in SQL, Python, Tableau, and financial metrics. Experienced in turning complex datasets into executive dashboards.

SKILLS
- Data Analysis: SQL (PostgreSQL, MySQL), Python (Pandas, NumPy, Matplotlib, Seaborn), R
- Visualization: Tableau, Power BI, Excel (Pivot Tables, VLOOKUP, VBA)
- Concepts: A/B Testing, ETL, Regression Analysis, Statistical Hypothesis Testing, Business Metrics

EXPERIENCE
Data Analyst Intern | FinTech Solutions, New York, NY
June 2024 – Dec 2024
- Built interactive Tableau dashboards monitoring daily transactional volume ($5M+ daily), providing executives with real-time churn metrics.
- Automated weekly financial reporting workflows using Python scripts and SQL queries, saving 8 hours of manual labor per week.
- Performed statistical A/B testing on user checkout flows, helping boost conversion rates by 4.2%.

EDUCATION
New York University (NYU) — B.S. in Applied Statistics & Economics
Graduated May 2025
`
  }
];
