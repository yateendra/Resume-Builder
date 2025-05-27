"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X, Edit, Trash } from "lucide-react";
import { Education } from "@/lib/resume-data";

const educationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  gpa: z.string().optional(),
  courses: z.array(z.string())
});

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(data);
  const [currentEducation, setCurrentEducation] = useState<Education | null>(null);
  const [course, setCourse] = useState("");
  const [editMode, setEditMode] = useState(false);

  const form = useForm<Education>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      courses: []
    }
  });

  function onSubmit(values: Education) {
    const newEducation = {
      ...values,
      id: values.id || `edu-${Date.now()}`
    };

    let updatedEducations;
    if (editMode) {
      updatedEducations = educations.map(edu => 
        edu.id === newEducation.id ? newEducation : edu
      );
    } else {
      updatedEducations = [...educations, newEducation];
    }

    setEducations(updatedEducations);
    onChange(updatedEducations);
    resetForm();
  }

  function resetForm() {
    form.reset({
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      courses: []
    });
    setCurrentEducation(null);
    setEditMode(false);
  }

  function editEducation(education: Education) {
    setCurrentEducation(education);
    setEditMode(true);
    form.reset(education);
  }

  function deleteEducation(id: string) {
    const updatedEducations = educations.filter(edu => edu.id !== id);
    setEducations(updatedEducations);
    onChange(updatedEducations);
    
    if (currentEducation?.id === id) {
      resetForm();
    }
  }

  function addCourse() {
    if (!course.trim()) return;
    
    const currentCourses = form.getValues("courses") || [];
    form.setValue("courses", [...currentCourses, course]);
    setCourse("");
  }

  function removeCourse(index: number) {
    const currentCourses = form.getValues("courses") || [];
    form.setValue("courses", 
      currentCourses.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Education</h2>
      
      {/* Existing education list */}
      {educations.length > 0 && (
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medium">Added Education</h3>
          {educations.map((education) => (
            <Card key={education.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{education.degree} in {education.field}</h4>
                    <p className="text-sm text-muted-foreground">
                      {education.institution}, {education.location}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(education.startDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })} - {
                        education.current 
                          ? 'Present' 
                          : education.endDate 
                            ? new Date(education.endDate).toLocaleDateString('en-US', { 
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
                      onClick={() => editEducation(education)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteEducation(education.id)}
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
      
      {/* Add/Edit education form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-lg font-medium">
            {editMode ? "Edit Education" : "Add Education"}
          </h3>
          
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution*</FormLabel>
                <FormControl>
                  <Input placeholder="University name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree*</FormLabel>
                  <FormControl>
                    <Input placeholder="Bachelor of Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field of Study*</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Berkeley, CA" {...field} />
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
                        I am currently studying here
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
            name="gpa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GPA</FormLabel>
                <FormControl>
                  <Input placeholder="3.8" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel>Relevant Courses</FormLabel>
            <div className="flex gap-2 mt-1.5">
              <Input 
                placeholder="Add a course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCourse();
                  }
                }}
              />
              <Button type="button" onClick={addCourse}>
                Add
              </Button>
            </div>
            
            <div className="mt-2 space-y-2">
              {form.watch("courses")?.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                  <span className="text-sm flex-1">{item}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeCourse(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit">
              {editMode ? "Update Education" : "Add Education"}
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