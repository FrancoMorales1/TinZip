"use client"
import SVGComponent from "@/app/components/svgs/fileDownload"

export default function Header() {
  return (
    <div className="text-center mb-8 relative">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 neon-pulse relative"
           style={{
             background: 'rgba(0, 255, 65, 0.1)',
             border: '2px solid var(--neon-green)',
             boxShadow: '0 0 30px rgba(0, 255, 65, 0.4), inset 0 0 20px rgba(0, 255, 65, 0.1)'
           }}>
        <SVGComponent className="w-10 h-10"
                      stroke="var(--neon-green)"
                      style={{ filter: 'drop-shadow(0 0 8px var(--neon-green))' }} />
      </div>

      <h1 className="text-5xl font-bold mb-4 text-balance font-mono relative inline-block"
          style={{
            color: 'var(--neon-green)',
            textShadow: '0 0 10px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.6), 0 0 30px rgba(0, 255, 65, 0.4)'
          }}>
        <span className="inline-block hover:glitch">TIN</span>
        <span className="inline-block" style={{ color: 'var(--neon-cyan)' }}>ZIP</span>
        <span className="text-xl ml-2" style={{ color: 'var(--neon-purple)' }}>[v2.0]</span>
      </h1>

      <div className="h-px w-64 mx-auto mb-4"
           style={{
             background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
             boxShadow: '0 0 10px var(--neon-cyan)'
           }}></div>

      <p className="text-lg max-w-2xl mx-auto text-pretty font-mono leading-relaxed"
         style={{ color: 'var(--neon-cyan)' }}>
        <span style={{ color: 'var(--neon-green)' }}>&gt;</span> Archivos comprimidos y cifrados
        <br />
        <span style={{ color: 'var(--neon-green)' }}>&gt;</span> Enlaces auto-destructivos en{" "}
        <span className="font-bold neon-text" style={{ color: 'var(--neon-pink)' }}>72 horas</span>
        <br />
        <span style={{ color: 'var(--neon-green)' }}>&gt;</span> Encriptación de nivel militar
      </p>

      <div className="mt-4 flex justify-center items-center gap-2 font-mono text-xs"
           style={{ color: 'var(--neon-purple)' }}>
        <span className="inline-block w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: 'var(--neon-green)',
                boxShadow: '0 0 5px var(--neon-green)'
              }}></span>
        <span>SISTEMA ACTIVO</span>
      </div>
    </div>
  )
}
