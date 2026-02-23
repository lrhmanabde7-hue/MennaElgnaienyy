"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { Mail, MapPin, Send, CheckCircle } from "lucide-react"
import { TextReveal, SplitText } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", subject: "", message: "" })

      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div 
          className={`absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
        <div 
          className={`absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <TextReveal delay={0}>
                <p className="text-primary font-mono text-sm tracking-widest uppercase">
                  Contact
                </p>
              </TextReveal>
              
              <div className="space-y-2">
                <SplitText 
                  text="Let's Create"
                  className="text-4xl md:text-5xl font-mono font-bold text-foreground leading-tight"
                  delay={200}
                  stagger={30}
                />
                <SplitText 
                  text="Something Amazing"
                  className="text-4xl md:text-5xl font-mono font-bold text-primary leading-tight"
                  delay={400}
                  stagger={30}
                />
              </div>
            </div>

            <TextReveal delay={600}>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Interested in collaborating? Whether it&apos;s brand partnerships, content creation, or creative projects, I&apos;d love to hear from you.
              </p>
            </TextReveal>

            <div className="space-y-4 pt-4">
              {              [
                { icon: Mail, label: "Email", value: "Mennaelganiney91@gmail.com", href: "mailto:Mennaelganiney91@gmail.com" },
                { icon: MapPin, label: "Location", value: "Suez, Egypt", href: null },
              ].map((item, index) => (
                <div 
                  key={item.label}
                  className={`flex items-center gap-4 group transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  <div className="p-3 bg-secondary rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-foreground hover:text-primary transition-colors relative group/link"
                      >
                        {item.value}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-300" />
                      </a>
                    ) : (
                      <p className="text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Animated Egyptian Pattern */}
            <div 
              className={`pt-8 hidden lg:block transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 text-primary/30">
                {[...Array(8)].map((_, i) => (
                  <svg
                    key={`pattern-${i}`}
                    className="w-6 h-6 transition-all duration-300 hover:text-primary hover:scale-125 cursor-pointer"
                    style={{ 
                      transitionDelay: `${i * 50}ms`,
                      animation: isVisible ? `float ${2 + i * 0.2}s ease-in-out infinite ${i * 0.1}s` : "none"
                    }}
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    <path d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                ].map((field) => (
                  <div key={field.name} className="space-y-2 relative">
                    <label 
                      htmlFor={field.name} 
                      className={`text-sm transition-colors duration-300 ${
                        focusedField === field.name ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formState[field.name as keyof typeof formState]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-300"
                        placeholder={field.placeholder}
                      />
                      {/* Animated border effect */}
                      <div 
                        className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                          focusedField === field.name ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 relative">
                <label 
                  htmlFor="subject" 
                  className={`text-sm transition-colors duration-300 ${
                    focusedField === "subject" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Subject
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="">Select a topic</option>
                    <option value="brand">Brand Partnership</option>
                    <option value="content">Content Collaboration</option>
                    <option value="speaking">Speaking Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div 
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      focusedField === "subject" ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2 relative">
                <label 
                  htmlFor="message" 
                  className={`text-sm transition-colors duration-300 ${
                    focusedField === "message" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  <div 
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      focusedField === "message" ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              </div>

              <MagneticButton
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                strength={0.2}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </MagneticButton>

              {/* Success Message */}
              {isSubmitted && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary flex items-center gap-3 animate-[slideUp_0.3s_ease-out]">
                  <CheckCircle className="w-5 h-5" />
                  Thank you for your message! I&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
