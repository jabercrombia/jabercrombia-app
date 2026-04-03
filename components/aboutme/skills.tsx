"use client"

import styles from '../styles/aboutme.module.scss';

const skillGroups = [
  {
    category: "Front-End",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML / CSS", "Tailwind CSS", "Shadcn/ui"],
  },
  {
    category: "Back-End",
    items: ["Node.js", "Express", "GraphQL", "RESTful APIs", "PostgreSQL"],
  },
  {
    category: "DevOps",
    items: ["AWS", "Docker", "CI/CD", "Git", "GitHub Actions"],
  },
  {
    category: "Testing",
    items: ["Selenium", "Cypress"],
  },
];

export default function Skills() {
  return (
    <div className={styles.skillsGrid}>
      {skillGroups.map((group) => (
        <div className={styles.skillGroup} key={group.category}>
          <h3>{group.category}</h3>
          <div className={styles.skillList}>
            {group.items.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
