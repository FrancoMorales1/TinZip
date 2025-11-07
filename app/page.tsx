"use client"

import Header from "./components/uploadFiles/Header"
import MainUploadCard from "./components/uploadFiles/MainUploadCard"
import SecurityInfoCards from "./components/uploadFiles/SecurityInfoCards"


export default function FileUploadPage() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Header />
        <MainUploadCard />
        <SecurityInfoCards />
      </div>
    </div>
  )
}
