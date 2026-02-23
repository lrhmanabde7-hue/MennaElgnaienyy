"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkSection } from "@/components/work-section"
import { StatsSection } from "@/components/stats-section"
import { BrandsSection } from "@/components/brands-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { ParticleBackground } from "@/components/particle-background"
import { ScrollProgress } from "@/components/scroll-progress"

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false)
      setTimeout(() => setIsLoaded(true), 100)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Animated Loader */}
      <div 
        className={`fixed inset-0 z-[200] bg-background flex items-center justify-center transition-all duration-700 ${
          showLoader ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Spinning rings */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-2 border-2 border-primary/40 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
            <div className="absolute inset-4 border-2 border-primary rounded-full animate-[spin_1.5s_linear_infinite]" />
            {/* Egyptian star */}
            <svg 
              className="absolute inset-0 w-full h-full p-6 text-primary animate-pulse" 
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              <path d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z" />
            </svg>
          </div>
          <p className="font-mono text-primary text-lg tracking-widest animate-pulse">LOADING</p>
        </div>
      </div>

      <CustomCursor />
      <ScrollProgress />
      <ParticleBackground />
      
      <main className={`min-h-screen bg-background transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <WorkSection />
        <BrandsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
