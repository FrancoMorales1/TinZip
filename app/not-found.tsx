"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-destructive/10 via-background to-destructive/20 px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-extrabold text-destructive mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Página no encontrada
        </h2>
        <p className="text-muted-foreground mb-8">
          Lo sentimos, no pudimos encontrar la página que estás buscando. 
          Puede que el enlace haya expirado o la dirección sea incorrecta.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="px-5 py-2.5 text-sm font-medium text-muted-foreground border border-border rounded-lg bg-secondary hover:bg-input transition-colors"
          >
            ← Volver atrás
          </button>

          <Link
            href="/"
            className="px-5 py-2.5 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
