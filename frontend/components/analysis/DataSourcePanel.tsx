'use client';

import React from 'react';
import { UploadZone } from './UploadZone';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { File, Database, Trash2 } from 'lucide-react';
import { ImageSource } from '@/lib/types';

interface DataSourcePanelProps {
  files: ImageSource[];
  onAddFile: (file: File, modality: 'OPTICAL' | 'SAR') => void;
  onSelectDemoFile: (key: string) => void;
  onRemoveFile: (id: string) => void;
}

export const DataSourcePanel: React.FC<DataSourcePanelProps> = ({
  files,
  onAddFile,
  onSelectDemoFile,
  onRemoveFile,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* File Loader Inputs */}
      <div className="flex flex-col gap-2">
        <UploadZone onFileUploaded={onAddFile} />
        
        {/* Quick Demo Scene Loaders */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectDemoFile('optical_after')}
            className="text-[9px]"
          >
            Load Optical Scene
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectDemoFile('sar_after')}
            className="text-[9px]"
          >
            Load SAR Scene
          </Button>
        </div>
      </div>

      {/* Uploaded File Records List */}
      <div className="flex-1 flex flex-col min-h-[160px] border border-brand-border bg-brand-surface-sec/10 p-3 rounded-sm">
        <div className="flex items-center justify-between border-b border-brand-border/60 pb-2 mb-3">
          <span className="font-mono text-[10px] font-bold text-brand-text uppercase tracking-wider">
            Ingested Assets
          </span>
          <Badge variant="accent" type="tonal">
            {files.length} {files.length === 1 ? 'Asset' : 'Assets'}
          </Badge>
        </div>

        {files.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <Database className="h-6 w-6 text-brand-border mb-2 animate-pulse" />
            <span className="font-mono text-[9px] text-brand-muted uppercase">
              No files active
            </span>
            <span className="text-[9px] text-brand-muted mt-1">
              Upload local GeoTIFFs or trigger a demo scene.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto custom-scrollbar">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-start justify-between border border-brand-border/60 bg-brand-surface p-2.5 rounded-sm font-mono text-[9px]"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <File className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-brand-text font-bold truncate tracking-normal uppercase" title={file.name}>
                      {file.name}
                    </div>
                    <div className="text-brand-muted mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                      <span>{file.size}</span>
                      <span>&bull;</span>
                      <span>{file.dimensions}</span>
                    </div>
                    <div className="text-[8px] text-brand-accent/80 font-bold mt-1">
                      {file.coordinateSystem}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge variant={file.modality === 'SAR' ? 'warning' : 'accent'}>
                    {file.modality}
                  </Badge>
                  <button
                    onClick={() => onRemoveFile(file.id)}
                    className="text-brand-muted hover:text-brand-danger transition-colors focus:outline-none"
                    title="Remove asset"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
