"use client"

import Header from "@/app/components/upload/Header"
import MainUploadCard from "@/app/components/upload/MainUploadCard"
import SecurityInfoCards from "@/app/components/upload/SecurityInfoCards"

export default function FileUploadPage() {
  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)'
         }}>
      {/* Matrix rain effect background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>

      {/* Animated circuit lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full"
             style={{
               background: 'linear-gradient(to bottom, transparent, var(--neon-green), transparent)',
               animation: 'scanline 8s linear infinite'
             }}></div>
        <div className="absolute top-0 left-3/4 w-px h-full"
             style={{
               background: 'linear-gradient(to bottom, transparent, var(--neon-cyan), transparent)',
               animation: 'scanline 6s linear infinite reverse'
             }}></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20"
           style={{
             background: 'radial-gradient(circle, var(--neon-green) 0%, transparent 70%)',
             animation: 'neon-pulse 4s ease-in-out infinite'
           }}></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-20"
           style={{
             background: 'radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)',
             animation: 'neon-pulse 5s ease-in-out infinite reverse'
           }}></div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
             style={{
               background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.03) 2px, rgba(0, 255, 65, 0.03) 4px)'
             }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <Header />
        <MainUploadCard />
        <SecurityInfoCards />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 opacity-50"
           style={{ borderColor: 'var(--neon-green)' }}></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 opacity-50"
           style={{ borderColor: 'var(--neon-cyan)' }}></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 opacity-50"
           style={{ borderColor: 'var(--neon-purple)' }}></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 opacity-50"
           style={{ borderColor: 'var(--neon-pink)' }}></div>
    </div>
  )
}
