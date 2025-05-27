"use client";

import { ResumeData } from "@/lib/resume-data";

interface ClassicTemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="classic-template p-6 text-[#333] font-serif">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wide text-[#222]">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-sm">
          {personalInfo.email && (
            <div>{personalInfo.email}</div>
          )}
          {personalInfo.phone && (
            <div>{personalInfo.phone}</div>
          )}
          {(personalInfo.city || personalInfo.state) && (
            <div>
              {personalInfo.city}{personalInfo.city && personalInfo.state ? ", " : ""}{personalInfo.state}
            </div>
          )}
          {personalInfo.linkedIn && (
            <div>{personalInfo.linkedIn}</div>
          )}
          {personalInfo.website && (
            <div>{personalInfo.website}</div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-[#222]">
            Professional Summary
          </h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-[#222]">
            Professional Experience
          </h2>
          
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <div>
                  <h3 className="font-bold">{exp.position}</h3>
                  <p className="italic">{exp.company}, {exp.location}</p>
                </div>
                <p className="text-sm">
                  {new Date(exp.startDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short' 
                  })} - {
                    exp.current 
                      ? 'Present' 
                      : exp.endDate 
                        ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          }) 
                        : ''
                  }
                </p>
              </div>
              
              <p className="text-sm mt-1">{exp.description}</p>
              
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm mt-1 ml-1 space-y-0.5">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-[#222]">
            Education
          </h2>
          
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <div>
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <p className="italic">{edu.institution}, {edu.location}</p>
                </div>
                <p className="text-sm">
                  {new Date(edu.startDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short' 
                  })} - {
                    edu.current 
                      ? 'Present' 
                      : edu.endDate 
                        ? new Date(edu.endDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          }) 
                        : ''
                  }
                </p>
              </div>
              
              {edu.gpa && (
                <p className="text-sm mt-1">GPA: {edu.gpa}</p>
              )}
              
              {edu.courses.length > 0 && (
                <div className="mt-1">
                  <p className="text-sm font-medium">Relevant Coursework:</p>
                  <p className="text-sm">{edu.courses.join(", ")}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-[#222]">
            Skills
          </h2>
          
          <div className="space-y-2">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-sm font-bold">{category}:</h3>
                <p className="text-sm">
                  {categorySkills.map(skill => skill.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-[#222]">
            Projects
          </h2>
          
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className="font-bold">{project.title}</h3>
                {(project.startDate || project.endDate) && (
                  <p className="text-sm">
                    {project.startDate ? new Date(project.startDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    }) : ''}
                    {project.startDate && project.endDate ? ' - ' : ''}
                    {project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    }) : ''}
                  </p>
                )}
              </div>
              
              <p className="text-sm mt-1">{project.description}</p>
              
              {project.technologies.length > 0 && (
                <p className="text-sm mt-1">
                  <span className="font-medium">Technologies: </span>
                  {project.technologies.join(", ")}
                </p>
              )}
              
              {project.link && (
                <p className="text-sm mt-1">
                  <span className="font-medium">Link: </span>
                  {project.link}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-[#222]">
            Certifications & Awards
          </h2>
          
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <div>
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="italic">{cert.issuer}</p>
                </div>
                <p className="text-sm">
                  {new Date(cert.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short' 
                  })}
                </p>
              </div>
              
              {cert.credentialId && (
                <p className="text-sm mt-0.5">
                  <span className="font-medium">Credential ID: </span>
                  {cert.credentialId}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}