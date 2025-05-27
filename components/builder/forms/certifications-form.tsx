"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Edit, Trash } from "lucide-react";
import { Certification } from "@/lib/resume-data";

const certificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuing organization is required"),
  date: z.string().min(1, "Issue date is required"),
  expiration: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().optional()
});

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const [certifications, setCertifications] = useState<Certification[]>(data);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const form = useForm<Certification>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: "",
      issuer: "",
      date: "",
      expiration: "",
      credentialId: "",
      url: ""
    }
  });

  function onSubmit(values: Certification) {
    const newCertification = {
      ...values,
      id: values.id || `cert-${Date.now()}`
    };

    let updatedCertifications;
    if (editMode) {
      updatedCertifications = certifications.map(cert => 
        cert.id === newCertification.id ? newCertification : cert
      );
    } else {
      updatedCertifications = [...certifications, newCertification];
    }

    setCertifications(updatedCertifications);
    onChange(updatedCertifications);
    resetForm();
  }

  function resetForm() {
    form.reset({
      name: "",
      issuer: "",
      date: "",
      expiration: "",
      credentialId: "",
      url: ""
    });
    setEditMode(false);
    setCurrentId(null);
  }

  function editCertification(certification: Certification) {
    setEditMode(true);
    setCurrentId(certification.id);
    form.reset(certification);
  }

  function deleteCertification(id: string) {
    const updatedCertifications = certifications.filter(cert => cert.id !== id);
    setCertifications(updatedCertifications);
    onChange(updatedCertifications);
    
    if (currentId === id) {
      resetForm();
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Certifications & Awards</h2>
      
      {/* Existing certifications list */}
      {certifications.length > 0 && (
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medium">Added Certifications</h3>
          {certifications.map((certification) => (
            <Card key={certification.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{certification.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {certification.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Issued: {new Date(certification.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })}
                      {certification.expiration && (
                        <span> · Expires: {new Date(certification.expiration).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => editCertification(certification)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteCertification(certification.id)}
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
      
      {/* Add/Edit certification form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-lg font-medium">
            {editMode ? "Edit Certification" : "Add Certification"}
          </h3>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certification Name*</FormLabel>
                <FormControl>
                  <Input placeholder="AWS Certified Solutions Architect" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="issuer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuing Organization*</FormLabel>
                <FormControl>
                  <Input placeholder="Amazon Web Services" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Date*</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Date (if applicable)</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="credentialId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credential ID</FormLabel>
                <FormControl>
                  <Input placeholder="ABC-123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credential URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://www.credly.com/badges/..." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-2">
            <Button type="submit">
              {editMode ? "Update Certification" : "Add Certification"}
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