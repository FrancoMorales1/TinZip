"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Error detectado:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-destructive/10 via-background to-destructive/20 px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-extrabold text-destructive mb-4">⚠️</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Ocurrió un error inesperado
        </h2>
        <p className="text-muted-foreground mb-8">
          Algo salió mal mientras procesábamos tu solicitud.  
          Puedes intentar nuevamente o volver al inicio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 text-sm font-medium text-destructive border border-destructive/40 rounded-lg bg-card hover:bg-destructive/10 transition-colors"
          >
            Reintentar
          </button>

          <Link
            href="/"
           className="px-5 py-2.5 text-sm font-semibold text-destructive-foreground bg-destructive rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Ir al inicio
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mt-6 bg-card border border-destructive/40 text-left rounded-lg p-4 text-sm text-muted-foreground shadow-sm">
            <p className="font-semibold text-destructive">Detalles técnicos:</p>
            <pre className="mt-2 text-muted-foreground whitespace-pre-wrap break-words">
              {error.message}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
