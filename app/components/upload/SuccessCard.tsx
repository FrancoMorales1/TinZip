import { EncryptionAnimation } from "@/app/components/animations/EncryptionAnimation";

type SuccessCardProps = {
  link: string;
  password: string;
  onClose: () => void; // función que resetea el formulario
};

export function SuccessCard({ link, password, onClose }: SuccessCardProps) {
  return (
    <div className="rounded-xl border-2 p-8 text-center max-w-2xl mx-auto relative overflow-hidden"
         style={{
           background: 'rgba(10, 10, 10, 0.95)',
           borderColor: 'var(--neon-green)',
           boxShadow: '0 0 40px rgba(0, 255, 65, 0.4), inset 0 0 40px rgba(0, 255, 65, 0.05)'
         }}>
      <div className="absolute top-0 left-0 w-full h-1"
           style={{
             background: 'linear-gradient(90deg, var(--neon-green), var(--neon-cyan), var(--neon-green))',
             animation: 'data-stream 2s linear infinite',
             backgroundSize: '200% 100%'
           }}></div>

      <EncryptionAnimation />

      <div className="mt-6 p-4 rounded-lg border-2"
           style={{
             borderColor: 'var(--neon-cyan)',
             backgroundColor: 'rgba(0, 255, 255, 0.05)'
           }}>
        <p className="font-mono text-sm mb-2"
           style={{ color: 'var(--neon-cyan)' }}>
          <span style={{ color: 'var(--neon-green)' }}>&gt;</span> CONTRASEÑA
        </p>
        <p className="font-mono text-lg font-bold neon-text mb-4"
           style={{
             color: 'var(--neon-pink)',
             textShadow: '0 0 10px var(--neon-pink)'
           }}>
          {password}
        </p>

        <div className="h-px w-full mb-4"
             style={{
               background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)'
             }}></div>

        <p className="font-mono text-sm mb-2"
           style={{ color: 'var(--neon-cyan)' }}>
          <span style={{ color: 'var(--neon-green)' }}>&gt;</span> ENLACE DE DESCARGA
        </p>
        <a href={link}
           className="font-mono text-sm break-all block p-2 rounded transition-all"
           style={{
             color: 'var(--neon-green)',
             textDecoration: 'none',
             backgroundColor: 'rgba(0, 255, 65, 0.05)'
           }}
           onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
             e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
             e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.3)';
           }}
           onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
             e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.05)';
             e.currentTarget.style.boxShadow = 'none';
           }}>
          {link}
        </a>
      </div>

      <button
        onClick={onClose}
        className="mt-6 rounded-lg px-6 py-3 font-semibold font-mono transition-all border-2"
        style={{
          backgroundColor: 'rgba(0, 255, 255, 0.1)',
          borderColor: 'var(--neon-cyan)',
          color: 'var(--neon-cyan)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
        }}
      >
        [ SUBIR OTRO ARCHIVO ]
      </button>
    </div>
  );
}
