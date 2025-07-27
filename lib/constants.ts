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
        "Senior Backend Engineer building scalable, cloud-native systems for 20M+ users. Laravel, Node.js, and AWS expert specializing in high-performance solutions.",

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
            "6+ years experience building scalable systems for 20M+ users. Laravel, Node.js, AWS expert specializing in high-performance backend solutions.",
        keywords:
            "senior backend engineer, Laravel, Node.js, AWS, PHP, scalable systems, API development, Muhammad Aashir ul Haque",
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
    primary: ["Laravel", "PHP", "MySQL", "MongoDB", "Node.js", "AWS"],
    languages: ["PHP", "JavaScript", "TypeScript", "SQL", "C#"],
    frameworks: ["Laravel", "Node.js", "Express.js", "NestJS", "Next.js"],
    databases: ["MySQL", "MongoDB", "Redis", "Elasticsearch", "Firebase"],
    cloud: ["AWS", "Docker"],
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
