"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

export function TemplateSelector({ 
  selectedTemplate, 
  onSelectTemplate 
}: TemplateSelectorProps) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "A clean, professional template with a touch of color"
    },
    {
      id: "classic",
      name: "Classic",
      description: "A traditional resume layout, perfect for formal applications"
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "A simple, straightforward layout that focuses on content"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Choose a Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardContent className="p-4">
              <div 
                className="w-full h-40 mb-3 bg-muted rounded-md flex items-center justify-center"
              >
                <div className="text-center text-muted-foreground">
                  {template.name} Preview
                </div>
              </div>
              
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {template.description}
              </p>
              
              {selectedTemplate === template.id ? (
                <Button className="w-full mt-3" disabled>
                  Selected
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={() => onSelectTemplate(template.id)}
                >
                  Select
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}