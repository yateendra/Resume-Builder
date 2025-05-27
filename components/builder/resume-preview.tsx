"use client";

import { ResumeData } from "@/lib/resume-data";
import { ModernTemplate } from "@/components/builder/templates/modern-template";
import { ClassicTemplate } from "@/components/builder/templates/classic-template";
import { MinimalTemplate } from "@/components/builder/templates/minimal-template";

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "classic":
        return <ClassicTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };
  
  return (
    <div className="resume-preview">
      {renderTemplate()}
    </div>
  );
}