import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PenLine, Download, Shield, Star, Clock } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: PenLine,
      title: "Easy Editor",
      description: "Simple drag-and-drop interface to create professional resumes in minutes."
    },
    {
      icon: FileText,
      title: "Multiple Templates",
      description: "Choose from a variety of professionally designed templates to match your style."
    },
    {
      icon: Download,
      title: "PDF Export",
      description: "Download your resume as a professionally formatted PDF ready to share with employers."
    },
    {
      icon: Shield,
      title: "ATS Friendly",
      description: "Our templates are designed to pass through Applicant Tracking Systems."
    },
    {
      icon: Star,
      title: "Expert Guidance",
      description: "Get tips and suggestions to improve your resume as you build it."
    },
    {
      icon: Clock,
      title: "Auto Save",
      description: "Your progress is automatically saved so you can come back anytime."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Create the Perfect Resume
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Our resume builder provides all the tools you need to create a professional,
            job-winning resume that stands out from the competition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}