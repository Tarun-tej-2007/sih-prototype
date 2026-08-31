import { ModelInfo, HistoryRecord, ImageSource, AnalysisResult, AgentStep } from './types';

export const MOCK_MODELS: ModelInfo[] = [
  {
    name: 'Vision-Language Router',
    type: 'Core Router',
    version: 'v2.1-stable',
    status: 'READY',
    modality: 'MULTIMODAL (Optical, SAR, Multispectral)',
    task: 'Query Intent Routing & Specialist Orchestration',
    input: 'Natural language query + satellite metadata',
    output: 'Routing decisions & execution graph'
  },
  {
    name: 'Remote Sensing VQA (RS-VQA)',
    type: 'Vision-Language Model',
    version: 'v1.4-fine-tuned',
    status: 'READY',
    modality: 'Optical / Multispectral',
    task: 'Visual Question Answering & Scene Description',
    input: 'Single optical scene + NL query',
    output: 'Textual answer & confidence score'
  },
  {
    name: 'Temporal Change Engine',
    type: 'Change Detection',
    version: 'v0.9-beta',
    status: 'READY',
    modality: 'Temporal (Before + After)',
    task: 'Co-registered imagery pixel-difference & semantic drift analysis',
    input: 'Two aligned optical/SAR scenes',
    output: 'Change mask + statistics + explanation'
  },
  {
    name: 'ResNet-UNet Segmenter',
    type: 'Semantic Segmentation',
    version: 'v3.2',
    status: 'READY',
    modality: 'Optical (High-Res)',
    task: 'Land Use / Land Cover (LULC) categorization',
    input: 'Optical imagery scene',
    output: 'Pixel-level segmentation mask (Built-up, Water, Vegetation, Soil)'
  },
  {
    name: 'YOLOv8-Oblique OBB',
    type: 'Object Detection',
    version: 'v5.0-OBB',
    status: 'READY',
    modality: 'Optical / SAR',
    task: 'Oriented bounding box extraction for vessels, aircraft, and buildings',
    input: 'High-res satellite scene',
    output: 'Bounding boxes + object classes + confidence'
  },
  {
    name: 'SAR backscatter Profiler',
    type: 'SAR Analysis',
    version: 'v1.1',
    status: 'READY',
    modality: 'SAR (Sentinel-1 / RISAT)',
    task: 'Double-bounce reflection extraction & structural roughness profile',
    input: 'Single/Dual polarization SAR scene',
    output: 'Surface roughness mapping & metallic/structural indicator'
  },
  {
    name: 'Cross-Modal Fusion Network',
    type: 'Evidence Fusion',
    version: 'v2.0-experimental',
    status: 'READY',
    modality: 'Optical + SAR Dual Ingest',
    task: 'Fusing optical spectral indices with SAR backscatter signatures',
    input: 'Co-registered Optical + SAR pairs',
    output: 'Fused anomaly indicator & consensus score'
  }
];

export const MOCK_HISTORY: HistoryRecord[] = [
  {
    id: 'rec-001',
    name: 'Urban Expansion Analysis',
    query: 'Identify newly constructed structures and calculate change area.',
    modality: 'TEMPORAL',
    date: '2026-08-28 09:12 UTC',
    confidence: 92,
    status: 'COMPLETED',
    region: 'Chennai Region',
    resultSummary: 'Detected 1.84 km² of new built-up expansion in the northeastern sector.'
  },
  {
    id: 'rec-002',
    name: 'Waterbody Shrinkage Assessment',
    query: 'Show the water levels and boundary shifts.',
    modality: 'TEMPORAL',
    date: '2026-08-27 14:32 UTC',
    confidence: 87,
    status: 'COMPLETED',
    region: 'Region 04 Reservoir',
    resultSummary: 'Reservoir surface area shrank by 0.8 km² (12%) due to seasonal drift.'
  },
  {
    id: 'rec-003',
    name: 'Structural Profile Alignment',
    query: 'Verify structural footprints under cloud cover using SAR.',
    modality: 'SAR',
    date: '2026-08-25 11:05 UTC',
    confidence: 94,
    status: 'COMPLETED',
    region: 'Test Scene 03 - Port Area',
    resultSummary: 'SAR polarization backscatter indicates high-density double-bounce structures, confirming port buildings.'
  },
  {
    id: 'rec-004',
    name: 'Agricultural LULC Review',
    query: 'Classify agricultural crop plots in the delta section.',
    modality: 'OPTICAL',
    date: '2026-08-22 08:44 UTC',
    confidence: 91,
    status: 'COMPLETED',
    region: 'Delta Sector 11',
    resultSummary: 'Categorized 450 hectares of active paddy fields and 120 hectares of fallow land.'
  }
];

export const SUGGESTED_QUERIES = [
  'What changed in this region?',
  'Identify newly constructed structures.',
  'Where are the major water bodies?',
  'Compare the optical and SAR observations.',
  'Is there evidence of urban expansion?'
];

