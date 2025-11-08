"use client";
import React from "react";

interface Props {
  password: string;
  setPassword: (pass: string) => void;
  downloading: boolean;
  onSubmit: () => void;
}

export function DownloadForm({ password, setPassword, downloading, onSubmit }: Props) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !downloading && password) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium font-mono mb-2"
               style={{ color: 'var(--neon-cyan)' }}>
          <span style={{ color: 'var(--neon-green)' }}>&gt;</span> CONTRASEÑA DE ACCESO
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ingresa la contraseña..."
          className="w-full border-2 rounded-lg p-3 font-mono bg-transparent transition-all"
          style={{
            borderColor: 'rgba(0, 255, 255, 0.3)',
            color: 'var(--neon-green)',
            backgroundColor: 'rgba(0, 255, 255, 0.05)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--neon-cyan)';
            e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={downloading || !password}
        className="w-full py-3 rounded-lg font-semibold font-mono transition-all border-2"
        style={{
          backgroundColor: (downloading || !password) ? 'rgba(50, 50, 50, 0.5)' : 'rgba(0, 255, 65, 0.1)',
          borderColor: (downloading || !password) ? 'rgba(100, 100, 100, 0.5)' : 'var(--neon-green)',
          color: (downloading || !password) ? 'rgba(150, 150, 150, 0.5)' : 'var(--neon-green)',
          cursor: (downloading || !password) ? 'not-allowed' : 'pointer',
          boxShadow: (downloading || !password) ? 'none' : '0 0 20px rgba(0, 255, 65, 0.3)'
        }}
        onMouseEnter={(e) => {
          if (!(downloading || !password)) {
            e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.2)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.6)';
          }
        }}
        onMouseLeave={(e) => {
          if (!(downloading || !password)) {
            e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
          }
        }}
      >
        {downloading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            VERIFICANDO...
          </span>
        ) : (
          "[ VERIFICAR CONTRASEÑA ]"
        )}
      </button>
    </div>
  );
}
