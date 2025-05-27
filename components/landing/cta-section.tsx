import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Land Your Dream Job?
          </h2>
          
          <p className="max-w-[600px] text-lg text-muted-foreground">
            Start building your professional resume today and take the first step
            towards your next career opportunity.
          </p>
          
          <Link href="/builder">
            <Button size="lg" className="gap-1.5 group">
              Create Your Resume Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}