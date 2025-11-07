"use client"

export default function Header() {

  return (
    <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-4">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M12 18v-6" />
            <path d="m9 15 3 3 3-3" />
        </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3 text-balance">Compartir Archivos Temporalmente</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
        Los archivos serán comprimidos y cifrados antes de generar el enlace de descarga. Los enlaces expiran en{" "}
        <span className="font-semibold text-blue-600">72 horas</span>.
        </p>
    </div>
  )
}
