"use client"

import { useEffect, useState } from 'react';

export function DecryptionAnimation() {
  const [stage, setStage] = useState<'download' | 'decrypt' | 'decompress' | 'complete'>('download');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('decrypt'), 1500);
    const timer2 = setTimeout(() => setStage('decompress'), 3000);
    const timer3 = setTimeout(() => setStage('complete'), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      {/* Download Stage */}
      <div className={`transition-all duration-500 ${stage === 'download' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="relative">
          <div className="w-24 h-24 border-4 rounded-lg flex items-center justify-center"
               style={{
                 borderColor: 'var(--neon-purple)',
                 boxShadow: '0 0 20px rgba(157, 0, 255, 0.5)'
               }}>
            <svg className="w-12 h-12 neon-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 style={{ color: 'var(--neon-purple)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <div className="mt-2 h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full"
                 style={{
                   background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-pink))',
                   boxShadow: '0 0 10px var(--neon-purple)',
                   animation: 'typing 1.5s ease-out forwards'
                 }}></div>
          </div>
          <p className="text-center mt-3 font-mono text-sm" style={{ color: 'var(--neon-purple)' }}>
            DESCARGANDO...
          </p>
        </div>
      </div>

      {/* Decrypt Stage */}
      <div className={`transition-all duration-500 ${stage === 'decrypt' ? 'scale-100 opacity-100' : stage === 'decompress' || stage === 'complete' ? 'scale-75 opacity-50' : 'scale-0 opacity-0'}`}>
        <div className="relative">
          <div className="w-24 h-24 border-4 rounded-lg flex items-center justify-center"
               style={{
                 borderColor: 'var(--neon-green)',
                 boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
               }}>
            <svg className="w-12 h-12 neon-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 style={{ color: 'var(--neon-green)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="mt-2 flex justify-center space-x-1">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="inline-block w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: 'var(--neon-green)',
                      boxShadow: '0 0 5px var(--neon-green)',
                      animation: `blink ${0.5 + i * 0.1}s ease-in-out infinite`
                    }}></span>
            ))}
          </div>
          <p className="text-center mt-3 font-mono text-sm" style={{ color: 'var(--neon-green)' }}>
            DESENCRIPTANDO...
          </p>
        </div>
      </div>

      {/* Decompress Stage */}
      <div className={`transition-all duration-500 ${stage === 'decompress' ? 'scale-100 opacity-100' : stage === 'complete' ? 'scale-75 opacity-50' : 'scale-0 opacity-0'}`}>
        <div className="relative">
          <div className="w-24 h-24 border-4 rounded-lg flex items-center justify-center"
               style={{
                 borderColor: 'var(--neon-cyan)',
                 boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                 animation: 'decompress 1.5s ease-in-out'
               }}>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 style={{ color: 'var(--neon-cyan)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <p className="text-center mt-3 font-mono text-sm" style={{ color: 'var(--neon-cyan)' }}>
            DESCOMPRIMIENDO...
          </p>
        </div>
      </div>

      {/* Complete Stage */}
      {stage === 'complete' && (
        <div className="transition-all duration-500 scale-100 opacity-100">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                 style={{
                   backgroundColor: 'rgba(0, 255, 65, 0.2)',
                   border: '2px solid var(--neon-green)',
                   boxShadow: '0 0 30px rgba(0, 255, 65, 0.6)'
                 }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   style={{ color: 'var(--neon-green)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-mono text-lg font-bold neon-text" style={{ color: 'var(--neon-green)' }}>
              ARCHIVO LISTO
            </p>
            <p className="font-mono text-xs mt-2" style={{ color: 'var(--neon-cyan)' }}>
              [DESCIFRADO COMPLETADO]
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
