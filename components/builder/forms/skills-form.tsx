"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Edit, Trash } from "lucide-react";
import { Skill } from "@/lib/resume-data";

const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Skill name is required"),
  level: z.number().min(1).max(5),
  category: z.string().min(1, "Category is required")
});

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [skills, setSkills] = useState<Skill[]>(data);
  const [editMode, setEditMode] = useState(false);
  
  const form = useForm<Skill>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      level: 3,
      category: "Programming Languages"
    }
  });

  function onSubmit(values: Skill) {
    const newSkill = {
      ...values,
      id: values.id || `skill-${Date.now()}`
    };

    let updatedSkills;
    if (editMode) {
      updatedSkills = skills.map(skill => 
        skill.id === newSkill.id ? newSkill : skill
      );
    } else {
      updatedSkills = [...skills, newSkill];
    }

    setSkills(updatedSkills);
    onChange(updatedSkills);
    resetForm();
  }

  function resetForm() {
    form.reset({
      name: "",
      level: 3,
      category: "Programming Languages"
    });
    setEditMode(false);
  }

  function editSkill(skill: Skill) {
    setEditMode(true);
    form.reset(skill);
  }

  function deleteSkill(id: string) {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    onChange(updatedSkills);
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = [
    "Programming Languages",
    "Frameworks",
    "Databases",
    "Tools",
    "Soft Skills",
    "Other"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Skills</h2>
      
      {/* Existing skills list */}
      {Object.keys(skillsByCategory).length > 0 && (
        <div className="space-y-6 mb-6">
          <h3 className="text-lg font-medium">Added Skills</h3>
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-md font-medium">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categorySkills.map((skill) => (
                  <Card key={skill.id} className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">{skill.name}</h5>
                            <div className="text-xs text-muted-foreground">
                              {skill.level}/5
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => editSkill(skill)}
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteSkill(skill.id)}
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add/Edit skill form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-lg font-medium">
            {editMode ? "Edit Skill" : "Add Skill"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill*</FormLabel>
                  <FormControl>
                    <Input placeholder="JavaScript" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proficiency Level: {field.value}/5</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-2">
            <Button type="submit">
              {editMode ? "Update Skill" : "Add Skill"}
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