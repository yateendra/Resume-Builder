"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ResumeData } from "@/lib/resume-data";
import { PdfGenerator } from "@/lib/pdf-generator";
import { useToast } from "@/hooks/use-toast";

interface PdfDownloadButtonProps {
  resumeData: ResumeData;
  template: string;
}

export function PdfDownloadButton({ resumeData, template }: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      // Initialize the PDF generator
      const pdfGenerator = new PdfGenerator(resumeData, template);
      
      // Generate and download the PDF
      pdfGenerator.downloadPdf(`${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);

      toast({
        title: "PDF generated successfully!",
        description: "Your resume has been downloaded as a PDF.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating PDF",
        description: "There was a problem creating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      disabled={isGenerating}
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      <span>{isGenerating ? "Generating..." : "Export PDF"}</span>
    </Button>
  );
}