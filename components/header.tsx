"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { MagneticButton } from "./magnetic-button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Determine active section
      const sections = ["about", "work", "brands", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Content Concepts", href: "#brands" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with animation */}
        <MagneticButton 
          href="#" 
          className="font-mono text-xl font-bold text-primary tracking-tight group"
          strength={0.3}
        >
          <span className="relative">
            MENNA
            <span className="text-foreground group-hover:text-primary transition-colors duration-300">.</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </span>
        </MagneticButton>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <MagneticButton
                href={link.href}
                className="relative text-sm tracking-wide uppercase group"
                strength={0.4}
              >
                <span className={`transition-colors duration-200 ${
                  activeSection === link.href.slice(1) 
                    ? "text-primary" 
                    : "text-muted-foreground group-hover:text-primary"
                }`}>
                  {link.label}
                </span>
                {/* Active indicator */}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </MagneticButton>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <MagneticButton
          href="#contact"
          className="hidden md:inline-flex px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full overflow-hidden relative group"
          strength={0.3}
        >
          <span className="relative z-10">{"Let's Talk"}</span>
          <span className="absolute inset-0 bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {"Let's Talk"}
          </span>
        </MagneticButton>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-foreground p-2 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span 
              className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? "top-3 rotate-45" : "top-1"
              }`}
            />
            <span 
              className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span 
              className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? "top-3 -rotate-45" : "top-5"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/98 backdrop-blur-xl border-b border-border">
          <ul className="flex flex-col items-center py-6 gap-4">
            {navLinks.map((link, index) => (
              <li 
                key={link.href}
                className="overflow-hidden"
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms"
                }}
              >
                <a
                  href={link.href}
                  className={`text-lg block transition-all duration-300 ${
                    isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  } ${
                    activeSection === link.href.slice(1) 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li
              className={`mt-2 transition-all duration-300 ${
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "200ms" : "0ms" }}
            >
              <a
                href="#contact"
                className="px-6 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {"Let's Talk"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
