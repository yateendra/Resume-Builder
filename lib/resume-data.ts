export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  linkedIn: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  courses: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiration: string;
  credentialId: string;
  url: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    linkedIn: "linkedin.com/in/johndoe",
    website: "johndoe.com",
    summary: "Experienced software engineer with a passion for creating user-friendly applications and solving complex problems."
  },
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "",
      current: true,
      description: "Lead developer for client-facing web applications",
      achievements: [
        "Implemented new features that increased user engagement by 35%",
        "Reduced page load time by 45% through code optimization",
        "Mentored junior developers and led code reviews"
      ]
    },
    {
      id: "exp2",
      company: "Web Innovators",
      position: "Software Engineer",
      location: "Oakland, CA",
      startDate: "2017-06",
      endDate: "2019-12",
      current: false,
      description: "Developed responsive web applications using React and Node.js",
      achievements: [
        "Created RESTful APIs for mobile and web applications",
        "Improved test coverage from 65% to 92%",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ]
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2013-09",
      endDate: "2017-05",
      current: false,
      gpa: "3.8",
      courses: [
        "Data Structures",
        "Algorithms",
        "Database Systems",
        "Web Development"
      ]
    }
  ],
  skills: [
    { id: "skill1", name: "JavaScript", level: 5, category: "Programming Languages" },
    { id: "skill2", name: "React", level: 5, category: "Frameworks" },
    { id: "skill3", name: "Node.js", level: 4, category: "Frameworks" },
    { id: "skill4", name: "TypeScript", level: 4, category: "Programming Languages" },
    { id: "skill5", name: "SQL", level: 3, category: "Databases" },
    { id: "skill6", name: "Git", level: 4, category: "Tools" }
  ],
  projects: [
    {
      id: "proj1",
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Redux"],
      link: "github.com/johndoe/ecommerce",
      startDate: "2019-03",
      endDate: "2019-06"
    },
    {
      id: "proj2",
      title: "Task Management App",
      description: "Developed a task management application with drag-and-drop functionality",
      technologies: ["React", "TypeScript", "Material UI", "Firebase"],
      link: "github.com/johndoe/taskmanager",
      startDate: "2018-10",
      endDate: "2018-12"
    }
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2021-06",
      expiration: "2024-06",
      credentialId: "AWS-123456",
      url: "aws.amazon.com/certification"
    },
    {
      id: "cert2",
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2020-03",
      expiration: "",
      credentialId: "PSM-123456",
      url: "scrum.org/certification"
    }
  ]
};