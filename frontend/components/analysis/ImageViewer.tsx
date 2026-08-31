'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Layers,
  Compass,
  Grid,
  Scan
} from 'lucide-react';
import { Evidence } from '@/lib/types';

interface ImageViewerProps {
  imageUrl?: string;
  modalityLabel?: string;
  evidenceOverlays?: Evidence[];
  activeEvidenceId?: string | null;
  onSelectEvidence?: (id: string | null) => void;
  showChangeMap?: boolean;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  imageUrl,
  modalityLabel = 'OPTICAL',
  evidenceOverlays = [],
  activeEvidenceId = null,
  onSelectEvidence,
  showChangeMap = false,
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showOverlays, setShowOverlays] = useState(true);
  const [opacity, setOpacity] = useState<number>(100);
  const [mouseCoords, setMouseCoords] = useState({ lat: 13.0827, lng: 80.2707 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Handle auto-focus and zoom when evidence is selected
  useEffect(() => {
    if (activeEvidenceId) {
      // Zoom in and reset pan to simulate centering asynchronously to prevent synchronous cascades
      const timer = setTimeout(() => {
        setZoom(160);
        setPan({ x: -10, y: -20 });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeEvidenceId]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 50));
  const handleReset = () => {
    setZoom(100);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Simulate latitude and longitude offsets based on pixel movement
    const baseLat = 13.0827;
    const baseLng = 80.2707;
    const latOffset = (y - rect.height / 2) * -0.0001;
    const lngOffset = (x - rect.width / 2) * 0.0001;
    
    setMouseCoords({
      lat: Number((baseLat + latOffset).toFixed(6)),
      lng: Number((baseLng + lngOffset).toFixed(6)),
    });

    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative border border-brand-border bg-brand-bg select-none flex-grow flex flex-col min-h-[350px] overflow-hidden rounded-sm ${
        isFullscreen ? 'h-screen w-screen z-50 fixed inset-0' : ''
      }`}
    >
      {/* Top Toolbar Navigation */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 bg-brand-bg/90 border border-brand-border px-2.5 py-1.5 rounded-sm pointer-events-auto shadow-md">
          <Layers className="h-3.5 w-3.5 text-brand-accent" />
          <span className="font-mono text-[9px] font-bold text-brand-text uppercase tracking-widest">
            {modalityLabel}
          </span>
          {showChangeMap && (
            <span className="font-mono text-[8px] bg-brand-warning/20 border border-brand-warning/30 text-brand-warning px-1 rounded-sm ml-1 uppercase">
              Change Map Active
            </span>
          )}
        </div>

        {/* Layer Controls */}
        <div className="flex items-center gap-1.5 bg-brand-bg/90 border border-brand-border p-1 rounded-sm pointer-events-auto shadow-md">
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Toggle Grid Overlay"
            className={`p-1.5 rounded-sm transition-colors ${
              showGrid ? 'text-brand-accent bg-brand-surface-sec' : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            <Grid className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            title="Toggle Evidence Overlays"
            className={`p-1.5 rounded-sm transition-colors ${
              showOverlays ? 'text-brand-accent bg-brand-surface-sec' : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            <Scan className="h-3.5 w-3.5" />
          </button>
          <div className="w-[1px] h-4 bg-brand-border mx-1" />
          {/* Opacity slider */}
          <div className="flex items-center gap-1.5 px-2">
            <span className="font-mono text-[8px] text-brand-muted">OPACITY</span>
            <input
              type="range"
              min="20"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-16 h-1 accent-brand-accent bg-brand-border rounded-lg appearance-none cursor-pointer"
            />
            <span className="font-mono text-[8px] text-brand-text w-6">{opacity}%</span>
          </div>
        </div>
      </div>

      {/* Satellite Viewer Content */}
      <div className="flex-grow flex items-center justify-center relative cursor-grab active:cursor-grabbing overflow-hidden">
        {/* Simulated Coordinate Grid */}
        {showGrid && (
          <div className="absolute inset-0 z-[2] pointer-events-none opacity-20 bg-[linear-gradient(to_right,#67E8F9_1px,transparent_1px),linear-gradient(to_bottom,#67E8F9_1px,transparent_1px)] bg-[size:40px_40px]">
            {/* Grid ticking markers */}
            <div className="absolute top-2 left-10 font-mono text-[8px] text-brand-accent/50">13.085° N</div>
            <div className="absolute top-10 left-2 font-mono text-[8px] text-brand-accent/50">80.270° E</div>
          </div>
        )}

        {/* Render satellite view box */}
        <div
          ref={imageRef}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})`,
            opacity: opacity / 100,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
          className="relative w-[500px] h-[350px] border border-brand-border/40 select-none flex items-center justify-center bg-brand-surface-sec/10 overflow-hidden"
        >
          {/* Procedural grid or actual image fallback */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Satellite Scene"
              className="w-full h-full object-cover pointer-events-none"
              onError={(e) => {
                // If local image fails to load, render procedural canvas
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-[1]">
              <Compass className="h-10 w-10 text-brand-border/80 mb-2 animate-spin [animation-duration:10s]" />
              <span className="font-mono text-[9px] text-brand-accent font-bold uppercase tracking-wider">
                Telemetry Scan Grid
              </span>
              <span className="text-[8px] text-brand-muted mt-1 max-w-[200px]">
                No image active. Load optical or SAR scenes to render sensor pixels.
              </span>
            </div>
          )}

          {/* Radar Scanning Sweep Line */}
          <div className="absolute inset-x-0 h-[1.5px] bg-brand-accent/20 shadow-[0_0_8px_#67E8F9] animate-[bounce_6s_infinite] pointer-events-none z-[1]" />

          {/* Evidence Highlight Overlays */}
          {showOverlays &&
            evidenceOverlays.map((ev) => {
              const isActive = activeEvidenceId === ev.id;
              return (
                <div
                  key={ev.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectEvidence) onSelectEvidence(isActive ? null : ev.id);
                  }}
                  style={{
                    clipPath: ev.polygonPoints || 'polygon(20% 20%, 50% 20%, 50% 50%, 20% 50%)',
                    backgroundColor: isActive ? `${ev.color}22` : `${ev.color}09`,
                    borderColor: ev.color,
                  }}
                  className={`absolute inset-0 border-2 border-dashed z-[3] cursor-pointer hover:bg-opacity-20 hover:border-solid transition-all duration-150 ${
                    isActive ? 'border-solid border-3 ring-1 ring-brand-text' : ''
                  }`}
                  title={`${ev.label} (${ev.confidence}%)`}
                >
                  {/* Bounding box header label inside clip coordinate bounds */}
                  <div className="absolute top-1 left-1 bg-brand-bg/95 border border-brand-border px-1 py-0.5 rounded-sm font-mono text-[6px] text-brand-text scale-75 origin-top-left flex items-center gap-1 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ev.color }} />
                    {ev.label.toUpperCase()} ({ev.confidence}%)
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Lower Dashboard (Coordinates & Zoom Actions) */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Bottom Left Coordinate Readout */}
        <div className="bg-brand-bg/95 border border-brand-border px-2.5 py-1.5 rounded-sm font-mono text-[9px] text-brand-muted pointer-events-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-brand-accent font-bold">LAT:</span>
            <span className="text-brand-text font-semibold tabular-nums">{mouseCoords.lat}° N</span>
          </div>
          <div className="w-[1px] h-3 bg-brand-border" />
          <div className="flex items-center gap-1.5">
            <span className="text-brand-accent font-bold">LNG:</span>
            <span className="text-brand-text font-semibold tabular-nums">{mouseCoords.lng}° E</span>
          </div>
        </div>

        {/* Bottom Right Zoom controls */}
        <div className="flex items-center gap-1.5 bg-brand-bg/95 border border-brand-border p-1 rounded-sm pointer-events-auto">
          <button
            onClick={handleZoomOut}
            className="p-1 text-brand-muted hover:text-brand-text hover:bg-brand-surface-sec/50 rounded-sm transition-all focus:outline-none"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span
            onClick={handleReset}
            className="font-mono text-[9px] text-brand-text font-bold px-1.5 cursor-pointer hover:text-brand-accent transition-colors"
            title="Reset Scale"
          >
            {zoom}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1 text-brand-muted hover:text-brand-text hover:bg-brand-surface-sec/50 rounded-sm transition-all focus:outline-none"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <div className="w-[1px] h-4 bg-brand-border mx-1" />
          <button
            onClick={toggleFullscreen}
            className="p-1 text-brand-muted hover:text-brand-text hover:bg-brand-surface-sec/50 rounded-sm transition-all focus:outline-none"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Custom scale gauge line overlay */}
      <div className="absolute bottom-16 right-5 font-mono text-[8px] text-brand-muted flex flex-col items-center gap-1 pointer-events-none">
        <div className="w-16 h-1 border-x border-b border-brand-muted" />
        <span>250 m</span>
      </div>
    </div>
  );
};
export default ImageViewer;
