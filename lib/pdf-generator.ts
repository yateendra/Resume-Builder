"use client";

import { ResumeData } from "@/lib/resume-data";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

// Set up the PDF fonts
pdfMake.vfs = pdfFonts.vfs;

export class PdfGenerator {
  private resumeData: ResumeData;
  private template: string;

  constructor(resumeData: ResumeData, template: string = 'modern') {
    this.resumeData = resumeData;
    this.template = template;
  }

  private getTemplateStyles() {
    const defaultStyles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      sectionTitle: {
        fontSize: 12,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      normal: {
        fontSize: 10,
        margin: [0, 0, 0, 5]
      },
      bullet: {
        fontSize: 10,
        margin: [0, 0, 0, 5]
      }
    };

    switch (this.template) {
      case 'modern':
        return {
          ...defaultStyles,
          header: {
            ...defaultStyles.header,
            color: '#2563eb'
          },
          sectionTitle: {
            ...defaultStyles.sectionTitle,
            color: '#2563eb',
            decoration: 'underline'
          }
        };
      case 'classic':
        return {
          ...defaultStyles,
          header: {
            ...defaultStyles.header,
            alignment: 'center'
          },
          sectionTitle: {
            ...defaultStyles.sectionTitle,
            decoration: 'underline'
          }
        };
      case 'minimal':
        return {
          ...defaultStyles,
          header: {
            ...defaultStyles.header,
            fontSize: 16
          },
          sectionTitle: {
            ...defaultStyles.sectionTitle,
            fontSize: 11,
            bold: true,
            margin: [0, 7, 0, 3]
          },
          normal: {
            ...defaultStyles.normal,
            fontSize: 9
          },
          bullet: {
            ...defaultStyles.bullet,
            fontSize: 9
          }
        };
      default:
        return defaultStyles;
    }
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  private getHeaderSection() {
    const { firstName, lastName, email, phone, address, city, state, zipCode, linkedIn, website } = this.resumeData.personalInfo;
    
    let contactInfo = [];
    if (email) contactInfo.push(email);
    if (phone) contactInfo.push(phone);
    
    let locationInfo = [];
    if (address) locationInfo.push(address);
    if (city || state) {
      locationInfo.push(`${city}${city && state ? ', ' : ''}${state}${zipCode ? ' ' + zipCode : ''}`);
    }
    
    let webInfo = [];
    if (linkedIn) webInfo.push(linkedIn);
    if (website) webInfo.push(website);
    
    const contactText = contactInfo.join(' | ');
    const locationText = locationInfo.join(' | ');
    const webText = webInfo.join(' | ');
    
    const headerContent = [
      { text: `${firstName} ${lastName}`, style: 'header' }
    ];
    
    if (contactText) {
      headerContent.push({ text: contactText, style: 'normal', alignment: this.template === 'classic' ? 'center' : 'left' });
    }
    
    if (locationText) {
      headerContent.push({ text: locationText, style: 'normal', alignment: this.template === 'classic' ? 'center' : 'left' });
    }
    
    if (webText) {
      headerContent.push({ text: webText, style: 'normal', alignment: this.template === 'classic' ? 'center' : 'left' });
    }
    
    return headerContent;
  }

  private getSummarySection() {
    const { summary } = this.resumeData.personalInfo;
    
    if (!summary) return [];
    
    return [
      { text: 'Professional Summary', style: 'sectionTitle' },
      { text: summary, style: 'normal' }
    ];
  }

  private getExperienceSection() {
    const { experience } = this.resumeData;
    
    if (!experience || experience.length === 0) return [];
    
    const experienceContent = [
      { text: 'Work Experience', style: 'sectionTitle' }
    ];
    
    experience.forEach(exp => {
      const dateRange = `${this.formatDate(exp.startDate)} - ${exp.current ? 'Present' : this.formatDate(exp.endDate)}`;
      
      experienceContent.push(
        { text: exp.position, style: 'subheader', margin: [0, 5, 0, 0] },
        { 
          columns: [
            { text: `${exp.company}, ${exp.location}`, style: 'normal', width: '70%' },
            { text: dateRange, style: 'normal', width: '30%', alignment: 'right' }
          ],
          margin: [0, 0, 0, 5]
        },
        { text: exp.description, style: 'normal' }
      );
      
      if (exp.achievements && exp.achievements.length > 0) {
        const achievementsList = {
          ul: exp.achievements.map(achievement => ({
            text: achievement,
            style: 'bullet'
          })),
          margin: [10, 0, 0, 10]
        };
        
        experienceContent.push(achievementsList);
      }
    });
    
    return experienceContent;
  }

  private getEducationSection() {
    const { education } = this.resumeData;
    
    if (!education || education.length === 0) return [];
    
    const educationContent = [
      { text: 'Education', style: 'sectionTitle' }
    ];
    
    education.forEach(edu => {
      const dateRange = `${this.formatDate(edu.startDate)} - ${edu.current ? 'Present' : this.formatDate(edu.endDate)}`;
      
      educationContent.push(
        { text: `${edu.degree} in ${edu.field}`, style: 'subheader', margin: [0, 5, 0, 0] },
        { 
          columns: [
            { text: `${edu.institution}, ${edu.location}`, style: 'normal', width: '70%' },
            { text: dateRange, style: 'normal', width: '30%', alignment: 'right' }
          ],
          margin: [0, 0, 0, 5]
        }
      );
      
      if (edu.gpa) {
        educationContent.push({ text: `GPA: ${edu.gpa}`, style: 'normal' });
      }
      
      if (edu.courses && edu.courses.length > 0) {
        educationContent.push(
          { text: 'Relevant Coursework:', style: 'normal', margin: [0, 3, 0, 0] },
          { text: edu.courses.join(', '), style: 'normal', margin: [0, 0, 0, 10] }
        );
      }
    });
    
    return educationContent;
  }

  private getSkillsSection() {
    const { skills } = this.resumeData;
    
    if (!skills || skills.length === 0) return [];
    
    const skillsByCategory = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);
    
    const skillsContent = [
      { text: 'Skills', style: 'sectionTitle' }
    ];
    
    Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
      const skillsList = categorySkills.map(skill => skill.name).join(', ');
      
      skillsContent.push(
        { text: `${category}:`, style: 'normal', bold: true, margin: [0, 3, 0, 0] },
        { text: skillsList, style: 'normal', margin: [0, 0, 0, 5] }
      );
    });
    
    return skillsContent;
  }

  private getProjectsSection() {
    const { projects } = this.resumeData;
    
    if (!projects || projects.length === 0) return [];
    
    const projectsContent = [
      { text: 'Projects', style: 'sectionTitle' }
    ];
    
    projects.forEach(project => {
      let dateRange = '';
      if (project.startDate || project.endDate) {
        dateRange = `${project.startDate ? this.formatDate(project.startDate) : ''} ${project.startDate && project.endDate ? '- ' : ''}${project.endDate ? this.formatDate(project.endDate) : ''}`;
      }
      
      projectsContent.push(
        { text: project.title, style: 'subheader', margin: [0, 5, 0, 0] }
      );
      
      if (dateRange) {
        projectsContent.push({ text: dateRange, style: 'normal', alignment: 'right' });
      }
      
      projectsContent.push({ text: project.description, style: 'normal' });
      
      if (project.technologies && project.technologies.length > 0) {
        projectsContent.push(
          { text: `Technologies: ${project.technologies.join(', ')}`, style: 'normal', margin: [0, 3, 0, 0] }
        );
      }
      
      if (project.link) {
        projectsContent.push(
          { text: `Link: ${project.link}`, style: 'normal', margin: [0, 3, 0, 10] }
        );
      } else {
        projectsContent.push({ text: '', margin: [0, 0, 0, 10] });
      }
    });
    
    return projectsContent;
  }

  private getCertificationsSection() {
    const { certifications } = this.resumeData;
    
    if (!certifications || certifications.length === 0) return [];
    
    const certificationsContent = [
      { text: 'Certifications & Awards', style: 'sectionTitle' }
    ];
    
    certifications.forEach(cert => {
      certificationsContent.push(
        { text: cert.name, style: 'subheader', margin: [0, 5, 0, 0] },
        { 
          columns: [
            { text: cert.issuer, style: 'normal', width: '70%' },
            { text: this.formatDate(cert.date), style: 'normal', width: '30%', alignment: 'right' }
          ],
          margin: [0, 0, 0, 3]
        }
      );
      
      if (cert.credentialId) {
        certificationsContent.push(
          { text: `Credential ID: ${cert.credentialId}`, style: 'normal', margin: [0, 0, 0, 5] }
        );
      }
      
      if (cert.expiration) {
        certificationsContent.push(
          { text: `Expires: ${this.formatDate(cert.expiration)}`, style: 'normal', margin: [0, 0, 0, 5] }
        );
      }
    });
    
    return certificationsContent;
  }

  generatePdf() {
    const styles = this.getTemplateStyles();
    
    const docDefinition = {
      content: [
        ...this.getHeaderSection(),
        ...this.getSummarySection(),
        ...this.getExperienceSection(),
        ...this.getEducationSection(),
        ...this.getSkillsSection(),
        ...this.getProjectsSection(),
        ...this.getCertificationsSection()
      ],
      styles: styles,
      defaultStyle: {
        font: 'Roboto'
      },
      pageMargins: [40, 40, 40, 40]
    };

    // Create the PDF
    return pdfMake.createPdf(docDefinition);
  }

  downloadPdf(filename: string = 'resume.pdf') {
    const pdf = this.generatePdf();
    pdf.download(filename);
  }

  // This method allows us to preview the PDF in a new tab
  openPdf() {
    const pdf = this.generatePdf();
    pdf.open();
  }
}