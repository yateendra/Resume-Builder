import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Build Your Professional Resume <br className="hidden sm:inline" />
            <span className="text-primary">In Minutes</span>
          </h1>
          
          <p className="max-w-[800px] text-lg md:text-xl text-muted-foreground">
            Create a standout resume that gets noticed by employers. Our easy-to-use builder 
            helps you craft the perfect resume with professional templates and expert guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:w-auto justify-center">
            <Link href="/builder">
              <Button size="lg" className="gap-1.5 group">
                Start Building
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline">
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-16 flex justify-center px-4">
        <div className="relative w-full max-w-[1200px] h-[400px] rounded-lg overflow-hidden border shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60 backdrop-blur-sm">
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-xl font-medium">Resume Builder Preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}