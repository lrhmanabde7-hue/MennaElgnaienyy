"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setIsMounted(true)
    
    // Check for touch device
    if ("ontouchstart" in window) return

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      
      // Update cursor dot immediately for responsiveness
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }

      const target = e.target as HTMLElement
      const isPointerElement =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.dataset.cursor === "pointer"
      
      setIsPointer(isPointerElement)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.body.addEventListener("mouseenter", handleMouseEnter)

    // Smooth ring animation with RAF
    let animationFrame: number
    const animate = () => {
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.12
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.12
      
      if (ringRef.current) {
        ringRef.current.style.left = `${positionRef.current.x}px`
        ringRef.current.style.top = `${positionRef.current.y}px`
      }
      
      animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  if (!isMounted) return null
  
  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main cursor dot - moves immediately */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10000] rounded-full will-change-transform"
        style={{
          width: isClicking ? "8px" : "10px",
          height: isClicking ? "8px" : "10px",
          backgroundColor: "var(--primary)",
          transform: "translate(-50%, -50%)",
          opacity: isHidden ? 0 : 1,
          transition: "width 0.15s, height 0.15s, opacity 0.15s",
        }}
      />

      {/* Cursor ring - follows with easing */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9999] rounded-full border-2 will-change-transform"
        style={{
          width: isPointer ? "50px" : isClicking ? "25px" : "36px",
          height: isPointer ? "50px" : isClicking ? "25px" : "36px",
          borderColor: isPointer ? "var(--primary)" : "rgba(255,255,255,0.3)",
          backgroundColor: isPointer ? "rgba(212,175,55,0.1)" : "transparent",
          transform: "translate(-50%, -50%)",
          opacity: isHidden ? 0 : 1,
          transition: "width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s, opacity 0.15s",
        }}
      />
    </>
  )
}
