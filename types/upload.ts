export interface UploadFormValues {
  password: string              // contraseña (obligatorio o generada)
  title: string                // opcional
  description?: string          // opcional
  files: File[]                 // archivos seleccionados
}

export interface UploadRequestData {
  title: string
  description?: string
  password_hash: string         // contraseña hasheada antes de enviar
  file: Blob                    // ZIP cifrado (solo un archivo ZIP final)
}

export interface UploadResponse {
  link: string
}
