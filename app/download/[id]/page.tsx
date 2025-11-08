"use client";
/* 
import { useState, useEffect, use } from "react";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { hashPassword } from "@/utils/hashPassword";
import { useRouter } from "next/navigation";

// Importar los nuevos componentes
import { LoadingComponent } from "@/app/components/download/LoadingComponent";
import { ErrorModal } from "@/app/components/download/ErrorModal"; 
import { SuccessModal } from "@/app/components/download/SuccessModal";
import { ExpirationWarning } from "@/app/components/download/ExpirationWarning";
import { FileMetadataDisplay } from "@/app/components/download/FileMetadataDisplay";
import { DownloadForm } from "@/app/components/download/DownloadForm";
import { FatalErrorDisplay } from "@/app/components/download/FatalErrorDisplay"; 


type FileMetadata = {
  id: string;
  filename: string;
  size: number;
  createdAt: string;
  expiresAt: string; // TODO FALTA ARREGLAR ESTO PORQUE MI EQUIPO NO SE DECIDEW Y YO NO ENTIENDO UNA PORONGA
};
type DownloadStatus = "idle" | "loading" | "error" | "ready";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(8, "La contraseña debe tener al menos 8 caracteres") 
    .required("Por favor, ingresa la contraseña"),
});

export default function DownloadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<DownloadStatus>("loading");
  
  // 'error' es para errores fatales (carga)
  const [fatalError, setFatalError] = useState(""); 
  // 'modalError' es para errores reintentables (contraseña)
  const [modalError, setModalError] = useState(""); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [metadata, setMetadata] = useState<FileMetadata | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchMetadata = async () => {
      setStatus("loading");
      try {
        const response = await axios.get(`/api/validate/${id}`); //Supongo, chequear cuando esten apis terminadas
        const data: FileMetadata = response.data;
        setMetadata(data);
        setStatus("ready");
      } catch (err) {
        setStatus("error");
        let errorMessage = "No se pudieron obtener los datos del archivo";
        if (axios.isAxiosError(err)) {
          const errorData = err.response?.data;
          errorMessage = errorData?.error || "El enlace no es válido o ha expirado";
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setFatalError(errorMessage);
      }
    };
    fetchMetadata();
  }, [id]);

  const handleDownload = async () => {
    setDownloading(true);
    setModalError(""); // Limpiar error modal anterior

    try {
      await validationSchema.validate({ password }, { abortEarly: false });
      const password_hash = await hashPassword(password);

      const response = await axios.get(`/api/validate/${id}`, {
        params: {
          hash: password_hash 
        }
      });

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = metadata?.filename || 'archivo.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setTimeout(() => {
        setPassword("");
        setDownloading(false);
        setShowSuccessModal(true);
      }, 1500);

    } catch (err) {
      setDownloading(false);
      
      if (err instanceof yup.ValidationError) {
        setModalError(err.errors[0]);
      } else if (axios.isAxiosError(err)) {
        let errorMsg = "Error al descargar";
        if (err.response?.data) {
          if (err.response.data instanceof Blob && err.response.data.type === 'application/json') {
            try {
              const errorJsonText = await err.response.data.text();
              const errorJson = JSON.parse(errorJsonText);
              errorMsg = errorJson.error || errorMsg;
            } catch (e) {
              if (err.response.status === 401) errorMsg = "Contraseña incorrecta";
              else if (err.response.status === 404) errorMsg = "Archivo no encontrado o expirado";
            }
          } else if (err.response.data.error) {
             errorMsg = err.response.data.error;
          } else if (err.response.status === 401) {
             errorMsg = "Contraseña incorrecta";
          }
        }
        setModalError(errorMsg); 
      } else if (err instanceof Error) {
        setModalError(err.message);
      } else {
        setModalError("Un error desconocido ocurrió al descargar");
      }
    }
  };

  if (status === "loading") {
    return <LoadingComponent />;
  }

  if (status === "error" || !metadata) {
    return <FatalErrorDisplay error={fatalError} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      
      <ErrorModal 
        errorMessage={modalError} 
        onClose={() => setModalError("")} 
      />

      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onRedirect={() => router.push('/')}
      />

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-balance">Descargar Archivos Seguros</h1>
        </div>
        
        
        <FileMetadataDisplay metadata={metadata} />

        <DownloadForm
          password={password}
          setPassword={setPassword}
          downloading={downloading}
          onSubmit={handleDownload}
        />

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Nota de seguridad:</span> Este archivo está cifrado...
          </p>
        </div>
      </div>
    </div>
  );
} */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DownloadForm } from "@/app/components/download/test/DownloadForm";
import { FileMetadataDisplay } from "@/app/components/download/FileMetadataDisplay";
import { LoadingComponent } from "@/app/components/download/LoadingComponent";
import { SuccessModal } from "@/app/components/download/test/SuccessModal";
import { ErrorModal } from "@/app/components/download/test/ErrorModal";
import { ExpirationWarning } from "@/app/components/download/test/ExpirationWarning";
import { InvalidPassword } from "@/app/components/download/test/InvalidPassword";
import { FileNotFound } from "@/app/components/download/test/FileNotFound";
import { use } from "react";

type FileMetadata = {
  id: string;
  filename: string;
  size: number;
  createdAt: string;
  expiresAt: string;
};

type PageStatus =
  | "idle"          // esperando a que ingrese contraseña
  | "loading"       // cargando datos desde backend
  | "success"       // descarga correcta
  | "invalidPass"   // contraseña incorrecta
  | "expired"       // archivo expirado
  | "notFound"      // id inexistente
  | "error";        // error fatal

export default function DownloadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<PageStatus>("idle");
  const [metadata, setMetadata] = useState<FileMetadata | null>(null);
  const [modalError, setModalError] = useState("");
  const [downloading, setDownloading] = useState(false);

  const handleVerify = async () => {
    setDownloading(true);
    setModalError("");

    try {
      // Hash de contraseña
      const res = await fetch(`/api/validate/${id}?hash=${password}`);
      const data = await res.json();

      if (!res.ok) {
        // Manejo de distintos errores
        if (res.status === 401) setStatus("invalidPass");
        else if (res.status === 404) setStatus("notFound");
        else if (res.status === 410) setStatus("expired"); // 410 Gone
        else setStatus("error");
        return;
      }

      // Éxito
      setMetadata(data);
      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
    } finally {
      setDownloading(false);
    }
  };

  // Render condicional según status
  if (status === "loading") return <LoadingComponent />;

  if (status === "idle") {
    return (
      <ErrorModal
        fullScreen
        title="Verifica tu descarga"
        description="Ingresa la contraseña para continuar con la descarga"
      >
        <DownloadForm
          password={password}
          setPassword={setPassword}
          downloading={downloading}
          onSubmit={handleVerify}
        />
        {modalError && <p className="text-red-500 mt-2">{modalError}</p>}
      </ErrorModal>
    );
  }

  if (status === "success") {
    return (
      <SuccessModal
        metadata={metadata!}
        onClose={() => router.push("/")}
      />
    );
  }

  if (status === "invalidPass") return <InvalidPassword onRetry={() => setStatus("idle")} />;
  if (status === "expired") return <ExpirationWarning onRetry={() => setStatus("idle")} />;
  if (status === "notFound") return <FileNotFound onRetry={() => setStatus("idle")} />;

  return <ErrorModal title="Error" description="Ocurrió un error inesperado" />;
}
