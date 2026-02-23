"use client"

import { useEffect, useRef, useState } from "react"
import { TextReveal, SplitText, CountUp } from "./text-reveal"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skills = [
    { name: "Video Production", icon: "🎬" },
    { name: "Content Strategy", icon: "📊" },
    { name: "Brand Partnerships", icon: "🤝" },
    { name: "Social Media", icon: "📱" },
    { name: "Travel Vlogs", icon: "✈️" },
    { name: "Lifestyle Content", icon: "🌟" },
  ]

  const stats = [
    { value: 5, suffix: "+", label: "Years Creating" },
    { value: 500, suffix: "+", label: "Videos Published" },
    { value: 50, suffix: "+", label: "Brand Partners" },
    { value: 15, suffix: "+", label: "Countries Visited" },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={`pattern-${i}`}
            className="absolute border border-primary/20 rounded-full"
            style={{
              width: `${50 + i * 30}px`,
              height: `${50 + i * 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `spin ${10 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <TextReveal delay={0}>
                <p className="text-primary font-mono text-sm tracking-widest uppercase">
                  About
                </p>
              </TextReveal>
              
              <div className="space-y-2">
                <SplitText 
                  text="Storyteller from"
                  className="text-4xl md:text-5xl font-mono font-bold text-foreground leading-tight"
                  delay={200}
                  stagger={30}
                />
                <SplitText 
                  text="Suez, Egypt"
                  className="text-4xl md:text-5xl font-mono font-bold text-primary leading-tight"
                  delay={400}
                  stagger={30}
                />
              </div>
            </div>

            <TextReveal delay={600}>
              <div 
                className="w-20 h-px bg-primary transition-all duration-500"
                style={{ width: isVisible ? "80px" : "0px" }}
              />
            </TextReveal>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <TextReveal delay={700}>
                <p>
                  {"I'm a digital content creator passionate about showcasing the beauty of Egyptian culture, travel destinations, and modern lifestyle through engaging video content."}
                </p>
              </TextReveal>
              <TextReveal delay={800}>
                <p>
                  From ancient wonders to contemporary Egyptian streets, I bring authentic stories that resonate with audiences across the Middle East and beyond. My content bridges tradition with modernity.
                </p>
              </TextReveal>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <TextReveal delay={300}>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                What I Do
              </p>
            </TextReveal>
            
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`relative px-4 py-2 text-sm border border-border rounded-full text-foreground cursor-pointer overflow-hidden group transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Hover background effect */}
                  <span 
                    className={`absolute inset-0 bg-primary transition-transform duration-300 ${
                      hoveredSkill === skill.name ? "scale-100" : "scale-0"
                    }`}
                    style={{ borderRadius: "inherit", transformOrigin: "center" }}
                  />
                  <span className={`relative z-10 transition-colors duration-300 ${
                    hoveredSkill === skill.name ? "text-primary-foreground" : ""
                  }`}>
                    {skill.name}
                  </span>
                  
                  {/* Ripple effect on hover */}
                  <span 
                    className={`absolute inset-0 border-2 border-primary rounded-full transition-all duration-500 ${
                      hoveredSkill === skill.name ? "scale-150 opacity-0" : "scale-100 opacity-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Animated Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`space-y-2 group cursor-default transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <p className="text-4xl font-bold text-primary font-mono flex items-end gap-1">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                    <span className="w-2 h-2 bg-primary rounded-full mb-2 group-hover:animate-ping" />
                  </p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Animated Egyptian Pattern Decoration */}
            <div className="pt-8 flex items-center gap-4 text-muted-foreground/50">
              <div 
                className="flex-1 h-px bg-border transition-all duration-1000"
                style={{ 
                  transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left"
                }}
              />
              <svg 
                className={`w-8 h-8 transition-all duration-700 ${
                  isVisible ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
                }`}
                style={{ transitionDelay: "1000ms" }}
                viewBox="0 0 100 100" 
                fill="currentColor"
              >
                <path d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z" />
              </svg>
              <div 
                className="flex-1 h-px bg-border transition-all duration-1000"
                style={{ 
                  transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "right",
                  transitionDelay: "500ms"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
