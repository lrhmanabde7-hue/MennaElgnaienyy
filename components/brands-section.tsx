"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Play, Video, Lightbulb } from "lucide-react"
import { TextReveal, SplitText } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"

interface VideoIdeaProps {
  title: string
  category: string
  image: string
  videoUrl?: string
  delay: number
  isVisible: boolean
  index: number
}

function VideoIdeaCard({ title, category, image, videoUrl, delay, isVisible, index }: VideoIdeaProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    })
  }

  const handleClick = () => {
    if (videoUrl) {
      window.open(videoUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={`group relative transition-all duration-700 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: isHovered 
          ? `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(mousePosition.y - 0.5) * -10}deg) scale(1.02)`
          : "perspective(1000px) rotateY(0) rotateX(0) scale(1)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 ${
            isHovered ? "scale-110 blur-sm" : "scale-100"
          }`}
        />
        
        {/* Gradient overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-60"
          }`}
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(236, 72, 153, 0.3) 0%, rgba(0,0,0,0.8) 70%)`
              : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)"
          }}
        />
        
        {/* Hover content */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <MagneticButton
            className="p-4 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform"
            strength={0.5}
          >
            <Play size={24} fill="currentColor" />
          </MagneticButton>
        </div>

        {/* Category Badge */}
        <div 
          className={`absolute top-4 left-4 transition-all duration-500 ${
            isHovered ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-80"
          }`}
        >
          <span className="px-3 py-1 text-xs font-medium bg-background/90 text-foreground rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Video Badge */}
        <div 
          className={`absolute bottom-4 right-4 transition-all duration-500 ${
            isHovered ? "translate-y-0 scale-110" : "translate-y-0 scale-100"
          }`}
        >
          <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full flex items-center gap-1">
            <Video size={12} />
            Video
          </span>
        </div>

        {/* Glare effect */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `linear-gradient(${135 + (mousePosition.x - 0.5) * 50}deg, rgba(255,255,255,0.2) 0%, transparent 50%)`
          }}
        />

        {/* Number indicator */}
        <div 
          className={`absolute top-4 right-4 transition-all duration-500 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <span className="text-5xl font-bold text-white/20 font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-white/70">{category}</p>
        </div>
      </div>
    </div>
  )
}

const videoIdeas = [
  {
    title: "Glow Cosmetics",
    category: "Beauty & Cosmetics",
    image: "/images/glow-cosmetics-new.jpg",
    videoUrl: "https://drive.google.com/file/d/1dwP3XjLnnDUzagvRXJMN9vUvRvXtN6JN/view?usp=sharing"
  },
  {
    title: "Brand Story Telling",
    category: "Marketing",
    image: "/images/brand-storytelling.jpg",
    videoUrl: "https://drive.google.com/file/d/10imoMQz8RDGF1oph0c7XapNF5G3qojw9/view?usp=drive_link"
  },
  {
    title: "Product Showcase",
    category: "Product Showcase",
    image: "/images/product-showcase.jpg",
    videoUrl: "https://drive.google.com/file/d/1wrKNjyDeeOQuZRUv8Gpub9JJ67iy4JMD/view?usp=sharing"
  },
  {
    title: "X Events",
    category: "Events Planning",
    image: "/images/x-events-content.jpg",
    videoUrl: "https://drive.google.com/file/d/1qa0HDFWNeKr5ngJvFS9l2rZvBz_eIwF2/view?usp=sharing"
  },
  {
    title: "Educational Content",
    category: "Educational",
    image: "/images/educational-content.jpg",
    videoUrl: "https://drive.google.com/file/d/1EnREwuD3JumpvcqijpyXZTqfUNzplm_Z/view?usp=sharing"
  },
  {
    title: "Green House Hotel",
    category: "Hotel",
    image: "/images/greenhouse-hotel-content.png",
    videoUrl: "https://drive.google.com/file/d/1HunDli2RdSYTgY0JAgxPDxvWmNSzREHe/view?usp=sharing"
  },
]

export function BrandsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="brands" ref={sectionRef} className="py-24 md:py-32 bg-card relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
          }`}
        />
        <div 
          className={`absolute bottom-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        />
      </div>

      {/* Animated marquee background */}
      <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
        <div className="absolute whitespace-nowrap animate-[marquee_20s_linear_infinite] text-8xl font-bold text-primary">
          {[...Array(10)].map((_, i) => (
            <span key={`marquee-${i}`} className="mx-8">VIDEO IDEAS</span>
          ))}
        </div>
        <div className="absolute top-1/2 whitespace-nowrap animate-[marquee_25s_linear_infinite_reverse] text-8xl font-bold text-primary">
          {[...Array(10)].map((_, i) => (
            <span key={`marquee2-${i}`} className="mx-8">CONTENT CREATION</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <TextReveal delay={0}>
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <Lightbulb size={16} />
              Video Ideas
            </p>
          </TextReveal>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <SplitText 
              text="Content"
              className="text-4xl md:text-5xl font-mono font-bold text-foreground"
              delay={200}
              stagger={40}
            />
            <SplitText 
              text="Concepts"
              className="text-4xl md:text-5xl font-mono font-bold text-primary"
              delay={400}
              stagger={40}
            />
          </div>
          
          <TextReveal delay={600}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Creative video concepts and content ideas that I bring to life for brands. From storytelling to trending formats, every idea is crafted to engage and convert.
            </p>
          </TextReveal>
        </div>

        {/* Video Ideas Grid - Same as Work Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoIdeas.map((idea, index) => (
            <VideoIdeaCard
              key={idea.title}
              {...idea}
              index={index}
              delay={index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className={`mt-16 p-8 md:p-12 bg-background rounded-2xl border border-border relative overflow-hidden transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute -top-8 -left-8 w-48 h-48 border border-primary/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Video className="w-8 h-8 text-primary" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">Have a Video Idea?</h3>
            </div>
            
            <p className="text-muted-foreground mb-8">
              {"Let's collaborate and bring your vision to life. From concept to final cut, I'll help you create content that stands out and drives results."}
            </p>

            <MagneticButton
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              strength={0.3}
            >
              <Play size={18} fill="currentColor" />
              {"Let's Create Together"}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
