"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function TextReveal({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" 
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)"
    switch (direction) {
      case "up": return "translateY(50px)"
      case "down": return "translateY(-50px)"
      case "left": return "translateX(50px)"
      case "right": return "translateX(-50px)"
    }
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={className}
        style={{
          transform: getTransform(),
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease"
        }}
      >
        {children}
      </div>
    </div>
  )
}

interface SplitTextProps {
  text: string
  className?: string
  charClassName?: string
  delay?: number
  stagger?: number
}

export function SplitText({ 
  text, 
  className = "", 
  charClassName = "",
  delay = 0,
  stagger = 30 
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={`inline-block ${charClassName}`}
          style={{
            transform: isVisible ? "translateY(0) rotate(0)" : "translateY(100%) rotate(10deg)",
            opacity: isVisible ? 1 : 0,
            transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * stagger}ms, opacity 0.4s ease ${index * stagger}ms`
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({ end, suffix = "", duration = 2000, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [hasStarted, end, duration])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
}
