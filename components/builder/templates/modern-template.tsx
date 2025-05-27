"use client";

import { ResumeData } from "@/lib/resume-data";

interface ModernTemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
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
    <div className="modern-template p-6 text-[#333] font-sans">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-[#2563eb]">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
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
          <h2 className="text-lg font-semibold border-b border-[#2563eb] mb-2 pb-1 text-[#2563eb]">
            Professional Summary
          </h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-[#2563eb] mb-2 pb-1 text-[#2563eb]">
            Work Experience
          </h2>
          
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-sm">{exp.company}, {exp.location}</p>
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
          <h2 className="text-lg font-semibold border-b border-[#2563eb] mb-2 pb-1 text-[#2563eb]">
            Education
          </h2>
          
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm">{edu.institution}, {edu.location}</p>
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
          <h2 className="text-lg font-semibold border-b border-[#2563eb] mb-2 pb-1 text-[#2563eb]">
            Skills
          </h2>
          
          <div className="space-y-2">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-sm font-medium">{category}:</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {categorySkills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="inline-block bg-[#EBF5FF] text-[#2563eb] px-2 py-0.5 rounded-md text-xs"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-[#2563eb] mb-2 pb-1 text-[#2563eb]">
            Projects
          </h2>
          
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{project.title}</h3>
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
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-[#f0f0f0] px-2 py-0.5 rounded-md text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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
          <h2 className="text-lg font-semibold border-b border-[#2563eb] mb-2 pb-1 text-[#2563eb]">
            Certifications & Awards
          </h2>
          
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm">{cert.issuer}</p>
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