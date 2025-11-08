"use client";

import React from "react";

interface ErrorModalProps {
  fullScreen?: boolean;
  title: string;
  description: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

export function ErrorModal({ fullScreen, title, description, children, onClose }: ErrorModalProps) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${fullScreen ? "p-4" : ""}`}
         style={{
           background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
           backdropFilter: 'blur(5px)'
         }}>
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full"
             style={{
               background: 'linear-gradient(to bottom, transparent, var(--neon-green), transparent)',
               animation: 'scanline 6s linear infinite'
             }}></div>
        <div className="absolute top-0 left-3/4 w-px h-full"
             style={{
               background: 'linear-gradient(to bottom, transparent, var(--neon-cyan), transparent)',
               animation: 'scanline 8s linear infinite reverse'
             }}></div>
      </div>

      <div className="w-full max-w-lg p-8 relative rounded-xl border-2 overflow-hidden"
           style={{
             background: 'rgba(10, 10, 10, 0.95)',
             borderColor: 'var(--neon-cyan)',
             boxShadow: '0 0 40px rgba(0, 255, 255, 0.4), inset 0 0 40px rgba(0, 255, 255, 0.05)'
           }}>
        <div className="absolute top-0 left-0 w-full h-1"
             style={{
               background: 'linear-gradient(90deg, var(--neon-green), var(--neon-cyan), var(--neon-purple), var(--neon-pink))',
               animation: 'data-stream 3s linear infinite',
               backgroundSize: '200% 100%'
             }}></div>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 font-bold text-2xl transition-all"
            style={{ color: 'var(--neon-pink)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 10px var(--neon-pink)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            ×
          </button>
        )}

        <h2 className="text-2xl font-bold mb-3 font-mono"
            style={{
              color: 'var(--neon-green)',
              textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
            }}>
          <span style={{ color: 'var(--neon-cyan)' }}>[</span> {title} <span style={{ color: 'var(--neon-cyan)' }}>]</span>
        </h2>

        <p className="mb-6 font-mono"
           style={{ color: 'var(--neon-cyan)' }}>
          <span style={{ color: 'var(--neon-green)' }}>&gt;</span> {description}
        </p>

        {children}
      </div>
    </div>
  );
}
