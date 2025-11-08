"use client"

export default function SecurityInfoCards() {
  return (
    <div className="mt-8 grid md:grid-cols-3 gap-4">
      {/* Cifrado seguro */}
      <div className="rounded-xl border-2 text-center p-6 transition-all relative overflow-hidden group"
           style={{
             background: 'rgba(10, 10, 10, 0.8)',
             borderColor: 'rgba(0, 255, 65, 0.3)',
             boxShadow: '0 0 15px rgba(0, 255, 65, 0.2)'
           }}
           onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
             e.currentTarget.style.borderColor = 'var(--neon-green)';
             e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.4)';
           }}
           onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
             e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.3)';
             e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.2)';
           }}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 neon-pulse"
             style={{
               background: 'rgba(0, 255, 65, 0.1)',
               border: '2px solid var(--neon-green)'
             }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="w-7 h-7" style={{ color: 'var(--neon-green)' }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h3 className="font-semibold mb-2 font-mono"
            style={{ color: 'var(--neon-green)', textShadow: '0 0 8px rgba(0, 255, 65, 0.5)' }}>
          CIFRADO SEGURO
        </h3>
        <p className="text-sm font-mono" style={{ color: 'var(--neon-cyan)' }}>
          Archivos encriptados con AES-256
        </p>
      </div>

      {/* Compresión automática */}
      <div className="rounded-xl border-2 text-center p-6 transition-all relative overflow-hidden group"
           style={{
             background: 'rgba(10, 10, 10, 0.8)',
             borderColor: 'rgba(0, 255, 255, 0.3)',
             boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)'
           }}
           onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
             e.currentTarget.style.borderColor = 'var(--neon-cyan)';
             e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.4)';
           }}
           onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
             e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)';
             e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.2)';
           }}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 neon-pulse"
             style={{
               background: 'rgba(0, 255, 255, 0.1)',
               border: '2px solid var(--neon-cyan)'
             }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="w-7 h-7" style={{ color: 'var(--neon-cyan)' }}>
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M12 18v-6" />
            <path d="m9 15 3 3 3-3" />
          </svg>
        </div>
        <h3 className="font-semibold mb-2 font-mono"
            style={{ color: 'var(--neon-cyan)', textShadow: '0 0 8px rgba(0, 255, 255, 0.5)' }}>
          COMPRESIÓN ZIP
        </h3>
        <p className="text-sm font-mono" style={{ color: 'var(--neon-green)' }}>
          Transferencias ultra-rápidas
        </p>
      </div>

      {/* Expiración automática */}
      <div className="rounded-xl border-2 text-center p-6 transition-all relative overflow-hidden group"
           style={{
             background: 'rgba(10, 10, 10, 0.8)',
             borderColor: 'rgba(157, 0, 255, 0.3)',
             boxShadow: '0 0 15px rgba(157, 0, 255, 0.2)'
           }}
           onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
             e.currentTarget.style.borderColor = 'var(--neon-purple)';
             e.currentTarget.style.boxShadow = '0 0 25px rgba(157, 0, 255, 0.4)';
           }}
           onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
             e.currentTarget.style.borderColor = 'rgba(157, 0, 255, 0.3)';
             e.currentTarget.style.boxShadow = '0 0 15px rgba(157, 0, 255, 0.2)';
           }}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 neon-pulse"
             style={{
               background: 'rgba(157, 0, 255, 0.1)',
               border: '2px solid var(--neon-purple)'
             }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="w-7 h-7" style={{ color: 'var(--neon-purple)' }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="font-semibold mb-2 font-mono"
            style={{ color: 'var(--neon-purple)', textShadow: '0 0 8px rgba(157, 0, 255, 0.5)' }}>
          AUTO-DESTRUCCIÓN
        </h3>
        <p className="text-sm font-mono" style={{ color: 'var(--neon-pink)' }}>
          Eliminación en 72 horas
        </p>
      </div>
    </div>
  )
}
