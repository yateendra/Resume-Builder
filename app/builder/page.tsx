import { BuilderHeader } from "@/components/builder/builder-header";
import { SiteFooter } from "@/components/site-footer";
import { ResumeBuilder } from "@/components/builder/resume-builder";

export default function BuilderPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BuilderHeader />
      
      <main className="flex-1">
        <ResumeBuilder />
      </main>
      
      <SiteFooter />
    </div>
  );
}