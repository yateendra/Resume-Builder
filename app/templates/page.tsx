"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TemplatesPage() {
  const router = useRouter();

  const templates = [
    {
      id: "modern",
      title: "Modern Template",
      description: "A clean and contemporary design with a focus on readability and visual hierarchy.",
    },
    {
      id: "classic",
      title: "Classic Template",
      description: "A traditional resume layout that's proven effective across industries.",
    },
    {
      id: "minimal",
      title: "Minimal Template",
      description: "A streamlined design that emphasizes content over styling.",
    },
  ];

  const handleTemplateSelect = (templateId: string) => {
    router.push(`/builder?template=${templateId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => handleTemplateSelect(template.id)}
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}