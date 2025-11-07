"use client"

import type React from "react"
import { useState } from "react"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function MainUploadCard() {
  const [files, setFiles] = useState<File[]>([])
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [downloadLink, setDownloadLink] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
      setStatus("idle")
      setDownloadLink("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      return
    }

    setStatus("uploading")
    setUploadProgress(0)

    // Simular progreso de carga
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 10
      })
    }, 200)

    const formData = new FormData()
    files.forEach((file) => {
      formData.append("files", file)
    })
    if (password) {
      formData.append("password", password)
    }

    try {
      // Aquí iría la llamada real al backend
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // })
      // const data = await response.json()

      // Simulación de respuesta exitosa
      await new Promise((resolve) => setTimeout(resolve, 1500))

      clearInterval(progressInterval)
      setUploadProgress(100)
      setStatus("success")
      setDownloadLink("https://ejemplo.com/download/abc123xyz")
    } catch (error) {
      clearInterval(progressInterval)
      setStatus("error")
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(downloadLink)
  }

  return (
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">Subir Archivos</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
            Selecciona uno o varios archivos para compartir de forma segura
        </p>
        </div>

        <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Input */}
            <div className="space-y-2">
            <label htmlFor="file-upload" className="block text-base font-semibold text-gray-900">
                Archivos
            </label>
            <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                disabled={status === "uploading"}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            />

            {/* Selected Files List */}
            {files.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Archivos seleccionados ({files.length}):</p>
                <ul className="space-y-1">
                    {files.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600 flex justify-between items-center">
                        <span className="truncate flex-1 mr-2">{file.name}</span>
                        <span className="font-medium text-blue-600 shrink-0">{formatFileSize(file.size)}</span>
                    </li>
                    ))}
                </ul>
                </div>
            )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
            <label
                htmlFor="password"
                className="block text-base font-semibold text-gray-900 flex items-center gap-2"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Contraseña (opcional)
            </label>
            <input
                id="password"
                type="password"
                placeholder="Ingresa una contraseña para mayor seguridad"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={status === "uploading"}
                className="block w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            />
            <p className="text-sm text-gray-500">Si estableces una contraseña, el archivo ZIP será cifrado</p>
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            disabled={files.length === 0 || status === "uploading"}
            className="w-full h-12 flex items-center justify-center gap-2 px-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            {status === "uploading" ? (
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
                Subiendo... {uploadProgress}%
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
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="m9 15 3 3 3-3" />
                </svg>
                Comprimir y Enviar
                </>
            )}
            </button>

            {/* Progress Bar */}
            {status === "uploading" && (
            <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className="bg-blue-600 h-full transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                />
                </div>
                <p className="text-sm text-center text-gray-600">Comprimiendo y cifrando archivos...</p>
            </div>
            )}

            {/* Success Message */}
            {status === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                <svg
                    className="w-5 h-5 text-green-600 mt-0.5 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <div className="flex-1">
                    <p className="font-semibold text-green-800 mb-2">¡Archivo enviado con éxito!</p>
                    <p className="text-sm text-green-700 mb-2">Enlace de descarga:</p>
                    <div className="flex gap-2 items-center">
                    <input
                        readOnly
                        value={downloadLink}
                        className="flex-1 px-3 py-2 text-sm bg-white border border-green-300 rounded-md font-mono text-gray-700 focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        className="shrink-0 px-4 py-2 text-sm font-medium text-green-700 bg-white border border-green-300 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                    >
                        Copiar
                    </button>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Error Message */}
            {status === "error" && (
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
                <p className="text-red-800">Error al subir los archivos. Por favor, inténtalo de nuevo.</p>
                </div>
            </div>
            )}
        </form>
        </div>
    </div>
  )
}