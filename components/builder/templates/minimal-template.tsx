"use client";

import { ResumeData } from "@/lib/resume-data";

interface MinimalTemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
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
    <div className="minimal-template p-6 text-[#333] font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-gray-600">
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
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-md uppercase tracking-wide font-bold mb-3">
            Experience
          </h2>
          
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-xs text-gray-600">
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
              
              <p className="text-xs text-gray-600 mb-1">{exp.company}, {exp.location}</p>
              <p className="text-xs">{exp.description}</p>
              
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside text-xs mt-1 ml-1 space-y-0.5">
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
          <h2 className="text-md uppercase tracking-wide font-bold mb-3">
            Education
          </h2>
          
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                <p className="text-xs text-gray-600">
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
              
              <p className="text-xs text-gray-600">{edu.institution}, {edu.location}</p>
              
              {edu.gpa && (
                <p className="text-xs mt-1">GPA: {edu.gpa}</p>
              )}
              
              {edu.courses.length > 0 && (
                <div className="mt-1">
                  <p className="text-xs">
                    <span className="font-medium">Coursework: </span>
                    {edu.courses.join(", ")}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-md uppercase tracking-wide font-bold mb-3">
            Skills
          </h2>
          
          <div className="space-y-2">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <p className="text-xs">
                  <span className="font-semibold">{category}: </span>
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
          <h2 className="text-md uppercase tracking-wide font-bold mb-3">
            Projects
          </h2>
          
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{project.title}</h3>
                {(project.startDate || project.endDate) && (
                  <p className="text-xs text-gray-600">
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
              
              <p className="text-xs mt-1">{project.description}</p>
              
              {project.technologies.length > 0 && (
                <p className="text-xs mt-1">
                  <span className="font-semibold">Technologies: </span>
                  {project.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-md uppercase tracking-wide font-bold mb-3">
            Certifications
          </h2>
          
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-xs text-gray-600">
                  {new Date(cert.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short' 
                  })}
                </p>
              </div>
              <p className="text-xs text-gray-600">{cert.issuer}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}