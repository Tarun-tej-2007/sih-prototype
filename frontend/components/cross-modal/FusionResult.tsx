import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CheckCircle2 } from 'lucide-react';

export const FusionResult: React.FC = () => {
  return (
    <Card
      title="Fused Sensor Diagnostics"
      subtitle="Cross-modal mathematical consensus output"
      headerRight={
        <Badge variant="success" type="filled">
          Fusion Coherent
        </Badge>
      }
    >
      <div className="flex flex-col gap-4 font-mono text-[10px]">
        {/* Narrative Description */}
        <div className="text-xs text-brand-muted leading-relaxed font-sans bg-brand-surface-sec/15 p-3 border border-brand-border/40 rounded-sm">
          Both sensors confirm concrete structural layouts in the primary target zone. Optical high-reflectance indexes correlate perfectly with SAR polarization double-bounce backscatter anomalies.
        </div>

        {/* Telemetry logs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-brand-border/40 pt-3">
          <div className="flex flex-col gap-1 border border-brand-border/40 p-2.5 bg-brand-surface-sec/10 rounded-sm">
            <span className="text-brand-muted text-[8px] uppercase tracking-wider font-bold">
              Modality Consensus
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="h-4 w-4 text-brand-success shrink-0" />
              <span className="text-brand-text font-bold uppercase tracking-wider">
                2 Sensors Agree
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 border border-brand-border/40 p-2.5 bg-brand-surface-sec/10 rounded-sm">
            <span className="text-brand-muted text-[8px] uppercase tracking-wider font-bold">
              Fusion Confidence
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-brand-accent font-extrabold text-sm tracking-wide">
                87%
              </span>
              <Badge variant="accent" className="scale-[0.8] origin-left">
                HIGH COHERENCE
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-1 border border-brand-border/40 p-2.5 bg-brand-surface-sec/10 rounded-sm">
            <span className="text-brand-muted text-[8px] uppercase tracking-wider font-bold">
              Co-registration Error
            </span>
            <div className="flex items-center gap-1 mt-1 font-bold text-brand-text">
              <span>RMSD &lt; 0.12 px</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default FusionResult;
