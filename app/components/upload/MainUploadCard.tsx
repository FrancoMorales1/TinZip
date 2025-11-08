"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { hashPassword } from "@/utils/hashPassword"
import { useUpload } from "@/hooks/useUpload"
import { uploadSchema, validateFiles } from "@/utils/formValidation"
import { zipAndEncrypt } from "@/utils/zipAndEncrypt"
import { generateSecurePassword } from "@/utils/generatePassword"
import { SuccessCard } from "./SuccessCard";
import { ErrorCard } from "./ErrorCard";

export default function MainUploadCard() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>("");
  const { status, progress, link, uploadFiles, resetStatus } = useUpload();
  const [finalPassword, setFinalPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const handleReset = () => {
    setFiles([]);
    setFinalPassword("");
    setErrorMessage("");
    resetStatus();
  };

  if (status === "success") {
    return <SuccessCard link={link} password={finalPassword} onClose={handleReset} />;
  }

  if (status === "error") {
    return <ErrorCard message={errorMessage || "Ocurrió un error inesperado"} onClose={handleReset} />;
  }

  return (
    <div className="rounded-xl border-2 shadow-lg p-6 max-w-xl mx-auto relative overflow-hidden"
         style={{
           background: 'rgba(10, 10, 10, 0.95)',
           borderColor: 'var(--neon-green)',
           boxShadow: '0 0 30px rgba(0, 255, 65, 0.3), inset 0 0 30px rgba(0, 255, 65, 0.05)'
         }}>
      <div className="absolute top-0 left-0 w-full h-1"
           style={{
             background: 'linear-gradient(90deg, var(--neon-green), var(--neon-cyan), var(--neon-purple), var(--neon-pink))',
             animation: 'data-stream 3s linear infinite',
             backgroundSize: '200% 100%'
           }}></div>
      <h2 className="text-xl font-semibold mb-6 font-mono"
          style={{
            color: 'var(--neon-green)',
            textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
          }}>
        <span style={{ color: 'var(--neon-cyan)' }}>[</span> SUBIR ARCHIVOS <span style={{ color: 'var(--neon-cyan)' }}>]</span>
      </h2>

      <Formik
        initialValues={{
          origin: "el_big_tin@bigtin.tin",
          destinatarios: "bruno_go_br_br@gmail.com",
          password: "",
          title: "Titulo por defecto",
          description: "Albion Online es un MMORPG no lineal, donde escribes tu propia historia sin limitarte a seguir un camino prefijado.",
        }}
        validationSchema={uploadSchema}
        onSubmit={async (values, { resetForm }) => {
          if (files.length === 0) {
            alert("Selecciona al menos un archivo.")
            return
          }

          const password_hash = await hashPassword(values.password)
          const encryptedZip = await zipAndEncrypt(files, values.password)

          const recipients = values.destinatarios
            ? values.destinatarios.split(",").map(e => e.trim())
            : []

          await uploadFiles({
            origin: values.origin,
            recipients,
            title: values.title,
            description: values.description,
            password_hash,
            file: new Blob([encryptedZip], { type: "application/octet-stream" }),
          })
          setFinalPassword(values.password);
          resetForm()
          setFiles([])
        }}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-mono mb-1"
                     style={{ color: 'var(--neon-cyan)' }}>
                <span style={{ color: 'var(--neon-green)' }}>&gt;</span> Origen *
              </label>
              <Field name="origin" type="text"
                     className="w-full border-2 rounded-lg p-2 font-mono bg-transparent transition-all"
                     style={{
                       borderColor: 'rgba(0, 255, 255, 0.3)',
                       color: 'var(--neon-green)',
                       backgroundColor: 'rgba(0, 255, 255, 0.05)'
                     }}
                     onFocus={(e: any) => {
                       e.target.style.borderColor = 'var(--neon-cyan)';
                       e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4)';
                     }}
                     onBlur={(e: any) => {
                       e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                       e.target.style.boxShadow = 'none';
                     }} />
              <ErrorMessage name="origin" component="p"
                           className="text-sm mt-1 font-mono"
                           style={{ color: 'var(--neon-pink)' }} />
            </div>

            <div>
              <label className="block text-sm font-medium font-mono mb-1"
                     style={{ color: 'var(--neon-cyan)' }}>
                <span style={{ color: 'var(--neon-green)' }}>&gt;</span> Destinatarios
              </label>
              <Field name="destinatarios" type="text"
                     className="w-full border-2 rounded-lg p-2 font-mono bg-transparent transition-all"
                     style={{
                       borderColor: 'rgba(0, 255, 255, 0.3)',
                       color: 'var(--neon-green)',
                       backgroundColor: 'rgba(0, 255, 255, 0.05)'
                     }}
                     onFocus={(e: any) => {
                       e.target.style.borderColor = 'var(--neon-cyan)';
                       e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4)';
                     }}
                     onBlur={(e: any) => {
                       e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                       e.target.style.boxShadow = 'none';
                     }} />
              <ErrorMessage name="destinatarios" component="p"
                           className="text-sm mt-1 font-mono"
                           style={{ color: 'var(--neon-pink)' }} />
            </div>

            <div>
              <label className="block text-sm font-medium font-mono mb-1"
                     style={{ color: 'var(--neon-cyan)' }}>
                <span style={{ color: 'var(--neon-green)' }}>&gt;</span> Contraseña *
              </label>
              <div className="flex gap-2">
                <Field
                  name="password"
                  type="text"
                  value={values.password}
                  className="w-full border-2 rounded-lg p-2 font-mono bg-transparent transition-all"
                  style={{
                    borderColor: 'rgba(0, 255, 255, 0.3)',
                    color: 'var(--neon-green)',
                    backgroundColor: 'rgba(0, 255, 255, 0.05)'
                  }}
                  onFocus={(e: any) => {
                    e.target.style.borderColor = 'var(--neon-cyan)';
                    e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4)';
                  }}
                  onBlur={(e: any) => {
                    e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setFieldValue("password", generateSecurePassword(12))}
                  className="rounded-lg px-3 py-2 font-medium font-mono transition-all border-2 whitespace-nowrap"
                  style={{
                    backgroundColor: 'rgba(157, 0, 255, 0.1)',
                    borderColor: 'var(--neon-purple)',
                    color: 'var(--neon-purple)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(157, 0, 255, 0.2)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(157, 0, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(157, 0, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Generar
                </button>
              </div>
              <ErrorMessage name="password" component="p"
                           className="text-sm mt-1 font-mono"
                           style={{ color: 'var(--neon-pink)' }} />
            </div>

            <div>
              <label className="block text-sm font-medium font-mono mb-1"
                     style={{ color: 'var(--neon-cyan)' }}>
                <span style={{ color: 'var(--neon-green)' }}>&gt;</span> Título
              </label>
              <Field name="title" type="text"
                     className="w-full border-2 rounded-lg p-2 font-mono bg-transparent transition-all"
                     style={{
                       borderColor: 'rgba(0, 255, 255, 0.3)',
                       color: 'var(--neon-green)',
                       backgroundColor: 'rgba(0, 255, 255, 0.05)'
                     }}
                     onFocus={(e: any) => {
                       e.target.style.borderColor = 'var(--neon-cyan)';
                       e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4)';
                     }}
                     onBlur={(e: any) => {
                       e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                       e.target.style.boxShadow = 'none';
                     }} />
            </div>

            <div>
              <label className="block text-sm font-medium font-mono mb-1"
                     style={{ color: 'var(--neon-cyan)' }}>
                <span style={{ color: 'var(--neon-green)' }}>&gt;</span> Descripción
              </label>
              <Field as="textarea" name="description" rows="3"
                     className="w-full border-2 rounded-lg p-2 font-mono bg-transparent transition-all"
                     style={{
                       borderColor: 'rgba(0, 255, 255, 0.3)',
                       color: 'var(--neon-green)',
                       backgroundColor: 'rgba(0, 255, 255, 0.05)'
                     }}
                     onFocus={(e: any) => {
                       e.target.style.borderColor = 'var(--neon-cyan)';
                       e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4)';
                     }}
                     onBlur={(e: any) => {
                       e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                       e.target.style.boxShadow = 'none';
                     }} />
            </div>

            <div className="border-2 rounded-lg p-6 text-center transition-all relative overflow-hidden"
                 style={{
                   borderColor: fileError ? 'var(--neon-pink)' : 'rgba(0, 255, 255, 0.4)',
                   backgroundColor: fileError ? 'rgba(255, 0, 255, 0.05)' : 'rgba(0, 255, 255, 0.05)',
                   boxShadow: fileError ? '0 0 15px rgba(255, 0, 255, 0.3)' : 'none'
                 }}
                 onMouseEnter={(e) => {
                   if (!fileError) {
                     e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                     e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.4)';
                   }
                 }}
                 onMouseLeave={(e) => {
                   if (!fileError) {
                     e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.4)';
                     e.currentTarget.style.boxShadow = 'none';
                   }
                 }}>

              <input
                type="file"
                multiple
                id="file-upload"
                className="hidden"
                onChange={(e) => {
                  if (!e.target.files) return;
                  const selected = Array.from(e.target.files);
                  setFiles(selected);

                  const validation = validateFiles(selected);
                  setFileError(validation.valid ? "" : validation.message);
                }}
              />
              <label htmlFor="file-upload"
                     className="cursor-pointer font-medium font-mono flex items-center justify-center gap-2"
                     style={{ color: 'var(--neon-cyan)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                ARRASTRA O SELECCIONA ARCHIVOS
              </label>

              {files.length > 0 && (
                <ul className="mt-3 text-sm text-left font-mono"
                    style={{ color: 'var(--neon-green)' }}>
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span style={{ color: 'var(--neon-cyan)' }}>▸</span> {f.name}
                    </li>
                  ))}
                </ul>
              )}

              {fileError && (
                <p className="text-sm mt-2 font-mono"
                   style={{ color: 'var(--neon-pink)' }}>
                  <span>⚠</span> {fileError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || !dirty || isSubmitting || status === "uploading" || !!fileError || files.length === 0}
              className="w-full rounded-lg py-3 font-semibold transition-all font-mono border-2 relative overflow-hidden"
              style={{
                backgroundColor: (!isValid || !dirty || isSubmitting || status === "uploading" || !!fileError || files.length === 0)
                  ? 'rgba(50, 50, 50, 0.5)'
                  : 'rgba(0, 255, 65, 0.1)',
                borderColor: (!isValid || !dirty || isSubmitting || status === "uploading" || !!fileError || files.length === 0)
                  ? 'rgba(100, 100, 100, 0.5)'
                  : 'var(--neon-green)',
                color: (!isValid || !dirty || isSubmitting || status === "uploading" || !!fileError || files.length === 0)
                  ? 'rgba(150, 150, 150, 0.5)'
                  : 'var(--neon-green)',
                cursor: (!isValid || !dirty || isSubmitting || status === "uploading" || !!fileError || files.length === 0)
                  ? 'not-allowed'
                  : 'pointer',
                boxShadow: (!isValid || !dirty || isSubmitting || status === "uploading" || !!fileError || files.length === 0)
                  ? 'none'
                  : '0 0 20px rgba(0, 255, 65, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!((!isValid || !dirty || isSubmitting || status === "uploading" || !!fileError || files.length === 0))) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.2)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!((!isValid || !dirty || isSubmitting || status === "uploading" || !!fileError || files.length === 0))) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
                }
              }}
            >
              {status === "uploading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SUBIENDO... {progress}%
                </span>
              ) : (
                "[ COMPRIMIR Y ENVIAR ]"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
