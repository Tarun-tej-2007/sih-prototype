'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

import { MOCK_HISTORY } from '@/lib/mockData';

import { Search, Clock, CheckCircle2 } from 'lucide-react';

export default function AnalysisHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModality, setSelectedModality] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('DATE_DESC');

  // Expanded row detail state
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter and sort mock history records
  const filteredRecords = useMemo(() => {
    return MOCK_HISTORY.filter((item) => {
      const matchSearch =
        item.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchModality = selectedModality === 'ALL' || item.modality === selectedModality;
      const matchStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
      
      return matchSearch && matchModality && matchStatus;
    }).sort((a, b) => {
      if (sortBy === 'DATE_DESC') return b.date.localeCompare(a.date);
      if (sortBy === 'CONFIDENCE_DESC') return b.confidence - a.confidence;
      if (sortBy === 'CONFIDENCE_ASC') return a.confidence - b.confidence;
      return 0;
    });
  }, [searchQuery, selectedModality, selectedStatus, sortBy]);

  const handleRowClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full flex-grow">
      {/* Header section */}
      <section className="border border-brand-border bg-brand-surface p-6 rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col max-w-2xl font-mono text-[10px]">
            <span className="technical-label text-brand-accent/80 font-bold mb-1">
              Historical Diagnostics Database
            </span>
            <h1 className="font-mono text-lg font-extrabold uppercase tracking-wider text-brand-text">
              Analysis History Log
            </h1>
            <p className="text-xs text-brand-muted mt-1 leading-relaxed font-sans">
              Access previous remote sensing visual questions and orchestration audits. Review confidence metrics, spatial coverage bounds, and matching reports computed by the agent framework.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-brand-muted font-mono text-[10px]">
            <Clock className="h-4 w-4 text-brand-accent" />
            <span>TOTAL SESSIONS INDEXED: <b className="text-brand-text">{MOCK_HISTORY.length}</b></span>
          </div>
        </div>
      </section>

      {/* Filter and search control bar */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-[10px]">
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-3.5 w-3.5 text-brand-muted" />
          <input
            type="text"
            placeholder="Search query / location / ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border pl-9 pr-3 py-2 rounded-sm text-xs text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-accent uppercase"
          />
        </div>

        {/* Modality Filter */}
        <div className="flex items-center gap-2 bg-brand-surface border border-brand-border px-3 py-1.5 rounded-sm">
          <span className="text-brand-muted uppercase text-[9px] font-bold">Modality:</span>
          <select
            value={selectedModality}
            onChange={(e) => setSelectedModality(e.target.value)}
            className="bg-transparent border-none text-brand-text focus:outline-none flex-grow text-xs"
          >
            <option value="ALL">ALL MODALITIES</option>
            <option value="OPTICAL">OPTICAL</option>
            <option value="SAR">SAR</option>
            <option value="TEMPORAL">TEMPORAL</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 bg-brand-surface border border-brand-border px-3 py-1.5 rounded-sm">
          <span className="text-brand-muted uppercase text-[9px] font-bold">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-transparent border-none text-brand-text focus:outline-none flex-grow text-xs"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2 bg-brand-surface border border-brand-border px-3 py-1.5 rounded-sm">
          <span className="text-brand-muted uppercase text-[9px] font-bold">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-none text-brand-text focus:outline-none flex-grow text-xs"
          >
            <option value="DATE_DESC">DATE: NEWEST FIRST</option>
            <option value="CONFIDENCE_DESC">CONFIDENCE: HIGH TO LOW</option>
            <option value="CONFIDENCE_ASC">CONFIDENCE: LOW TO HIGH</option>
          </select>
        </div>
      </section>

      {/* History log list table */}
      <section className="flex flex-col">
        <Card nopadding title="Archived Reports" subtitle="Simulated historical agent logs">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse text-left font-mono text-[11px] leading-normal text-brand-muted">
              <thead>
                <tr className="border-b border-brand-border bg-brand-surface-sec/30 text-brand-text uppercase tracking-widest text-[9px]">
                  <th className="p-3 font-semibold">Session ID / Region</th>
                  <th className="p-3 font-semibold">NLP Query Parameter</th>
                  <th className="p-3 font-semibold">Sensor Modality</th>
                  <th className="p-3 font-semibold">Date Completed</th>
                  <th className="p-3 font-semibold text-right">Confidence</th>
                  <th className="p-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-brand-muted uppercase text-[9px]">
                      No archived records matched this filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item) => {
                    const isExpanded = expandedId === item.id;
                    return (
                      <React.Fragment key={item.id}>
                        <tr
                          onClick={() => handleRowClick(item.id)}
                          className={`border-b border-brand-border/60 hover:bg-brand-surface-sec/40 transition-colors cursor-pointer ${
                            isExpanded ? 'bg-brand-surface-sec/20' : ''
                          }`}
                        >
                          <td className="p-3 font-bold text-brand-text">
                            <span className="text-[9px] text-brand-muted font-normal block">{item.id}</span>
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

                        {/* Collapsible details layout */}
                        {isExpanded && (
                          <tr className="border-b border-brand-border/60 bg-brand-surface-sec/10">
                            <td colSpan={6} className="p-4 font-sans text-xs text-brand-muted leading-relaxed">
                              <div className="flex flex-col gap-2 max-w-3xl">
                                <div className="flex items-center gap-1.5 text-brand-text font-mono text-[9px] uppercase tracking-wider font-bold">
                                  <CheckCircle2 className="h-4 w-4 text-brand-success" />
                                  Geospatial Diagnostic Report Summary
                                </div>
                                <p className="text-[11px] leading-relaxed">
                                  {item.resultSummary}
                                </p>
                                <div className="flex items-center gap-3 mt-1 font-mono text-[9px] text-brand-muted">
                                  <span>COORDINATES: <b className="text-brand-text">13.0827° N, 80.2707° E (Chennai center)</b></span>
                                  <span>&bull;</span>
                                  <span>ESTIMATED SPATIAL ERROR: <b className="text-brand-text">&lt; 0.2m RMSE</b></span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
