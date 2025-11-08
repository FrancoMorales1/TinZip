"use client";
import React, { useState } from "react";
import { FileMetadataDisplay } from "@/app/components/download/FileMetadataDisplay";
import { DecryptionAnimation } from "@/app/components/animations/DecryptionAnimation";

interface Props {
  metadata: any;
  onClose: () => void;
  onDownload: () => void
}

export function SuccessModal({ metadata, onClose, onDownload }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await onDownload();
    // La animación dura 4.5 segundos, así que esperamos un poco más
    setTimeout(() => {
      setIsDownloading(false);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4 z-50"
         style={{
           background: 'rgba(0, 0, 0, 0.85)',
           backdropFilter: 'blur(5px)'
         }}>
      <div className="rounded-xl p-8 max-w-2xl w-full relative overflow-hidden"
           style={{
             background: 'rgba(10, 10, 10, 0.98)',
             borderColor: 'var(--neon-cyan)',
             border: '2px solid',
             boxShadow: '0 0 40px rgba(0, 255, 255, 0.4), inset 0 0 40px rgba(0, 255, 255, 0.05)'
           }}>
        <div className="absolute top-0 left-0 w-full h-1"
             style={{
               background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-cyan))',
               animation: 'data-stream 2s linear infinite',
               backgroundSize: '200% 100%'
             }}></div>

        {isDownloading ? (
          <>
            <h2 className="text-2xl font-bold mb-6 font-mono text-center"
                style={{
                  color: 'var(--neon-cyan)',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                }}>
              <span style={{ color: 'var(--neon-green)' }}>[</span> PROCESANDO DESCARGA <span style={{ color: 'var(--neon-green)' }}>]</span>
            </h2>
            <DecryptionAnimation />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 font-mono text-center"
                style={{
                  color: 'var(--neon-green)',
                  textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
                }}>
              <span style={{ color: 'var(--neon-cyan)' }}>[</span> DESCARGA LISTA <span style={{ color: 'var(--neon-cyan)' }}>]</span>
            </h2>

            <FileMetadataDisplay metadata={metadata} />

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 rounded-lg font-semibold font-mono transition-all border-2"
                style={{
                  backgroundColor: 'rgba(0, 255, 65, 0.1)',
                  borderColor: 'var(--neon-green)',
                  color: 'var(--neon-green)',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.2)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
                }}
              >
                [ DESCARGAR ]
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-lg font-semibold font-mono transition-all border-2"
                style={{
                  backgroundColor: 'rgba(157, 0, 255, 0.1)',
                  borderColor: 'var(--neon-purple)',
                  color: 'var(--neon-purple)',
                  boxShadow: '0 0 20px rgba(157, 0, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(157, 0, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(157, 0, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(157, 0, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(157, 0, 255, 0.3)';
                }}
              >
                [ CERRAR ]
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
