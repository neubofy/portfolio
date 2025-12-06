'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase/ProjectShowcase";
import BentoGrid from "@/components/BentoGrid";
import ScrollingMarquee from "@/components/ScrollingMarquee";
import Services from "@/components/Services";
import InfoGrid from "@/components/InfoGrid";
import Contact from "@/components/Contact";

export default function Home() {

  return (
    <main className="min-h-screen bg-[#1c1c1e] text-white">
      <Navbar />

      <Hero />
      <ScrollingMarquee />

      <BentoGrid />

      <Services />

      <InfoGrid />

      <ProjectShowcase />

      <Contact />

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        © {new Date().getFullYear()} Pawan Washudev. All rights reserved. | Developed by Pawan Washudev
      </footer>
    </main>
  );
}
