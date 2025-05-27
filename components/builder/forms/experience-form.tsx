"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X, Plus, Edit, Trash } from "lucide-react";
import { Experience } from "@/lib/resume-data";

const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Job title is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().min(1, "Job description is required"),
  achievements: z.array(z.string())
});

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(data);
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null);
  const [achievement, setAchievement] = useState("");
  const [editMode, setEditMode] = useState(false);

  const form = useForm<Experience>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: []
    }
  });

  function onSubmit(values: Experience) {
    const newExperience = {
      ...values,
      id: values.id || `exp-${Date.now()}`
    };

    let updatedExperiences;
    if (editMode) {
      updatedExperiences = experiences.map(exp => 
        exp.id === newExperience.id ? newExperience : exp
      );
    } else {
      updatedExperiences = [...experiences, newExperience];
    }

    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
    resetForm();
  }

  function resetForm() {
    form.reset({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: []
    });
    setCurrentExperience(null);
    setEditMode(false);
  }

  function editExperience(experience: Experience) {
    setCurrentExperience(experience);
    setEditMode(true);
    form.reset(experience);
  }

  function deleteExperience(id: string) {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
    
    if (currentExperience?.id === id) {
      resetForm();
    }
  }

  function addAchievement() {
    if (!achievement.trim()) return;
    
    const currentAchievements = form.getValues("achievements") || [];
    form.setValue("achievements", [...currentAchievements, achievement]);
    setAchievement("");
  }

  function removeAchievement(index: number) {
    const currentAchievements = form.getValues("achievements") || [];
    form.setValue("achievements", 
      currentAchievements.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Work Experience</h2>
      
      {/* Existing experiences list */}
      {experiences.length > 0 && (
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medium">Added Experiences</h3>
          {experiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{experience.position}</h4>
                    <p className="text-sm text-muted-foreground">
                      {experience.company}, {experience.location}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(experience.startDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })} - {
                        experience.current 
                          ? 'Present' 
                          : experience.endDate 
                            ? new Date(experience.endDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short' 
                              }) 
                            : ''
                      }
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => editExperience(experience)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteExperience(experience.id)}
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
      
      {/* Add/Edit experience form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-lg font-medium">
            {editMode ? "Edit Experience" : "Add Experience"}
          </h3>
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company*</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title*</FormLabel>
                <FormControl>
                  <Input placeholder="Senior Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco, CA" {...field} />
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
                  <FormLabel>Start Date*</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="current"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-7">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I currently work here
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              {!form.watch("current") && (
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
              )}
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description*</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your role and responsibilities..." 
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel>Key Achievements</FormLabel>
            <div className="flex gap-2 mt-1.5">
              <Input 
                placeholder="Add an achievement"
                value={achievement}
                onChange={(e) => setAchievement(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addAchievement();
                  }
                }}
              />
              <Button type="button" onClick={addAchievement}>
                Add
              </Button>
            </div>
            
            <div className="mt-2 space-y-2">
              {form.watch("achievements")?.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                  <span className="text-sm flex-1">{item}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeAchievement(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit">
              {editMode ? "Update Experience" : "Add Experience"}
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