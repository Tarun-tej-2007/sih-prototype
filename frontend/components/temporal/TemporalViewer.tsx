'use client';

import React, { useState, useRef } from 'react';
import { Layers, Sliders } from 'lucide-react';

interface TemporalViewerProps {
  beforeUrl?: string;
  afterUrl?: string;
  beforeDate?: string;
  afterDate?: string;
}

export const TemporalViewer: React.FC<TemporalViewerProps> = ({
  beforeUrl,
  afterUrl,
  beforeDate = '2024-02-14',
  afterDate = '2026-02-20',
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="flex flex-col gap-3 font-mono text-[10px] w-full">
      {/* Telemetry metadata header */}
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-2">
        <span className="font-bold text-brand-text uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-brand-accent" />
          Interactive Temporal Slider
        </span>
        <span className="text-brand-muted text-[9px] uppercase tracking-normal">
          Drag the bar horizontally
        </span>
      </div>

      {/* Slider View Box */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[400px] border border-brand-border bg-brand-surface-sec/15 rounded-sm overflow-hidden select-none cursor-ew-resize"
      >
        {/* Left Side / Before Image */}
        <div className="absolute inset-0 bg-brand-surface-sec/30 flex items-center justify-center">
          {beforeUrl ? (
            <img
              src={beforeUrl}
              alt="Before Scene"
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <div className="text-center p-4">
              <span className="text-[9px] text-brand-muted uppercase font-bold">
                T0 Sensor Grid
              </span>
              <div className="w-16 h-16 border-2 border-dashed border-brand-border/60 mx-auto mt-2 rounded-full flex items-center justify-center text-brand-muted font-bold">
                T0
              </div>
            </div>
          )}
          {/* Tag */}
          <div className="absolute bottom-3 left-3 bg-brand-bg/90 border border-brand-border px-2 py-1 rounded-sm text-[9px] font-bold text-brand-text">
            OBS T0 &bull; {beforeDate}
          </div>
        </div>

        {/* Right Side / After Image (Clipped) */}
        <div
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
          className="absolute inset-0 bg-brand-surface-sec/30 flex items-center justify-center"
        >
          {afterUrl ? (
            <img
              src={afterUrl}
              alt="After Scene"
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <div className="text-center p-4">
              <span className="text-[9px] text-brand-muted uppercase font-bold">
                T1 Sensor Grid
              </span>
              <div className="w-16 h-16 border-2 border-dashed border-brand-border/60 mx-auto mt-2 rounded-full flex items-center justify-center text-brand-muted font-bold">
                T1
              </div>
            </div>
          )}
          {/* Tag */}
          <div className="absolute bottom-3 right-3 bg-brand-bg/90 border border-brand-border px-2 py-1 rounded-sm text-[9px] font-bold text-brand-accent">
            OBS T1 &bull; {afterDate}
          </div>
        </div>

        {/* Central Split Line Handle */}
        <div
          style={{ left: `${sliderPosition}%` }}
          className="absolute inset-y-0 w-[1.5px] bg-brand-accent shadow-[0_0_8px_#67E8F9] pointer-events-none z-10"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-brand-bg border border-brand-accent text-brand-accent p-1.5 rounded-full shadow-lg pointer-events-auto cursor-ew-resize">
            <Sliders className="h-3.5 w-3.5 rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TemporalViewer;
