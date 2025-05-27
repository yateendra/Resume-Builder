"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X, Edit, Trash } from "lucide-react";
import { Project } from "@/lib/resume-data";

const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  technologies: z.array(z.string()),
  link: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional()
});

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [projects, setProjects] = useState<Project[]>(data);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [technology, setTechnology] = useState("");
  const [editMode, setEditMode] = useState(false);

  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: ""
    }
  });

  function onSubmit(values: Project) {
    const newProject = {
      ...values,
      id: values.id || `proj-${Date.now()}`
    };

    let updatedProjects;
    if (editMode) {
      updatedProjects = projects.map(proj => 
        proj.id === newProject.id ? newProject : proj
      );
    } else {
      updatedProjects = [...projects, newProject];
    }

    setProjects(updatedProjects);
    onChange(updatedProjects);
    resetForm();
  }

  function resetForm() {
    form.reset({
      title: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: ""
    });
    setCurrentProject(null);
    setEditMode(false);
  }

  function editProject(project: Project) {
    setCurrentProject(project);
    setEditMode(true);
    form.reset(project);
  }

  function deleteProject(id: string) {
    const updatedProjects = projects.filter(proj => proj.id !== id);
    setProjects(updatedProjects);
    onChange(updatedProjects);
    
    if (currentProject?.id === id) {
      resetForm();
    }
  }

  function addTechnology() {
    if (!technology.trim()) return;
    
    const currentTechnologies = form.getValues("technologies") || [];
    form.setValue("technologies", [...currentTechnologies, technology]);
    setTechnology("");
  }

  function removeTechnology(index: number) {
    const currentTechnologies = form.getValues("technologies") || [];
    form.setValue("technologies", 
      currentTechnologies.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Projects</h2>
      
      {/* Existing projects list */}
      {projects.length > 0 && (
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medium">Added Projects</h3>
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {project.description}
                    </p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-muted px-2 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => editProject(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Add/Edit project form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-lg font-medium">
            {editMode ? "Edit Project" : "Add Project"}
          </h3>
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title*</FormLabel>
                <FormControl>
                  <Input placeholder="E-commerce Platform" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description*</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your project..." 
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel>Technologies Used</FormLabel>
            <div className="flex gap-2 mt-1.5">
              <Input 
                placeholder="Add a technology"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
              />
              <Button type="button" onClick={addTechnology}>
                Add
              </Button>
            </div>
            
            <div className="mt-2 space-y-2">
              {form.watch("technologies")?.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                  <span className="text-sm flex-1">{item}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeTechnology(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="github.com/yourusername/project" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit">
              {editMode ? "Update Project" : "Add Project"}
            </Button>
            {editMode && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}