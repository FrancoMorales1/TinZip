"use client"

import { useState, useEffect } from "react"
import { use } from "react"

type FileMetadata = {
  id: string
  filename: string
  size: number
  createdAt: string
  expiresAt: string
  hoursRemaining: number
}

type DownloadStatus = "idle" | "loading" | "error" | "ready"

export default function DownloadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<DownloadStatus>("loading")
  const [error, setError] = useState("")
  const [metadata, setMetadata] = useState<FileMetadata | null>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    // Simular carga de metadatos del archivo
    const fetchMetadata = async () => {
      try {
        // Aquí iría la llamada real al backend
        // const response = await fetch(`/api/download/${id}/metadata`)
        // const data = await response.json()

        // Simulación de respuesta del backend
        await new Promise((resolve) => setTimeout(resolve, 500))

        const mockMetadata: FileMetadata = {
          id: id,
          filename: "documentos-importantes.zip",
          size: 2456789,
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 60 * 60 * 60 * 1000).toISOString(),
          hoursRemaining: 60,
        }

        setMetadata(mockMetadata)
        setStatus("ready")
      } catch (err) {
        setStatus("error")
        setError("No se pudieron obtener los datos del archivo")
      }
    }

    fetchMetadata()
  }, [id])

  const handleDownload = async () => {
    if (!password.trim()) {
      setError("Por favor, ingresa la contraseña")
      return
    }

    setDownloading(true)
    setError("")

    try {
      // Aquí iría la llamada real al backend
      // const response = await fetch(`/api/download/${id}?password=${encodeURIComponent(password)}`)
      // if (!response.ok) {
      //   throw new Error('Contraseña incorrecta')
      // }
      // window.location.href = `/api/download/${id}?password=${encodeURIComponent(password)}`

      // Simulación de verificación de contraseña
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simular contraseña incorrecta si no es "1234"
      if (password !== "1234") {
        throw new Error("Contraseña incorrecta")
      }

      // Si la contraseña es correcta, iniciar descarga
      window.location.href = `/api/download/${id}?password=${encodeURIComponent(password)}`

      // Limpiar contraseña después de descarga exitosa
      setTimeout(() => {
        setPassword("")
        setDownloading(false)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al descargar el archivo")
      setDownloading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600">Cargando información del archivo...</p>
        </div>
      </div>
    )
  }

  if (status === "error" || !metadata) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border-2 border-red-200 shadow-lg p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-red-600"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Archivo no disponible</h1>
          <p className="text-gray-600">
            {error || "El archivo no existe o ha expirado. Por favor, verifica el enlace."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
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
              <path d="M12 12v6" />
              <path d="m15 15-3-3-3 3" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-balance">Descargar Archivos Seguros</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto text-pretty">
            Ingresa la contraseña para descargar el archivo cifrado
          </p>
        </div>

        {/* Expiration Warning */}
        <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-amber-600 mt-0.5 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <div>
              <p className="font-semibold text-amber-900 mb-1">Este enlace expira automáticamente</p>
              <p className="text-sm text-amber-800">
                72 horas después de su creación. Tiempo restante:{" "}
                <span className="font-bold">{metadata.hoursRemaining} horas</span>
              </p>
            </div>
          </div>
        </div>

        {/* File Metadata Card */}
        <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-blue-600"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900">Información del Archivo</h2>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Nombre del archivo</span>
              <span className="text-sm text-gray-900 font-semibold text-right ml-4">{metadata.filename}</span>
            </div>

            <div className="flex justify-between items-start py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Tamaño</span>
              <span className="text-sm text-gray-900 font-semibold">{formatFileSize(metadata.size)}</span>
            </div>

            <div className="flex justify-between items-start py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Fecha de creación</span>
              <span className="text-sm text-gray-900 font-semibold text-right ml-4">
                {formatDate(metadata.createdAt)}
              </span>
            </div>

            <div className="flex justify-between items-start py-3">
              <span className="text-sm font-medium text-gray-600">Expira el</span>
              <span className="text-sm text-gray-900 font-semibold text-right ml-4">
                {formatDate(metadata.expiresAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Download Form Card */}
        <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-blue-600"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900">Descargar Archivo</h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">Ingresa la contraseña para acceder al archivo cifrado</p>
          </div>

          <div className="p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleDownload()
              }}
              className="space-y-6"
            >
              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-base font-semibold text-gray-900">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Ingresa la contraseña del archivo"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  disabled={downloading}
                  className="block w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  autoFocus
                />
                <p className="text-sm text-gray-500">Usa la contraseña proporcionada por el remitente</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p className="text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!password.trim() || downloading}
                className="w-full h-12 flex items-center justify-center gap-2 px-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {downloading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Descargando...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Descargar archivo
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-blue-600 mt-0.5 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Nota de seguridad:</span> Este archivo está cifrado y protegido. Solo las
              personas con la contraseña correcta podrán descargarlo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
