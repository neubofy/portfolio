'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase/ProjectShowcase";
import BentoGrid from "@/components/BentoGrid";
import ScrollingMarquee from "@/components/ScrollingMarquee";
import Services from "@/components/Services";
import InfoGrid from "@/components/InfoGrid";
import Contact from "@/components/Contact";
import Process from "@/components/Process";
// Removed Testimonials
import CallToAction from "@/components/CallToAction";

export default function Home() {

  return (
    <main className="min-h-screen text-white overflow-hidden selection:bg-[var(--gold)] selection:text-black">
      <Navbar />

      <Hero />
      <ScrollingMarquee />

      <BentoGrid />

      <Services />
      <Process />

      <InfoGrid />

      <ProjectShowcase />

      <CallToAction />

      <Contact />

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        © {new Date().getFullYear()} Sohan Kumar. Architecting the Future of Intelligence.
      </footer>
    </main>
  );
}
