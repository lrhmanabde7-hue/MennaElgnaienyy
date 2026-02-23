"use client"

import { useEffect, useRef, useState } from "react"
import { Instagram, Linkedin } from "lucide-react"
import { MagneticButton } from "./magnetic-button"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/mennaelgnainey27_?igsh=dDgyNnIxN3VidXVl", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/menna-elgnainey-944a46364?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", label: "LinkedIn" },
  ]

  const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Brands", href: "#brands" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <footer ref={footerRef} className="bg-card border-t border-border relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className={`absolute -bottom-20 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div 
            className={`text-center md:text-left transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <MagneticButton 
              href="#" 
              className="font-mono text-2xl font-bold text-primary tracking-tight inline-block group"
              strength={0.3}
            >
              MENNA
              <span className="text-foreground group-hover:text-primary transition-colors">.</span>
            </MagneticButton>
            <p className="text-sm text-muted-foreground mt-2">
              Egyptian Content Creator
            </p>
          </div>

          {/* Navigation */}
          <nav 
            className={`flex justify-center gap-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {footerLinks.map((link, index) => (
              <MagneticButton
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors relative group"
                strength={0.4}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </MagneticButton>
            ))}
          </nav>

          {/* Social Links */}
          <div 
            className={`flex justify-center md:justify-end gap-4 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {socialLinks.map((social, index) => (
              <MagneticButton
                key={social.label}
                href={social.href}
                className="p-2 text-muted-foreground hover:text-primary transition-all duration-300 relative group"
                strength={0.5}
              >
                <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                <span className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform -z-10" />
              </MagneticButton>
            ))}
            {/* TikTok */}
            <MagneticButton
              href="https://www.tiktok.com/@mennahaitham266?_r=1&_t=ZS-93ziMIY50z3"
              className="p-2 text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              strength={0.5}
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <span className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform -z-10" />
            </MagneticButton>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className={`mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Menna ElGanainy. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-muted-foreground group cursor-default">
            <span className="text-sm">Made with</span>
            <span className="text-primary inline-block group-hover:animate-pulse group-hover:scale-125 transition-transform">
              ♥
            </span>
            <span className="text-sm">in Suez, Egypt</span>
          </div>
        </div>

        {/* Back to top button */}
        <MagneticButton
          href="#"
          className={`fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          strength={0.4}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </MagneticButton>
      </div>
    </footer>
  )
}
