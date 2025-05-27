"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { PdfDownloadButton } from "@/components/builder/pdf-download-button";
import { useEffect, useState } from "react";
import { ResumeData, defaultResumeData } from "@/lib/resume-data";

export function BuilderHeader() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplate] = useState("modern");
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing saved resume data:", error);
      }
    }
    
    const savedTemplate = localStorage.getItem("selectedTemplate");
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
  }, []);
  
  // Update when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedData = localStorage.getItem("resumeData");
      if (savedData) {
        try {
          setResumeData(JSON.parse(savedData));
        } catch (error) {
          console.error("Error parsing saved resume data:", error);
        }
      }
      
      const savedTemplate = localStorage.getItem("selectedTemplate");
      if (savedTemplate) {
        setTemplate(savedTemplate);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // Check for changes every second (for same-window updates)
    const interval = setInterval(() => {
      const savedData = localStorage.getItem("resumeData");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (JSON.stringify(parsedData) !== JSON.stringify(resumeData)) {
            setResumeData(parsedData);
          }
        } catch (error) {
          console.error("Error parsing saved resume data:", error);
        }
      }
      
      const savedTemplate = localStorage.getItem("selectedTemplate");
      if (savedTemplate && savedTemplate !== template) {
        setTemplate(savedTemplate);
      }
    }, 1000);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [resumeData, template]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="text-lg font-bold">ResumeBuilder</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <PdfDownloadButton resumeData={resumeData} template={template} />
        </div>
      </div>
    </header>
  );
}