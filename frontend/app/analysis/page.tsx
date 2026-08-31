'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { DataSourcePanel } from '@/components/analysis/DataSourcePanel';
import { ImageViewer } from '@/components/analysis/ImageViewer';
import { QueryPanel } from '@/components/analysis/QueryPanel';
import { AgentTrace } from '@/components/analysis/AgentTrace';
import { AnalysisResult } from '@/components/analysis/AnalysisResult';
import { EvidencePanel } from '@/components/analysis/EvidencePanel';
import { MOCK_IMAGERY, SIMULATED_RESULTS, MOCK_STEPS } from '@/lib/mockData';
import { ImageSource, AgentStep, AnalysisResult as ResultType } from '@/lib/types';
import { ShieldCheck } from 'lucide-react';

export default function AnalysisWorkspace() {
  // Loaded source images state
  const [activeFiles, setActiveFiles] = useState<ImageSource[]>([
    MOCK_IMAGERY.optical_after, // Load one default image so workspace is immediately functional
  ]);

  const [activeImageKey, setActiveImageKey] = useState<string>('optical_after');
  const [queryText, setQueryText] = useState<string>('');
  
  // Execution state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<AgentStep[]>(MOCK_STEPS);

  const [analysisFinished, setAnalysisFinished] = useState(false);
  
  // Selected analysis result & interactive overlays
  const [currentResult, setCurrentResult] = useState<ResultType | null>(null);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);

  // Ingest custom uploaded local file
  const handleIngestFile = (file: File, modality: 'OPTICAL' | 'SAR') => {
    const newAsset: ImageSource = {
      id: `img-user-${Date.now()}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      modality,
      dimensions: '4,096 × 4,096 px', // mock bounds
      coordinateSystem: 'WGS 84 / UTM',
      status: 'READY',
      url: '', // local vector radar view fallback
    };
    setActiveFiles((prev) => [newAsset, ...prev]);
  };

  // Select preloaded demo scene
  const handleSelectDemoScene = (key: string) => {
    const demoAsset = MOCK_IMAGERY[key];
    if (demoAsset && !activeFiles.some((f) => f.id === demoAsset.id)) {
      setActiveFiles((prev) => [demoAsset, ...prev]);
    }
    setActiveImageKey(key);
  };

  const handleRemoveFile = (id: string) => {
    setActiveFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Run NLP Analysis State Machine
  const handleStartAnalysis = async () => {
    if (!queryText.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisFinished(false);
    setCurrentResult(null);
    setSelectedEvidenceId(null);

    // Initialize all trace steps to pending
    const resetSteps: AgentStep[] = MOCK_STEPS.map((s) => ({ ...s, status: 'pending' }));
    setExecutionSteps(resetSteps);

    // Run sequentially with timeouts matching instructions
    const stepsToRun = [...resetSteps];
    
    for (let i = 0; i < stepsToRun.length; i++) {
      stepsToRun[i] = { ...stepsToRun[i], status: 'running' as const };
      setExecutionSteps([...stepsToRun]);

      await new Promise((resolve) => setTimeout(resolve, stepsToRun[i].duration));

      stepsToRun[i] = { ...stepsToRun[i], status: 'completed' as const };
      setExecutionSteps([...stepsToRun]);
    }

    // Determine mock results based on query keywords
    const lowerQuery = queryText.toLowerCase();
    let resultKey = 'default';
    if (lowerQuery.includes('change') || lowerQuery.includes('before') || lowerQuery.includes('compare')) {
      resultKey = 'change';
    } else if (lowerQuery.includes('build') || lowerQuery.includes('structure') || lowerQuery.includes('house')) {
      resultKey = 'structures';
    } else if (lowerQuery.includes('water') || lowerQuery.includes('lake') || lowerQuery.includes('reservoir')) {
      resultKey = 'water';
    } else if (lowerQuery.includes('sar') || lowerQuery.includes('polarization')) {
      resultKey = 'compare';
    }

    setCurrentResult(SIMULATED_RESULTS[resultKey]);
    setIsAnalyzing(false);
    setAnalysisFinished(true);
  };

  // Instantly finish analysis for faster testing
  const handleSkipDelay = () => {
    if (!isAnalyzing) return;
    
    const completedSteps: AgentStep[] = executionSteps.map((s) => ({
      ...s,
      status: 'completed',
      duration: 100,
    }));
    setExecutionSteps(completedSteps);
    
    const lowerQuery = queryText.toLowerCase();
    let resultKey = 'default';
    if (lowerQuery.includes('change') || lowerQuery.includes('before') || lowerQuery.includes('compare')) {
      resultKey = 'change';
    } else if (lowerQuery.includes('build') || lowerQuery.includes('structure') || lowerQuery.includes('house')) {
      resultKey = 'structures';
    } else if (lowerQuery.includes('water') || lowerQuery.includes('lake') || lowerQuery.includes('reservoir')) {
      resultKey = 'water';
    } else if (lowerQuery.includes('sar') || lowerQuery.includes('polarization')) {
      resultKey = 'compare';
    }
    
    setCurrentResult(SIMULATED_RESULTS[resultKey]);
    setIsAnalyzing(false);
    setAnalysisFinished(true);
  };

  // Find the URL of the active image
  const getActiveImageUrl = () => {
    const activeAsset = activeFiles.find((f) => f.id === MOCK_IMAGERY[activeImageKey]?.id) || activeFiles[0];
    return activeAsset?.url || '';
  };

  const getActiveModality = () => {
    const activeAsset = activeFiles.find((f) => f.id === MOCK_IMAGERY[activeImageKey]?.id) || activeFiles[0];
    return activeAsset?.modality || 'OPTICAL';
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full flex-grow">
      {/* Dynamic Upper Grid panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column - Ingestion Controls (25%) */}
        <div className="lg:col-span-3 flex flex-col">
          <Card title="Data Ingestion" subtitle="Upload GeoTIFF sensor scenes" className="h-full">
            <DataSourcePanel
              files={activeFiles}
              onAddFile={handleIngestFile}
              onSelectDemoFile={handleSelectDemoScene}
              onRemoveFile={handleRemoveFile}
            />
          </Card>
        </div>

        {/* Center Column - Spatial View Container (55%) */}
        <div className="lg:col-span-6 flex flex-col min-h-[400px]">
          <ImageViewer
            imageUrl={getActiveImageUrl()}
            modalityLabel={getActiveModality()}
            evidenceOverlays={currentResult?.evidence}
            activeEvidenceId={selectedEvidenceId}
            onSelectEvidence={setSelectedEvidenceId}
            showChangeMap={currentResult?.analysisType === 'CHANGE_DETECTION'}
          />
        </div>

        {/* Right Column - Ask Panel & Outputs (20%) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Card title="Analysis Control" subtitle="Query remote sensing inputs">
            <QueryPanel
              query={queryText}
              setQuery={setQueryText}
              onAnalyze={handleStartAnalysis}
              isRunning={isAnalyzing}
            />
          </Card>

          {/* Quick skip trigger during simulation */}
          {isAnalyzing && (
            <button
              onClick={handleSkipDelay}
              className="w-full text-center text-[10px] font-mono border border-brand-border py-2 text-brand-accent hover:bg-brand-surface-sec/40 transition-colors uppercase tracking-wider font-semibold"
            >
              Skip processing simulation &rarr;
            </button>
          )}

          {/* Analysis Report Card */}
          {analysisFinished && currentResult && (
            <AnalysisResult result={currentResult} />
          )}

          {!isAnalyzing && !analysisFinished && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 border border-brand-border bg-brand-surface-sec/10 text-center font-mono text-[9px] text-brand-muted uppercase">
              <ShieldCheck className="h-6 w-6 text-brand-border mb-2" />
              <span>Awaiting Query</span>
              <span className="text-[8px] tracking-normal lowercase mt-1">
                Select templates or ask questions.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Area - Execution Steps or Evidence highlights */}
      {isAnalyzing && (
        <Card title="Trace Protocol" subtitle="AI router parsing query instructions">
          <AgentTrace steps={executionSteps} />
        </Card>
      )}

      {analysisFinished && currentResult && currentResult.evidence.length > 0 && (
        <EvidencePanel
          evidenceList={currentResult.evidence}
          activeEvidenceId={selectedEvidenceId}
          onSelectEvidence={setSelectedEvidenceId}
        />
      )}
    </div>
  );
}
