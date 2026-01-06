import React from 'react';
import { ResumeData, ResumeSettings } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Building2 } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  settings: ResumeSettings;
  className?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, settings, className }) => {
  const { personalInfo, professionalSummary, skills, experience, projects, education, achievements } = data;

  const fontSizeClass = {
    small: 'text-[10px]',
    medium: 'text-[11px]',
    large: 'text-[12px]',
  }[settings.fontSize];

  const primaryColorStyle = { color: settings.primaryColor };
  const primaryBgStyle = { backgroundColor: settings.primaryColor };

  // Modern Template
  if (settings.template === 'modern') {
    return (
      <div className={cn("bg-white text-slate-800 p-8 shadow-lg", fontSizeClass, className)} style={{ fontFamily: settings.fontFamily }}>
        {/* Header */}
        <header className="border-b-2 pb-4 mb-6" style={{ borderColor: settings.primaryColor }}>
          <h1 className="text-3xl font-bold" style={primaryColorStyle}>{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-lg text-slate-600 mt-1">{personalInfo.title || 'Professional Title'}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                {personalInfo.website}
              </span>
            )}
          </div>
        </header>

        {/* Summary */}
        {professionalSummary.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2" style={primaryColorStyle}>Professional Summary</h2>
            <p className="text-slate-700 leading-relaxed">{professionalSummary.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={primaryColorStyle}>Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-800">{exp.position}</h3>
                      <p className="text-slate-600">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-slate-500 text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-slate-700">{exp.description}</p>}
                  {exp.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-slate-700 flex items-start gap-2">
                          <span style={primaryColorStyle}>•</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={primaryColorStyle}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="px-2 py-1 rounded text-sm" style={{ backgroundColor: `${settings.primaryColor}15`, color: settings.primaryColor }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={primaryColorStyle}>Education</h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-800">{edu.degree} in {edu.field}</h3>
                      <p className="text-slate-600">{edu.institution}</p>
                    </div>
                    <span className="text-slate-500 text-sm">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  {edu.gpa && <p className="text-slate-600 text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={primaryColorStyle}>Projects</h2>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-slate-800">{proj.name}</h3>
                  <p className="text-slate-700">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-slate-500 text-sm mt-1">
                      Technologies: {proj.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3" style={primaryColorStyle}>Certifications & Achievements</h2>
            <div className="space-y-2">
              {achievements.map(ach => (
                <div key={ach.id} className="flex justify-between">
                  <div>
                    <span className="font-medium text-slate-800">{ach.title}</span>
                    <span className="text-slate-600"> • {ach.issuer}</span>
                  </div>
                  <span className="text-slate-500 text-sm">{ach.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // Minimal Template
  if (settings.template === 'minimal') {
    return (
      <div className={cn("bg-white text-slate-800 p-8 shadow-lg", fontSizeClass, className)} style={{ fontFamily: settings.fontFamily }}>
        <header className="text-center mb-8">
          <h1 className="text-2xl font-light tracking-wide text-slate-900">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-slate-500 mt-1">{personalInfo.title}</p>
          <div className="flex justify-center flex-wrap gap-3 mt-3 text-slate-500 text-sm">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>•</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </header>

        {professionalSummary.summary && (
          <section className="mb-6 text-center">
            <p className="text-slate-600 max-w-xl mx-auto">{professionalSummary.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200 pb-2">Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <span className="font-medium">{exp.position}</span>
                    <span className="text-slate-400 text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-slate-500">{exp.company}, {exp.location}</p>
                  {exp.highlights.length > 0 && (
                    <ul className="mt-1 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-slate-600 text-sm">— {h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200 pb-2">Skills</h2>
            <p className="text-slate-600">{skills.map(s => s.name).join(' • ')}</p>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200 pb-2">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-medium">{edu.degree} in {edu.field}</span>
                  <p className="text-slate-500">{edu.institution}</p>
                </div>
                <span className="text-slate-400 text-sm">{edu.endDate}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }

  // Creative Template
  return (
    <div className={cn("bg-white text-slate-800 shadow-lg flex", fontSizeClass, className)} style={{ fontFamily: settings.fontFamily }}>
      {/* Sidebar */}
      <aside className="w-1/3 p-6 text-white" style={primaryBgStyle}>
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-4">
            {personalInfo.fullName.charAt(0) || '?'}
          </div>
          <h1 className="text-xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-white/80 text-sm">{personalInfo.title}</p>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-white/60 text-xs mb-2">Contact</h3>
            <div className="space-y-1 text-white/90">
              {personalInfo.email && <p className="flex items-center gap-2"><Mail className="w-3 h-3" />{personalInfo.email}</p>}
              {personalInfo.phone && <p className="flex items-center gap-2"><Phone className="w-3 h-3" />{personalInfo.phone}</p>}
              {personalInfo.location && <p className="flex items-center gap-2"><MapPin className="w-3 h-3" />{personalInfo.location}</p>}
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <h3 className="font-semibold uppercase tracking-wider text-white/60 text-xs mb-2">Skills</h3>
              <div className="space-y-1.5">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-white/60">{skill.level}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1 mt-1">
                      <div className="bg-white rounded-full h-1" style={{ 
                        width: skill.level === 'Expert' ? '100%' : 
                               skill.level === 'Advanced' ? '80%' : 
                               skill.level === 'Intermediate' ? '60%' : '40%' 
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {professionalSummary.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2" style={primaryColorStyle}>About Me</h2>
            <p className="text-slate-600">{professionalSummary.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={primaryColorStyle}>Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: settings.primaryColor }}>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-slate-500 text-sm">{exp.company} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-slate-600 text-sm">• {h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={primaryColorStyle}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: settings.primaryColor }}>
                <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                <p className="text-slate-500 text-sm">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3" style={primaryColorStyle}>Projects</h2>
            <div className="grid grid-cols-2 gap-3">
              {projects.map(proj => (
                <div key={proj.id} className="p-3 bg-slate-50 rounded-lg">
                  <h3 className="font-semibold text-sm">{proj.name}</h3>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
