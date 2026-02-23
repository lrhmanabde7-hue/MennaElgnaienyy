"use client"

import React from "react"

import { useRef, useState, useCallback, type ReactNode } from "react"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
}

export function MagneticButton({ 
  children, 
  className = "", 
  href, 
  onClick,
  strength = 0.3 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength
    })
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const style = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.05 : 1})`,
    transition: isHovered ? "transform 0.1s ease-out" : "transform 0.3s ease-out"
  }

  const commonProps = {
    ref: buttonRef,
    className: `relative overflow-hidden ${className}`,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    "data-cursor": "pointer"
  }

  if (href) {
    return (
      <a 
        {...commonProps} 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="relative z-10">{children}</span>
        <span 
          className={`absolute inset-0 bg-foreground/10 transition-transform duration-300 ${
            isHovered ? "scale-100" : "scale-0"
          }`}
          style={{ borderRadius: "inherit" }}
        />
      </a>
    )
  }

  return (
    <button {...commonProps} onClick={onClick} type="button">
      <span className="relative z-10">{children}</span>
      <span 
        className={`absolute inset-0 bg-foreground/10 transition-transform duration-300 ${
          isHovered ? "scale-100" : "scale-0"
        }`}
        style={{ borderRadius: "inherit" }}
      />
    </button>
  )
}
