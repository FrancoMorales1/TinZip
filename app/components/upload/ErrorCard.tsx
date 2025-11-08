type ErrorCardProps = {
  message: string;
  onClose: () => void;
};

export function ErrorCard({ message, onClose }: ErrorCardProps) {
  return (
    <div className="rounded-xl border-2 p-8 text-center max-w-2xl mx-auto relative overflow-hidden"
         style={{
           background: 'rgba(10, 10, 10, 0.95)',
           borderColor: 'var(--neon-pink)',
           boxShadow: '0 0 40px rgba(255, 0, 255, 0.4), inset 0 0 40px rgba(255, 0, 255, 0.05)'
         }}>
      <div className="absolute top-0 left-0 w-full h-1"
           style={{
             background: 'linear-gradient(90deg, var(--neon-pink), var(--neon-pink), var(--neon-pink))',
             animation: 'data-stream 2s linear infinite',
             backgroundSize: '200% 100%'
           }}></div>

      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
           style={{
             backgroundColor: 'rgba(255, 0, 255, 0.1)',
             border: '3px solid var(--neon-pink)',
             boxShadow: '0 0 30px rgba(255, 0, 255, 0.5)'
           }}>
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             style={{ color: 'var(--neon-pink)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold mb-4 font-mono neon-text"
          style={{
            color: 'var(--neon-pink)',
            textShadow: '0 0 15px rgba(255, 0, 255, 0.8)'
          }}>
        [ ERROR CRÍTICO ]
      </h2>

      <p className="text-lg mb-6 font-mono"
         style={{ color: 'var(--neon-cyan)' }}>
        <span style={{ color: 'var(--neon-pink)' }}>&gt;</span> {message}
      </p>

      <button
        onClick={onClose}
        className="rounded-lg px-6 py-3 font-semibold font-mono transition-all border-2"
        style={{
          backgroundColor: 'rgba(0, 255, 255, 0.1)',
          borderColor: 'var(--neon-cyan)',
          color: 'var(--neon-cyan)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
        }}
      >
        [ REINTENTAR ]
      </button>
    </div>
  );
}
