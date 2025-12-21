import React, { useRef } from 'react';
import { useEditor } from '../contexts/EditorContext';
import { Upload } from 'lucide-react';
import RecentFiles from './RecentFiles';
import { addRecentFile } from '../services/recentFiles';

const FileUpload: React.FC = () => {
  const { setDocument } = useEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocument(file);
      addRecentFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        onClick={triggerFileInput}
        id="file-upload"
        className="upload-zone group relative w-full h-36 rounded-2xl border-2 border-dashed border-[var(--color-primary-300)] hover:border-[var(--color-primary-500)] bg-[var(--bg-secondary)] hover:bg-[var(--hover-bg)] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3 overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-500)]/0 via-[var(--color-primary-500)]/5 to-[var(--color-primary-500)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="p-4 bg-[var(--card-bg)] rounded-2xl shadow-lg shadow-[var(--color-primary-200)]/50 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[var(--color-primary-300)]/50 transition-all duration-300 relative z-10">
          <Upload className="w-6 h-6 text-[var(--color-primary-600)] group-hover:text-[var(--color-primary-700)] transition-colors" />
        </div>
        <div className="text-center relative z-10">
          <p className="text-sm font-semibold text-[var(--color-primary-700)] group-hover:text-[var(--color-primary-800)] transition-colors">
            Click to upload PDF
          </p>
          <p className="text-xs text-[var(--color-primary-500)] mt-1">
            or drag and drop
          </p>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--color-primary-400)]/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--color-primary-400)]/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--color-primary-400)]/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--color-primary-400)]/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      <RecentFiles onFileSelect={(fileName) => {
        // In a real implementation, we'd need a way to load the file from storage or API
        // For now, we'll just log or alert, as we can't re-upload from name alone without FS access API or Blob URL storage
        alert(`Re-opening ${fileName} is not fully implemented in this demo without backend storage.`);
      }} />
    </div>
  );
};

export default FileUpload;