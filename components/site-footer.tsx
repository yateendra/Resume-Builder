import Link from "next/link";
import { FileText } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container flex flex-col md:flex-row justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="text-lg font-bold">ResumeBuilder</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Create professional resumes in minutes, not hours.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Product</h3>
            <Link href="/builder" className="text-sm text-muted-foreground hover:text-foreground">
              Builder
            </Link>
            <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground">
              Templates
            </Link>
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Resources</h3>
            <Link href="/tips" className="text-sm text-muted-foreground hover:text-foreground">
              Resume Tips
            </Link>
            <Link href="/examples" className="text-sm text-muted-foreground hover:text-foreground">
              Examples
            </Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Company</h3>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mt-8 pt-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}