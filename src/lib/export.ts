import html2pdf from "html2pdf.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ResumeData, ResumeSettings, PortfolioSettings } from "@/types/resume";

// Generate PDF from resume element
export const downloadResumePDF = async (
  elementId: string,
  filename: string = "resume.pdf"
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Resume element not found");
  }

  const opt = {
    margin: 0,
    filename,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: {
      unit: "mm" as const,
      format: "a4" as const,
      orientation: "portrait" as const,
    },
  };

  await html2pdf().set(opt).from(element).save();
};

// Generate portfolio HTML
const generatePortfolioHTML = (
  data: ResumeData,
  settings: PortfolioSettings
): string => {
  const {
    personalInfo,
    professionalSummary,
    skills,
    experience,
    projects,
    education,
    achievements,
  } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${personalInfo.title} - ${
    personalInfo.fullName
  }'s Portfolio">
  <title>${personalInfo.fullName} | ${personalInfo.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${settings.primaryColor};
      --accent: ${settings.accentColor};
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1e293b; }
    
    /* Hero Section */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary), ${
        settings.primaryColor
      }dd);
      color: white;
      text-align: center;
      padding: 2rem;
    }
    .hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; margin-bottom: 0.5rem; }
    .hero p { font-size: 1.25rem; opacity: 0.9; margin-bottom: 2rem; }
    .hero-links { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .hero-links a {
      padding: 0.75rem 1.5rem;
      background: white;
      color: var(--primary);
      text-decoration: none;
      border-radius: 0.5rem;
      font-weight: 500;
      transition: transform 0.2s;
    }
    .hero-links a:hover { transform: translateY(-2px); }
    
    /* Sections */
    section { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
    section:nth-child(even) { background: #f8fafc; }
    .section-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
      position: relative;
      display: inline-block;
    }
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 4px;
      background: var(--primary);
      border-radius: 2px;
    }
    
    /* About */
    .about-content { font-size: 1.1rem; color: #475569; max-width: 800px; }
    
    /* Skills */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    .skill-card {
      padding: 1rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .skill-name { font-weight: 600; margin-bottom: 0.5rem; }
    .skill-bar { height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden; }
    .skill-progress { height: 100%; background: var(--primary); transition: width 0.3s; }
    
    /* Experience & Education */
    .timeline { position: relative; padding-left: 2rem; }
    .timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #e2e8f0;
    }
    .timeline-item { position: relative; margin-bottom: 2rem; }
    .timeline-item::before {
      content: '';
      position: absolute;
      left: -2rem;
      top: 0.5rem;
      width: 10px;
      height: 10px;
      background: var(--primary);
      border-radius: 50%;
      margin-left: -4px;
    }
    .timeline-title { font-weight: 600; font-size: 1.1rem; }
    .timeline-subtitle { color: var(--primary); font-weight: 500; }
    .timeline-date { color: #94a3b8; font-size: 0.875rem; }
    .timeline-desc { color: #64748b; margin-top: 0.5rem; }
    
    /* Projects */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .project-card {
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .project-card:hover { transform: translateY(-4px); box-shadow: 0 8px 12px rgba(0,0,0,0.1); }
    .project-content { padding: 1.25rem; }
    .project-title { font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem; }
    .project-desc { color: #64748b; font-size: 0.9rem; margin-bottom: 1rem; }
    .project-tech { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tech-tag {
      padding: 0.25rem 0.5rem;
      background: #f1f5f9;
      color: var(--primary);
      font-size: 0.75rem;
      border-radius: 0.25rem;
    }
    .project-links { display: flex; gap: 1rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; }
    .project-links a { color: var(--primary); text-decoration: none; font-size: 0.875rem; font-weight: 500; }
    
    /* Contact */
    .contact-section { background: linear-gradient(135deg, var(--primary), ${
      settings.primaryColor
    }dd); color: white; text-align: center; }
    .contact-section .section-title { color: white; }
    .contact-section .section-title::after { background: white; }
    .contact-info { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-top: 2rem; }
    .contact-item a { color: white; text-decoration: none; opacity: 0.9; transition: opacity 0.2s; }
    .contact-item a:hover { opacity: 1; }
    
    /* Footer */
    footer { text-align: center; padding: 2rem; color: #64748b; font-size: 0.875rem; }
    
    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
      section { padding: 3rem 1rem; }
    }
  </style>
</head>
<body>
  <!-- Hero -->
  <header class="hero">
    <div>
      <h1>${personalInfo.fullName}</h1>
      <p>${personalInfo.title}</p>
      <div class="hero-links">
        ${
          personalInfo.email
            ? `<a href="mailto:${personalInfo.email}">Contact Me</a>`
            : ""
        }
        ${
          personalInfo.github
            ? `<a href="${personalInfo.github}" target="_blank">GitHub</a>`
            : ""
        }
        ${
          personalInfo.linkedin
            ? `<a href="${personalInfo.linkedin}" target="_blank">LinkedIn</a>`
            : ""
        }
      </div>
    </div>
  </header>

  <!-- About -->
  ${
    professionalSummary.summary
      ? `
  <section id="about">
    <h2 class="section-title">About Me</h2>
    <p class="about-content">${professionalSummary.summary}</p>
  </section>
  `
      : ""
  }

  <!-- Skills -->
  ${
    skills.length > 0
      ? `
  <section id="skills">
    <h2 class="section-title">Skills</h2>
    <div class="skills-grid">
      ${skills
        .map(
          (skill) => `
        <div class="skill-card">
          <div class="skill-name">${skill.name}</div>
          <div class="skill-bar">
            <div class="skill-progress" style="width: ${
              skill.level === "Expert"
                ? "100%"
                : skill.level === "Advanced"
                ? "80%"
                : skill.level === "Intermediate"
                ? "60%"
                : "40%"
            }"></div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  </section>
  `
      : ""
  }

  <!-- Experience -->
  ${
    experience.length > 0
      ? `
  <section id="experience">
    <h2 class="section-title">Experience</h2>
    <div class="timeline">
      ${experience
        .map(
          (exp) => `
        <div class="timeline-item">
          <div class="timeline-title">${exp.position}</div>
          <div class="timeline-subtitle">${exp.company}</div>
          <div class="timeline-date">${exp.startDate} - ${
            exp.current ? "Present" : exp.endDate
          }</div>
          ${
            exp.description
              ? `<p class="timeline-desc">${exp.description}</p>`
              : ""
          }
          ${
            exp.highlights.length > 0
              ? `
            <ul style="margin-top: 0.5rem; padding-left: 1rem; color: #64748b;">
              ${exp.highlights.map((h) => `<li>${h}</li>`).join("")}
            </ul>
          `
              : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
  </section>
  `
      : ""
  }

  <!-- Projects -->
  ${
    projects.length > 0
      ? `
  <section id="projects">
    <h2 class="section-title">Projects</h2>
    <div class="projects-grid">
      ${projects
        .map(
          (proj) => `
        <div class="project-card">
          <div class="project-content">
            <h3 class="project-title">${proj.name}</h3>
            <p class="project-desc">${proj.description}</p>
            ${
              proj.technologies.length > 0
                ? `
              <div class="project-tech">
                ${proj.technologies
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")}
              </div>
            `
                : ""
            }
            <div class="project-links">
              ${
                proj.githubUrl
                  ? `<a href="${proj.githubUrl}" target="_blank">GitHub</a>`
                  : ""
              }
              ${
                proj.liveUrl
                  ? `<a href="${proj.liveUrl}" target="_blank">Live Demo</a>`
                  : ""
              }
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  </section>
  `
      : ""
  }

  <!-- Education -->
  ${
    education.length > 0
      ? `
  <section id="education">
    <h2 class="section-title">Education</h2>
    <div class="timeline">
      ${education
        .map(
          (edu) => `
        <div class="timeline-item">
          <div class="timeline-title">${edu.degree} in ${edu.field}</div>
          <div class="timeline-subtitle">${edu.institution}</div>
          <div class="timeline-date">${edu.startDate} - ${edu.endDate}</div>
          ${edu.gpa ? `<p class="timeline-desc">GPA: ${edu.gpa}</p>` : ""}
        </div>
      `
        )
        .join("")}
    </div>
  </section>
  `
      : ""
  }

  <!-- Contact -->
  <section id="contact" class="contact-section">
    <h2 class="section-title">Get In Touch</h2>
    <p style="opacity: 0.9; max-width: 500px; margin: 0 auto;">
      I'm always open to new opportunities and collaborations. Feel free to reach out!
    </p>
    <div class="contact-info">
      ${
        personalInfo.email
          ? `<div class="contact-item"><a href="mailto:${personalInfo.email}">${personalInfo.email}</a></div>`
          : ""
      }
      ${
        personalInfo.phone
          ? `<div class="contact-item"><a href="tel:${personalInfo.phone}">${personalInfo.phone}</a></div>`
          : ""
      }
      ${
        personalInfo.location
          ? `<div class="contact-item">${personalInfo.location}</div>`
          : ""
      }
    </div>
  </section>

  <footer>
    <p>&copy; ${new Date().getFullYear()} ${
    personalInfo.fullName
  }. Built with ResumeGen.</p>
  </footer>
</body>
</html>`;
};

// Download portfolio as ZIP
export const downloadPortfolioZIP = async (
  data: ResumeData,
  settings: PortfolioSettings,
  filename: string = "portfolio.zip"
) => {
  const zip = new JSZip();

  // Generate HTML
  const html = generatePortfolioHTML(data, settings);
  zip.file("index.html", html);

  // Add README
  const readme = `# ${data.personalInfo.fullName}'s Portfolio

This portfolio was generated using ResumeGen.

## How to Deploy

### Option 1: Netlify
1. Drag and drop this folder to https://app.netlify.com/drop
2. Your site will be live instantly!

### Option 2: Vercel
1. Install Vercel CLI: npm i -g vercel
2. Run: vercel deploy
3. Follow the prompts

### Option 3: GitHub Pages
1. Create a new repository
2. Upload these files
3. Go to Settings > Pages
4. Select your branch and save

## Files
- index.html - Your complete portfolio website
- README.md - This file

Enjoy your new portfolio! 🚀
`;
  zip.file("README.md", readme);

  // Generate ZIP
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, filename);
};

// Export resume data as JSON
export const exportResumeJSON = (
  data: ResumeData,
  settings: ResumeSettings,
  portfolioSettings: PortfolioSettings
) => {
  const json = JSON.stringify(
    { resumeData: data, resumeSettings: settings, portfolioSettings },
    null,
    2
  );
  const blob = new Blob([json], { type: "application/json" });
  saveAs(blob, "resume-data.json");
};
