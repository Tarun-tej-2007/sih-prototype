'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
  onFileUploaded: (file: File, modality: 'OPTICAL' | 'SAR') => void;
  acceptedFormats?: string;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileUploaded,
  acceptedFormats = '.tif,.tiff,.png,.jpeg,.jpg',
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const formats = acceptedFormats.split(',');
    
    if (!formats.includes(extension) && !file.type.startsWith('image/')) {
      setErrorMessage(`Invalid format. Accepted: ${acceptedFormats}`);
      return;
    }
    
    setErrorMessage(null);
    // Auto-detect modality from file name or default to Optical
    const isSar = file.name.toLowerCase().includes('sar') || file.name.toLowerCase().includes('s1');
    onFileUploaded(file, isSar ? 'SAR' : 'OPTICAL');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
      className={`group relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-sm cursor-pointer transition-colors font-mono text-[10px] ${
        isDragActive
          ? 'border-brand-accent bg-brand-accent/5'
          : 'border-brand-border bg-brand-surface-sec/10 hover:border-brand-accent/40'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedFormats}
        onChange={handleChange}
      />
      
      <UploadCloud className="h-7 w-7 text-brand-muted group-hover:text-brand-accent transition-colors mb-2" />
      <span className="text-brand-text font-bold uppercase tracking-wider mb-1">
        Drag &amp; Drop Imagery
      </span>
      <span className="text-brand-muted text-[9px] mb-2 text-center">
        or click to browse local files
      </span>
      
      <div className="text-[8px] text-brand-muted border-t border-brand-border/40 pt-1.5 w-full text-center">
        GEO-TIFF, TIFF, PNG, JPEG
      </div>

      {errorMessage && (
        <div className="absolute inset-x-0 bottom-0 bg-brand-danger/90 text-brand-text p-2 flex items-center gap-2 text-[9px] font-semibold rounded-b-sm">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
