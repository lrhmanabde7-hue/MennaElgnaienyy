"use client"

import { useEffect, useRef, useState } from "react"
import { CountUp } from "./text-reveal"

interface StatItemProps {
  value: number
  suffix: string
  label: string
  delay: number
  isVisible: boolean
}

function StatItem({ value, suffix, label, delay, isVisible }: StatItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative text-center p-6 rounded-2xl transition-all duration-700 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow on hover */}
      <div 
        className={`absolute inset-0 bg-primary/5 rounded-2xl transition-all duration-500 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />
      
      {/* Animated border */}
      <div 
        className={`absolute inset-0 rounded-2xl border border-primary/20 transition-all duration-500 ${
          isHovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
        }`}
      />

      <div className="relative z-10">
        <p className="text-5xl md:text-6xl font-bold text-primary font-mono flex items-center justify-center">
          <CountUp end={value} suffix={suffix} duration={2500} />
        </p>
        <p className="text-sm text-muted-foreground uppercase tracking-wider mt-2 group-hover:text-foreground transition-colors">
          {label}
        </p>
      </div>

      {/* Decorative corner elements */}
      <div 
        className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <div 
        className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const stats = [
    { value: 2, suffix: "M+", label: "Total Followers" },
    { value: 100, suffix: "M+", label: "Video Views" },
    { value: 50, suffix: "+", label: "Brand Deals" },
    { value: 500, suffix: "+", label: "Videos Created" },
  ]

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-background border-y border-border relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, var(--primary) 0%, transparent 50%)`
        }}
      />

      {/* Animated line decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute h-px bg-primary/10"
            style={{
              width: "100%",
              top: `${20 + i * 15}%`,
              transform: `translateX(${isVisible ? "0%" : "-100%"})`,
              transition: `transform 1s ease-out ${i * 0.2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 150}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
