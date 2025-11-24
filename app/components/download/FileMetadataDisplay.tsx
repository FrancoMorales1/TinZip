import { formatFileSize} from "@/utils/formatFileSize";
import { formatDate } from "@/utils/formatDate";
import { FileRecordInfoApiResponse } from "@/app/api/validate/[id]/route";

type FileMetadataDisplayProps = {
  metadata: FileRecordInfoApiResponse;
};

export function FileMetadataDisplay({ metadata }: FileMetadataDisplayProps) {
  return (
    <div className="file-metadata-card">
      <div className="card-header">
        <div className="header-content">
          <h2 className="card-title">Información del Archivo</h2>
        </div>
      </div>
      <div className="card-body">
        <div className="info-row">
          <span className="info-label">Nombre del archivo</span>
          <span className="info-value">{metadata.title}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Descripción</span>
          <span className="info-value">{metadata.description}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Tamaño</span>
          <span className="info-value">{formatFileSize(metadata.fileSizeInBytes)}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Fecha de creación</span>
          <span className="info-value">
            {formatDate(metadata.createdAt)}
          </span>
        </div>
        <div className="info-row no-border">
          <span className="info-label">Expira el</span>
          <span className="info-value">
            {formatDate(metadata.expiresAt)}
          </span>
        </div>
      </div>
    </div>
  );
}