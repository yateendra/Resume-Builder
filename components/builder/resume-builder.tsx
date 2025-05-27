"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ResumePreview } from "@/components/builder/resume-preview";
import { PersonalInfoForm } from "@/components/builder/forms/personal-info-form";
import { ExperienceForm } from "@/components/builder/forms/experience-form";
import { EducationForm } from "@/components/builder/forms/education-form";
import { SkillsForm } from "@/components/builder/forms/skills-form";
import { ProjectsForm } from "@/components/builder/forms/projects-form";
import { CertificationsForm } from "@/components/builder/forms/certifications-form";
import { TemplateSelector } from "@/components/builder/template-selector";
import { ResumeData, defaultResumeData } from "@/lib/resume-data";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderKanban, 
  Award,
  Layout,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplate] = useState("modern");
  const [activeTab, setActiveTab] = useState("personal");
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const { toast } = useToast();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
        toast({
          title: "Resume data loaded",
          description: "Your previous resume data has been loaded.",
        });
      } catch (error) {
        console.error("Error parsing saved resume data:", error);
      }
    }
    
    const savedTemplate = localStorage.getItem("selectedTemplate");
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
  }, [toast]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);
  
  // Save template to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedTemplate", template);
  }, [template]);

  const handleDataChange = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <Card className="mb-8">
            <Tabs 
              defaultValue="personal" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 md:grid-cols-7">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden md:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden md:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  <span className="hidden md:inline">Skills</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4" />
                  <span className="hidden md:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger value="certifications" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="hidden md:inline">Certifications</span>
                </TabsTrigger>
                <TabsTrigger value="template" className="flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  <span className="hidden md:inline">Template</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="p-4">
                <PersonalInfoForm 
                  data={resumeData.personalInfo}
                  onChange={(data) => handleDataChange("personalInfo", data)}
                />
              </TabsContent>
              
              <TabsContent value="experience" className="p-4">
                <ExperienceForm 
                  data={resumeData.experience}
                  onChange={(data) => handleDataChange("experience", data)}
                />
              </TabsContent>
              
              <TabsContent value="education" className="p-4">
                <EducationForm 
                  data={resumeData.education}
                  onChange={(data) => handleDataChange("education", data)}
                />
              </TabsContent>
              
              <TabsContent value="skills" className="p-4">
                <SkillsForm 
                  data={resumeData.skills}
                  onChange={(data) => handleDataChange("skills", data)}
                />
              </TabsContent>
              
              <TabsContent value="projects" className="p-4">
                <ProjectsForm 
                  data={resumeData.projects}
                  onChange={(data) => handleDataChange("projects", data)}
                />
              </TabsContent>
              
              <TabsContent value="certifications" className="p-4">
                <CertificationsForm 
                  data={resumeData.certifications}
                  onChange={(data) => handleDataChange("certifications", data)}
                />
              </TabsContent>
              
              <TabsContent value="template" className="p-4">
                <TemplateSelector 
                  selectedTemplate={template}
                  onSelectTemplate={setTemplate}
                />
              </TabsContent>
            </Tabs>
          </Card>
          
          {/* Mobile Preview Button */}
          <div className="lg:hidden flex justify-center mb-8">
            <Button 
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="w-full gap-2"
            >
              <Eye className="h-4 w-4" />
              {showMobilePreview ? "Hide Preview" : "Show Preview"}
            </Button>
          </div>
          
          {/* Mobile Preview */}
          {showMobilePreview && (
            <div className="lg:hidden mb-8">
              <Card className="p-4">
                <h2 className="text-xl font-bold mb-4">Preview</h2>
                <Separator className="mb-4" />
                <div className="bg-white rounded-md shadow-sm p-4 max-h-[600px] overflow-auto">
                  <ResumePreview data={resumeData} template={template} />
                </div>
              </Card>
            </div>
          )}
          
          {/* Form Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                const tabs = ["personal", "experience", "education", "skills", "projects", "certifications", "template"];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1]);
                }
              }}
              disabled={activeTab === "personal"}
            >
              Previous Section
            </Button>
            
            <Button
              onClick={() => {
                const tabs = ["personal", "experience", "education", "skills", "projects", "certifications", "template"];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex < tabs.length - 1) {
                  setActiveTab(tabs[currentIndex + 1]);
                }
              }}
              disabled={activeTab === "template"}
            >
              Next Section
            </Button>
          </div>
        </div>
        
        {/* Desktop Preview Section */}
        <div className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-auto">
          <Card className="p-6 h-full">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <Separator className="mb-4" />
            <div className="bg-white rounded-md shadow-sm p-6 h-[calc(100%-4rem)] overflow-auto">
              <ResumePreview data={resumeData} template={template} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}