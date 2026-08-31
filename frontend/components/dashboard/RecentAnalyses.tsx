'use client';

import React from 'react';
import { MOCK_HISTORY } from '@/lib/mockData';
import { Badge } from '../ui/Badge';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

export const RecentAnalyses: React.FC = () => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full border-collapse text-left font-mono text-[11px] leading-normal text-brand-muted">
        <thead>
          <tr className="border-b border-brand-border bg-brand-surface-sec/30 text-brand-text uppercase tracking-widest text-[9px]">
            <th className="p-3 font-semibold">Mission ID / Location</th>
            <th className="p-3 font-semibold">Query Parameter</th>
            <th className="p-3 font-semibold">Modality</th>
            <th className="p-3 font-semibold">Timestamp</th>
            <th className="p-3 font-semibold text-right">Confidence</th>
            <th className="p-3 font-semibold text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_HISTORY.map((item) => (
            <tr
              key={item.id}
              onClick={() => router.push(ROUTES.HISTORY)}
              className="border-b border-brand-border/60 hover:bg-brand-surface-sec/40 transition-colors cursor-pointer"
            >
              <td className="p-3 font-bold text-brand-text">
                <span className="text-[10px] text-brand-muted block uppercase font-normal">{item.id}</span>
                {item.region}
              </td>
              <td className="p-3 max-w-xs truncate text-brand-text/90 italic">
                &ldquo;{item.query}&rdquo;
              </td>
              <td className="p-3">
                <Badge variant={item.modality === 'TEMPORAL' ? 'warning' : 'accent'} type="tonal">
                  {item.modality}
                </Badge>
              </td>
              <td className="p-3 text-[10px]">{item.date}</td>
              <td className="p-3 text-right font-bold text-brand-accent">
                {item.confidence}%
              </td>
              <td className="p-3 text-right">
                <Badge variant="success" type="outline">
                  {item.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
