"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ExternalLink, Instagram } from "lucide-react"
import { TextReveal, SplitText } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"

interface WorkItemProps {
  title: string
  category: string
  image: string
  link: string
  delay: number
  isVisible: boolean
  index: number
  objectPosition?: string
}

function WorkItem({ title, category, image, link, delay, isVisible, index, objectPosition }: WorkItemProps) {
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
    window.open(link, "_blank", "noopener,noreferrer")
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
          style={objectPosition ? { objectPosition } : undefined}
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
          <div className="flex items-center gap-4">
            <MagneticButton
              className="p-4 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform"
              strength={0.5}
            >
              <Instagram size={24} />
            </MagneticButton>
            <MagneticButton
              className="p-4 border border-foreground text-foreground rounded-full hover:bg-foreground hover:text-background transition-colors"
              strength={0.5}
            >
              <ExternalLink size={20} />
            </MagneticButton>
          </div>
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

        {/* Instagram Badge */}
        <div 
          className={`absolute bottom-4 right-4 transition-all duration-500 ${
            isHovered ? "translate-y-0 scale-110" : "translate-y-0 scale-100"
          }`}
        >
          <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full flex items-center gap-1">
            <Instagram size={12} />
            Instagram
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

export function WorkSection() {
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

  const works = [
    {
      title: "Sitz - Kitchens & Closets",
      category: "Kitchen & closets",
      image: "/images/sitz-kitchen-new.jpg",
      link: "https://www.instagram.com/sitz.eg",
    },
    {
      title: "Glow Cosmetics",
      category: "Beauty & Cosmetics",
      image: "/images/glow-cosmetics-new.jpg",
      link: "https://www.instagram.com/glow.cosmetics.eg",
    },
    {
      title: "Dr. Zena Karawya",
      category: "Pharmacist, Personal Branding",
      image: "/images/dr-zena-new.jpg",
      link: "https://www.instagram.com/xeina_karawia",
      objectPosition: "center 20%",
    },
    {
      title: "X Events",
      category: "Events Planning",
      image: "/images/x-events.png",
      link: "https://www.instagram.com/x_event.planner?igsh=cDV1a3RucndyaWZ3",
    },
    {
      title: "Eltaweel Pharmacy",
      category: "Healthcare",
      image: "/images/el-taweel-pharmacy.jpg",
      link: "https://www.instagram.com/eltaweel.pharmacy.eg",
    },
    {
      title: "Zak Cafe",
      category: "Cafe",
      image: "/images/zak-cafe.jpg",
      link: "https://www.instagram.com/zak.cafe1",
    },
    {
      title: "VESTIDO",
      category: "Fashion brand",
      image: "/images/vestido.jpg",
      link: "https://www.instagram.com/vestido.eg_",
    },
    {
      title: "Greenhouse Hotel",
      category: "Hotel",
      image: "/images/greenhouse-hotel.jpg",
      link: "https://www.instagram.com/greenhouse__hotel?igsh=MTg1MnpqZThlYXU1cQ==",
    },
    {
      title: "Ahd Haute Couture",
      category: "Wedding dresses Designer",
      image: "/images/ahd-haute.jpg",
      link: "https://www.instagram.com/ahd_haute_couture",
    },
    {
      title: "Nomadian",
      category: "Travel Agency",
      image: "/images/nomadian-new.jpg",
      link: "https://www.instagram.com/nomadian_travels",
    },
  ]

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
          }`}
        />
        <div 
          className={`absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <TextReveal delay={0}>
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
              Selected Work
            </p>
          </TextReveal>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <SplitText 
              text="Featured"
              className="text-4xl md:text-5xl font-mono font-bold text-foreground"
              delay={200}
              stagger={40}
            />
            <SplitText 
              text="Clients"
              className="text-4xl md:text-5xl font-mono font-bold text-primary"
              delay={400}
              stagger={40}
            />
          </div>
          
          <TextReveal delay={600}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Managing 11+ accounts across freelance and company projects. Click on any card to visit their Instagram page.
            </p>
          </TextReveal>
        </div>

        {/* Work Grid - 2 columns on medium, 3 on large */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, index) => (
            <WorkItem
              key={work.title}
              {...work}
              index={index}
              delay={index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Stats Banner */}
        <div
          className={`mt-16 p-8 rounded-2xl bg-card border border-border transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary font-mono">11+</p>
              <p className="text-sm text-muted-foreground mt-1">Active Accounts</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary font-mono">4</p>
              <p className="text-sm text-muted-foreground mt-1">Freelance Clients</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary font-mono">4</p>
              <p className="text-sm text-muted-foreground mt-1">Company Projects</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary font-mono">+1</p>
              <p className="text-sm text-muted-foreground mt-1">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
