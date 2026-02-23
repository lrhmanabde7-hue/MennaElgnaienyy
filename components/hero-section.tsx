"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowDown, Linkedin, Instagram } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { SplitText, TextReveal } from "./text-reveal"
import { ParallaxImage } from "./parallax-image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Floating geometric shapes */}
        <div 
          className="absolute top-20 left-10 w-64 h-64 border border-primary/30 rotate-45 transition-transform duration-700"
          style={{ transform: `rotate(${45 + mousePosition.x * 10}deg) translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-32 right-20 w-48 h-48 border border-primary/20 rotate-12 transition-transform duration-700"
          style={{ transform: `rotate(${12 + mousePosition.y * -10}deg) translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-32 h-32 border border-primary/10 -rotate-12 transition-transform duration-700"
          style={{ transform: `rotate(${-12 + mousePosition.x * 5}deg)` }}
        />
        
        {/* Animated stars */}
        {[...Array(5)].map((_, i) => (
          <svg
            key={`star-${i}`}
            className="absolute text-primary transition-all duration-1000"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              transform: `rotate(${i * 36 + scrollY * 0.1}deg)`,
              opacity: 0.1 + i * 0.05
            }}
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z" />
          </svg>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <TextReveal delay={400}>
              <p className="text-primary font-mono text-sm tracking-widest uppercase">
                Egyptian Content Creator
              </p>
            </TextReveal>
            
            <div className="overflow-hidden">
              <SplitText 
                text="Menna"
                className="text-5xl md:text-7xl font-mono font-bold text-foreground leading-tight"
                delay={600}
                stagger={50}
              />
            </div>
            <div className="overflow-hidden">
              <SplitText 
                text="Elgnainey"
                className="text-5xl md:text-7xl font-mono font-bold text-primary leading-tight"
                delay={800}
                stagger={50}
              />
            </div>
          </div>

          <TextReveal delay={1000}>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Creating stories that connect, inspire, and entertain. From the heart of Egypt to screens worldwide.
            </p>
          </TextReveal>

          <div 
            className={`flex items-center gap-4 transition-all duration-1000 delay-[1200ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <MagneticButton
              href="/Menna-CV.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full"
            >
              My CV
              <ArrowDown size={18} className="animate-bounce" />
            </MagneticButton>
            
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/menna-elgnainey-944a46364?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/mennaelgnainey27_?igsh=dDgyNnIxN3VidXVl", label: "Instagram" },
              ].map((social, index) => (
                <MagneticButton
                  key={social.label}
                  href={social.href}
                  className={`p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  strength={0.4}
                >
                  <social.icon size={20} />
                </MagneticButton>
              ))}
              <MagneticButton
                href="https://www.tiktok.com/@mennahaitham266?_r=1&_t=ZS-93ziMIY50z3"
                className={`p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                strength={0.4}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </MagneticButton>
            </div>
          </div>

          {/* Animated Scroll Indicator */}
          <div 
            className={`pt-12 hidden lg:block transition-all duration-1000 delay-[1400ms] ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 text-muted-foreground group cursor-pointer">
              <div className="w-12 h-px bg-border group-hover:w-20 group-hover:bg-primary transition-all duration-300" />
              <span className="text-xs uppercase tracking-widest group-hover:text-primary transition-colors">
                Scroll to explore
              </span>
              <div className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2 group-hover:border-primary transition-colors">
                <div className="w-1 h-2 rounded-full bg-primary animate-[bounce_1.5s_infinite]" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image with Enhanced Effects */}
        <div
          className={`relative transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div 
            className="relative aspect-[4/5] max-w-md mx-auto"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`
            }}
          >
            {/* Animated Decorative Frames */}
            <div 
              className="absolute -inset-4 border-2 border-primary/20 rounded-lg transition-transform duration-500"
              style={{ transform: `rotate(${3 + mousePosition.x * 2}deg)` }}
            />
            <div 
              className="absolute -inset-2 border border-primary/40 rounded-lg transition-transform duration-500"
              style={{ transform: `rotate(${-2 + mousePosition.y * 2}deg)` }}
            />
            
            {/* Image Container with Parallax */}
            <ParallaxImage
              src="/images/profile.jpg"
              alt="Menna Elgnainey - Egyptian Content Creator"
              className="relative w-full h-full rounded-lg"
              speed={0.2}
            />

            {/* Animated Floating Badge */}
            <div 
              className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-xl animate-[float_3s_ease-in-out_infinite]"
              style={{
                animationDelay: "0s"
              }}
            >
              <p className="text-3xl font-bold text-primary font-mono">2M+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Followers</p>
            </div>

            {/* Additional floating elements */}
            <div 
              className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-[ping_2s_infinite]"
            />
            <div 
              className="absolute top-1/4 -right-6 bg-card border border-border rounded-full p-2 animate-[float_4s_ease-in-out_infinite]"
              style={{ animationDelay: "1s" }}
            >
              <Linkedin className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated gradient orbs */}
      <div 
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-transform duration-1000"
        style={{ transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)` }}
      />
      <div 
        className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transition-transform duration-1000"
        style={{ transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)` }}
      />
    </section>
  )
}
