// Personal Information Constants
export const PERSONAL_INFO = {
    // Basic Info
    name: "Muhammad Aashir ul Haque",
    firstName: "Muhammad Aashir Ul",
    lastName: "Haque",
    displayName: "M.Aashir",
    title: "Senior Backend Engineer",

    // Contact Details
    email: "aashirulhaque@gmail.com",
    phone: "+1 (630) 945-2396",
    location: "Glen Ellyn, IL, USA",
    timezone: "America/Chicago", // Central Time

    // Professional Summary
    experience: "6+ years",
    usersServed: "20M+",
    description:
        "Senior Backend Engineer building scalable, cloud-native systems for 20M+ users. Laravel, Node.js, FastAPI, and AWS expert specializing in high-performance solutions.",

    // Social Links
    social: {
        github: "https://github.com/aashirhaq",
        linkedin: "https://www.linkedin.com/in/aashirhaq",
        stackoverflow: "https://stackoverflow.com/users/7940641/aashir-haque",
        email: "mailto:aashirulhaque@gmail.com",
        phone: "tel:+16309452396",
    },

    // Website & SEO
    website: {
        url: "https://aashirhaq.github.io",
        domain: "aashirhaq.github.io",
        title: "Muhammad Aashir ul Haque | Senior Backend Engineer",
        description:
            "6+ years experience building scalable systems for 20M+ users. Laravel, Node.js, FastAPI, AWS expert specializing in high-performance backend solutions.",
        keywords:
            "senior backend engineer, Laravel, Node.js, FastAPI, Python, AWS, PHP, scalable systems, API development, pytest, Muhammad Aashir ul Haque",
    },

    // Resume
    resume: {
        filename: "Aashir_Haque_Resume.pdf",
        path: "/downloads/Aashir_Haque_Resume.pdf",
    },

    // Images
    images: {
        profile: "/images/profile.jpg",
        socialPreview: "/images/social-preview.jpg",
        cover: "/images/cover.jpg",
    },

    // Analytics
    analytics: {
        googleAnalyticsId: "G-PWEQ5RJ569",
    },

    // Current Work Status
    currentWork: {
        company: "Golootlo - DECAGON PAKISTAN PVT. LTD.",
        position: "Senior Software Engineer",
        // type: "Part-time Remote",
        type: "Full-time",
        startDate: "Jul 2019",
        // currentStatus: "Present (Part-time Remote since Jul 2025)",
        currentStatus: "Present",
        // location: "Glen Ellyn, IL, USA (Remote)",
        location: "Glen Ellyn, IL, USA",
    },
} as const

// Tech Stack
export const TECH_STACK = {
    primary: ["Laravel", "PHP", "FastAPI", "Python", "MySQL", "MongoDB", "Node.js", "AWS"],
    languages: ["PHP", "Python", "JavaScript", "TypeScript", "SQL", "C#"],
    frameworks: ["Laravel", "FastAPI", "Node.js", "Express.js", "NestJS", "Next.js"],
    databases: ["MySQL", "MongoDB", "Redis", "Elasticsearch", "Firebase"],
    cloud: ["AWS", "Docker"],
    testing: ["pytest", "PHPUnit", "Jest", "Selenium"],
} as const

// Education & Certifications
export const EDUCATION = {
  degrees: [
    {
      degree: "MS in Computer Science and Information Technology",
      school: "NED University of Engineering and Technology",
      location: "Karachi, Pakistan",
      period: "2021 – 2022",
      description: "Advanced studies in computer science with focus on software engineering and system architecture.",
      achievements: ["Specialized in Backend Systems", "Advanced Database Management", "Cloud Computing"],
    },
    {
      degree: "BS in Computer Science",
      school: "University of Karachi",
      location: "Karachi, Pakistan",
      period: "2015 – 2018",
      description:
        "Comprehensive computer science education with strong foundation in programming and software development.",
      achievements: ["Software Development", "Database Systems", "Web Technologies"],
    },
  ],
  certifications: [
    // {
    //   name: "AWS Certified Solutions Architect",
    //   issuer: "Amazon Web Services",
    //   year: "2023",
    //   type: "Professional Certification",
    // },
    // {
    //   name: "Google Cloud Professional Developer",
    //   issuer: "Google Cloud",
    //   year: "2022",
    //   type: "Professional Certification",
    // },
    // {
    //   name: "MongoDB Certified Developer",
    //   issuer: "MongoDB Inc.",
    //   year: "2021",
    //   type: "Professional Certification",
    // },
  ],
  courses: [
    {
      name: "FastAPI - From Beginner to Advanced",
      platform: "Udemy",
      year: "2025",
      description:
        "Comprehensive course covering FastAPI framework development with advanced features and unit testing using pytest.",
      skills: ["FastAPI", "Python", "pytest", "pydantic", "API Development", "Unit Testing", "Async Programming"],
      type: "Online Course",
    },
  ],
} as const

// Contact Form
export const CONTACT_FORM = {
    formspreeEndpoint: "https://formspree.io/f/mnnvgrdd",
    subjects: {
        default: "New contact form submission from portfolio",
    },
} as const

// Navigation Items
export const NAVIGATION_ITEMS = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
] as const
