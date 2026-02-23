"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalHeight) * 100
      setProgress(currentProgress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-border/30">
      <div 
        className="h-full bg-primary transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glowing tip */}
      <div 
        className="absolute top-0 h-full w-4 blur-sm bg-primary"
        style={{ 
          left: `calc(${progress}% - 8px)`,
          opacity: progress > 0 ? 1 : 0
        }}
      />
    </div>
  )
}