export const MOCK_IMAGERY: Record<string, ImageSource> = {
  optical_before: {
    id: 'img-opt-bef',
    name: 'sentinel2_chennai_20240214.tif',
    size: '48.2 MB',
    modality: 'OPTICAL',
    dimensions: '10,980 × 10,980 px',
    coordinateSystem: 'WGS 84 / UTM zone 44N',
    status: 'READY',
    url: '/demo/chennai_optical_before.jpg'
  },
  optical_after: {
    id: 'img-opt-aft',
    name: 'sentinel2_chennai_20260220.tif',
    size: '51.4 MB',
    modality: 'OPTICAL',
    dimensions: '10,980 × 10,980 px',
    coordinateSystem: 'WGS 84 / UTM zone 44N',
    status: 'READY',
    url: '/demo/chennai_optical_after.jpg'
  },
  sar_after: {
    id: 'img-sar-aft',
    name: 'sentinel1_chennai_20260221.tif',
    size: '34.8 MB',
    modality: 'SAR',
    dimensions: '8,420 × 9,110 px',
    coordinateSystem: 'WGS 84 / UTM zone 44N',
    status: 'READY',
    url: '/demo/chennai_sar.jpg'
  }
};

// Simulated query execution response dictionary
export const SIMULATED_RESULTS: Record<string, AnalysisResult> = {
  change: {
    title: 'NEW BUILT-UP DEVELOPMENT DETECTED',
    summary: 'Multi-temporal analysis detects significant spectral and backscatter transitions consistent with new building construction in the northeastern sector, spanning approximately 1.84 km².',
    confidence: 92,
    analysisType: 'CHANGE_DETECTION',
    specialists: ['Temporal Change Engine', 'ResNet-UNet Segmenter', 'YOLOv8-Oblique OBB'],
    evidence: [
      {
        id: 'ev-1',
        label: 'New Structural Footprints',
        confidence: 94,
        area: '1.84 km²',
        region: 'Northeastern Sector',
        coordinates: '13.0827° N, 80.2707° E',
        description: 'Spectral reflectance shifted from vegetation/soil signature to high concrete/reflective profile; confirmed by YOLO object detection boxes.',
        color: '#67E8F9', // brand-accent cyan
        polygonPoints: 'polygon(55% 20%, 85% 20%, 85% 55%, 55% 55%)'
      },
      {
        id: 'ev-2',
        label: 'Vegetation Loss Anomaly',
        confidence: 88,
        area: '2.10 km²',
        region: 'Northeastern Perimeter',
        coordinates: '13.0880° N, 80.2740° E',
        description: 'Drop in Sentinel-2 NDVI (Normalized Difference Vegetation Index) from 0.65 to 0.18, verifying clear-cutting for site preparation.',
        color: '#F87171', // brand-danger red
        polygonPoints: 'polygon(45% 10%, 75% 10%, 75% 30%, 45% 30%)'
      },
      {
        id: 'ev-3',
        label: 'Adjacent Reservoir Boundary Stability',
        confidence: 95,
        area: 'Stable',
        region: 'Eastern Water Margin',
        coordinates: '13.0760° N, 80.2820° E',
        description: 'NDWI indexes indicate waterbody margins remain unaltered. No construction runoff encroachments detected.',
        color: '#4ADE80', // brand-success green
        polygonPoints: 'polygon(15% 65%, 45% 65%, 45% 95%, 15% 95%)'
      }
    ]
  },
  structures: {
    title: 'STRUCTURE DETECTED & SEGMENTED',
    summary: 'Optical high-resolution semantic segmentation successfully extracted building footprints and commercial structural layouts across the visible frame.',
    confidence: 94,
    analysisType: 'GROUNDING',
    specialists: ['ResNet-UNet Segmenter', 'YOLOv8-Oblique OBB'],
    evidence: [
      {
        id: 'ev-struct-1',
        label: 'Commercial Complex Block',
        confidence: 95,
        area: '0.85 km²',
        region: 'Northeastern Sector',
        coordinates: '13.0840° N, 80.2710° E',
        description: 'Oblique bounding boxes identifying 12 rectangular structural roofs with metal cladding signatures.',
        color: '#67E8F9',
        polygonPoints: 'polygon(58% 22%, 78% 22%, 78% 42%, 58% 42%)'
      },
      {
        id: 'ev-struct-2',
        label: 'Residential Housing Layout',
        confidence: 91,
        area: '0.99 km²',
        region: 'Eastern Sub-grid',
        coordinates: '13.0810° N, 80.2790° E',
        description: 'Grid patterns matching dense residential residential clusters, average building spacing 4.2 meters.',
        color: '#FBBF24', // brand-warning yellow
        polygonPoints: 'polygon(60% 48%, 82% 48%, 82% 70%, 60% 70%)'
      }
    ]
  },
  water: {
    title: 'HYDROLOGICAL SURFACE EXTRACTION',
    summary: 'Identified major waterbodies and secondary canal structures via NDWI (Normalized Difference Water Index) spectral mapping.',
    confidence: 96,
    analysisType: 'VQA',
    specialists: ['ResNet-UNet Segmenter'],
    evidence: [
      {
        id: 'ev-water-1',
        label: 'Primary Reservoir Body',
        confidence: 98,
        area: '3.42 km²',
        region: 'Southwest Sector',
        coordinates: '13.0550° N, 80.2310° E',
        description: 'Deep absorption in near-infrared bands combined with high NDWI values mapping a stable reservoir surface.',
        color: '#4ADE80',
        polygonPoints: 'polygon(10% 60%, 48% 60%, 48% 95%, 10% 95%)'
      },
      {
        id: 'ev-water-2',
        label: 'Feeder Drainage Canal',
        confidence: 93,
        area: '0.38 km²',
        region: 'Southern Margin',
        coordinates: '13.0520° N, 80.2450° E',
        description: 'Linear water feature connecting agricultural runoffs to the reservoir basin.',
        color: '#67E8F9',
        polygonPoints: 'polygon(40% 75%, 65% 75%, 65% 90%, 40% 90%)'
      }
    ]
  },
  compare: {
    title: 'OPTICAL / SAR DUAL SIGNATURE COMPARISON',
    summary: 'Cross-modal consensus confirms concrete structural features in the central sector. Ground truth is validated through cloud cover using radar backscatter.',
    confidence: 89,
    analysisType: 'CROSS_MODAL',
    specialists: ['SAR backscatter Profiler', 'ResNet-UNet Segmenter', 'Cross-Modal Fusion Network'],
    evidence: [
      {
        id: 'ev-fuse-1',
        label: 'SAR Double-Bounce Peak',
        confidence: 91,
        area: '0.45 km²',
        region: 'Central Core',
        coordinates: '13.0720° N, 80.2600° E',
        description: 'SAR polarization backscatter shows strong metallic reflection, confirming roof shapes and corner reflectors unaffected by cloud cover.',
        color: '#FBBF24',
        polygonPoints: 'polygon(40% 40%, 60% 40%, 60% 60%, 40% 60%)'
      },
      {
        id: 'ev-fuse-2',
        label: 'Optical Reflectance Alignment',
        confidence: 87,
        area: '0.45 km²',
        region: 'Central Core',
        coordinates: '13.0718° N, 80.2598° E',
        description: 'Partially obscured optical visual confirmation matching the outline of the SAR backscatter anomaly.',
        color: '#67E8F9',
        polygonPoints: 'polygon(38% 38%, 58% 38%, 58% 58%, 38% 58%)'
      }
    ]
  },
  default: {
    title: 'GENERAL VISION-LANGUAGE ANNOTATION',
    summary: 'Visual Question Answering (VQA) successfully evaluated the scene. Main characteristics include highly structured road grids, mixed agricultural sectors, and dense urban sprawl.',
    confidence: 85,
    analysisType: 'VQA',
    specialists: ['Remote Sensing VQA (RS-VQA)', 'Vision-Language Router'],
    evidence: [
      {
        id: 'ev-default-1',
        label: 'Primary Transportation Highway',
        confidence: 89,
        area: 'Linear Grid',
        region: 'Southeastern Corridor',
        coordinates: '13.0600° N, 80.2800° E',
        description: 'Dual-lane asphalt highway running northwest to southeast, with high vehicle traffic volume detected.',
        color: '#67E8F9',
        polygonPoints: 'polygon(5% 5%, 95% 95%, 98% 90%, 8% 2%)'
      }
    ]
  }
};

export const MOCK_STEPS: AgentStep[] = [
  { id: 'step-1', name: 'Query Received', status: 'pending', description: 'Ingesting query and validating session payload...', duration: 400 },
  { id: 'step-2', name: 'Intent Analysis', status: 'pending', description: 'Routing intent to optical, SAR, or multi-temporal modules...', duration: 700 },
  { id: 'step-3', name: 'Input Validation', status: 'pending', description: 'Verifying image resolution, bands, and coordinate matrices...', duration: 500 },
  { id: 'step-4', name: 'Specialist Selection', status: 'pending', description: 'Spinning up models (U-Net, YOLO, SAR backscatter parser)...', duration: 700 },
  { id: 'step-5', name: 'Evidence Fusion', status: 'pending', description: 'Evaluating outputs and running logical consensus...', duration: 1200 },
  { id: 'step-6', name: 'Confidence Estimation', status: 'pending', description: 'Running probabilistic scoring on evidence overlaps...', duration: 800 },
  { id: 'step-7', name: 'Analysis Complete', status: 'pending', description: 'Compiling visual reports and overlays...', duration: 500 }
];
